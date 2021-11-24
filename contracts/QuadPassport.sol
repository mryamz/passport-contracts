//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/extensions/IERC20Metadata.sol";
import "@openzeppelin/contracts-upgradeable/utils/cryptography/ECDSAUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC1155/ERC1155Upgradeable.sol";
import "./QuadPassportStore.sol";
import "./interfaces/IQuadPassport.sol";

contract QuadPassport is IQuadPassport, ERC1155Upgradeable, OwnableUpgradeable, QuadPassportStore {
    event GovernanceUpdated(address _oldGovernance, address _governance);

    function initialize(
        address _governanceContract,
        string memory _uri
    ) public initializer {
        require(_governanceContract != address(0), "GOVERNANCE_ADDRESS_ZERO");
        __ERC1155_init(_uri);
        governance = QuadGovernance(_governanceContract);
    }

    function mintPassport(
        uint256 _tokenId,
        bytes32 _quadDID,
        bytes32 _aml,
        bytes32 _country,
        uint256 _issuedAt,
        bytes calldata _sig
    ) external payable override {
        require(msg.value == governance.mintPrice(), "INVALID_MINT_PRICE");
        require(governance.eligibleTokenId(_tokenId), "PASSPORT_TOKENID_INVALID");
        require(balanceOf(_msgSender(), _tokenId) == 0, "PASSPORT_ALREADY_EXISTS");

        bytes32 hash = _verifyIssuerMint(_msgSender(), _tokenId, _quadDID, _aml, _country, _issuedAt, _sig);

        _usedHashes[hash] = true;
        _validSignatures[_msgSender()][_tokenId] = _sig;
        _issuedEpoch[_msgSender()][_tokenId] = _issuedAt;
        _attributes[_msgSender()][keccak256("COUNTRY")] = Attribute({value: _country, epoch: _issuedAt});
        _attributes[_msgSender()][keccak256("DID")] = Attribute({value: _quadDID, epoch: _issuedAt});
        _attributesByDID[_quadDID][keccak256("AML")] = Attribute({value: _aml, epoch: _issuedAt});
        _mint(_msgSender(), _tokenId, 1, "");
    }

    function setAttribute(
        uint256 _tokenId,
        bytes32 _attribute,
        bytes32 _value,
        uint256 _issuedAt,
        bytes calldata _sig
    ) external payable override {
        require(msg.value == governance.mintPricePerAttribute(_attribute), "INVALID_ATTR_MINT_PRICE");
        bytes32 hash = _verifyIssuerSetAttr(_msgSender(), _tokenId, _attribute, _value, _issuedAt, _sig);

        _usedHashes[hash] = true;
        _setAttributeInternal(_msgSender(), _tokenId, _attribute, _value, _issuedAt);
    }

    function setAttributeIssuer(
        address _account,
        uint256 _tokenId,
        bytes32 _attribute,
        bytes32 _value,
        uint256 _issuedAt
    ) external override {
        require(governance.hasRole(ISSUER_ROLE, _msgSender()), "INVALID_ISSUER");
        _setAttributeInternal(_account, _tokenId, _attribute, _value, _issuedAt);
    }

    function _setAttributeInternal(
        address _account,
        uint256 _tokenId,
        bytes32 _attribute,
        bytes32 _value,
        uint256 _issuedAt
    ) internal {
        require(governance.eligibleTokenId(_tokenId), "PASSPORT_TOKENID_INVALID");
        require(balanceOf(_account, _tokenId) == 1, "PASSPORT_DOES_NOT_EXISTS");
        require(governance.eligibleAttributes(_attribute)
            || governance.eligibleAttributesByDID(_attribute),
            "ATTRIBUTE_NOT_ELIGIBLE"
        );
        if (governance.eligibleAttributes(_attribute)) {
            _attributes[_account][_attribute] = Attribute({value: _value, epoch: _issuedAt});
        } else {
            bytes32 dID = _attributes[_account][keccak256("DID")].value;
            require(dID != bytes32(0), "DID_NOT_FOUND");
            _attributesByDID[dID][_attribute] = Attribute({value: _value, epoch: _issuedAt});
        }
    }

    // function linkNewPassport() external payable {

    // }

    function burnPassport(
        uint256 _tokenId
    ) external override {
        require(balanceOf(_msgSender(), _tokenId) == 1, "CANNOT_BURN_ZERO_BALANCE");
        _burn(_msgSender(), _tokenId, 1);

        for (uint256 i = 0; i < governance.getSupportedAttributesLength(); i++) {
            bytes32 attributeType = governance.supportedAttributes(i);
            delete _attributes[_msgSender()][attributeType];
        }
    }

    function getAttribute(
        address _account,
        uint256 _tokenId,
        bytes32 _attribute
    ) external view override returns(bytes32, uint256) {
        require(governance.pricePerAttribute(_attribute) == 0, "ATTRIBUTE_IS_REQUIRING_PAYMENT");
        Attribute memory attribute = _getAttributeInternal(_account, _tokenId, _attribute);
        return (attribute.value, attribute.epoch);
    }

    function getAttributePayableETH(
        address _account,
        uint256 _tokenId,
        bytes32 _attribute
    ) external payable override returns(bytes32, uint256) {
        require(governance.pricePerAttribute(_attribute) == msg.value, "ATTRIBUTE_PAYMENT_INVALID");
        Attribute memory attribute = _getAttributeInternal(_account, _tokenId, _attribute);
        return (attribute.value, attribute.epoch);
    }

    function getAttributePayable(
        address _account,
        uint256 _tokenId,
        bytes32 _attribute,
        address _tokenAddr
    ) external payable override returns(bytes32, uint256) {
        _doTokenPayment(_tokenAddr, _attribute);
        Attribute memory attribute = _getAttributeInternal(_account, _tokenId, _attribute);
        return (attribute.value, attribute.epoch);
    }

    function getBatchAttributes(
        address _account,
        uint256[] calldata _tokenIds,
        bytes32[] calldata _attributes
    ) external view override returns(bytes32[] memory, uint256[] memory) {
        require(_tokenIds.length == _attributes.length, "BATCH_ATTRIBUTES_ERROR_LENGTH");
        bytes32[] memory attributeValues = new bytes32[](_attributes.length);
        uint256[] memory attributeEpochs = new uint256[](_attributes.length);

        for (uint256 i = 0; i < _tokenIds.length; i++) {
            require(governance.pricePerAttribute(_attributes[i]) == 0, "ATTRIBUTE_IS_REQUIRING_PAYMENT");
            Attribute memory attribute = _getAttributeInternal(_account, _tokenIds[i], _attributes[i]);
            attributeValues[i] = attribute.value;
            attributeEpochs[i] = attribute.epoch;
        }

        return (attributeValues, attributeEpochs);
    }

    function getBatchAttributesPayableETH(
        address _account,
        uint256[] calldata _tokenIds,
        bytes32[] calldata _attributes
    ) external payable override returns(bytes32[] memory, uint256[] memory) {
        require(_tokenIds.length == _attributes.length, "BATCH_ATTRIBUTES_ERROR_LENGTH");
        bytes32[] memory attributeValues = new bytes32[](_attributes.length);
        uint256[] memory attributeEpochs = new uint256[](_attributes.length);
        uint256 totalCost;

        for (uint256 i = 0; i < _tokenIds.length; i++) {
            Attribute memory attribute = _getAttributeInternal(_account, _tokenIds[i], _attributes[i]);
            attributeValues[i] = attribute.value;
            attributeEpochs[i] = attribute.epoch;
            totalCost += governance.pricePerAttribute(_attributes[i]);
        }
        require(msg.value == totalCost, "ATTRIBUTE_PAYMENT_INVALID");

        return (attributeValues, attributeEpochs);
    }

    // TODO: Payment in native Token
    function _getAttributeInternal(
        address _account,
        uint256 _tokenId,
        bytes32 _attribute
    ) internal view returns(Attribute memory) {
        require(_account != address(0), "ACCOUNT_ADDRESS_ZERO");
        require(governance.eligibleTokenId(_tokenId), "PASSPORT_TOKENID_INVALID");
        require(balanceOf(_account, _tokenId) == 1, "PASSPORT_DOES_NOT_EXIST");
        require(governance.eligibleAttributes(_attribute)
            || governance.eligibleAttributesByDID(_attribute),
            "ATTRIBUTE_NOT_ELIGIBLE"

        );
        if (governance.eligibleAttributes(_attribute)) {
            return _attributes[_account][_attribute];
        }

        bytes32 dID = _attributes[_account][keccak256("DID")].value;
        require(dID != bytes32(0), "DID_NOT_FOUND");
        return _attributesByDID[dID][_attribute];
    }

    // TODO: Get Payable Attributes

    function getPassportSignature(
        uint256 _tokenId
    ) external view override returns(bytes memory) {
        require(governance.eligibleTokenId(_tokenId), "PASSPORT_TOKENID_INVALID");
        return _validSignatures[_msgSender()][_tokenId];
    }

    function _verifyIssuerMint(
        address _account,
        uint256 _tokenId,
        bytes32 _quadDID,
        bytes32 _aml,
        bytes32 _country,
        uint256 _issuedAt,
        bytes calldata _sig
    ) internal view returns(bytes32){
        bytes32 hash = keccak256(abi.encode(_account, _tokenId, _quadDID, _aml, _country,  _issuedAt));
        require(!_usedHashes[hash], "SIGNATURE_ALREADY_USED");

        bytes32 signedMsg = ECDSAUpgradeable.toEthSignedMessageHash(hash);
        address issuer = ECDSAUpgradeable.recover(signedMsg, _sig);
        require(governance.hasRole(ISSUER_ROLE, issuer), "INVALID_ISSUER");

        return hash;
    }

    function _verifyIssuerSetAttr(
        address _account,
        uint256 _tokenId,
        bytes32 _attribute,
        bytes32 _value,
        uint256 _issuedAt,
        bytes calldata _sig
    ) internal view returns(bytes32) {
        bytes32 hash = keccak256(abi.encode(_account, _tokenId, _attribute, _value, _issuedAt));
        require(!_usedHashes[hash], "SIGNATURE_ALREADY_USED");

        bytes32 signedMsg = ECDSAUpgradeable.toEthSignedMessageHash(hash);
        address issuer = ECDSAUpgradeable.recover(signedMsg, _sig);
        require(governance.hasRole(ISSUER_ROLE, issuer), "INVALID_ISSUER");

        return hash;
    }

    function _beforeTokenTransfer(
        address operator,
        address from,
        address to,
        uint256[] memory ids,
        uint256[] memory amounts,
        bytes memory data
    ) internal override(ERC1155Upgradeable) {
    require(
        (from == address(0) && to != address(0))
        || (from != address(0) && to == address(0)),
        "ONLY_MINT_OR_BURN_ALLOWED"
    );
        super._beforeTokenTransfer(operator, from, to, ids, amounts, data);
    }

    function supportsInterface(bytes4 interfaceId) public view virtual override(ERC1155Upgradeable, IERC165Upgradeable) returns (bool) {
        return super.supportsInterface(interfaceId);
    }

    function _doTokenPayment(
        address _tokenPayment,
        bytes32 _attribute
    ) internal view {
        require(TokenPayment[_tokenPayment].isAllowed, "TOKEN_PAYMENT_NOT_ALLOWED");

        IERC20Metadata erc20 = IERC20Metadata(_tokenPayment);
        uint256 priceInUSD = governance.price(TokenPayment[_tokenPayment].symbol);
        uint256 amountUSD = governance.pricePerAttribute(_attribute) * priceInUSD;
        // Convert to Token Decimal
        uint256 amount = amountUSD / (10 ** (18 - erc20.decimals()));
        require(
            erc20.allowance(_msgSender(), address(this)) >= amount,
            "INSUFFICIANT_PAYMENT_ALLOWANCE"
        );
        erc20.safeTransferFrom(_msgSender(), governance.treasury(), amount);
    }

    // Admin function
    function setGovernance(address _governanceContract) external override {
        require(_msgSender() == address(governance), "ONLY_GOVERNANCE_CONTRACT");
        require(_governanceContract != address(governance), "GOVERNANCE_ALREADY_SET");
        require(_governanceContract != address(0), "GOVERNANCE_ADDRESS_ZERO");
        address oldGov = address(governance);
        governance = QuadGovernance(_governanceContract);

        emit GovernanceUpdated(oldGov, address(governance));
    }
}


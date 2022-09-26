/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type {
  QuadGovernanceStoreOld,
  QuadGovernanceStoreOldInterface,
} from "../QuadGovernanceStoreOld";

const _abi = [
  {
    inputs: [],
    name: "GOVERNANCE_ROLE",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "ISSUER_ROLE",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "PAUSER_ROLE",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "READER_ROLE",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "config",
    outputs: [
      {
        internalType: "uint256",
        name: "revSplitIssuer",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "mintPrice",
        type: "uint256",
      },
      {
        internalType: "contract IQuadPassportOld",
        name: "passport",
        type: "address",
      },
      {
        internalType: "address",
        name: "oracle",
        type: "address",
      },
      {
        internalType: "address",
        name: "treasury",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "eligibleTokenPayments",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

const _bytecode =
  "0x608060405234801561001057600080fd5b50610242806100206000396000f3fe608060405234801561001057600080fd5b50600436106100725760003560e01c8063d5abcfb811610050578063d5abcfb814610150578063e63ab1e914610183578063f36c8f5c146101aa57600080fd5b8063458c44581461007757806379502c55146100b157806382aefa2414610129575b600080fd5b61009e7fc757f485a2bb9eadbad5c86f7618c2a7a2ecb41b29f8610fb0e8bea3ed5ab6cf81565b6040519081526020015b60405180910390f35b600854600954600a54600b54600c546100e694939273ffffffffffffffffffffffffffffffffffffffff908116928116911685565b60408051958652602086019490945273ffffffffffffffffffffffffffffffffffffffff928316938501939093528116606084015216608082015260a0016100a8565b61009e7f114e74f6ea3bd819998f78687bfcb11b140da08e9b7d222fa9c1f1ba1f2aa12281565b61017361015e3660046101d1565b60066020526000908152604090205460ff1681565b60405190151581526020016100a8565b61009e7f65d7a28e3265b37a6474929f336521b332c1681b933f6cb9f3376673440d862a81565b61009e7f71840dc4906352362b0cdaf79870196c8e42acafade72d5d5a6d59291253ceb181565b6000602082840312156101e2578081fd5b813573ffffffffffffffffffffffffffffffffffffffff81168114610205578182fd5b939250505056fea264697066735822122014a0f766e8d788e94bbf757b23c980c927d880ea4f5b1ae4c0b3b56f85b332d264736f6c63430008040033";

export class QuadGovernanceStoreOld__factory extends ContractFactory {
  constructor(
    ...args: [signer: Signer] | ConstructorParameters<typeof ContractFactory>
  ) {
    if (args.length === 1) {
      super(_abi, _bytecode, args[0]);
    } else {
      super(...args);
    }
  }

  deploy(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<QuadGovernanceStoreOld> {
    return super.deploy(overrides || {}) as Promise<QuadGovernanceStoreOld>;
  }
  getDeployTransaction(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): QuadGovernanceStoreOld {
    return super.attach(address) as QuadGovernanceStoreOld;
  }
  connect(signer: Signer): QuadGovernanceStoreOld__factory {
    return super.connect(signer) as QuadGovernanceStoreOld__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): QuadGovernanceStoreOldInterface {
    return new utils.Interface(_abi) as QuadGovernanceStoreOldInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): QuadGovernanceStoreOld {
    return new Contract(
      address,
      _abi,
      signerOrProvider
    ) as QuadGovernanceStoreOld;
  }
}

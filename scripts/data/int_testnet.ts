import { ethers } from "hardhat";
import { getAddress } from "ethers/lib/utils";

const {
  ATTRIBUTE_DID,
  ATTRIBUTE_AML,
  ATTRIBUTE_COUNTRY,
  ATTRIBUTE_IS_BUSINESS,
  ATTRIBUTE_CRED_PROTOCOL_SCORE,
  ATTRIBUTE_ACCREDITED_INVESTOR_US,
  ATTRIBUTE_TRANSUNION_CREDIT_SCORE,
  NETWORK_IDS,
} = require("../../utils/constant.ts");

export const QUAD_GOVERNANCE = {
  [NETWORK_IDS.GOERLI]: getAddress(
    "0xB793345C76D2Ca541902Fe4c47813427F62A671a"
  ),
  [NETWORK_IDS.SEPOLIA]: getAddress(
    "0xB793345C76D2Ca541902Fe4c47813427F62A671a"
  ),
  [NETWORK_IDS.MUMBAI]: getAddress(
    "0xB793345C76D2Ca541902Fe4c47813427F62A671a"
  ),
  [NETWORK_IDS.FUJI]: getAddress("0xB793345C76D2Ca541902Fe4c47813427F62A671a"),
  [NETWORK_IDS.TEVMOS]: getAddress(
    "0xB793345C76D2Ca541902Fe4c47813427F62A671a"
  ),
  [NETWORK_IDS.ARBITRUM_GOERLI]: getAddress(
    "0xB793345C76D2Ca541902Fe4c47813427F62A671a"
  ),
  [NETWORK_IDS.OPTIMISM_GOERLI]: getAddress(
    "0xB793345C76D2Ca541902Fe4c47813427F62A671a"
  ),
};

export const QUAD_PASSPORT = {
  [NETWORK_IDS.GOERLI]: getAddress(
    "0x185cc335175B1E7E29e04A321E1873932379a4a0"
  ),
  [NETWORK_IDS.SEPOLIA]: getAddress(
    "0x185cc335175B1E7E29e04A321E1873932379a4a0"
  ),
  [NETWORK_IDS.MUMBAI]: getAddress(
    "0x185cc335175B1E7E29e04A321E1873932379a4a0"
  ),
  [NETWORK_IDS.FUJI]: getAddress("0x185cc335175B1E7E29e04A321E1873932379a4a0"),
  [NETWORK_IDS.TEVMOS]: getAddress(
    "0x185cc335175B1E7E29e04A321E1873932379a4a0"
  ),
  [NETWORK_IDS.ARBITRUM_GOERLI]: getAddress(
    "0x185cc335175B1E7E29e04A321E1873932379a4a0"
  ),
  [NETWORK_IDS.OPTIMISM_GOERLI]: getAddress(
    "0x185cc335175B1E7E29e04A321E1873932379a4a0"
  ),
};

export const QUAD_READER = {
  [NETWORK_IDS.GOERLI]: getAddress(
    "0x49CF5d391B223E9196A7f5927A44D57fec1244C8"
  ),
  [NETWORK_IDS.SEPOLIA]: getAddress(
    "0x49CF5d391B223E9196A7f5927A44D57fec1244C8"
  ),
  [NETWORK_IDS.MUMBAI]: getAddress(
    "0x49CF5d391B223E9196A7f5927A44D57fec1244C8"
  ),
  [NETWORK_IDS.FUJI]: getAddress("0x49CF5d391B223E9196A7f5927A44D57fec1244C8"),
  [NETWORK_IDS.TEVMOS]: getAddress(
    "0x49CF5d391B223E9196A7f5927A44D57fec1244C8"
  ),
  [NETWORK_IDS.ARBITRUM_GOERLI]: getAddress(
    "0x49CF5d391B223E9196A7f5927A44D57fec1244C8"
  ),
  [NETWORK_IDS.OPTIMISM_GOERLI]: getAddress(
    "0x49CF5d391B223E9196A7f5927A44D57fec1244C8"
  ),
};

export const MULTISIG = {
  [NETWORK_IDS.GOERLI]: getAddress(
    "0x8c3026C6f065dEcE3E7F641F4daC8f57BF9C4BE1"
  ),
  [NETWORK_IDS.SEPOLIA]: getAddress(
    "0xd3c529597b02209EA39a97f04a03dfA93a135867"
  ),
  [NETWORK_IDS.MUMBAI]: getAddress(
    "0x096A0Fb5954998Aa9F711B98E4d1A65f342F69Db"
  ),
  [NETWORK_IDS.FUJI]: getAddress("0x767B123Bd05697d8Dda135D1D0092a94ac5a7510"),
  [NETWORK_IDS.TEVMOS]: getAddress(
    "0x97988955b61a2634528cdcBeffD4a90bB2D27d81"
  ),
  [NETWORK_IDS.OPTIMISM_GOERLI]: getAddress(
    "0xE2020EB72f6FB1d4AD4A647dBc70fe61A2413d06"
  ),
  [NETWORK_IDS.ARBITRUM_GOERLI]: getAddress(
    "0x01Ddd1d82FD47A2fbd4374D984EFE1E2210cfB14"
  ),
};

// Treasury is the same as `MLTISIG` in testnet
export const QUADRATA_TREASURY = MULTISIG;

export const TIMELOCK = {
  [NETWORK_IDS.MUMBAI]: getAddress(
    "0x484ea071fB248B63Cbf4bf10BeAf01D6e65Ba4CD"
  ),
  [NETWORK_IDS.GOERLI]: getAddress(
    "0x484ea071fB248B63Cbf4bf10BeAf01D6e65Ba4CD"
  ),
  [NETWORK_IDS.FUJI]: getAddress("0xb496D9CFc65Ff223F3c08d188b2B9aDe58a335CA"),
  [NETWORK_IDS.SEPOLIA]: getAddress(
    "0x52Dada4AeEB5967Be24Ee4f4F8F410a1cB9DD50a"
  ),
  [NETWORK_IDS.TEVMOS]: getAddress(
    "0x97988955b61a2634528cdcBeffD4a90bB2D27d81"
  ),
  [NETWORK_IDS.OPTIMISM_GOERLI]: getAddress(
    "0xB82cE1FdA39d68e42bdDC61e0F1Fca0C6302AbD8"
  ),
  [NETWORK_IDS.ARBITRUM_GOERLI]: getAddress(
    "0xB82cE1FdA39d68e42bdDC61e0F1Fca0C6302AbD8"
  ),
};

// Careful - this doesn't work for Contract Deployment today
export const MAX_GAS_FEE = ethers.utils.parseUnits("70.1337", "gwei");

export const ISSUERS = [
  {
    wallet: getAddress("0x19c6525E6927554e311Cd83491d34623fF04605a"), // Quadrata
    treasury: getAddress("0x19c6525E6927554e311Cd83491d34623fF04605a"),
    attributesPermission: [
      ATTRIBUTE_DID,
      ATTRIBUTE_AML,
      ATTRIBUTE_COUNTRY,
      ATTRIBUTE_IS_BUSINESS,
      ATTRIBUTE_CRED_PROTOCOL_SCORE,
      ATTRIBUTE_ACCREDITED_INVESTOR_US,
    ],
  },

  {
    wallet: getAddress("0x1E56ceCC4115aC14dE1DE645B4d1bB98B1Bf071E"), // SpringLabs
    treasury: getAddress("0x1E56ceCC4115aC14dE1DE645B4d1bB98B1Bf071E"),
    attributesPermission: [
      ATTRIBUTE_DID,
      ATTRIBUTE_AML,
      ATTRIBUTE_COUNTRY,
      ATTRIBUTE_IS_BUSINESS,
      ATTRIBUTE_CRED_PROTOCOL_SCORE,
      ATTRIBUTE_ACCREDITED_INVESTOR_US,
      ATTRIBUTE_TRANSUNION_CREDIT_SCORE,
    ],
  },
];

export const OPERATOR = "0x0C19DFd4Edc2545b456AdFF3f4948929a06a206C";
export const READER_ONLY = "0xA88948CA8912c1D3C5639f1694adbc1907F9A931";

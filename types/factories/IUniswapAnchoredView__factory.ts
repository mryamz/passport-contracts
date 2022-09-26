/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import { Provider } from "@ethersproject/providers";
import type {
  IUniswapAnchoredView,
  IUniswapAnchoredViewInterface,
} from "../IUniswapAnchoredView";

const _abi = [
  {
    inputs: [
      {
        internalType: "string",
        name: "symbol",
        type: "string",
      },
    ],
    name: "price",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

export class IUniswapAnchoredView__factory {
  static readonly abi = _abi;
  static createInterface(): IUniswapAnchoredViewInterface {
    return new utils.Interface(_abi) as IUniswapAnchoredViewInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): IUniswapAnchoredView {
    return new Contract(
      address,
      _abi,
      signerOrProvider
    ) as IUniswapAnchoredView;
  }
}

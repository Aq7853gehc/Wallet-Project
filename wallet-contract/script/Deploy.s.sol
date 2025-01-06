// SPDX-License-Identifier: MIT
pragma solidity ^0.8;

import "forge-std/Script.sol";

import {WalletContract} from "../src/WalletContract.sol";

contract Deploye is Script {
    function run() external returns (WalletContract) {
        vm.startBroadcast();
        WalletContract walletContract = new WalletContract();
        vm.stopBroadcast();
        return(walletContract);
    }
}
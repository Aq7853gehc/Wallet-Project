// SPDX-License-Identifier: MIT
pragma solidity ^0.8;

contract WalletContract {
    address public owner;

    constructor() {
        owner = msg.sender;
    }

    event Deposit(address indexed sender, uint256 amount);
    event Withdraw(address indexed reciever, uint256 amount);

    modifier ownerOnly() {
        require(msg.sender == owner, "Must be owner");
        _;
    }

    function deposit(uint256 _amount) external payable {
        emit Deposit(msg.sender, _amount);
    }

    function widtdraw(uint256 _amount) external ownerOnly {
        require(address(this).balance >= _amount, "Insufficient balance");
        (bool callSuccess, ) = payable(msg.sender).call{
            value: address(this).balance
        }("");
        require(callSuccess, "Call Failed");
    }

    function getBalance() external view returns (uint) {
        return address(this).balance;
    }
}

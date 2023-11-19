// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract Coffee { 
    address private owner;
    string private lastMessage;

    constructor() {
        owner = msg.sender;
    }

    function sendFundAndMessage(string memory _msg) external payable {
        require(msg.value > 0, "Please send some funds");
        lastMessage = _msg;
    }

    function getLastMessage() external view returns (string memory) {
        return lastMessage;
    }

    function withdrawFunds() external {
        require(msg.sender == owner, "Only owner can withdraw the funds");
        uint256 _balance = address(this).balance;
        (bool success,) = payable(owner).call{value: _balance}("");
        require(success, "Transfer failed");
    }
}
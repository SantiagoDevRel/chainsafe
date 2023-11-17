// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract Coffee { 
    address public owner;
    string public lastMessage;

    constructor() {
        owner = msg.sender;
    }

    function sendFundAndMessage(string memory msg) external payable {
        require(msg.value > 0, "Please send some funds");
        lastMessage = msg;
        // Perform any additional logic or emit events as needed
    }

    function getLastMessage() external view returns (string memory) {
        return lastMessage;
    }





}
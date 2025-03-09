// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract HassuFaucet {
    string public name = "Hassu";
    string public symbol = "HSS";
    uint8 public decimals = 18;
    uint256 public totalSupply;

    address public owner;

    mapping(address => uint256) public balanceOf;
    mapping(address => mapping(address => uint256)) public allowance;
    uint256 constant FAUCET_AMOUNT = 10 * (10 ** 18);

    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(
        address indexed owner,
        address indexed spender,
        uint256 value
    );

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can call this function.");
        _;
    }

    constructor() {
        owner = msg.sender;
        totalSupply = 1_000_000 * (10 ** 18);
        balanceOf[owner] = totalSupply;
        emit Transfer(address(0), owner, totalSupply);
    }

    function transfer(
        address recipient
    ) public onlyOwner returns (bool success) {
        require(
            recipient != address(0),
            "The recipient address is invalid, please confirm the address."
        );

        require(
            balanceOf[owner] >= FAUCET_AMOUNT,
            "The owner does not have the sufficient balance to perform this transfer."
        );
        balanceOf[owner] -= FAUCET_AMOUNT;
        balanceOf[recipient] += FAUCET_AMOUNT;
        emit Transfer(owner, recipient, FAUCET_AMOUNT);
        return true;
    }
}

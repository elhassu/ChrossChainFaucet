// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract HassuFaucet {
    // Token details
    string public name = "Hassu";
    string public symbol = "HSS";
    uint8 public decimals = 18;
    uint256 public totalSupply;

    // Owner of the contract (deployer)
    address public owner;

    // Mapping to store balances for each account
    mapping(address => uint256) public balanceOf;
    // Mapping for allowances: owner => (spender => amount)
    mapping(address => mapping(address => uint256)) public allowance;

    // Constant faucet amount (10 tokens, accounting for decimals)
    uint256 constant FAUCET_AMOUNT = 10 * (10 ** 18);

    // Events for transfers and approvals
    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(
        address indexed owner,
        address indexed spender,
        uint256 value
    );

    // Modifier to restrict functions to the owner only
    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can call this function.");
        _;
    }

    // Constructor to initialize the token and assign the total supply to the owner
    constructor() {
        owner = msg.sender;
        totalSupply = 1_000_000 * (10 ** 18); // Example: 1,000,000 tokens
        balanceOf[owner] = totalSupply;
        emit Transfer(address(0), owner, totalSupply);
    }

    // Overridden transfer function to perform only as a faucet for the owner
    function transfer(
        address recipient
    ) public onlyOwner returns (bool success) {
        require(
            recipient != address(0),
            "The recipient address is invalid, please confirm the address."
        );

        // If the caller is the owner and the amount is exactly the faucet amount,
        // then perform the faucet transfer
        require(
            balanceOf[owner] >= FAUCET_AMOUNT,
            "The owner does not have the sufficient balance to perform this transfer."
        );
        balanceOf[owner] -= FAUCET_AMOUNT;
        balanceOf[recipient] += FAUCET_AMOUNT;
        emit Transfer(owner, recipient, FAUCET_AMOUNT);
        return true;
    }

    // Approve a spender to transfer tokens on behalf of the caller
    function approve(
        address spender,
        uint256 value
    ) public returns (bool success) {
        require(
            spender != address(0),
            "The spender address is invalid, please confirm the address."
        );

        allowance[msg.sender][spender] = value;
        emit Approval(msg.sender, spender, value);
        return true;
    }

    // Transfer tokens on behalf of another address (using allowance)
    function transferFrom(
        address from,
        address to,
        uint256 value
    ) public returns (bool success) {
        require(
            to != address(0),
            "The recipient address is invalid, please confirm the address."
        );
        require(
            balanceOf[from] >= value,
            "There is not a sufficient balance to perform this transfer."
        );
        require(
            allowance[from][msg.sender] >= value,
            "The allowance has been exceeded."
        );

        balanceOf[from] -= value;
        balanceOf[to] += value;
        allowance[from][msg.sender] -= value;

        emit Transfer(from, to, value);
        return true;
    }
}

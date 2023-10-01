// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.16;

import "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";

contract  Merkle {
    bytes32 public merkleRoot = 0x7786bbf939b9707453986343b4e28007c67584858a7bd4108bb8e22ce247a94c;

    mapping (address => bool) public whitelistClaimed;

    function whitelistmint(bytes32[] calldata _merkeProof) public {
        require(!whitelistClaimed[msg.sender],"Address has already claimed.");
        bytes32 leaf = keccak256(abi.encodePacked(msg.sender));
        require(MerkleProof.verify(_merkeProof,merkleRoot,leaf),"Invalid prooof.");
        whitelistClaimed[msg.sender] = true;
    }

}
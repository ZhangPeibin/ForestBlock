// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.16;

contract Signature {
	function verify(
		address _signer,
		string memory _message,
		uint8 v,
		bytes32 r,
		bytes32 s
	) external pure returns (bool) {
        bytes32 messageHash = keccak256(abi.encodePacked(_message));
        bytes32 messageDigest = keccak256(abi.encodePacked("\x19Ethereum Signed Message:\n32",messageHash));
        return ecrecover(messageDigest,v,r,s) == _signer;

    }
}

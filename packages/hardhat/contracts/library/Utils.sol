// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.16;

library Utils {
	/**
	 * @dev check this string is blank
	 * @param str the str will be checked
	 */
	function isBlankString(string memory str) public pure returns (bool) {
		bytes memory bytesStr = bytes(str);
		return bytesStr.length == 0;
	}


    /**
     * @dev Get a random number within a certain range
     * @param min  the min for the range
     * @param max  the max for the range
     * @param seed  the random seed 
     */
	function getRandomNumber(
		uint256 min,
		uint256 max,
		uint256 seed
	) public view returns (uint256) {
		require(max > min, "Invalid range");

		uint256 randomNumber = uint256(
			keccak256(abi.encodePacked(block.timestamp, msg.sender, seed))
		) % (max - min + 1);
		return randomNumber + min;
	}
}

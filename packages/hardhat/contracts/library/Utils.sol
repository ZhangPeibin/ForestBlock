// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.16;

library Utils {

    /**
     * 判断string是否为空
     * @param str 输入的字符串
     */
	function isBlankString(string memory str) public pure returns (bool) {
		bytes memory bytesStr = bytes(str);
        return bytesStr.length == 0; 
	}
}

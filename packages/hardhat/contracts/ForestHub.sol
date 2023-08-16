// SPDX-License-Identifier: MIT
pragma solidity ^0.8.16;
import "./ForestBase.sol";

contract ForestHub is ForestBase {
	constructor() {
		_transferAdminship(msg.sender);
		initDefaultSpecs();
	}

	/**
	 * create a tree
	 * @param _nickName the tree nickname
	 * @param _specId  which spec  you want to create
	 * 
	 * @notice msg.value must be wei 
	 */
	function createTree(string memory _nickName, uint256 _specId) external payable {
		require(_specId < species.length, "invalid specId");
		require(msg.value >= 10000000000000000, "You should pay at least 0.01 ETH for creating a tree");
		_createTree(_nickName, _specId, msg.sender);
	}



	/**
	 * 购买 道具
	 * @param _effect 道具id
	 */
	function buyFrestItem(uint256 _effect ) public payable returns(Item memory _item){
		require(_effect < _effectTotal,"unknown item effect");
		_item = _createForestItem(_effect,true);
	}

	
	function getContractBalance() public view returns (uint256) {
        return address(this).balance;
    }


}

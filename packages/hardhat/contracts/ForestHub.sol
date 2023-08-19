// SPDX-License-Identifier: MIT
pragma solidity ^0.8.16;
import "./ForestBase.sol";
import "./library/Utils.sol";

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
	function createTree(
		string memory _nickName,
		uint256 _specId
	) external payable {
		require(_specId < specs.length, "invalid specId");
		require(
			msg.value >= 10000000000000000,
			"You should pay at least 0.01 ETH for creating a tree"
		);
		_createTree(_nickName, _specId, msg.sender);
	}


	/**
	 * get this contract balance
	 */
	function getContractBalance() public view returns (uint256) {
		return address(this).balance;
	}

	/**
	 * @dev Ways to Earn Points
	 * @param _treeId  the tree 's id
	 */
	function producePoint(uint256 _treeId) external {
		require(_treeId > 0 && _treeId < trees.length, "treeId doesn't exist");
		uint256 productionInterval = trees[_treeId].spec.productionInterval;
		require(
			block.timestamp >=
				trees[_treeId].lastProductionTime + productionInterval,
			"Not enough time has passed"
		);
		uint256 _points = Utils.getRandomNumber(
			3,
			9,
			trees[_treeId].spec.maxEnergy % 12
		);
		trees[_treeId].receiptPoints += _points;
		forests[trees[_treeId].forestId].receiptPoints += _points;
		trees[_treeId].lastProductionTime = block.timestamp;
	}
}

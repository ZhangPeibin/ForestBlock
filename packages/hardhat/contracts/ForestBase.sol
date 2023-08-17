// SPDX-License-Identifier: MIT
pragma solidity ^0.8.16;
import "./ForestSpec.sol";
import "./ForestItem.sol";

/**
 * @title Basic contract, including Forest structure, creating Forest and other commonly used methods
 * @author pb
 * @notice the main enter is ForestHub
 */
contract ForestBase is ForestSpec, ForestItem {
	/*** Data Types ***/

	struct Forest {
		/**
		 * The id of each forest starts from 1,
		 */
		uint256 id;
		/**
		 * The birth time of this forest
		 */
		uint256 birthTime;
		/**
		 * @notice The set of all trees under this forest
		 */
		Tree[] trees;
		/**
		 * @notice the owner of this forest
		 */
		address owner;
	}

	struct Tree {
		/**
		 * @notice treeId
		 */
		uint256 treeId;
		/**
		 * @notice The tree belongs to the id of the forest
		 */
		uint256 forestId;
		/**
		 * @notice The nickname of the tree as set by the user
		 */
		string nickName;
		/**
		 * @notice current energy of the tree
		 */
		uint256 energy;
		/**
		 * @notice which species this tree belongs to
		 */
		Spec spec;
		/**
		 * @notice The birth time of this tree
		 */
		uint256 birthTime;
		/**
		 *  Cooldown time for watering
		 */
		uint64 wateringCoolDownEndTime;
		/**
		 *  Fertilizer Cooldown
		 */
		uint64 fertilizeCoolDownEndTime;
		/**
		 * @dev The time when the fruit was last produced
		 */
		uint256 lastProductionTime;
	}

	/*** STORAGE ***/

	/**
	 * @dev A mapping from user address  to user's Items
	 */
	mapping(address => ForestItem.Item[]) public addressWithForestItem;

	/**
	 * @dev A mapping from user address  to  user first sign in
	 */
	mapping(address => bool) isUserFirstIn;

	/**
	 * @dev An array containing the Forest struct for all Kitties in existence
	 * The ID of each Forest is actually an index into this array
	 *
	 */
	Forest[] forests;	

	/**
	 * @dev A mapping from user address  to  the forest that owner them
	 */
	mapping(address => Forest) public addressToForest;

	/**
	 * All trees size
	 */
	Tree[] trees;

	function _createTree(
		string memory _nickName,
		uint256 _specId,
		address _owner
	) internal {
		Forest storage _forest = addressToForest[_owner];
		if (_forest.id == 0) {
			_forest.birthTime = uint64(block.timestamp);
			_forest.owner = _owner;
			forests.push(_forest);
			_forest.id = forests.length;
		}

		Tree memory _tree = Tree({
			treeId: trees.length,
			forestId: _forest.id,
			nickName: _nickName,
			energy: uint256(0),
			spec: getSpecById(_specId),
			birthTime: uint64(block.timestamp),
			wateringCoolDownEndTime: 0,
			fertilizeCoolDownEndTime: 0
		});

		_forest.trees.push(_tree);
		trees.push(_tree);
	}

	/**
	 *
	 * When the user logs in for the first time, get a water item and a fertilize item
	 * @notice These two items are not transferable
	 */
	function initializeUserItems() external {
		if (!isUserFirstIn[msg.sender]) {
			isUserFirstIn[msg.sender] = true;
			addressWithForestItem[msg.sender].push(_createWaterItem());
			addressWithForestItem[msg.sender].push(_createFertilizeItem());
		}
	}

	function produceFruit(uint256 treeId) external {
		// uint256 productionInterval = speciesContract.speciesData(treeData[treeId].speciesId).productionInterval;
		// require(block.timestamp >= treeData[treeId].lastProductionTime + productionInterval, "Not enough time has passed");
		// 触发产生果实逻辑
		// ...
		// 更新上次产生果实的时间
		// treeData[treeId].lastProductionTime = block.timestamp;
	}
}

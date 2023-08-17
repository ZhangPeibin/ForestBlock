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
		 * @dev  The id of each forest starts from 1,
		 */
		uint256 id;
		/**
		 * @dev The birth time of this forest
		 */
		uint256 birthTime;

		/**
		 * @dev Points harvested by all trees below the forest
		 */
		uint256 receiptPoints;
		/**
		 * @dev The set of all trees under this forest
		 */
		Tree[] trees;
		/**
		 * @dev the owner of this forest
		 */
		address owner;

	}

	struct Tree {
		/**
		 * @dev treeId
		 */
		uint256 treeId;
		/**
		 * @dev The tree belongs to the id of the forest
		 */
		uint256 forestId;
		/**
		 * @dev The nickname of the tree as set by the user
		 */
		string nickName;
		/**
		 * @dev current energy of the tree
		 */
		uint256 energy;
		/**
		 * @dev which species this tree belongs to
		 */
		Spec spec;
		/**
		 * @dev The birth time of this tree
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

		/**
		 * @dev points accumulated by this tree
		 */
		uint256 receiptPoints;
	}

	/*** STORAGE ***/

	/**
	 * @dev A mapping from user address  to user's Items
	 */
	mapping(address => ForestItem.Item[]) addressToItems;

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
	 * @dev An array containing all trees .
	 */
	Tree[] trees;

	/**
	 * @dev A mapping from user address  to  the forest that owner them
	 */
	mapping(address => Forest)  addressToForest;

	function _createTree(
		string memory _nickName,
		uint256 _specId,
		address _owner
	) internal {
		Forest storage _forest = addressToForest[_owner];
		if (_forest.id == 0) {
			_forest.birthTime = uint64(block.timestamp);
			_forest.owner = _owner;
			_forest.id = forests.length;
			forests.push(_forest);
		}

		Tree memory _tree = Tree({
			treeId: trees.length,
			forestId: _forest.id,
			nickName: _nickName,
			energy: uint256(0),
			spec: species[_specId],
			birthTime: uint64(block.timestamp),
			wateringCoolDownEndTime: uint64(0),
			fertilizeCoolDownEndTime: uint64(0),
			lastProductionTime: uint256(0),
			receiptPoints:uint256(0)
		});

		_forest.trees.push(_tree);
		trees.push(_tree);
	}

	/**
	 * 
	 * @dev When the user logs in for the first time, get a water item and a fertilize item
	 * @notice These two items are not transferable
	 */
	function initializeUserItems() external {
		if (!isUserFirstIn[msg.sender]) {
			isUserFirstIn[msg.sender] = true;
			addressToItems[msg.sender].push(_createWaterItem());
			addressToItems[msg.sender].push(_createFertilizeItem());
		}
	}

	
	function getItemsWithOwner(address _owner) public view returns(ForestItem.Item[] memory _items){
		_items = addressToItems[_owner];
	}

	function getForestWithOwner(address _owner) public view returns(Forest memory _forest){
		return addressToForest[_owner];
	} 
}

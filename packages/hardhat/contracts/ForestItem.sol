// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.16;
import "./ForestAccessControl.sol";

/**
 *
 * 增长道具： 增加树木的生长速度或能量值，帮助玩家更快地种植满树木。
 * 保护道具： 保护树木免受虫害、自然灾害等影响，维持树木的健康状态。
 * 景观道具： 添加美化元素，如花朵、彩虹等，使玩家的虚拟土地更加多彩。
 * 互动道具： 允许玩家与其他玩家互动，如送花、种子等，增加社交性。
 * 加速道具： 缩短等待时间，例如加速能量值积累或成果收获。
 * 种子道具： 提供特殊类型的种子，种植后可能获得独特的树木或奖励。
 * 环保道具： 完成特定任务或活动后获得，用于支持真实世界的环保项目。
 * 变化道具： 改变树木的外观或特性，增加游戏的趣味性
 * 季节道具： 修改虚拟环境的季节，影响树木的成长状态和需求。
 * 特殊能量道具： 提供额外的能量，用于应对特殊情况或挑战。
 * @title 道具相关的功能，比如 初始化用户道具，添加道具，购买道具
 * @author pb
 * @notice 道具功能还在完善中
 */
contract ForestItem is ForestAccessControl {


	/**
	 * @dev Item struct that describe the Item
	 * @notice only ceo can add new items
	 */
	struct Item {
		uint256 id;
		string name;
		// the effect for this item
		EffectType effect;
		// item's price
		uint256 price;
		// To check that this item has already add into forest
		bool hasAddToForest;
	}

	/**
	 * @dev An enumeration of defined prop effect types
	 */
	enum EffectType {
		WATER,
		FERTILIZE,
		WEEDING,
		INSECTICIDE
	}

	/**
	 * @dev An array that contains all items
	 */
	Item[] items;

	/**
	 * @dev An map that from effecType to
	 */
	mapping(EffectType => Item) effectTypeToItem;


	constructor(){
		_initDefaultForestItems();
	}

	function _initDefaultForestItems() internal  {
		_addNewItemToForest("Water",EffectType.WATER,0.001 ether);
		_addNewItemToForest("Fertilize",EffectType.FERTILIZE,0.001 ether);
		_addNewItemToForest("Weeding",EffectType.WEEDING,0.001 ether);
		_addNewItemToForest("Insecticide",EffectType.INSECTICIDE,0.001 ether);
	}

	/**
	 * @dev the getter method for 'items' 
	 */
	function getAllItems() external view returns(Item[] memory _items){
		_items = items;
	}


	/**
	 * @dev the function to add new Item into forest world
	 * @param _name Item's name
	 * @param _effectType  Item's effectType
	 * @param _price  Item's price
	 */
	function addNewItemToForest(
		string memory _name,
		EffectType _effectType,
		uint256 _price
	) public onlyCEO {
		require(
			_effectType == EffectType.WATER ||
				_effectType == EffectType.FERTILIZE || 
				_effectType == EffectType.WEEDING || 
				_effectType == EffectType.INSECTICIDE,
			"Invalid effect type"
		);
		_addNewItemToForest(_name, _effectType, _price);
	}

	/**
	 * @dev This method is the concrete implementation of adding props
	 * @param _name Item's name
	 * @param _effectType Item's effectType
	 * @param _price Item's price
	 */
	function _addNewItemToForest(
		string memory _name,
		EffectType _effectType,
		uint256 _price
	) internal {
		if (effectTypeToItem[_effectType].hasAddToForest) {
			// item has already add into this forest
			// should update
			items[effectTypeToItem[_effectType].id].name = _name;
			items[effectTypeToItem[_effectType].id].effect = _effectType;
			items[effectTypeToItem[_effectType].id].price = _price;

			effectTypeToItem[_effectType] = items[
				effectTypeToItem[_effectType].id
			];
		} else {
			Item memory _item = Item({
				id: items.length,
				name: _name,
				effect: _effectType,
				price: _price,
				hasAddToForest: true
			});
			items.push(_item);
			effectTypeToItem[_effectType] = items[_item.id];
		}
	}
}

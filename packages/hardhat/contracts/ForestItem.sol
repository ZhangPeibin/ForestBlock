// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.16;

/**
 *
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
contract ForestItem {
	/**
	 * 初始的道具
	 * 浇水道具
	 * 施肥道具
	 */
	struct Item {
		uint256 id;
		string name;
		/**
		 * effect等价于 道具类型
		 * 1: water
		 * 2: Fertilize
		 */
		uint256 effect;
		/**
		 * 该道具是否可以转移
		 */
		bool canTransfer;
	}

    /**
     * @dev 所有的道具数量
     */
	uint256 _itemCount;

	/**
	 * 创建water道具
	 */
	function _createWaterItem() public returns (Item memory _item) {
		_item = createForestItem("water", 1, false);
	}

	/**
	 * 创建默认的item
	 */
	function _createFertilizeItem() public returns (Item memory _item) {
		_item = createForestItem("fertilize", 2, false);
	}

	/**
	 *
	 * @param _name 道具名称
	 * @param _effect 道具效果 1:浇水道具 2: 施肥道具
	 * @param canTransfer  是否能转让
	 */
	function createForestItem(
		string memory _name,
		uint256 _effect,
		bool canTransfer
	) public returns (Item memory item) {
		_itemCount++;
		item.name = _name;
		item.id = _itemCount;
		item.effect = _effect;
		item.canTransfer = canTransfer;
	}
}

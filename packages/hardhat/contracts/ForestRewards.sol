// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.16;

import { IERC20 } from "@openzeppelin/contracts/token/ERC20/IERC20.sol";

/**
 * @title cast uint256  to uint128
 * @author peibin
 * @notice the uint256 must smaller thant uint128.max
 */
library Cast {
	function u128(uint256 x) internal pure returns (uint128 y) {
		require(x <= type(uint128).max, "Cast overflow");
		y = uint128(x);
	}
}

contract ForestRewards {
	using Cast for uint256;

	event Statked(address indexed user, uint256 amount);
	event Unstaked(address indexed user, uint256 amount);
	event Claimed(address indexed user, uint256 amount);

	struct RewardsPerToken {
		uint128 accumulated;
		uint128 lastUpdated;
	}

	struct UserRewards {
		uint128 accumulated;
		uint128 checkpoint;
	}

	// Token to be staked
	IERC20 public immutable stakingToken;
	// Total amount staked
	uint256 public totalStaked;
	// Amount staked per user
	mapping(address => uint256) userStake;

	IERC20 public immutable rewardsToken;
	uint256 public immutable rewardsRate;
	uint256 public immutable rewardsStart;
	uint256 public immutable rewardsEnd;

	RewardsPerToken public rewardsPerToken;

	constructor(
		IERC20 _stakingToken,
		IERC20 _rewardsToken,
		uint256 _rewardsStart,
		uint256 _rewardsEnd,
		uint256 totalRewards
	) {
		stakingToken = _stakingToken;
		rewardsToken = _rewardsToken;
		rewardsStart = _rewardsStart;
		rewardsEnd = _rewardsEnd;
		rewardsRate = totalRewards / (_rewardsEnd - _rewardsStart);
		rewardsPerToken.lastUpdated = _rewardsStart.u128();
	}

	function _calculaterewardsPerToken(
		RewardsPerToken memory _rewardsPerTokenIn
	) internal view returns (RewardsPerToken memory) {
		RewardsPerToken memory rewardsPerTokenOut = RewardsPerToken(
			_rewardsPerTokenIn.accumulated,
			_rewardsPerTokenIn.lastUpdated
		);

		uint256 _totalStaked = totalStaked;
		if (block.timestamp < rewardsStart) return rewardsPerTokenOut;

		uint256 updateTime = block.timestamp < rewardsEnd
			? block.timestamp
			: rewardsEnd;
		//计算这次更新跟上次更新的时间差
		uint256 elapsed = updateTime - _rewardsPerTokenIn.lastUpdated;
		if (elapsed == 0) return rewardsPerTokenOut;

		rewardsPerTokenOut.accumulated = (_rewardsPerTokenIn.accumulated +
			(1e18 * elapsed * rewardsRate) /
			_totalStaked).u128();

        return rewardsPerTokenOut;    
	}

	function _updaterewardsPerToken()
		internal
		returns (RewardsPerToken memory)
	{
		//using memory to saving gas
		RewardsPerToken memory rewardsPerTokenIn = rewardsPerToken;
		RewardsPerToken memory rewardsPerTokenOut = _calculaterewardsPerToken(
			rewardsPerTokenIn
		);

        if(rewardsPerTokenIn.lastUpdated == rewardsPerTokenOut.lastUpdated) {
            return rewardsPerTokenOut;
        }

        rewardsPerToken = rewardsPerTokenOut;
    

		return rewardsPerTokenOut;
	}

	/**
	 *
	 * @param user update the user's rewards
	 */
	function _updateUserRewards(
		address user
	) internal returns (UserRewards memory) {
		//先更新每次用户的 rewardsperttoken();
	}

	function _stake(address user, uint256 amount) internal {
		totalStaked += amount;
		userStake[user] += amount;
		stakingToken.transferFrom(user, address(this), amount);
		emit Statked(user, amount);
	}

	function _unstake(address user, uint256 amount) internal {
		require(userStake[user] >= amount, "insufficient funds");
		totalStaked -= amount;
		userStake[user] -= amount;
		stakingToken.transfer(user, amount);
		emit Unstaked(user, amount);
	}

	function _claim(address user, uint256 amount) internal {}

	function stake(uint256 amount) external {
		_stake(msg.sender, amount);
	}

	function unstake(uint256 amount) external {
		_unstake(msg.sender, amount);
	}

	function claim() public returns (uint256) {
		_claim(msg.sender, 0);
		return 0;
	}
}

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
	event UserRewardsUpdated(address user, uint256 rewards, uint256 checkpoint);

	struct RewardsPerToken {
		//用来记录从开始时间到lastupdated的每个代币受益的累加值
		uint128 accumulated;
		//用来记录每次交易的那个时间
		uint128 lastUpdated;
	}

	struct UserRewards {
		//用来记录每个RewardsPerToken的时间段的用户存代币的是受益累加
		uint128 accumulated;
		//就是记录每次RewardsPerToken更新lastUpdated的时间
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

	mapping(address => UserRewards) public accumulatedRewards;

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

	function _calculateRewardsPerToken(
		RewardsPerToken memory _rewardsPerTokenIn
	) internal view returns (RewardsPerToken memory) {
		//构造当前的 RewardsperToken =  上一次时间点的RewardsPerToken
		RewardsPerToken memory rewardsPerTokenOut = RewardsPerToken(
			_rewardsPerTokenIn.accumulated,
			_rewardsPerTokenIn.lastUpdated
		);
		//当前的总质押
		uint256 _totalStaked = totalStaked;

		//如果还没开始。那么就算了
		if (block.timestamp < rewardsStart) return rewardsPerTokenOut;

		//当前更新的时间。如果当前时间已经超过了 质押最终的时间
		//那么按质押的最终时间去弄
		//否则就按当前时间
		uint256 updateTime = block.timestamp < rewardsEnd
			? block.timestamp
			: rewardsEnd;
		//计算这次更新跟上次更新的时间差
		uint256 elapsed = updateTime - _rewardsPerTokenIn.lastUpdated;

		//如果两次时间点相等 , 那么久直接return 不需要计算
		if (elapsed == 0) return rewardsPerTokenOut;

		if (totalStaked == 0) return rewardsPerTokenOut;

		//从上次时间点到当前时间点的 每个代币的受益计算
		//     TB - TA * rate / totalStaked
		rewardsPerTokenOut.accumulated = (_rewardsPerTokenIn.accumulated +
			(1e18 * elapsed * rewardsRate) /
			_totalStaked).u128();

		return rewardsPerTokenOut;
	}

	/// @notice Calculate the rewards accumulated by a stake between two checkpoints.
	function _calculateUserRewards(
		uint256 stake_,
		uint256 earlierCheckpoint,
		uint256 latterCheckpoint
	) internal pure returns (uint256) {
		return (stake_ * (latterCheckpoint - earlierCheckpoint)) / 1e18; // We must scale down the rewards by the precision factor
	}

	function _updaterewardsPerToken()
		internal
		returns (RewardsPerToken memory)
	{
		//上一次时间点的每个代币的受益
		RewardsPerToken memory rewardsPerTokenIn = rewardsPerToken;
		//当前时间点的每个代币的受益
		RewardsPerToken memory rewardsPerTokenOut = _calculateRewardsPerToken(
			rewardsPerTokenIn
		);

		//如果上一次的时间点跟这一次的时间点一样,那么就return就行了
		if (rewardsPerTokenIn.lastUpdated == rewardsPerTokenOut.lastUpdated) {
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
		RewardsPerToken memory _rewardsPerToken = _updaterewardsPerToken();
		UserRewards memory _userRewards = accumulatedRewards[user];
		if (_userRewards.checkpoint == _rewardsPerToken.lastUpdated) {
			return _userRewards;
		}

		_userRewards.accumulated = _calculateUserRewards(
			userStake[user],
			_userRewards.checkpoint,
			_rewardsPerToken.accumulated
		).u128();
		_userRewards.checkpoint = _rewardsPerToken.accumulated;

		accumulatedRewards[user] = _userRewards;
		emit UserRewardsUpdated(
			user,
			_userRewards.accumulated,
			_userRewards.checkpoint
		);
		return _userRewards;
	}

	function _stake(address user, uint256 amount) internal {
		_updateUserRewards(user);
		totalStaked += amount;
		userStake[user] += amount;
		stakingToken.transferFrom(user, address(this), amount);
		emit Statked(user, amount);
	}

	function _unstake(address user, uint256 amount) internal {
		require(userStake[user] >= amount, "insufficient funds");
		_updateUserRewards(user);

		totalStaked -= amount;
		userStake[user] -= amount;
		stakingToken.transfer(user, amount);
		emit Unstaked(user, amount);
	}

	function _claim(address user, uint256 amount) internal {
		uint256 rewardsAvailable =  _updateUserRewards(msg.sender).accumulated;
		accumulatedRewards[user].accumulated = (rewardsAvailable - amount).u128();

        rewardsToken.transfer(user, amount);
		emit Claimed(user,amount);
	}

	/// @notice Stake tokens
	function stake(uint256 amount) external {
		_stake(msg.sender, amount);
	}

	/// @notice Unstake tokens
	function unstake(uint256 amount) external {
		_unstake(msg.sender, amount);
	}


	/// @notice Claim all rewards for the caller
	function claim() public returns (uint256) {
		uint256 claimed = _updateUserRewards(msg.sender).accumulated;
		_claim(msg.sender, claimed);
		return claimed;
	}

	function currentRewardsPerToken() public view returns (uint256){
		return _calculateRewardsPerToken(rewardsPerToken).accumulated;
	}

	
}

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.16;
import "./ForestSpec.sol";
import "./ForestItem.sol";

/**
 * @title 基础合约，包括Forest结构体，创建Forest 等常用的方法
 * @author pb
 * @notice the main enter is ForestHub
 */
contract ForestBase  is ForestSpec , ForestItem {



    struct Forest {
        /**
         * 每个forest的id ,从0开始,
         * forestId == forestCount 就代表你这个Forest是最新创建的一个
         */
        uint256 forestId;

        /**
         * 这块森林的诞生时间
         */
        uint256 birthTime;


        /**
         * 浇水的冷却时间
         */
        uint64 wateringCoolDownEndTime ;

        /**
         *  施肥的冷却时间
         */    
        uint64 fertilizeCoolDownEndTime;
    }

    /**
     * @notice 用户创建forest的数量
     */
    uint256 public forestCount = 0;

    /**
     * @notice 用户持有的道具
     */
    mapping(address => ForestItem.Item[]) public addressWithForestItem;
    mapping(address => bool) public isUserFirstIn;


    /**
     * 用户首次登录时，获得一个water道具和一个 fertilize道具
     * @notice 这两个道具不能转让
     */
    function initForestItemForUserFirstIn() public {
        if(!isUserFirstIn[msg.sender]){
             isUserFirstIn[msg.sender]  = true;   
             addressWithForestItem[msg.sender].push(_createWaterItem());
             addressWithForestItem[msg.sender].push(_createFertilizeItem());
        }
    }

}
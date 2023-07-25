// SPDX-lincense-identifier: MIT

pragma solidity ^0.8.16;

library Events {

    /**
     *  种子购买的event
     * @param who 谁购买的种子
     * @param seedType  种子的类型
     * @param seedId    购买的种子的id
     */
    event SeedPurchase(address indexed who, 
        uint indexed seedType, 
        uint256 indexed seedId
    );

    
}


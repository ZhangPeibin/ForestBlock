// SPDX-lincense-identifer:MIT

pragma solidity ^0.8.16;

/**
 * 定义涉及Tree的各种数据结构
 * 种子
 * 树
 * @author peibin
 */
library TreeType {

    /**
     * 
     * @notice 只有繁殖期阶段才算最终完成整个树的种植,也就是可以mint一个数的NFT
     * 
     * 所有树的生产阶段
     * @param Germination  发芽
     * @param Seedling   幼苗期
     * @param Growth     生长期
     * @param Maturity   成熟期
     * @param Reproductive  繁殖期
     */
    enum TreeGrowStage{
        Germination,
        Seedling,
        Growth,
        Maturity,
        Reproductive
    }


    /**
     * 所有种子的类型
     */
    struct SeedType {
        string types;
    }
}  


// SPDX-lincense-identifer:MIT

pragma solidity ^0.8.16;

/**
 * 
 * @notice  Species 树种的意思，树的种类
 * 定义涉及Tree的各种数据结构
 * 种子
 * 树
 * @author peibin
 */
library TreeTypes{

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
     * @param Caragana 柠条
     * @param HedysarumAlpinum  高山岩黄芪
     * @param Elm 榆树
     * @param Platycladus 侧柏
     * @param CamphoraOfficinarum 樟树
     * @param Haloxylon 梭梭树
     * @param PiceaAsperata 云杉
     * @param AbiesFabri 冷杉
     * @param QuercusPalustris 橡树
     */
    enum  Species {
        Caragana, // 16930
        HedysarumAlpinum, // 21310
        Elm , //85760
        Platycladus, // 96000
        CamphoraOfficinarum ,//146210
        Haloxylon,// 17900
        PiceaAsperata, // 198000
        AbiesFabri, //  330759
        QuercusPalustris // 540000
    }

    /**
     * 树的品种
     * @name  品种名称
     * @location 种植地点
     * @info  品种描述
     * @award 种植该品种的奖励
     * @max   最大种植数量
     */
    struct SpeciesDetail {
        string name;
        string location;
        string info;
        string[] award;
        uint256 max;
    }


}  


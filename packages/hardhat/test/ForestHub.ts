import { assert, expect } from "chai";
import { ethers } from "hardhat";
import { ForestHub } from "../typechain-types";

describe("ForestHub", function () {
  // We define a fixture to reuse the same setup in every test.

  let forestHub: ForestHub;
  before(async () => {
    const [owner] = await ethers.getSigners();

    const libFactory = await ethers.getContractFactory("Utils");
    const libObj = await libFactory.deploy()

    const forestHubFactory = await ethers.getContractFactory("ForestHub", {
      libraries: {
        Utils: libObj.address,
      },
    });
    forestHub = (await forestHubFactory.deploy()) as ForestHub;
    await forestHub.deployed();
  });

  describe("Deployment", function () {
    it("Test spec default data  ", async function () {
      const hedysarumAlpinum = await forestHub.getSpecById(0);
      // console.log(hedysarumAlpinum);
      expect(hedysarumAlpinum.maxEnergy).to.equal(16930)
      // await expect(await forestHub.getSpeciesUrl(100)).
      // to.be.revertedWith('Insufficient funds');
      const unknow = await forestHub.getSpecById(9);
      expect(unknow.maxEnergy).to.equal(0)

      // console.log(unknow);
    });

    it("Test user init data ", async function () {
      const [owner, testUser1] = await ethers.getSigners();
      await forestHub.connect(testUser1).initializeUserItems();
      const userDefaultItem = await forestHub.connect(testUser1).getUserItems(testUser1.address);
      // console.log(userDefaultItem);
      expect(userDefaultItem[0].name).to.equal("water");
      expect(userDefaultItem[1].name).to.equal("fertilize");
      await forestHub.connect(testUser1).initializeUserItems();
      expect((await forestHub.connect(testUser1).getUserItems(testUser1.address)).length).to.equal(2);
    })

    it("Test create tree", async function () {
      const [owner, testUser1] = await ethers.getSigners();
      await forestHub.connect(testUser1).createTree("first tree", 1,{
        value: ethers.utils.parseEther("0.01") // 0.01 ETH in wei
      });
      await forestHub.connect(testUser1).createTree("2tree", 3,{
        value: ethers.utils.parseEther("0.01") // 0.01 ETH in wei
      });
      await forestHub.connect(testUser1).createTree("3tree", 4,{
        value: ethers.utils.parseEther("0.01") // 0.01 ETH in wei
      });
      await forestHub.connect(testUser1).createTree("4tree", 5,{
        value: ethers.utils.parseEther("0.01") // 0.01 ETH in wei
      });
      const data = await forestHub.connect(testUser1).getUserForest(testUser1.address);
      expect(data["owner"]).to.equal(testUser1.address);
      console.log(data.toString())

      expect( await forestHub.getContractBalance()).to.equal(ethers.utils.parseEther("0.04"))
    })

    it("Test invalid spec id", async function () {
      const [owner, testUser1] = await ethers.getSigners();
      try {
        await forestHub.connect(testUser1).createTree("first tree", 100,{
          value: ethers.utils.parseEther("0.01") // 0.01 ETH in wei
        })
        // 如果 require 没有触发错误，这里会执行失败
        expect.fail("Expected an error but got none");
      } catch (error:any) {
        const result = await forestHub.getContractBalance();
        console.log(result);
        expect( await forestHub.getContractBalance()).to.equal(0)
        // 使用 expect 断言来验证错误信息
        expect(error.message).to.include("invalid specId");
      }
    })

    it("Test withdraw",async function() {
      const [owner, testUser1] = await ethers.getSigners();
      await forestHub.setCFO(testUser1.address);
      await forestHub.connect(testUser1).createTree("first tree", 1,{
        value: ethers.utils.parseEther("0.01") // 0.01 ETH in wei
      });
      await forestHub.connect(testUser1).createTree("2tree", 3,{
        value: ethers.utils.parseEther("0.01") // 0.01 ETH in wei
      });
      await forestHub.connect(testUser1).createTree("3tree", 4,{
        value: ethers.utils.parseEther("0.01") // 0.01 ETH in wei
      });
      await forestHub.connect(testUser1).createTree("4tree", 5,{
        value: ethers.utils.parseEther("0.01") // 0.01 ETH in wei
      });
      expect( await forestHub.getContractBalance()).to.equal(ethers.utils.parseEther("0.04"))

      const oldBalance = await testUser1.getBalance();
  
      await forestHub.connect(testUser1).withDrawBalance();
      expect( await forestHub.getContractBalance()).to.equal(0);
      
      const finalBalance = await testUser1.getBalance();
      console.log(ethers.utils.formatEther(ethers.BigNumber.from(oldBalance).toString()));
      console.log(ethers.utils.formatEther(ethers.BigNumber.from(finalBalance).toString()));
      //因为testUser1要withdrawbalance耗费gas，所以最终的结果比0.04稍微少一点
      // const balanceIncrease = finalBalance.sub(oldBalance);
      // assert(balanceIncrease.eq(ethers.utils.parseEther("0.04")), "Balance not increased by 0.04 ETH");
    })


    it("Test spec " , async function () {
        await forestHub.species;
    })
  });
});

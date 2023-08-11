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

    const forestHubFactory = await ethers.getContractFactory("ForestHub",{
      libraries: {
        Utils: libObj.address,
      },
    });
    forestHub = (await forestHubFactory.deploy(owner.address)) as ForestHub;
    await forestHub.deployed();
  });

  describe("Deployment", function () {
    it("Should check it ", async function () {
      const hedysarumAlpinum = await forestHub.getSpecByName("HedysarumAlpinum");
      console.log(hedysarumAlpinum);
      // await expect(await forestHub.getSpeciesUrl(100)).
          // to.be.revertedWith('Insufficient funds');
      const unknow = await forestHub.getSpecByName("unknow");
      console.log(unknow);

    });
  });
});

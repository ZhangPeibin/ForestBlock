import { assert, expect } from "chai";
import { ethers } from "hardhat";
import { ForestHub } from "../typechain-types";

describe("ForestHub", function () {
  // We define a fixture to reuse the same setup in every test.

  let forestHub: ForestHub;
  before(async () => {
    const [owner] = await ethers.getSigners();
    const yourContractFactory = await ethers.getContractFactory("ForestHub");
    forestHub = (await yourContractFactory.deploy(owner.address)) as ForestHub;
    await forestHub.deployed();
  });

  describe("Deployment", function () {
    it("Should check it ", async function () {
      expect(await forestHub.getSpeciesUrl(0)).to.equal("https://en.wikipedia.org/wiki/Caragana");

      // const url5 = await forestHub.getSpeciesUrl(100);
      // await expect(await forestHub.getSpeciesUrl(100)).
          // to.be.revertedWith('Insufficient funds');
    });
  });
});

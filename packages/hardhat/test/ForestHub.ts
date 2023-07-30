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
    it("Should allow setting a new message", async function () {
      expect(await forestHub.getSpeciesUrl(0)).to.equal("https://en.wikipedia.org/wiki/Caragana");

      // const url5 = await forestHub.getSpeciesUrl(100);
      expect(await forestHub.getSpeciesUrl(100)).to.be.revertedWith("invaild enum params")
      // console.log(url5);
    });
  });
});

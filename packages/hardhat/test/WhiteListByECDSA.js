const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Test WhilteList by ECDSA", function () {
    it("Verify", async function () {
        const [signer, addr1] = await ethers.getSigners();
        console.log("签名者地址为:" + signer.address)

        // 部署合约
        const whitelist = await ethers.getContractFactory("WhitelistByECDSA");
        const whitelistContract = await whitelist.deploy(signer.address);
        await whitelistContract.waitForDeployment();
        console.log("合约部署成功，部署地址为：", whitelistContract.target);

        const maxmint = 2;
        const messageHash = ethers.solidityPackedKeccak256(["address", "uint8"], [addr1.address, maxmint]);
        const messageHashBytes = ethers.getBytes(messageHash);
        const signMessage = await signer.signMessage(messageHashBytes);
        console.log("得到的签名字符串为：", signMessage);

        let verified = await whitelistContract.verfiy(addr1.address, 1, signMessage);
        console.log(verified)
        
    })
})
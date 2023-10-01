const { expect } = require("chai");
const { ethers } = require("hardhat");
 
describe("对进行签名并在链上进行验签", function(){
    it("Verify", async function(){
        // 获取当前用户信息
        const [owner] = await ethers.getSigners();
        console.log("当前地址为：", owner.address);
         
        // 部署合约
        const signature = await ethers.getContractFactory("Signature");
        const signatureContract = await signature.deploy();
        await signatureContract.waitForDeployment();
        console.log("合约部署成功，部署地址为：", signatureContract.target);
 
        // 对消息jiguiquan进行签名
        const message = "jiguiquan";
        const messageHash = ethers.solidityPackedKeccak256(["string"],[message]);
        const messageHashByte = ethers.getBytes(messageHash);
        const sign = await owner.signMessage(messageHashByte);
        console.log("得到的签名字符串为：", sign);
         
        const signVRS = ethers.Signature.from(sign);
        console.log("v:", signVRS.v);
        console.log("r:", signVRS.r);
        console.log("s:", signVRS.s);
 
        //调用合约进行验证
        const verified = await signatureContract.verify(owner.address, message, signVRS.v, signVRS.r, signVRS.s);
        console.log("合约返回的验证结果为：", verified);
        expect(verified).to.equal(true);
    })
})
const {MerkleTree} = require('merkletreejs')
const keccak256 = require('keccak256')

let whitelistAddress = [
    "0x5B38Da6a701c568545dCfcB03FcB875f56beddC4",
    "0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2",
    "0x4B20993Bc481177ec7E8f571ceCaE8A9e22C02db",
]

const leafNodes = whitelistAddress.map(address=> keccak256(address))
const merkleTree = new MerkleTree(leafNodes,keccak256,{sortPairs:true})
const rootHash = merkleTree.getRoot();
console.log(merkleTree.toString())

const claimingAddress = leafNodes[0]
const hexProof = merkleTree.getHexProof(claimingAddress)
console.log(hexProof)

const allProof = merkleTree.getHexProofs();
console.log(allProof)
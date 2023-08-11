// SPDX-License-Identifier: MIT
pragma solidity ^0.8.16;
import "./ForestSpec.sol";

contract ForestBase  is ForestSpec{

    constructor() {
        setCEO(msg.sender);
    
        initDefaultSpecs();
    }
}
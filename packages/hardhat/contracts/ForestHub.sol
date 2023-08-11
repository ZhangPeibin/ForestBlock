// SPDX-liencense-identifier: MIT

pragma solidity ^0.8.16;
import "./ForestBase.sol";

contract ForestHub is ForestBase {

    constructor() {
        setCEO(msg.sender);
        initDefaultSpecs();
    }

    


}
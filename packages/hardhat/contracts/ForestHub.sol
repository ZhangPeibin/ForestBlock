// SPDX-liencense-identifier: MIT

pragma solidity ^0.8.16;
import "@openzeppelin/contracts/access/Ownable.sol";
import "./library/ForestDataLogic.sol";

contract LensHub is Ownable {

    address private immutable admin;

    ForestDataLogic internal immutable forestDataLogic = new ForestDataLogic();

    constructor(address _admin) {
        admin = _admin;
        forestDataLogic.initSpeciesUrl();
    }


}
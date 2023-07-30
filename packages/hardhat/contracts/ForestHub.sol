// SPDX-liencense-identifier: MIT

pragma solidity ^0.8.16;
import "@openzeppelin/contracts/access/Ownable.sol";
import "./library/ForestDataLogic.sol";

contract ForestHub is Ownable {

    address private immutable admin;

    ForestDataLogic internal immutable forestDataLogic = new ForestDataLogic();

    constructor(address _admin) {
        admin = _admin;
        forestDataLogic.initSpeciesUrl();
    }

    function getSpeciesUrl(TreeTypes.Species specie) external view  returns (string memory url)  {
          string memory v = forestDataLogic.getSpeciesUrl(specie);
          return v;
    }


}
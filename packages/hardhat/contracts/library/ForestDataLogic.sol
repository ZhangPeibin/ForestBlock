// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.16;

import { TreeTypes } from "./TreeTypes.sol";

contract ForestDataLogic {
	 mapping(TreeTypes.Species => string) public speciesUrls;

	/**
	 * init species url
	 * TreeTypes.Species.HedysarumAlpinum => https://en.wikipedia.org/wiki/Hedysarum_alpinum
	 */
	function initSpeciesUrl() external {
		speciesUrls[
			TreeTypes.Species.Caragana
		] = "https://en.wikipedia.org/wiki/Caragana";
		speciesUrls[
			TreeTypes.Species.HedysarumAlpinum
		] = "https://en.wikipedia.org/wiki/Hedysarum_alpinum";
		speciesUrls[TreeTypes.Species.Elm] = "https://en.wikipedia.org/wiki/Elm";
		speciesUrls[
			TreeTypes.Species.Platycladus
		] = "https://en.wikipedia.org/wiki/Platycladus";
		speciesUrls[
			TreeTypes.Species.CamphoraOfficinarum
		] = "https://en.wikipedia.org/wiki/Camphora_officinarum";
		speciesUrls[
			TreeTypes.Species.Haloxylon
		] = "https://en.wikipedia.org/wiki/Haloxylon";
		speciesUrls[
			TreeTypes.Species.PiceaAsperata
		] = "https://en.wikipedia.org/wiki/Picea_asperata";
		speciesUrls[
			TreeTypes.Species.AbiesFabri
		] = "https://en.wikipedia.org/wiki/Abies_fabri";
		speciesUrls[
			TreeTypes.Species.QuercusPalustris
		] = "https://en.wikipedia.org/wiki/Quercus_palustris";
	}

	 function getSpeciesUrl(TreeTypes.Species specie) external view  returns (string memory url)  {
          string memory v = speciesUrls[specie];
          return v;
    }



    


    function  getSpeciesUrlS() internal view returns(mapping(TreeTypes.Species => string) storage data ){
        return speciesUrls;
    }


    

}

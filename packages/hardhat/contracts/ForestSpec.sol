// SPDX-License-Identifier: MIT
pragma solidity ^0.8.16;

import "./ForestAccessControl.sol";
import "./library/Utils.sol";

contract ForestSpec is ForestAccessControl {
	/**
	 * @param Caragana 柠条
	 * @param HedysarumAlpinum  高山岩黄芪
	 * @param Elm 榆树
	 * @param Platycladus 侧柏
	 * @param CamphoraOfficinarum 樟树
	 * @param Haloxylon 梭梭树
	 * @param PiceaAsperata 云杉
	 * @param AbiesFabri 冷杉
	 * @param QuercusPalustris 橡树
	 */
	enum Species {
		Caragana, // 16930
		HedysarumAlpinum, // 21310
		Elm, //85760
		Platycladus, // 96000
		CamphoraOfficinarum, //146210
		Haloxylon, // 17900
		PiceaAsperata, // 198000
		AbiesFabri, //  330759
		QuercusPalustris // 540000
	}

	uint32[9] defaultSpecMaxEnery = [
		uint32(16930),
		uint32(21310),
		uint32(85760),
		uint32(96000),
		uint32(146210),
		uint32(17900),
		uint32(198000),
		uint32(330759),
		uint32(540000)
	];

	/**
	 * 树的品种
	 * @name  品种名称
	 * @location 种植地点
	 * @info  品种描述
	 * @award 种植该品种的奖励
	 * @max   最大种植数量
	 */
	struct Spec {
		uint256 id;
		string name;
		string location;
		string info;
		string wikiUrl;
		string[] award;
		uint256 maxEnergy;
	}

	mapping(uint256 => Spec) public specIdToSpec;

	/**
	 * @dev the collection that store all specs
	 */
	Spec[] internal species;

	/**
	 * 初始化默认的物种信息
	 * 总共9个物种
	 */
	function initDefaultSpecs() internal virtual {
		_addSpec(
			"Caragana",
			"Caragana is a genus of about 80 - 100 species of flowering plants in the family Fabaceae",
			"Asia,Eastern Europe",
			"https://en.wikipedia.org/wiki/Caragana",
			defaultSpecMaxEnery[0]
		);
		_addSpec(
			"HedysarumAlpinum",
			"Hedysarum alpinum is a species of flowering plant in the legume family known by the common name alpine sweetvetch",
			" Canada, Northernmost United States,",
			"https://en.wikipedia.org/wiki/Hedysarum_alpinum",
			defaultSpecMaxEnery[1]
		);
		_addSpec(
			"Elm",
			"Elms are deciduous and semi-deciduous trees comprising the genus Ulmus in the family Ulmaceae",
			"North America, Eurasia",
			"https://en.wikipedia.org/wiki/Elm",
			defaultSpecMaxEnery[2]
		);
		_addSpec(
			"Platycladus",
			"Platycladus is a monotypic genus of evergreen coniferous trees in the cypress family Cupressaceae, containing only one species, Platycladus orientalis, also known as Chinese thuja,[4] Oriental arborvitae,[5] Chinese arborvitae, biota or Oriental thuja",
			" East Asia, North Asia",
			"https://en.wikipedia.org/wiki/Platycladus",
			defaultSpecMaxEnery[3]
		);
		_addSpec(
			"CamphoraOfficinarum",
			"Camphora officinarum is a species of evergreen tree that is commonly known under the names camphor tree, camphorwood or camphor laurel",
			"Australia, United States",
			"https://en.wikipedia.org/wiki/Camphora_officinarum",
			defaultSpecMaxEnery[4]
		);
		_addSpec(
			"Haloxylon",
			"Haloxylon is a genus of shrubs or small trees, belonging to the plant family Amaranthaceae",
			"Southwest, Central Asia,",
			"https://en.wikipedia.org/wiki/Haloxylon",
			defaultSpecMaxEnery[5]
		);
		_addSpec(
			"PiceaAsperata",
			"Picea asperata is a spruce native to western China",
			"China",
			"https://en.wikipedia.org/wiki/Picea_asperata",
			defaultSpecMaxEnery[6]
		);
		_addSpec(
			"AbiesFabri",
			"Abies fabri (Faber's fir) is a conifer species in the family Pinaceae",
			"Sichuan in western China",
			"https://en.wikipedia.org/wiki/Abies_fabri",
			defaultSpecMaxEnery[7]
		);
		_addSpec(
			"QuercusPalustris",
			"Quercus palustris, also called pin oak,swamp oak, or Spanish oak,is a tree in the red oak section (Quercus sect. Lobatae) of the genus Quercus",
			"Eastern and central United States",
			"https://en.wikipedia.org/wiki/Quercus_palustris",
			defaultSpecMaxEnery[8]
		);
	}

	/**
	 *
	 * 由CEO添加一个新物种
	 * @param _specName  物种名称
	 * @param _location  物种适应地
	 * @param _info   物种描述
	 * @param _wikiUrl   物种wiki链接
	 * @param _maxEnergy  物种最大能量
	 */
	function addSpec(
		string memory _specName,
		string memory _info,
		string memory _location,
		string memory _wikiUrl,
		uint256 _maxEnergy
	) public onlyCEO {
		require(Utils.isBlankString(_specName), "spec name can't be null");
		require(Utils.isBlankString(_location), "spec location can't be null");
		require(Utils.isBlankString(_info), "spec info can't be null");
		require(Utils.isBlankString(_wikiUrl), "spec wik url  can't be null");
		require(_maxEnergy > 0, "spec maxEnergy can't be smaller than 0");

		_addSpec(_specName, _info, _location, _wikiUrl, _maxEnergy);
	}

	function _addSpec(
		string memory _specName,
		string memory _info,
		string memory _location,
		string memory _wikiUrl,
		uint256 _maxEnergy
	) internal {
		Spec memory spec;
		spec.id = species.length;
		spec.name = _specName;
		spec.location = _location;
		spec.info = _info;
		spec.wikiUrl = _wikiUrl;
		spec.maxEnergy = _maxEnergy;
		specIdToSpec[spec.id] = spec;
		species.push(spec);
	}

	/**
	 * get all species 
	 */
	function getAllSpecies() external view returns(Spec[] memory _species) {
		_species = species;
	}

	/**
	 * Find the corresponding spec according to the id
	 * @param _specId the id of spec
	 */
	function getSpecById(
		uint256 _specId
	) public view returns (Spec memory _spec) {
		_spec = specIdToSpec[_specId];
	}
}

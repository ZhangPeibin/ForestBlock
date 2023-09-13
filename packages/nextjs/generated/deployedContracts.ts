const contracts = {
  31337: [
    {
      chainId: "31337",
      name: "localhost",
      contracts: {
        ForestHub: {
          address: "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512",
          abi: [
            {
              inputs: [],
              stateMutability: "nonpayable",
              type: "constructor",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "address",
                  name: "preAdmin",
                  type: "address",
                },
                {
                  indexed: true,
                  internalType: "address",
                  name: "newAdmin",
                  type: "address",
                },
              ],
              name: "AdminshipTransferred",
              type: "event",
            },
            {
              inputs: [],
              name: "_admin",
              outputs: [
                {
                  internalType: "address",
                  name: "",
                  type: "address",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "_ceo",
              outputs: [
                {
                  internalType: "address",
                  name: "",
                  type: "address",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "_cfo",
              outputs: [
                {
                  internalType: "address payable",
                  name: "",
                  type: "address",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "string",
                  name: "_name",
                  type: "string",
                },
                {
                  internalType: "enum ForestItem.EffectType",
                  name: "_effectType",
                  type: "uint8",
                },
                {
                  internalType: "uint256",
                  name: "_price",
                  type: "uint256",
                },
              ],
              name: "addNewItemToForest",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "string",
                  name: "_specName",
                  type: "string",
                },
                {
                  internalType: "string",
                  name: "_info",
                  type: "string",
                },
                {
                  internalType: "string",
                  name: "_location",
                  type: "string",
                },
                {
                  internalType: "string",
                  name: "_wikiUrl",
                  type: "string",
                },
                {
                  internalType: "uint256",
                  name: "_maxEnergy",
                  type: "uint256",
                },
              ],
              name: "addSpec",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "newAdmin",
                  type: "address",
                },
              ],
              name: "changeOwnerShip",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "string",
                  name: "_nickName",
                  type: "string",
                },
                {
                  internalType: "uint256",
                  name: "_specId",
                  type: "uint256",
                },
              ],
              name: "createTree",
              outputs: [],
              stateMutability: "payable",
              type: "function",
            },
            {
              inputs: [],
              name: "getAllItems",
              outputs: [
                {
                  components: [
                    {
                      internalType: "uint256",
                      name: "id",
                      type: "uint256",
                    },
                    {
                      internalType: "string",
                      name: "name",
                      type: "string",
                    },
                    {
                      internalType: "enum ForestItem.EffectType",
                      name: "effect",
                      type: "uint8",
                    },
                    {
                      internalType: "uint256",
                      name: "price",
                      type: "uint256",
                    },
                    {
                      internalType: "bool",
                      name: "hasAddToForest",
                      type: "bool",
                    },
                  ],
                  internalType: "struct ForestItem.Item[]",
                  name: "_items",
                  type: "tuple[]",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "getAllSpecs",
              outputs: [
                {
                  components: [
                    {
                      internalType: "uint256",
                      name: "id",
                      type: "uint256",
                    },
                    {
                      internalType: "string",
                      name: "name",
                      type: "string",
                    },
                    {
                      internalType: "string",
                      name: "location",
                      type: "string",
                    },
                    {
                      internalType: "string",
                      name: "info",
                      type: "string",
                    },
                    {
                      internalType: "string",
                      name: "wikiUrl",
                      type: "string",
                    },
                    {
                      internalType: "uint256",
                      name: "maxEnergy",
                      type: "uint256",
                    },
                    {
                      internalType: "uint256",
                      name: "productionInterval",
                      type: "uint256",
                    },
                  ],
                  internalType: "struct ForestSpec.Spec[]",
                  name: "_specs",
                  type: "tuple[]",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "getContractBalance",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "_owner",
                  type: "address",
                },
              ],
              name: "getForestWithOwner",
              outputs: [
                {
                  components: [
                    {
                      internalType: "uint256",
                      name: "id",
                      type: "uint256",
                    },
                    {
                      internalType: "uint256",
                      name: "birthTime",
                      type: "uint256",
                    },
                    {
                      internalType: "uint256",
                      name: "receiptPoints",
                      type: "uint256",
                    },
                    {
                      components: [
                        {
                          internalType: "uint256",
                          name: "treeId",
                          type: "uint256",
                        },
                        {
                          internalType: "uint256",
                          name: "forestId",
                          type: "uint256",
                        },
                        {
                          internalType: "string",
                          name: "nickName",
                          type: "string",
                        },
                        {
                          internalType: "uint256",
                          name: "energy",
                          type: "uint256",
                        },
                        {
                          components: [
                            {
                              internalType: "uint256",
                              name: "id",
                              type: "uint256",
                            },
                            {
                              internalType: "string",
                              name: "name",
                              type: "string",
                            },
                            {
                              internalType: "string",
                              name: "location",
                              type: "string",
                            },
                            {
                              internalType: "string",
                              name: "info",
                              type: "string",
                            },
                            {
                              internalType: "string",
                              name: "wikiUrl",
                              type: "string",
                            },
                            {
                              internalType: "uint256",
                              name: "maxEnergy",
                              type: "uint256",
                            },
                            {
                              internalType: "uint256",
                              name: "productionInterval",
                              type: "uint256",
                            },
                          ],
                          internalType: "struct ForestSpec.Spec",
                          name: "spec",
                          type: "tuple",
                        },
                        {
                          internalType: "uint256",
                          name: "birthTime",
                          type: "uint256",
                        },
                        {
                          internalType: "uint64",
                          name: "wateringCoolDownEndTime",
                          type: "uint64",
                        },
                        {
                          internalType: "uint64",
                          name: "fertilizeCoolDownEndTime",
                          type: "uint64",
                        },
                        {
                          internalType: "uint256",
                          name: "lastProductionTime",
                          type: "uint256",
                        },
                        {
                          internalType: "uint256",
                          name: "receiptPoints",
                          type: "uint256",
                        },
                      ],
                      internalType: "struct ForestBase.Tree[]",
                      name: "trees",
                      type: "tuple[]",
                    },
                    {
                      internalType: "address",
                      name: "owner",
                      type: "address",
                    },
                  ],
                  internalType: "struct ForestBase.Forest",
                  name: "_forest",
                  type: "tuple",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "_owner",
                  type: "address",
                },
              ],
              name: "getItemsWithOwner",
              outputs: [
                {
                  components: [
                    {
                      internalType: "uint256",
                      name: "id",
                      type: "uint256",
                    },
                    {
                      internalType: "string",
                      name: "name",
                      type: "string",
                    },
                    {
                      internalType: "enum ForestItem.EffectType",
                      name: "effect",
                      type: "uint8",
                    },
                    {
                      internalType: "uint256",
                      name: "price",
                      type: "uint256",
                    },
                    {
                      internalType: "bool",
                      name: "hasAddToForest",
                      type: "bool",
                    },
                  ],
                  internalType: "struct ForestItem.Item[]",
                  name: "_items",
                  type: "tuple[]",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "initializeUserItems",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [],
              name: "pause",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "_treeId",
                  type: "uint256",
                },
              ],
              name: "producePoint",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [],
              name: "resume",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "newCeo",
                  type: "address",
                },
              ],
              name: "setCEO",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address payable",
                  name: "newCfo",
                  type: "address",
                },
              ],
              name: "setCFO",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [],
              name: "withDrawBalance",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
          ],
        },
        Utils: {
          address: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
          abi: [
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "min",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "max",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "seed",
                  type: "uint256",
                },
              ],
              name: "getRandomNumber",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "string",
                  name: "str",
                  type: "string",
                },
              ],
              name: "isBlankString",
              outputs: [
                {
                  internalType: "bool",
                  name: "",
                  type: "bool",
                },
              ],
              stateMutability: "pure",
              type: "function",
            },
          ],
        },
      },
    },
  ],
} as const;

export default contracts;

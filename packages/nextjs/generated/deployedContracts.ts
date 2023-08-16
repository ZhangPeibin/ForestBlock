const contracts = {
  31337: [
    {
      chainId: "31337",
      name: "localhost",
      contracts: {
        ForestHub: {
          address: "0x3Aa5ebB10DC797CAC828524e59A333d0A371443c",
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
              inputs: [],
              name: "_initForestItemForUserFirstIn",
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
                  name: "_name",
                  type: "string",
                },
                {
                  internalType: "uint256",
                  name: "_effect",
                  type: "uint256",
                },
                {
                  internalType: "bool",
                  name: "canTransfer",
                  type: "bool",
                },
              ],
              name: "createForestItem",
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
                      internalType: "uint256",
                      name: "effect",
                      type: "uint256",
                    },
                    {
                      internalType: "bool",
                      name: "canTransfer",
                      type: "bool",
                    },
                  ],
                  internalType: "struct ForestItem.Item",
                  name: "item",
                  type: "tuple",
                },
              ],
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
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "_specId",
                  type: "uint256",
                },
              ],
              name: "getSpecById",
              outputs: [
                {
                  internalType: "uint256",
                  name: "_id",
                  type: "uint256",
                },
                {
                  internalType: "string",
                  name: "_name",
                  type: "string",
                },
                {
                  internalType: "string",
                  name: "_location",
                  type: "string",
                },
                {
                  internalType: "string",
                  name: "_info",
                  type: "string",
                },
                {
                  internalType: "string",
                  name: "_wikirurl",
                  type: "string",
                },
                {
                  internalType: "uint256",
                  name: "_maxenery",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "_specId",
                  type: "uint256",
                },
              ],
              name: "getSpecStructById",
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
                      internalType: "string[]",
                      name: "award",
                      type: "string[]",
                    },
                    {
                      internalType: "uint256",
                      name: "maxEnergy",
                      type: "uint256",
                    },
                  ],
                  internalType: "struct ForestSpec.Spec",
                  name: "_spec",
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
                  name: "owner",
                  type: "address",
                },
              ],
              name: "getTree",
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
                              internalType: "string[]",
                              name: "award",
                              type: "string[]",
                            },
                            {
                              internalType: "uint256",
                              name: "maxEnergy",
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
              inputs: [],
              name: "getUserForestItems",
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
                      internalType: "uint256",
                      name: "effect",
                      type: "uint256",
                    },
                    {
                      internalType: "bool",
                      name: "canTransfer",
                      type: "bool",
                    },
                  ],
                  internalType: "struct ForestItem.Item[]",
                  name: "_forestItem",
                  type: "tuple[]",
                },
              ],
              stateMutability: "view",
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
              inputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              name: "specIdToSpec",
              outputs: [
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
              ],
              stateMutability: "view",
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
          address: "0x9A9f2CCfdE556A7E9Ff0848998Aa4a0CFD8863AE",
          abi: [
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

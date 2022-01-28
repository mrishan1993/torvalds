require('dotenv').config();
const API_URL = process.env.API_URL;
const METAMASK_PUBLIC_KEY = process.env.METAMASK_PUBLIC_KEY;
const METAMASK_PRIVATE_KEY = process.env.METAMASK_PRIVATE_KEY;
const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const Rarepress = require ("rarepress")
// const alchemyWeb3 = createAlchemyWeb3(API_URL);
const {generateImages} = require("./generate-image")
const contract = require("../artifacts/contracts/createNFT.sol/NFTCollection.json"); 
const contractAddress = "0x93Dd61871e1467f63919774fB998d456F705A391";
// const nftContract = new alchemyWeb3.eth.Contract(contract.abi, contractAddress);

// For minting through rarible sdk
// Imports
const Web3 = require("web3")
const createRaribleSdk = require("@rarible/sdk")
const EthereumWallet = require("@rarible/sdk-wallet")
const toContractAddress = require("@rarible/types")
console.log("Contract ", toContractAddress.toContractAddress)

// Init Ethereum
// const { ethereum } = window;
// const web3 = new Web3(ethereum);
// const ethWallet = new EthereumWallet(ethereum);
// const raribleSdk = createRaribleSdk(ethWallet, "dev");


// For Pinata 
const axios = require("axios")
const fs = require("fs")
const FormData = require("form-data")
const recursive = require('recursive-fs');
const basePathConverter = require('base-path-converter');
const PINATA_API_URL = "https://api.pinata.cloud"
const PINATA_KEY = "2f5192b87012be6339c2"
const PINATA_SECRET = "eb36c4ee4ff21d156547cbbc7192c0a1d276fba4ef0c08f8348fa26aa8a88a7b"

var IPFSHashAddress = []
async function getIPFS () {
  const url = PINATA_API_URL + "/pinning/pinFileToIPFS"
  const source = "../raw"
  filenames = fs.readdirSync(source);
  for (let i=0;i<filenames.length;i++) {
    filenames[i] = source + "/" + filenames[i]
  }
  console.log("Filenames ", filenames)
  let axiosList = []
  filenames.forEach((file) => {
          //for each file stream, we need to include the correct relative file path
          let data = new FormData();
          let metadata;
          let name;
          data.append(`file`, fs.createReadStream(file), {
              filepath: basePathConverter(source, file)
          });
          metadata = JSON.stringify({
            name: file
          });
          name = file
          data.append('pinataMetadata', metadata);
          
          const axiosRequest = axios
          .post(url, data, {
              maxBodyLength: 'Infinity', //this is needed to prevent axios from erroring out with large directories
              headers: {
                  'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
                  pinata_api_key: PINATA_KEY,
                  pinata_secret_api_key: PINATA_SECRET
              }
          })
          .then(function (response) {
              //handle response here
              console.log("success ", response.data)
              if (response.data) {
                if (!response.data.isDuplicate) {
                  let ipfsObject = {
                    address: response.data.IpfsHash,
                    pinSize: response.data.PinSize,
                    timestamp: response.data.timestamp,
                    isDuplicate: response.data.isDuplicate,
                    name: name,
                    metadata: metadata
                  }
                  IPFSHashAddress.push(response.data.IpfsHash)
                }
              }
          })
          .catch(function (error) {
              //handle error here
              console.log("error ", error)
          });
          axiosList.push(axiosRequest)
      })
  Promise.all(axiosList).then( function () {
    console.log("IPFS ", IPFSHashAddress)
  })
  
}


// Examplary values of URI and supply

// add IPFS hashes here... 
const uri = "ipfs:/QmTxXkPDF8s1pNuEB7FT4CJNG177JLmfE38WJYsCXdAodn"
const supply = 1



// 1. Create PrepareMintRequest
// Collection ids are the address of Rarible Smart Contracts instance
// You can find them here:
// https://docs.rarible.org/ethereum/contract-addresses/


async function mintNFT () {
  // const currentWallet = EthereumWallet(ethWallet);
  // const makerAccount = await currentWallet.ethereum.getFrom();
  const mintRequest = {
    // Using Rarible API, tokenId would also be needed, but SDK takes care for that
    collectionId: toContractAddress.toContractAddress(
      "ETHEREUM:0xB0EA149212Eb707a1E5FC1D2d3fD318a8d94cf05"
    ),
  };
  const mintResponse = await sdk.nft.mint(mintRequest)
  console.log("minting")
  const creators = [
    {
      account: `ETHEREUM:${"0x6B9176E2dffD71a130A7303581C166070646d1E5"}`,
      value: 10000,
    },
  ];
  const royalties = [];
  const submitResponse = await mintResponse.submit({
    uri,
    supply,
    lazyMint: false, // Lazy Mint is not always available, you can check it in mint response created in step 2
    creators,
    royalties,
  });

}

    // get the nonce - nonce is needed for security reasons. It keeps track of the number of
    // transactions sent from our address and prevents replay attacks.
  // const nonce = await alchemyWeb3.eth.getTransactionCount(METAMASK_PUBLIC_KEY, 'latest');
  // const tx = {
  //   from: METAMASK_PUBLIC_KEY, // our MetaMask public key
  //   to: contractAddress, // the smart contract address we want to interact with
  //   nonce: nonce, // nonce with the no of transactions from our account
  //   gas: 1000000, // fee estimate to complete the transaction
  //   data: nftContract.methods
  //     .createNFT("0x0d28235B6191a66A3410cc1e3CeBfE53602D7865", tokenURI)
  //     .encodeABI(), // call the createNFT function from our OsunRiverNFT.sol file and pass the account that should receive the minted NFT.
  // };
  // const signPromise = alchemyWeb3.eth.accounts.signTransaction(
  //   tx,
  //   METAMASK_PRIVATE_KEY
  // );
  // signPromise
  //   .then((signedTx) => {
  //     alchemyWeb3.eth.sendSignedTransaction(
  //       signedTx.rawTransaction,
  //       function (err, hash) {
  //         if (!err) {
  //           console.log(
  //             "The hash of our transaction is: ",
  //             hash,
  //             "\nCheck Alchemy's Mempool to view the status of our transaction!"
  //           );
  //         } else {
  //           console.log(
  //             "Something went wrong when submitting our transaction:",
  //             err
  //           );
  //         }
  //       }
  //     );
  //   })
  //   .catch((err) => {
  //     console.log(" Promise failed:", err);
  //   });
// }

// mintNFT("https://ipfs.io/ipfs/QmcVfAAc5txTz3YPN83W2ghQG79UChPehBPYqwBptcXvS6") // pass the CID to the JSON file uploaded to Pinata

// getIPFS()
mintNFT()


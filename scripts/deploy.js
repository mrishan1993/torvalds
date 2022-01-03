

async function main () {
    const [deployer] = await ethers.getSigners();
    console.log("Deploying contracts with the account ", deployer.address)
    console.log("Balance : ", await deployer.getBalance().toString())
    const NFT = await ethers.getContractFactory("NFTCollection")
    const NFTDeployObject= await NFT.deploy()
    console.log("Deployed at ", NFTDeployObject.address)
}

main ().then( () => {
    process.exit(0)
}).catch(error => {
    console.error("Error ", error)
    process.exit(1)
})
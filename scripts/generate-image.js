const {createAvatar} = require("@dicebear/avatars");
const {style} = require("@dicebear/open-peeps");
const traits = require("./traits")
const jimp = require("jimp")
const duplicacy_checker = require("../middleware/duplicacy_checker")

// Name of the collection
const NAME = "Bingy Beavers"

// Generate images here !! 
const generateImages = async () => {
    var index = 0;
    const supply = 100
    var nfts = []
    var allTraitsArray = []
    while (index <= supply) {
        try {
            console.log("index ", index)
            await generator (index, allTraitsArray, (traits_array, nftAddress, success) => {
                if (success) {
                    index++
                    nfts.push({
                        name: NAME + " " + (index + 1),
                        nftAddress: nftAddress,
                        traits: traits_array
                    })
                    allTraitsArray.push(traits_array)
                } else {
                    // pass without incrementing the index.
                    // nft created is a duplicate
                }
                
            })
        } catch (e) {
            console.log("Exception ", e)
            index = supply + 1
        }
    }
    return nfts
}


// generator function 
const generator = async (index, allTraitsArray, onComplete) => {
    const path = "/Users/ishu/desktop/projects/torvalds/"
    
    var traits_array = []

    // generate the background
    const background = traits.getBackground()
    const backgroundJimp = await jimp.read(path + "traits/Background/Background_"+background+".png")
    traits_array.push({
        trait_type: "background",
        value: background
    })
    var composedImage = backgroundJimp
    

    // generate the body
    const bodyImage = traits.getBodyAndHead()
    const bodyJimp = await jimp.read(path + "traits/Body/Body_"+bodyImage+".png")
    traits_array.push ({
        trait_type: "body",
        value: bodyImage
    })
    composedImage.blit(bodyJimp, 0, 0)

    const headImage = traits.getBodyAndHead()
    const headJimp = await jimp.read(path + "traits/Head/Head_"+headImage+".png")
    traits_array.push ({
        trait_type: "head",
        value: headImage
    })
    composedImage.blit(headJimp, 0, 0)

    // generate the outfit
    const outfitImage = traits.getOutfit()
    const outfitJimp = await jimp.read(path + "traits/Outfit/Outfit_"+outfitImage+".png")
    traits_array.push({
        trait_type: "outfit",
        value: outfitImage
    })
    composedImage.blit(outfitJimp, 0, 0)

    // get the nose 
    const noseImage = traits.getNose()
    const noseJimp = await jimp.read(path + "traits/Nose/Nose_"+noseImage+".png")
    traits_array.push ({
        trait_type: "nose",
        value: noseImage
    })
    composedImage.blit(noseJimp, 0, 0)

    // get the mouth 
    const mouthImage = traits.getMouth()
    const mouthJimp = await jimp.read(path + "traits/Mouth/Mouth_"+mouthImage+".png")
    traits_array.push({
        trait_type: "mouth",
        value: mouthImage
    })
    composedImage.blit(mouthJimp, 0, 0)

    // get the eyes 
    const eyesImage = traits.getEyes()
    const eyesJimp = await jimp.read(path + "traits/Eyes/Eyes_"+eyesImage+".png")
    traits_array.push( {
        trait_type: "eyes",
        value: eyesImage
    })
    composedImage.blit(eyesJimp, 0, 0)

    // get the sunglasses 
    const sunglassesImage = traits.getSunglasses()
    const sunglassesJimp = await jimp.read(path + "traits/Sunglasses/Sunglasses_"+sunglassesImage+".png")
    traits_array.push({
        trait_type: "sunglsses",
        value: sunglassesImage
    })
    composedImage.blit(sunglassesJimp, 0, 0)

    // get the headgear
    const headwearImage = traits.getHeadwear()
    const headwearJimp = await jimp.read(path + "traits/Headwear/Headwear_"+headwearImage+".png")
    traits_array.push({
        trait_type: "headwear",
        value: headwearImage
    })
    composedImage.blit(headwearJimp, 0, 0)


    console.log("all traits array ", allTraitsArray) 
    console.log("traits_array ", traits_array) 
    if (!duplicacy_checker.checkDuplicacy(allTraitsArray, traits_array)) {
        var nftAddress = "../output/images/" + index + ".png"
        await composedImage.write(nftAddress)
        await sleep(20)
        onComplete(traits_array, nftAddress, true)
    } else {
        // send the false in the success parameter
        onComplete(traits_array, nftAddress, false)
    }
    
}

// sleep for 20 secs after every image creation to make sure the image is saved 
const sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms))
}

generateImages()

module.exports = {
    generateImages
}
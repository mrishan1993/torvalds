const {createAvatar} = require("@dicebear/avatars");
const {style} = require("@dicebear/open-peeps");
const potrace = require("potrace")

// Generate images here !! 
const generateImages = () => {
    var svgs = []
    var trace = new potrace.Potrace()
    // 1000 is the configuration setting. 
    // Needs to be moved to configuration file or the user input // 
    for (let i=0;i<1;i++) {
        trace.loadImage("../raw/bored_ape.png", (err) => {
            if (err){
                console.log("Error in converting jpg to svg " + i, err)

            } else {
                let svg = trace.getSVG()
                svgs.push(svg)
            }
        })
    }
    console.log("returning svgs ", svgs)
    return svgs
}

module.exports = {
    generateImages
}
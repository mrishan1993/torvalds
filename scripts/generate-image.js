const {createAvatar} = require("@dicebear/avatars");
const {style} = require("@dicebear/open-peeps");

// Generate images here !! 
const generateImages = () => {
    var svgs = []
    // 1000 is the configuration setting. 
    // Needs to be moved to configuration file or the user input // 
    for (let i=0;i<1000;i++) {
        let svg = createAvatar(style, {seed: i.toString()});
        svgs.push(svg)
    }
    return svgs
}






const COMMON_MAX_RARITY = 50 // starting from 1
const UNCOMMON_MAX_RARITY = 75
const RARE_MAX_RARITY = 95
const LEGENDARY_MAX_RARITY = 100

const randomElement = (list) => {
    const random = Math.floor(Math.random() * list.length)
    return list[random]
}


// get the background

const getBackground = () => {
    const random = Math.floor(Math.random() * LEGENDARY_MAX_RARITY)

    if (random < COMMON_MAX_RARITY) { 
        return randomElement([
            "Lava", "Aqua"
        ])
    } else if (random < UNCOMMON_MAX_RARITY) {
        return randomElement ([
            "Mountain", "Aqua"
        ])
    } else if (random < RARE_MAX_RARITY) {
        return randomElement([
            "Psycho", "Snow"
        ])
    } else {
        return randomElement([
            "Galaxy"
        ])
    }
}


// get the body and head 

const getBodyAndHead = () => {
    const random = Math.floor(Math.random() * LEGENDARY_MAX_RARITY)
    if (random < COMMON_MAX_RARITY) {
        return randomElement([
            "Normal"
        ])
    } else if (random < UNCOMMON_MAX_RARITY) {
        return randomElement([
            "Normal"
        ])
    } else if (random < RARE_MAX_RARITY) {
        return randomElement([
            "Alien", "Zombie"
        ])
    } else {
        return randomElement ([
            "Gold"
        ])
    }
}

// get the outfit for the face

const getOutfit = () => {
    const random = Math.floor(Math.random() * LEGENDARY_MAX_RARITY)
    if (random < COMMON_MAX_RARITY) {
        return randomElement([
            'Gap', 'Hoodie', 'Tanktop', 'Lumberjack'
        ])
    } else if (random < UNCOMMON_MAX_RARITY) {
        return randomElement([
            'Shirt with holes'
        ])
    } else if (random < RARE_MAX_RARITY) {
        return randomElement([
            'Blue Jacket', 'Red Jacket'
        ])
    } else {
        return randomElement ([
            'Pink Hoodie'
        ])
    }
}

// get the nose 

const getNose = () => {
    const random = Math.floor(Math.random() * LEGENDARY_MAX_RARITY) 
    if(random < COMMON_MAX_RARITY) {
        return randomElement([
             'Common'
        ]);
    } else if(random < UNCOMMON_MAX_RARITY) {
        return randomElement([
            'Common'
        ]);
    } else if(random < RARE_MAX_RARITY) {
        return randomElement([
            'Common'
        ]);
    } else if(random < LEGENDARY_MAX_RARITY) {
        return randomElement([
            'Common'
        ]);
    }
}


// get the mouth 
const getMouth = () => {
    const random = Math.floor (Math.random () * LEGENDARY_MAX_RARITY)
    if (random < COMMON_MAX_RARITY) {
        return randomElement([
             'Happy', 'Surprise', 'Serious'
        ]);
    } else if (random < UNCOMMON_MAX_RARITY) {
        return randomElement([
            'Full Beard','Moustache',
        ]);
    } else if (random < RARE_MAX_RARITY) {
        return randomElement([
             'Lips', 'Twisted'
        ]);
    } else if (random < LEGENDARY_MAX_RARITY) {
        return randomElement([
            'Lock Beard', 
        ]);
    }
}

// get the eyes 
const getEyes = () => {
    const random = Math.floor(Math.random () * LEGENDARY_MAX_RARITY) 
    if(random < COMMON_MAX_RARITY) {
        return randomElement([
             'Chill', 'Angry'
        ]);
    } else if (random < UNCOMMON_MAX_RARITY) {
        return randomElement([
            'Surprise'
        ]);
    } else if (random < RARE_MAX_RARITY) {
        return randomElement([
             'Shame'
        ]);
    } else if (random < LEGENDARY_MAX_RARITY) {
        return randomElement([
            'Focus'
        ]);
    }
}

// get the sunglasses 
const getSunglasses = () => {
    const random = Math.floor(Math.random () * LEGENDARY_MAX_RARITY)
    if (random < COMMON_MAX_RARITY) {
        return randomElement([
             'Empty'
        ]);
    } else if (random < UNCOMMON_MAX_RARITY) {
        return randomElement([
            'Empty', 'Pirate Patch'
        ]);
    } else if (random < RARE_MAX_RARITY) {
        return randomElement([
             'Cateyes', 'Aviator'
        ]);
    } else if (random < LEGENDARY_MAX_RARITY) {
        return randomElement([
            'Thug Sunglasses'
        ]);
    }
}

// get the headwear 
const getHeadwear = () => {
    const random = Math.floor(Math.random () * LEGENDARY_MAX_RARITY) 
    if (random < COMMON_MAX_RARITY) {
        return randomElement([
             'Empty'
        ]);
    } else if (random < UNCOMMON_MAX_RARITY) {
        return randomElement([
            'Empty', 'Blue Bandana', 'Red Bandana', 
            'Sailor', 'Purple Hat', 'Wizard', 'Cowboy'
        ]);
    } else if (random < RARE_MAX_RARITY) {
        return randomElement([
             'Purple Punk', 'Pink Punk', 'Bowler', 'Backwards Camo'
        ]);
    } else if (random < LEGENDARY_MAX_RARITY) {
        return randomElement([
            'Leaves', 'Rasta'
        ]);
    }
}

module.exports = {
    getBackground : getBackground,
    getBodyAndHead:  getBodyAndHead,
    getOutfit: getOutfit,
    getNose: getNose,
    getMouth: getMouth,
    getEyes: getEyes,
    getSunglasses: getSunglasses,
    getHeadwear: getHeadwear
}
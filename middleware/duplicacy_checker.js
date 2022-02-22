

// load lodash library 
const _ = require ("lodash")

// Check if the NFTs are duplicate or not 
// Input parameters  - 1. Initial array 2. New item 

const checkDuplicacy = function (initialArray, item) {
    let current;
    // return true if the initial array is empty 
    if (initialArray.length ==0 ) {
        return false
    }
    for (let i = 0;i<initialArray.length;i++) {
        if (item.length == initialArray[i].length) {
            current = initialArray[i]
            for (let j = 0;j<item.length && _.isEqual(item[j], current[j]);j++) {
                if (item.length == j + 1) {
                    return true
                }
            }
        }
    }

    // return false for every other case.. 
    return false 
}


module.exports = {
    checkDuplicacy: checkDuplicacy
}
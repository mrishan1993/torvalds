// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// implements the ERC721 standard
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
// keeps track of the number of tokens issued
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract NFTCollection is ERC721, Ownable { 
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIDs;
    mapping (uint256 => string) private _tokenURIs;
    // add the name of the collection of the NFT
    constructor () public ERC721 ("Torvalds", "Torvalds") {}


    function _setTokenURI(uint256 tokenId, string memory _tokenURI) internal virtual {
        require(_exists(tokenId), "ERC721Metadata: URI set of nonexistent token");
        _tokenURIs[tokenId] = _tokenURI;
    }
    function createNFT (address receiver, string memory tokenURI) public onlyOwner returns (uint256) {
        _tokenIDs.increment();
        uint256 newItemID = _tokenIDs.current();
        _mint(receiver, newItemID);
        _setTokenURI(newItemID, tokenURI);
        return newItemID;
    }
}
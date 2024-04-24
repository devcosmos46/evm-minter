pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";
import "hardhat/console.sol";


contract FacultyNFT is ERC721Enumerable, Ownable {
    using ECDSA for bytes32;

    address public publicKey;

    event HashGenerated(bytes32 indexed hash);
    event EncodeGenerated(bytes enc);

    constructor() 
        ERC721("kasu nft", "KASU_NFT")
        Ownable(msg.sender)
    {

    }

    function updateKey(address newKey) external onlyOwner {
        publicKey = newKey;
    }

    function safeMint(bytes32 _messageHash, bytes memory _signature) public payable  {

        require(_verify(_messageHash, _signature), "Invalid signature");

        uint256 tokenId = totalSupply() + 1;
        _safeMint(msg.sender, tokenId);
    }

    function _verify(bytes32 _messageHash, bytes memory _signature) internal view returns (bool) {
        address signer = _messageHash.recover(_signature);
        return signer == publicKey;
    }
}

// SPDX-License-Identifier: MIT


import './DefaultOperatorFiltererr.sol';
import '@openzeppelin/contracts/security/ReentrancyGuard.sol';
import '@openzeppelin/contracts/access/Ownable.sol';
import '@openzeppelin/contracts/utils/Strings.sol';
import './ERC721A.sol';



pragma solidity >=0.8.17 <0.9.0;

contract HouseofAnasah is ERC721A,Ownable, ReentrancyGuard, DefaultOperatorFilterer {

  using Strings for uint256;

// ================== Variables Start =======================

  
  string internal uri;
  string public uriSuffix = ".json";  
  string public hiddenMetadataUri ;  
  uint256 public price ; 
  uint256 public maxSupply;  
  uint256 public maxMintAmountPerTx;
  uint256 public maxLimitPerWallet;
  bool public publicSale=false;

 
  // mapping to keep track
  mapping(address => uint256) public userMintCount;

  // total mint trackers
  uint256 public publicMinted;

  //unlimited mints
  mapping(address=>bool) allowedUnlimitedMint;

  //royalties
  address public royaltyReceiver;
  uint96 public royaltyFeesInBeeps=1000;
  bytes4 private constant _INTERFACE_ID_ERC2981 = 0x2a55205a;
  
    uint public extra_nft_count;



      mapping(address => bool) public whitelist;
     
      bool public set_wl_sale = false;
// ================== Variables End ======================= 
   




// ================== Constructor Start =======================

  
  constructor(
    uint _maxSupply,
    uint _maxMintAmountPerTx,
    uint _maxLimitPerWallet,
    uint _price,
    string memory _hiddenMetadataUri,
    string memory _revealuri,
    address _royalityAddress,
    uint96 _royaltyFeesInBeeps
  ) ERC721A("HouseofAnasah", "Anasah")  {
    hiddenMetadataUri=_hiddenMetadataUri;
    price=_price;
    maxMintAmountPerTx=_maxMintAmountPerTx;
    maxLimitPerWallet=_maxLimitPerWallet;
    maxSupply=_maxSupply;
    seturi(_revealuri);
    royaltyFeesInBeeps=_royaltyFeesInBeeps;
    royaltyReceiver=_royalityAddress;
    
  }

// ================== Constructor End =======================


// ================== Mint Functions Start =======================

  function Public_Sale(uint256 _mintAmount) public payable {
    
    // Normal requirements 
    require(publicSale==true, 'The Public Sale is Paused!');
    require(_mintAmount > 0 && _mintAmount <= maxMintAmountPerTx, 'Invalid Mint Amount!');
    require(totalSupply() + _mintAmount <= maxSupply, 'Max supply exceeded!');
   
    require(msg.value >= price * _mintAmount, 'Insufficient Funds!');
     
    // Mint
    if(allowedUnlimitedMint[msg.sender]==true){
            _safeMint(_msgSender(), _mintAmount);
    }

    else{
       require(userMintCount[msg.sender] + _mintAmount<= maxLimitPerWallet+extra_nft_count, 'Max Mint per Wallet Exceeded!');
    
        _safeMint(_msgSender(), _mintAmount);
    }
    // Mapping update 
    userMintCount[msg.sender] += _mintAmount;  
    publicMinted += _mintAmount;   
  }  

  function OwnerMint(uint256 _mintAmount, address _receiver) public onlyOwner {
    require(totalSupply() + _mintAmount <= maxSupply, 'Max supply exceeded!');
    _safeMint(_receiver, _mintAmount);
  }

  
  function WL_Mint(uint256 _mintAmount) public payable {
    
    // Normal requirements 
    require(set_wl_sale==true, 'Free Mint Phase 1 is Paused.');
    require(_mintAmount > 0 && _mintAmount <= maxMintAmountPerTx, 'Invalid Mint Amount!');
    require(totalSupply() + _mintAmount <= maxSupply, 'Max Supply Exceeded!');
    require(whitelist[msg.sender], "You are not Whitelisted For Phase 1."); 
    require(msg.value >= price * _mintAmount, 'Insufficient Funds!');
     
    // Mint
    if(allowedUnlimitedMint[msg.sender]==true){       
            _safeMint(_msgSender(), _mintAmount);     
    }
    else{
       require(userMintCount[msg.sender] + _mintAmount <= maxLimitPerWallet, 'Max Mint per Wallet Exceeded!');
         
        _safeMint(_msgSender(), _mintAmount);
    }
    // Mapping update 
    userMintCount[msg.sender] += _mintAmount;  
    publicMinted += _mintAmount; 
  }  



    
//extra nft to mint

    function extra_nft_to_mint(uint _extra_nft_to_mint) public onlyOwner{
      extra_nft_count=_extra_nft_to_mint;
    }
// ================== Mint Functions End =======================  

//whitelist
     
    function addTowhitelist(address[] calldata toAddAddresses) external onlyOwner {
        for (uint i = 0; i < toAddAddresses.length; i++) {
            whitelist[toAddAddresses[i]] = true;
        }
    }

       function removeFromwhitelist(address[] calldata toRemoveAddresses)external onlyOwner {
        for (uint i = 0; i < toRemoveAddresses.length; i++) {
            delete whitelist[toRemoveAddresses[i]];
        }
    }

     function setWhitelistSale(bool _whitelistSale) public onlyOwner{
    set_wl_sale=_whitelistSale;
  }

  function checIskWhitelist(address _address) public view returns(bool){
     return whitelist[_address];
    }

// ================== Set Functions Start =======================



// uri
  function seturi(string memory _uri) public onlyOwner {
    uri = _uri;
  }

  function setUriSuffix(string memory _uriSuffix) public onlyOwner {
    uriSuffix = _uriSuffix;
  }

  function setHiddenMetadataUri(string memory _hiddenMetadataUri) public onlyOwner {
    hiddenMetadataUri = _hiddenMetadataUri;
  }

// sales toggle
  function setpublicSale(bool _publicSale) public onlyOwner {
    publicSale = _publicSale;
  }



// max per tx
  function setMaxMintAmountPerTx(uint256 _maxMintAmountPerTx) public onlyOwner {
    maxMintAmountPerTx = _maxMintAmountPerTx;
  }

// max per wallet
  function setmaxLimitPerWallet(uint256 _maxLimitPerWallet) public onlyOwner {
    maxLimitPerWallet = _maxLimitPerWallet;
  }
 

 

// price
  function setPrice(uint256 _price) public onlyOwner {
    price = _price;
  }


// supply limit
  function setmaxSupply(uint256 _maxSupply) public onlyOwner {
    maxSupply = _maxSupply;
  }

// ================== Set Functions End =======================






// ================== Withdraw Function Start =======================
  
  function withdraw() public onlyOwner {
    
    //owner withdraw
    (bool os, ) = payable(owner()).call{value: address(this).balance}('');
    require(os);
  }

// ================== Withdraw Function End=======================  







// ================== Read Functions Start =======================

  function tokensOfOwner(address owner) external view returns (uint256[] memory) {
    unchecked {
        uint256[] memory a = new uint256[](balanceOf(owner)); 
        uint256 end = _nextTokenId();
        uint256 tokenIdsIdx;
        address currOwnershipAddr;
        for (uint256 i; i < end; i++) {
            TokenOwnership memory ownership = _ownershipAt(i);
            if (ownership.burned) {
                continue;
            }
            if (ownership.addr != address(0)) {
                currOwnershipAddr = ownership.addr;
            }
            if (currOwnershipAddr == owner) {
                a[tokenIdsIdx++] = i;
            }
        }
        return a;    
    }
}

  function priceForQuantity(uint _amount) public view returns (uint){
    return price*_amount;
  }

  function _startTokenId() internal view virtual override returns (uint256) {
    return 1;
  }

  function tokenURI(uint256 _tokenId) public view virtual override returns (string memory) {
    require(_exists(_tokenId), 'ERC721Metadata: URI query for nonexistent token');

  

    string memory currentBaseURI = _baseURI();
    return bytes(currentBaseURI).length > 0
        ? string(abi.encodePacked(currentBaseURI, _tokenId.toString(), uriSuffix))
        : '';
  }

  function _baseURI() internal view virtual override returns (string memory) {
    return uri;
  }






     
    function setUnlimitedMintPerAddress(address _address) public  onlyOwner{
      allowedUnlimitedMint[_address] = true; 
    }



// ================== royalties start =======================
    function supportsInterface(bytes4 interfaceId) public view virtual override (ERC721A) returns (bool) {
        if (interfaceId == _INTERFACE_ID_ERC2981) {
            return true;
        }
        return super.supportsInterface(interfaceId);
    }

// RoyaltyInfo
    
    function royaltyInfo(uint256 _tokenId, uint256 _salePrice) external view returns (address receiver, uint256 royaltyAmount){
        require(_exists(_tokenId), "ERC2981Royality: Cannot query non-existent token");
        return (royaltyReceiver, (_salePrice * royaltyFeesInBeeps) / 10000);
    }
    
    function calculatingRoyalties(uint256 _salePrice) view public returns (uint256) {
        return (_salePrice / 10000) * royaltyFeesInBeeps;
    }

     function checkRoalties() view public returns (uint256) {       
        return  royaltyFeesInBeeps/100;
    }

    function setRoyalty(uint96 _royaltyFeesInBeeps) external onlyOwner {
        royaltyFeesInBeeps = _royaltyFeesInBeeps;
    }

    function setRoyaltyReceiver(address _receiver) external onlyOwner{
        royaltyReceiver = _receiver;
    }


// ================== royalties ends =======================



  function transferFrom(address from, address to, uint256 tokenId) public payable override onlyAllowedOperator(from) {
    super.transferFrom(from, to, tokenId);
  }

  function safeTransferFrom(address from, address to, uint256 tokenId) public payable override onlyAllowedOperator(from) {
    super.safeTransferFrom(from, to, tokenId);
  }

  function safeTransferFrom(address from, address to, uint256 tokenId, bytes memory data) public payable override onlyAllowedOperator(from) {
    super.safeTransferFrom(from, to, tokenId, data);
  }  
    

 /*
 Developed by Shubham Kunwar

*/

}

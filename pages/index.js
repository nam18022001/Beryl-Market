
import styles from '../styles/Home.module.css';
import { ethers } from 'ethers';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Web3Modal from 'web3modal';
import { nftaddress, nftmarketaddress } from '../config';
import Image from 'next/image';

import NFT from '../artifacts/contracts/NFT.sol/NFT.json';
import Market from '../artifacts/contracts/NFTMarket.sol/NFTMarket.json';

export default function Home() {
  const [nfts, setNfts] = useState([]);
  const [loadingState, setLoadingState] = useState('not-loaded');

  useEffect(() => {
    loadNFTs();

  }, []);
  async function loadNFTs() {
    const provider = new ethers.providers.JsonRpcProvider();
    const tokenContract = new ethers.Contract(nftaddress, NFT.abi, provider);
    const marketContract = new ethers.Contract(nftmarketaddress, Market.abi, provider);

    const data = await marketContract.fetchMarketItems();

    const items = await Promise.all(data.map(async (i) => {
      const tokenUri = await tokenContract.tokenURI(i.tokenId);
      const meta = await axios.get(tokenUri);
      let price = ethers.utils.formatUnits(i.price.toString(), 'ether');
      let items = {
        price,
        tokenId: i.tokenId.toNumber(),
        seller: i.seller,
        owner: i.owner,
        image: meta.data.image,
        name: meta.data.name,
        description: meta.data.description,

      }
    return items;

    }));
    
    setNfts(items);
    setLoadingState('loaded');
  }

  async function buyNFT(nft) {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);

    const signer = provider.getSigner();
    const contract = new ethers.Contract(nftmarketaddress, Market.abi, signer);

    const price = ethers.utils.parseUnits(nft.price.toString(), 'ether');
    const transaction = await contract.createMarketSale(nftaddress, nft.tokenId, {
      value: price
    });
    await transaction.wait();

    loadNFTs();
  }

  if (loadingState === 'loaded' && !nfts.length) return (
    <h1 className='px-20 py-10 text-3xl'>No items found</h1>
  )
  return (
    <div class="m-6 grid grid-cols-4 gap-10">
      {
        nfts.map((nft, i) =>(
          <div key={i} class="bg-orange-50 max-w-sm rounded-md overflow-hidden shadow-lg border-slate-300 hover:shadow-cyan-300 border-2 hover:border-cyan-500">
            <Image class="w-full" src={nft.image} alt="Picture of the author" width="1980px" height="1080px"/>
            <div className=''>
              <div class="px-6 py-4">
                <div class="font-bold text-xl mb-2">{nft.name}</div>
                <div className=' '>
                  <p class="text-gray-700 truncate text-base">
                    {nft.description}
                  </p>
                </div>
              </div>
              <div className='px-6 py-3 text-lg float-right'>
                <div className='mb-4 font-bold text-black '>
                      <img src="https://openseauserdata.com/files/6f8e2979d428180222796ff4a33ab929.svg" width="18%" className='inline-block pb-1'/>
                      <font className='pl-1'>
                        {nft.price}
                      </font>
                </div>
              </div>
              <div class="px-6 pt-4 pb-4">
              <button className="bg-transparent hover:bg-blue-500 hover:text-white border border-blue-500 hover:border-transparent w-full text-blue-500 font-bold py-2 px-12 rounded-full"
                onClick={() => buyNFT(nft)}>Buy NFT</button>
              </div>
            </div>
          </div>
        ))
      }
    </div>
  )
}

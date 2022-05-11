import { ethers } from 'ethers'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Web3Modal from "web3modal"
import Image from 'next/image'
import Head from 'next/head'

import {
  nftmarketaddress, nftaddress
} from '../config'

import Market from '../artifacts/contracts/NFTMarket.sol/NFTMarket.json'
import NFT from '../artifacts/contracts/NFT.sol/NFT.json'

export default function CreatorDashboard() {
  const [nfts, setNfts] = useState([])
  const [sold, setSold] = useState([])
  const [loadingState, setLoadingState] = useState('not-loaded')
  useEffect(() => {
    loadNFTs()
  }, [])
  async function loadNFTs() {
    const web3Modal = new Web3Modal(
    //     {
    //   network: "mainnet",
    //   cacheProvider: true,
    // }
    )
    const connection = await web3Modal.connect()
    const provider = new ethers.providers.Web3Provider(connection)
    const signer = provider.getSigner()
      
    const marketContract = new ethers.Contract(nftmarketaddress, Market.abi, signer)
    const tokenContract = new ethers.Contract(nftaddress, NFT.abi, provider)
    const data = await marketContract.fetchItemsCreated()
    
    const items = await Promise.all(data.map(async i => {
      const tokenUri = await tokenContract.tokenURI(i.tokenId)
      const meta = await axios.get(tokenUri)
      let price = ethers.utils.formatUnits(i.price.toString(), 'ether')
      let item = {
        price,
        tokenId: i.tokenId.toNumber(),
        seller: i.seller,
        owner: i.owner,
        sold: i.sold,
        image: meta.data.image,
      }
      return item
    }))
    
    const soldItems = items.filter(i => i.sold)
    setSold(soldItems)
    setNfts(items)
    setLoadingState('loaded')
  }
  if (loadingState === 'loaded' && !nfts.length) return (
    <div style={{ height: '400px'}}>
        <Head>
          <title>Dashboard</title>
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        </Head>
         <h1 className="py-10 px-20 text-3xl text-white">No assets created</h1>
      </div>
  )
  return (
    <div className="m-6 " style={{ maxWidth: '1600px'}}>
      <Head>
          <title>Dashboard</title>
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="p-4">
        <h2 className="text-2xl py-2 text-white">Items Created</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
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
                    </div>
                  </div>
                </div>
              ))
            }
          </div>
        </div>
        <div className="px-4 ">
        {
          Boolean(sold.length) && (
            <div>
              <h2 className="text-2xl py-2 text-white">Items sold</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
                {
                  sold.map((nft, i) => (
                    <div key={i} class="bg-orange-50 max-w-sm rounded-md overflow-hidden shadow-lg shadow-cyan-300 border-4 border-cyan-300">
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
                    </div>
                  </div>
                </div>
                  ))
                }
              </div>
            </div>
          )
        }
        </div>
    </div>
  )
}

import {useState} from 'react';
import { ethers } from 'ethers';
import {create as ipfsHttpClient} from 'ipfs-http-client';
import { useRouter } from 'next/router';
import Web3Modal from 'web3modal';
import{ nftaddress,nftmarketaddress } from '../config';
import NFT from '../artifacts/contracts/NFT.sol/NFT.json';
import Market from '../artifacts/contracts/NFTMarket.sol/NFTMarket.json';
import Image from 'next/image';
import Head from 'next/head'

const client = ipfsHttpClient('https://ipfs.infura.io:5001/api/v0');

export default function CreateItem() {
    const [fileUrl, setFileUrl] = useState(null)
    const [formInput, updateFormInput] = useState({price: '', name: '', description:''})
    const router = useRouter();

    async function onChange(e) {
        const file = e.target.files[0]
        try{ //try uploading the file
            const added = await client.add(
                file,
                {
                    progress: (prog) => console.log(`received: ${prog}`)
                }
            )
            //file saved in the url path below
            const url = `https://ipfs.infura.io/ipfs/${added.path}`
            setFileUrl(url)
        }catch(e){
            console.log('Error uploading file: ', e)
        }
    }

    //1. create item (image/video) and upload to ipfs
    async function createItem(){
        const {name, description, price} = formInput; //get the value from the form input
        
        //form validation
        if(!name || !description || !price || !fileUrl) {
            return
        }

        const data = JSON.stringify({
            name, description, image: fileUrl
        });

        try{
            const added = await client.add(data)
            const url = `https://ipfs.infura.io/ipfs/${added.path}`
            //pass the url to sav eit on Polygon adter it has been uploaded to IPFS
            createSale(url)
        }catch(error){
            console.log(`Error uploading file: `, error)
        }
    }

    //2. List item for sale
    async function createSale(url){
        const web3Modal = new Web3Modal();
        const connection = await web3Modal.connect();
        const provider = new ethers.providers.Web3Provider(connection);

        //sign the transaction
        const signer = provider.getSigner();
        let contract = new ethers.Contract(nftaddress, NFT.abi, signer);
        let transaction = await contract.createToken(url);
        let tx = await transaction.wait()

        //get the tokenId from the transaction that occured above
        //there events array that is returned, the first item from that event
        //is the event, third item is the token id.
        console.log('Transaction: ',tx)
        console.log('Transaction events: ',tx.events[0])
        let event = tx.events[0]
        let value = event.args[2]
        let tokenId = value.toNumber() //we need to convert it a number

        //get a reference to the price entered in the form 
        const price = ethers.utils.parseUnits(formInput.price, 'ether')

        contract = new ethers.Contract(nftmarketaddress, Market.abi, signer);

        //get the listing price
        let listingPrice = await contract.getListingPrice()
        listingPrice = listingPrice.toString()

        transaction = await contract.createMarketItem(
            nftaddress, tokenId, price, {value: listingPrice }
        )

        await transaction.wait()

        router.push('/')

    }

    return (
        <div className="flex justify-center mt-16">
            <Head>
                <title>Create NFT</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <div className="w-1/2 flex flex-col pb-12">
                <div className='text-center text-blue-300 font-bold font-sans text-5xl'>
                    Create a new NFT
                </div>
                <input 
                    placeholder="Asset Name"
                    className="mt-8 rounded border-b-2 border-green-400 p-4 appearance-none bg-transparent  w-full text-white mr-3 py-1 px-2 focus:outline-none placeholder-zinc-300"
                    onChange={e => updateFormInput({...formInput, name: e.target.value})}
                    />
                <textarea
                     placeholder="Asset Description"
                     className="mt-8 rounded border-b-2 border-green-400 appearance-none bg-transparent  w-full text-white mr-3 py-1 px-2 focus:outline-none placeholder-zinc-300"
                     onChange={e => updateFormInput({...formInput, description: e.target.value})}
                     />
                <input 
                    placeholder="Asset Price in ETH"
                    className="mt-8 rounded border-b-2 border-green-400 p-4 appearance-none bg-transparent  w-full text-white mr-3 py-1 px-2 focus:outline-none placeholder-zinc-300"
                    type="number"
                    onChange={e => updateFormInput({...formInput, price: e.target.value})}
                    />
                    <input
                        type="file"
                        name="Asset"
                        className="mt-8 rounded border-b-2 border-green-400 p-4 appearance-none bg-transparent w-full text-green-200  mr-3 py-1 px-2 focus:outline-none placeholder-zinc-300"
                        onChange={onChange}
                    />
                    {
                        fileUrl && (
                           
                            <Image
                            src={fileUrl}
                            alt="Picture of the author"
                            className="rounded mt-4"
                            width={350}
                            height={500}
                          />
                        )
                    }
                    <button onClick={createItem}
                     className="font-bold mt-10 bg-cyan-500 text-white rounded p-4 shadow-lg text-2xl font-mono">Create NFT</button>
            </div>
        </div>
    )
}
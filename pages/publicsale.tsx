import { ConnectWallet, useAddress, useContract, useContractRead, useContractWrite, Web3Button } from "@thirdweb-dev/react";
import type { NextPage } from "next";
const { MerkleTree } = require('merkletreejs')
const keccak256 = require('keccak256')
import { array } from "./wl"
import { useState, useEffect } from 'react'


import Image from 'next/image';




import Header from "../components/Header";
import Footer from "../components/Footer";


const signatureDropAddress = "0xCcf1C51BdE1769820be7B8738DD90F8F2246811b";
const leaves = array.map(x => keccak256(x))
const tree = new MerkleTree(leaves, keccak256)
const root = tree.getRoot().toString('hex')


const Mint: NextPage = () => {

    const address = useAddress();
    const [mintPrice, setMintPrice] = useState(0)
    const [mintAmount, setMintAmount] = useState(1)
    const [maxMintAmount, setMaxMintAmount] = useState(2)
    const [status, setStatus] = useState("")
    const url = new URL("https://anasah.io/")



    const { contract } = useContract(signatureDropAddress);

    const { mutateAsync: WL_Mint, } = useContractWrite(contract, "Public_Sale")


    const totalSupply = useContractRead(contract, "totalSupply")
    const maxSupply = useContractRead(contract, "maxSupply")?.data?.toNumber();
    const maxMintAmountPerTx = useContractRead(contract, "maxMintAmountPerTx")?.data?.toNumber();
    const nftMinted = totalSupply?.data?.toNumber();





    const myFunction = () => {

        if (address) {

           
                return (
                    <Web3Button
                        contractAddress={signatureDropAddress}
                        action={(contract) => {
                            mintNftPhase1()

                        }}
                    >
                        Mint Now (Public)
                    </Web3Button>
                )
            }          


        else {
            return (
                <>
                    <ConnectWallet colorMode="light" />
                </>
            )
        }
    }







    const mintNftPhase1 = async () => {

        try {
            setStatus("Minting Your NFT... Confirm the Mint in Wallet.");
            const data = await WL_Mint([mintAmount]);
            setStatus(`Congratulation! You have successfully minted House of Anasah NFT. Visit opensea.io to view it.`);
        }


        catch (e) {
            ``
            //console.log(err.reason);
            setStatus(e.reason)
            //console.error("contract call failure", err.reason);
        }

    }




    const incrementMintAmount = () => {

        if (mintAmount < maxMintAmountPerTx) {
            setMintAmount(mintAmount + 1)
        }
    }

    const decrementMintAmount = () => {
        if (mintAmount > 1) {
            setMintAmount(mintAmount - 1)
        }
    }

    const { data: priceForQuantity, } = useContractRead(
        contract,
        'priceForQuantity',
        mintAmount
    );

    useEffect(() => {
        const init = async () => {

        }

        init()
    }, [])






    return (
        <div className="min-h-screen h-full w-full overflow-hidden flex flex-col items-center justify-center bg-brand-background ">

            <div className="relative w-full h-full flex flex-col items-center justify-center">


                <div className="flex flex-col items-center justify-center h-full w-full px-2 md:px-10">
                    <div style={{ backgroundColor: "rgb(24, 29, 49)" }} className="relative mt-10 z-1 md:max-w-3xl w-full bg-gray-900/90 filter backdrop-blur-sm rounded-md px-2 md:px-4 flex flex-col items-center">
                        <Header />
                        <div className="items-center justify-center  transition duration-200 ease-in-out font-chalk  px-4 py-2 rounded-md text-sm text-white tracking-wide mt-2 uppercase">
                            <ConnectWallet colorMode="light" />
                        </div>

                        <h2 className="font-coiny uppercase text-center items-center mt-4 font-bold text-xl md:text-2xl bg-gradient-to-br mt-16 from-brand-green to-brand-blue bg-clip-text text-transparent mt-3">
                            FREE MINT(Phase 1)
                        </h2>


                        <div className="flex flex-col md:flex-row md:space-x-14 w-full mt-4">
                            <div className="relative w-full">
                                <div className="my-border font-coiny z-10 absolute top-2 left-2 opacity-80 filter backdrop-blur-lg text-base px-4 py-2 bg-black border rounded-md flex items-center justify-center text-white font-semibold">
                                    <p>
                                        <span style={{ color: "rgb(103, 137, 131)" }}>{nftMinted}/</span>{maxSupply}

                                    </p>
                                </div>

                                <Image className="object-cover w-full  rounded-md" src={"/assets/hoa.gif"} alt="my gif" height={500} width={500} />
                            </div>

                            <div className="flex flex-col items-center w-full px-4 mt-8 md:mt-0">
                                <div className="font-coiny flex items-center justify-between w-full">

                                    <button
                                        className="w-14 h-10 md:w-16 md:h-12 flex items-center justify-center text-brand-background hover:shadow-lg bg-gray-300 font-bold rounded-md"
                                        onClick={decrementMintAmount}
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-6 w-6 md:h-8 md:w-8"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M18 12H6"
                                            />
                                        </svg>
                                    </button>

                                    <p style={{ color: "#F1DBBF" }} className="flex items-center justify-center flex-1 grow text-center font-bold   text-3xl md:text-4xl">
                                        {mintAmount}
                                    </p>
                                    <button
                                        className="w-14 h-10 md:w-16 md:h-12 flex items-center justify-center text-brand-background hover:shadow-lg bg-gray-300 font-bold rounded-md"
                                        onClick={incrementMintAmount}
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-6 w-6 md:h-8 md:w-8"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                                            />
                                        </svg>
                                    </button>


                                </div>

                                <p className="text-sm text-pink-200 tracking-widest mt-3">
                                    Max Mint Amount: {maxMintAmountPerTx}
                                </p>

                                <div className="border-t border-b py-4 mt-8 w-full">
                                    <div style={{ color: "#F1DBBF" }} className="w-full text-xl font-coiny flex items-center justify-between text-brand-yellow">
                                        <p>Total</p>

                                        <div className="flex items-center space-x-3">
                                            <p>
                                                Free

                                            </p>{' '}
                                            <span className="text-gray-400">+ GAS</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-4">

                                    {myFunction()}

                                </div>
                            </div>
                        </div>


                        <span className="font-coiny text-xl  uppercase text-center bg-gradient-to-br from-brand-green to-brand-blue bg-clip-text text-transparent items-center mt-2">{status}</span>

                        {/* Contract Address */}
                        <div className="border-t border-gray-800 flex flex-col items-center mt-2 py-2 w-full">
                            <h3 style={{ color: "rgb(103, 137, 131)" }} className="font-coiny text-2xl  uppercase mt-6">
                                Contract Address
                            </h3>
                            <a
                                href={`https://etherscan.io/address/${signatureDropAddress}#readContract`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-400 mt-4"
                            >
                                <span className="break-all ...">{signatureDropAddress}</span>
                            </a>
                        </div>

                        {/* Faq's */}



                    </div>
                </div>
            </div>

            <Footer />
        </div>
    )
}


export default Mint;

import { Web3Button } from "@thirdweb-dev/react";



import { useState, useEffect } from 'react'



const signatureDropAddress = "0x1e66036bC884FB10b83f2688CFB04eCe1e7ECE6e";
const Web3Buttonn = () => {
    const [mint, setMint] = useState("Mint Now")
    const [status, setStatus] = useState("")

    const mintNft = async () => {
        try {
            const data = await PublicMint([mintAmount]);
            setStatus("contract call successs");
            console.info("contract call successs", data);
        } catch (err) {
            setStatus(err.reason);

            console.error("contract call failure", err.reason);
        }
    }
    return (
        <Web3Button
            contractAddress={signatureDropAddress}
            action={() => mintNft()}
            colorMode="light"
            className="text-black-400 mt-4"
        >
            {mint}
        </Web3Button>
    );
};

export default Web3Buttonn;

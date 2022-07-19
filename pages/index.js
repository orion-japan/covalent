import { ThirdwebNftMedia, useAddress, useMetamask } from "@thirdweb-dev/react";
import { useEffect, useState } from "react";
import NftCard from "../components/NftCard";
import NftCardContainer from "../components/NftCardContainer";
import styles from "../styles/Home.module.css";

export default function Profile() {
  // Wallet connection hooks from React SDK
  const address = useAddress();
  const connectWithMetamask = useMetamask();

  // State to store the user's loaded tokens
  const [isLoading, setIsLoading] = useState(true);
  const [tokenData, setTokenData] = useState([]);

  // Make a request to the get-wallet-data api endpoint (/api/get-wallet-data.js file)
  useEffect(() => {
    if (address) {
      // If there is a connected address, make the request.
      (async () => {
        try {
          const req = await fetch("/api/get-wallet-data", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },

            body: JSON.stringify({
              chainId: 1,
              address: address,
            }),
          });

          // De-structure tokens out of the response JSON
          const { tokens } = await req.json();
          // Set the tokens in state.
          setTokenData(tokens.filter((t) => t.type === "nft"));
        } catch (error) {
          console.error(error);
        } finally {
          setIsLoading(false);
        }
      })();
    }
  }, [address]);

  return (
    <div>
      <>
        <div className={styles.container}>
          {address ? (
            <div className={styles.collectionContainer}>
              <h1>Your Mumbai ERC-721 Tokens</h1>
              {!isLoading ? (
                <div className={styles.nftBoxGrid}>
                  {tokenData
                    ?.filter((t) => t.type === "nft")
                    ?.filter((t) => t.supports_erc?.includes("erc721"))
                    ?.map((nft, i) => (
                      <NftCardContainer nft={nft} key={i} />
                    ))}
                </div>
              ) : (
                <p>Loading...</p>
              )}
            </div>
          ) : (
            <a
              className={styles.mainButton}
              onClick={() => connectWithMetamask()}
            >
              Connect Wallet
            </a>
          )}
        </div>
      </>
    </div>
  );
}

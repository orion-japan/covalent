import {
  ThirdwebNftMedia,
  useAddress,
  useDisconnect,
  useMetamask,
  useSDK,
} from "@thirdweb-dev/react";
import { ethers } from "ethers";
import { useEffect, useState } from "react";

export default function Home() {
  const address = useAddress();
  const connectWithMetamask = useMetamask();
  const disconnectWallet = useDisconnect();

  const sdk = useSDK();

  const [tokenData, setTokenData] = useState([]);

  // Make a request to the get-wallet-data api endpoint
  useEffect(() => {
    if (address) {
      (async () => {
        const hi = await fetch("/api/get-wallet-data", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            chainId: 1,
            address: address,
          }),
        });

        const { tokens } = await hi.json();
        console.log(tokens);
        setTokenData(tokens);
      })();
    }
  }, [address]);

  async function transfer(token) {}

  return (
    <div>
      {address ? (
        <>
          <button onClick={disconnectWallet}>Disconnect Wallet</button>
          <p>Your address: {address}</p>

          {/* Render table from array of tokens in state */}
          <table style={{ width: "90vw", textAlign: "center" }}>
            <thead>
              <tr>
                <th>Logo</th>
                <th>Token Type</th>
                <th>Token Name</th>
                <th>Token Symbol</th>
                <th>Token Balance</th>
                <th>Transfer</th>
              </tr>
            </thead>
            <tbody>
              {tokenData.map((token, i) => (
                <tr key={i}>
                  <td>
                    {token.type === "nft" ? (
                      <ThirdwebNftMedia
                        metadata={token.nft_data[0].external_data}
                        height={64}
                        width={64}
                        style={{ width: 128 }}
                      />
                    ) : (
                      <img
                        src={token.logo_url}
                        alt={token.name}
                        style={{ width: 64 }}
                      />
                    )}
                  </td>
                  <td>{token.type}</td>
                  <td>{token.contract_name}</td>
                  <td>{token.contract_ticker_symbol}</td>
                  <td>
                    {token.type === "nft"
                      ? token.balance
                      : ethers.utils.formatUnits(token.balance)}
                  </td>
                  <td>
                    <button onClick={() => transfer(token)}>Transfer</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      ) : (
        <button onClick={connectWithMetamask}>Connect with Metamask</button>
      )}
    </div>
  );
}

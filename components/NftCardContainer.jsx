import React, { useEffect } from "react";
import styles from "../styles/Home.module.css";
import NftCard from "./NftCard";
import { ThirdwebSDK } from "@thirdweb-dev/sdk";

export default function NftCardContainer({ nft }) {
  const [contract, setContract] = React.useState(null);

  useEffect(() => {
    (async () => {
      if (nft) {
        const tw = new ThirdwebSDK("mumbai");
        const c = await tw.getContract(nft.contract_address);
        setContract(c);
      }
    })();
  }, [nft, nft.contract_address]);

  return (
    <>
      <h2>{nft?.contract_name}</h2>
      <div className={styles.nftBoxGrid}>
        {contract &&
          nft?.nft_data?.map((n, i) => (
            <NftCard contract={contract} nft={n} key={i} />
          ))}
      </div>
    </>
  );
}

import React, { useEffect, useState } from "react";
import { ThirdwebNftMedia } from "@thirdweb-dev/react";
import styles from "../styles/Home.module.css";

export default function NftCard({ contract, nft }) {
  const [nftMetadata, setMetadata] = useState(null);

  useEffect(() => {
    (async () => {
      if (contract) {
        const m = await contract?.nft?.get(nft.token_id);
        setMetadata(m);
      }
    })();
  }, [contract, contract.nft, nft.contract_address, nft.token_id]);

  if (!nftMetadata) {
    return null;
  }

  return (
    <div className={styles.nftBox}>
      <ThirdwebNftMedia
        metadata={nftMetadata.metadata}
        className={styles.nftMedia}
      />
      <h3>{nftMetadata.metadata.name}</h3>
    </div>
  );
}

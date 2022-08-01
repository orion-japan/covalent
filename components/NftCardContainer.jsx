import React from "react";
import { MediaRenderer } from "@thirdweb-dev/react";

export default function NftCardContainer({ nftCollection }) {
  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <h2 style={{ marginBottom: 8 }}>{nftCollection?.contract_name}</h2>
      <p>
        Balance: <b>{nftCollection?.nft_data?.length}</b>
      </p>

      <div style={{ display: "flex", flexDirection: "row" }}>
        {nftCollection?.nft_data?.map((nft, key) => (
          <div key={key}>
            <MediaRenderer
              style={{ width: 128, height: 128, borderRadius: 16, padding: 4 }}
              src={nft.external_data.image}
              alt="A mp4 video"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

import { ChainId } from "@thirdweb-dev/sdk";

export default async function getWalletData(req, res) {
  // get address out of request body
  const address = req.body.address;

  const chainId = ChainId.Mumbai;

  const apikey = process.env.COVALENT_API_KEY;

  console.log(`Generating signature for address: ${address}`);

  let headers = new Headers();
  let authString = `${apikey}:`;
  headers.set("Authorization", "Basic " + btoa(authString));
  const URL = `https://api.covalenthq.com/v1/${chainId}/address/${address}/balances_v2/?nft=true&no-nft-fetch=true`;
  fetch(URL, { method: "GET", headers: headers })
    .then((res) => res.json())

    .then((response) => {
      console.log(response);
      res.status(200).json({
        tokens: response.data.items,
      });
    })

    .catch((error) => {
      console.log(error);
      res.status(500).json({
        error: error,
      });
    });
}

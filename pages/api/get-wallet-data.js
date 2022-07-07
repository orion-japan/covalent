import { ChainId } from "@thirdweb-dev/sdk";

export default async function getWalletData(req, res) {
  // get address out of request body
  const address = req.body.address;

  const chainId = ChainId.Rinkeby;

  const apikey = process.env.COVALENT_API_KEY;

  console.log(`Generating signature for address: ${address}`);

  let headers = new Headers();
  let authString = `${apikey}:`;
  headers.set("Authorization", "Basic " + btoa(authString));
  const URL = `https://api.covalenthq.com/v1/${chainId}/address/${address}/balances_v2/?quote-currency=USD&format=JSON&nft=true&no-nft-fetch=false`;
  fetch(URL, { method: "GET", headers: headers })
    .then((res) => res.json())

    .then((response) => {
      console.log(response.data.items);
      res.status(200).json({
        tokens: response.data.items,
      });
    });
}

import server from "./server";

import * as secp from "ethereum-cryptography/secp256k1";

import * as toHex from "ethereum-cryptography/utils";

function Wallet({ address, setAddress, balance, setBalance, privateKey, setPrivateKey }) {
  async function onChange(evt) {
    const privateKey = evt.target.value;
    setPrivateKey(privateKey);

    const publicKey = secp.getPublicKey(privateKey);
    const address = toHex(keccak256(publicKey.slice(1)).slice(-20));


    if (address) {
      const {
        data: { balance },
      } = await server.get(`balance/${address}`);
      setBalance(balance);
    } else {
      setBalance(0);
    }
  }

  return (
    <div className="container wallet">
      <h1>Your Wallet</h1>

      <label>
        Private Key
        <input placeholder="Type your Private Key" value={privateKey} onChange={onChange}></input>
      </label>
      
      <div>
        Address: {address}
      </div>
      <div className="balance">Balance: {balance}</div>
    </div>
  );
}

export default Wallet;

import React, { useState, useEffect } from "react";
import Web3 from "web3";

const App = () => {
  const [account, setAccount] = useState("");
  const [balance, setBalance] = useState("");
  const [error, setError] = useState(null);

  const getBalance = (account, web3) => {
    web3.eth
      .getBalance(account)
      .then((bal) => {
        console.log("Balance in Wei: ", bal); // Debugging: Log balance in Wei
        const balanceInEth = web3.utils.fromWei(bal, "ether");
        console.log("Balance in ETH: ", balanceInEth); // Debugging: Log balance in ETH
        setBalance(balanceInEth);
      })
      .catch((err) => {
        console.error("Error fetching balance: ", err); // Debugging: Log any error
        setError(err);
      });
  };

  const connectHandler = () => {
    window.ethereum.enable().catch((err) => setError(err));
    if (window.ethereum) {
      const web3 = new Web3(window.ethereum);
      window.ethereum
        .enable()
        .then((accounts) => {
          setAccount(accounts[0]);
          getBalance(accounts[0], web3);
        })
        .catch((err) => setError(err)); // Handle connection errors
    } else {
      setError({ message: "Metamask is not installed" });
      alert("Metamask is not installed");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 flex flex-col items-center justify-center">
      <div className="bg-white shadow-lg rounded-lg p-6 w-fit">
        <h1 className="text-3xl font-semibold text-gray-800 mb-6 text-center">
          Connect your Wallet
        </h1>
        <button
          onClick={connectHandler}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded mb-4"
        >
          {account?"Connected":"Connect Wallet"} 
        </button>
        {error && (
          <div className="text-red-500 mb-4 text-center">
            <p>{error.message}</p>
            {!window.ethereum && (
              <p className="mt-2">
                To use this feature, please{" "}
                <a
                  href="https://metamask.io/download/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline"
                >
                  install MetaMask
                </a>
                .
              </p>
            )}
          </div>
        )}
        {account && (
          <div className=" pt-6 pb-8 mb-4">
            <div className="text-gray-700 text-xl font-semibold">
              Account: {account}
            </div>
            <p className="text-gray-700 text-xl font-semibold">
              Balance: {balance ? `${balance} ETH` : "Loading..."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;

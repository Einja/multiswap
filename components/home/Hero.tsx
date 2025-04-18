import React from "react";

const Hero = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center text-white">
      <h1 className="text-5xl font-bold mb-4">Welcome to Multiswap</h1>
      <p className="text-xl mb-8">
        The ultimate platform for seamless asset swapping with your MetaMask wallet.
      </p>
      <div className="flex space-x-4">
        <a href="/pool">
          <button className="px-6 py-2 bg-pink-400 hover:bg-pink-700 rounded-lg transition duration-300">
            View Pool
          </button>
        </a>
        <a href="/trade">
          <button className="px-6 py-2 bg-pink-400 hover:bg-pink-700 rounded-lg transition duration-300">
            Explore Trading
          </button>
        </a>
      </div>
    </div>
  );
};

export default Hero;

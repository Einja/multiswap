// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

import "@uniswap/v2-periphery/contracts/interfaces/IUniswapV2Router02.sol";

  contract EthBuyer {
      IUniswapV2Router02 public immutable router;

      constructor(address _router) {
          // Initialize the router with the provided address
          // e.g. Sepolia or Mainnet Uniswap V2 router
          router = IUniswapV2Router02(_router);
      }

    /// @notice Swap ETH (sent with this call) for `token`, sending resulting tokens to the caller.
    /// @param token        The ERC-20 address you want to buy.
    /// @param amountOutMin Minimum amount of tokens to receive (slippage guard).
    /// @param deadline     Unix timestamp after which the tx will revert.
    function buyTokens(
        address token,
        uint256 amountOutMin,
        uint256 deadline
    ) external payable {
        require(msg.value > 0, "Must have more than 0 ETH to buy tokens");

        address[] memory path = new address[](2);
        path[0] = router.WETH();  // wrap ETH
        path[1] = token;          // target token

        router.swapExactETHForTokens{ value: msg.value }(
            amountOutMin,
            path,
            msg.sender,
            deadline
        );
    }
    receive() external payable {}
}
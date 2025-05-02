// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;


import "@uniswap/v2-periphery/contracts/interfaces/IUniswapV2Router02.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract EthBuyer {
    IUniswapV2Router02 public immutable router;

    constructor(address _router) {
        // e.g. Uniswap V2 Router on Sepolia or Mainnet
        router = IUniswapV2Router02(_router);
    }
    /// @notice Swap `amountIn` of `token` for ETH, sending resulting ETH to the caller.
    /// @param token        The ERC-20 address (e.g. DAI) you pay with.
    /// @param amountIn     How many tokens to spend.
    /// @param amountOutMin Minimum acceptable ETH (slippage guard).
    /// @param deadline     Unix timestamp after which the tx will revert.
    function buyETH(
        address token,
        uint256 amountIn,
        uint256 amountOutMin,
        uint256 deadline
    ) external {
        // Pull in the tokens from the caller
        require(
          IERC20(token).transferFrom(msg.sender, address(this), amountIn),
          "Token transfer failed"
        );

        // Approve the Uniswap router to spend them
        IERC20(token).approve(address(router), amountIn);

        // Build the swap path: [token → WETH]
        address[] memory path = new address[](2);
        path[0] = token;
        path[1] = router.WETH();

        // Execute swap; ETH is sent directly to msg.sender
        router.swapExactTokensForETH(
          amountIn,
          amountOutMin,
          path,
          msg.sender,
          deadline
        );
    }
}


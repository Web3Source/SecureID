"use client";
import "@rainbow-me/rainbowkit/styles.css";
import merge from 'lodash.merge';
import {
  ConnectButton,
  getDefaultWallets,
  RainbowKitProvider,
  darkTheme,Theme,
} from "@rainbow-me/rainbowkit";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { sepolia } from "wagmi/chains";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import Link from "next/link";

export default function Header() {
  const myTheme = merge(darkTheme(), {
    colors: {
      accentColor: '#635ffa',
      generalBorder: '#edf2ef',
      connectButtonBackground: '#635ffa',
    },
    shadows: {
      connectButton: '#edf2ef'
    },
    fonts: {
      body: " normal"
    },
    radii: {
      connectButton: '50px 0px 50px 0px',
      actionButton: '0px 0px 0px 0px',
    },
  } as Theme);
  const { chains, publicClient } = configureChains(
    [sepolia],
    [
      // alchemyProvider({ apiKey: process.env.ALCHEMY_ID }),
      publicProvider(),
    ]
  );

  const { connectors } = getDefaultWallets({
    appName: "My RainbowKit App",
    projectId: "YOUR_PROJECT_ID",
    chains,
  });

  const wagmiConfig = createConfig({
    autoConnect: true,
    connectors,
    publicClient,
  });

  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider  theme={myTheme}  chains={chains}>
        <div className="flex justify-between  px-5  lg:px-20 text-md lg:text-xl  font-light py-5">
        <Link href="/">
          <img className="pt-3 h-20 w-auto" src="https://blogger.googleusercontent.com/img/a/AVvXsEjMjB2ctzxGJdcj8wiJh0P6gIXqSRttf__l0FQHNyrl27Sy88etgFi4HkTyxAYG5Hj-kNvcBXFD8_rNQfUwDi6iv_eLFVcy3zLKbhsVbLT5Iwik6BXK0JtzRZq24ZBz0Xe50mgHQq441tyf7TTVWiBXJFvId19lF8S7JbD1pGkTfk75qw6yc1M_1-nZ6OI" />
          </Link>
          <div className="flex">
            <Link href="/Directory">
            <p className="text-xl font-bold text-gray-200 font-serif mt-5">Directory</p>
            </Link>
          <span className="lg:px-20 pt-3">      <ConnectButton  showBalance={false}  label="Connect Wallet" /></span>
          </div>
        </div>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

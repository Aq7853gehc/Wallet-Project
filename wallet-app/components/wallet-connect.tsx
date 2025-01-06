"use client";

import { useAccount, useConnect, useDisconnect, useEnsName } from "wagmi";
import { injected } from "wagmi/connectors";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Wallet2Icon, LogOutIcon, LoaderIcon } from "lucide-react";
import { useState } from "react";

export function WalletConnect() {
  const { address, isConnected } = useAccount();
  const { data: ensName } = useEnsName({ address });
  const { connect } = useConnect();
  const { disconnect } = useDisconnect();
  const [isConnecting, setIsConnecting] = useState(false);

  const handleConnect = async () => {
    setIsConnecting(true);
    try {
      connect({ connector: injected() });
    } catch (error) {
      console.error("Failed to connect:", error);
    } finally {
      setIsConnecting(false);
    }
  };

  if (isConnected) {
    return (
      <Card className="w-[380px]">
        <CardHeader>
          <CardTitle>Wallet Connected</CardTitle>
          <CardDescription>Your wallet is connected to the network</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex flex-col space-y-2">
              <span className="text-sm text-muted-foreground">Address</span>
              <code className="rounded bg-muted px-2 py-1 text-sm">
                {ensName ?? address}
              </code>
            </div>
            <Button
              variant="destructive"
              className="w-full"
              onClick={() => disconnect()}
            >
              <LogOutIcon className="mr-2 h-4 w-4" />
              Disconnect Wallet
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-[380px]">
      <CardHeader>
        <CardTitle>Connect Wallet</CardTitle>
        <CardDescription>
          Connect your wallet to access Web3 features
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Button
          className="w-full"
          onClick={handleConnect}
          disabled={isConnecting}
        >
          {isConnecting ? (
            <LoaderIcon className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Wallet2Icon className="mr-2 h-4 w-4" />
          )}
          Connect MetaMask
        </Button>
      </CardContent>
    </Card>
  );
}
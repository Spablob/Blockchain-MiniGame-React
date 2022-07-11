import { Button, Progress } from "antd";
import React from "react";
import { useContractReader } from "eth-hooks";

export default function PlayGame({ tx, readContracts, writeContracts }) {
  const userPlayMove = useContractReader(readContracts, "MiniGame", "userPlayMove");
  const computerPlayMove = useContractReader(readContracts, "MiniGame", "computersPlayMove");
  const progressValue = useContractReader(readContracts, "MiniGame", "progressValue");
  const victory = useContractReader(readContracts, "MiniGame", "victory");

  return (
    <div>
      <div style={{ margin: 32 }}>
        <span
          className="highlight"
          style={{ marginLeft: 4, /* backgroundColor: "#f9f9f9", */ padding: 4, borderRadius: 4, fontWeight: "bolder" }}
        >
          Choose your play for next round:
        </span>
      </div>

      <div style={{ padding: 2 }}>
        <Button
          style={{ marginTop: 8 }}
          onClick={async () => {
            /* notice how you pass a call back for tx updates too */
            const result = tx(writeContracts.MiniGame.PlayGame("Rock"), update => {
              console.log("📡 Transaction Update:", update);
              if (update && (update.status === "confirmed" || update.status === 1)) {
                console.log(" 🍾 Transaction " + update.hash + " finished!");
                console.log(
                  " ⛽️ " +
                    update.gasUsed +
                    "/" +
                    (update.gasLimit || update.gas) +
                    " @ " +
                    parseFloat(update.gasPrice) / 1000000000 +
                    " gwei",
                );
              }
            });
            console.log("awaiting metamask/web3 confirm result...", result);
            console.log(await result);
          }}
        >
          Rock
        </Button>
        <Button
          style={{ marginTop: 8 }}
          onClick={async () => {
            /* notice how you pass a call back for tx updates too */
            const result = tx(writeContracts.MiniGame.PlayGame("Paper"), update => {
              console.log("📡 Transaction Update:", update);
              if (update && (update.status === "confirmed" || update.status === 1)) {
                console.log(" 🍾 Transaction " + update.hash + " finished!");
                console.log(
                  " ⛽️ " +
                    update.gasUsed +
                    "/" +
                    (update.gasLimit || update.gas) +
                    " @ " +
                    parseFloat(update.gasPrice) / 1000000000 +
                    " gwei",
                );
              }
            });
            console.log("awaiting metamask/web3 confirm result...", result);
            console.log(await result);
          }}
        >
          Paper
        </Button>
        <Button
          style={{ marginTop: 8 }}
          onClick={async () => {
            /* notice how you pass a call back for tx updates too */
            const result = tx(writeContracts.MiniGame.PlayGame("Scissors"), update => {
              console.log("📡 Transaction Update:", update);
              if (update && (update.status === "confirmed" || update.status === 1)) {
                console.log(" 🍾 Transaction " + update.hash + " finished!");
                console.log(
                  " ⛽️ " +
                    update.gasUsed +
                    "/" +
                    (update.gasLimit || update.gas) +
                    " @ " +
                    parseFloat(update.gasPrice) / 1000000000 +
                    " gwei",
                );
              }
            });
            console.log("awaiting metamask/web3 confirm result...", result);
            console.log(await result);
          }}
        >
          Scissors
        </Button>
      </div>

      <div
        style={{
          border: "1px solid #cccccc",
          padding: 10,
          width: 230,
          margin: "auto",
          marginTop: 32,
          fontWeight: "bolder",
        }}
      >
        {userPlayMove}
      </div>

      <div style={{ margin: 10 }}>
        <span
          className="highlight"
          style={{ marginLeft: 4, /* backgroundColor: "#f9f9f9", */ padding: 4, borderRadius: 4, fontWeight: "bolder" }}
        >
          Vs
        </span>
      </div>

      <div
        style={{
          border: "1px solid #cccccc",
          padding: 10,
          width: 230,
          margin: "auto",
          marginTop: 10,
          fontWeight: "bolder",
        }}
      >
        {computerPlayMove}
      </div>

      <div style={{ padding: 70 }}>
        <Progress percent={progressValue} status="active" />
      </div>

      <div
        style={{
          padding: 10,
          width: 230,
          margin: "auto",
          marginTop: 32,
          fontWeight: "bolder",
        }}
      >
        {victory}
      </div>
    </div>
  );
}

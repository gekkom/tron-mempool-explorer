import type { NextPage } from "next";
import Head from "next/head";
import {
  useEffect,
  useState,
} from "react";
import styles from "../styles/Home.module.css";
const axios = require("axios").default;

import {
  List,
  ListItem,
} from '@chakra-ui/react'

type Transaction = {
  txID: string;
  numOfSeconds: number;
};

const Home: NextPage = () => {
  const [transactionList, setTransactionList] = useState<Transaction[]>(
    []
  );
  let listItems: JSX.Element[] = [];
  const GetTransactions = async () => {
    await axios
      .get("/api/get_mempool_transaction_list")
      .then(function (response: any) {
        const tempTransactions: Transaction[] = [];
        response.data.data.txId.map((txid) => {
          const txID = txid.toString().trim();
          if (
            transactionList.find((t) => t.txID == txID)
          ) {
            tempTransactions.push({
              txID: txID,
              numOfSeconds:
                transactionList.find((t) => t.txID == txID).numOfSeconds + 1,
            });
            console.log(transactionList.find((t) => t.txID == txID).numOfSeconds + 1)
          } else {
            tempTransactions.push({ txID: txID, numOfSeconds: 1 });
          }
        });
        tempTransactions.sort((a, b) => {
          return b.numOfSeconds - a.numOfSeconds;
        }
        );

        setTransactionList(tempTransactions);
      })
      .catch(function (error: { response: any }) {
        // handle error
        console.log(error.response);
      });
  };

  useEffect(() => {
    const id = setInterval(GetTransactions, 100);
    return () => {
      clearInterval(id);
    };
  }, []);

  if (transactionList != null) {
    listItems = transactionList.map((t) => {
      return <ListItem key={t.txID}>{t.numOfSeconds}&emsp;{t.txID}</ListItem>;
    });
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>TRON Mempool Explorer</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>TRON Mempool Explorer</h1>
        <List>{listItems}</List>
      </main>
    </div>
  );
};

export default Home;

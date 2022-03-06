import { useEffect, useState } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { firestore } from "../firebase";
import {
  collection,
  deleteDoc,
  doc,
  DocumentData,
  getDoc,
  getDocs,
  limit,
  query,
  QueryDocumentSnapshot,
  updateDoc,
  onSnapshot,
} from "@firebase/firestore";

type Doc = QueryDocumentSnapshot<DocumentData>;
const Home: NextPage = () => {
  const [identities, setIdentities] = useState<Doc[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const q = query(collection(firestore, "identities"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const identities: any[] = [];
      querySnapshot.forEach((doc) => {
        identities.push(doc);
      });
      setIdentities(identities);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const updateIdentity = async (identity: Doc) => {
    const { done } = identity.data();
    const identityRef = doc(firestore, `identities/${identity.id}`);
    await updateDoc(identityRef, {
      done: !done,
    });
  };

  const deleteIdentity = async (identity: Doc) => {
    const identityRef = doc(firestore, `identities/${identity.id}`);
    await deleteDoc(identityRef);
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Identities app</h1>

        <div className={styles.grid}>
          {loading ? (
            <div className={styles.card}>
              <h2>Loading</h2>
            </div>
          ) : identities.length === 0 ? (
            <div className={styles.card}>
              <h2>No undone identities</h2>
              <p>
                Consider adding a identity from <a href="/add-identity">here</a>
              </p>
            </div>
          ) : (
            identities.map((identity, index) => {
              return (
                <div className={styles.card} key={index}>
                  <h2>{identity.data().name}</h2>
                  <p>{JSON.stringify(identity.data().done)}</p>

                  <div className={styles.cardActions}>
                    <button type="button" onClick={() => updateIdentity(identity)}>
                      Mark as done
                    </button>
                    <button type="button" onClick={() => deleteIdentity(identity)}>
                      Delete
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </main>
    </div>
  );
};

export default Home;

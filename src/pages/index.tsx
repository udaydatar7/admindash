import Head from "next/head";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import Dashboard from "./dashboard";
import Header from "./components/header";
import Sidenav from "./components/sidenav";
import { GetServerSideProps } from 'next';
import Login from "./login/login";
import connectToMongo from '../lib/mongo';

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Login/>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  await connectToMongo();

  console.log("connection successful")

  return {
    props: {}, 
  };
};

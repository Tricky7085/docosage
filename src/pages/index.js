// import Head from "next/head";
// import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import Link from "next/link";
import Layout from "@/components/Navbar/Layout";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <div className={styles.main}>
        <Link className={styles.link} href={"/userInfo/age"}>update Info</Link>
      </div>
    </>
  );
}

Home.NavLayout = Layout

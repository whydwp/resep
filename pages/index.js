import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import "bootstrap/dist/css/bootstrap.css";
import Homes from "./home/index";
export default function Home() {
  return (
    <>
      <Homes></Homes>
    </>
  )
}

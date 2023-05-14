import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import Navbar from '../../components/Navbar';
import { Footer } from '../../components/Footer';
import Hero from '../../components/Hero';
import Content from '../../components/Content';


const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Head>
        <title>FootyWear</title>
        <meta
          name="description"
          content="Step up your game with FootyWear - where performance meets style!"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <>
      
      
      <Hero/>
      
      <Content/>
      
      </>
      
    </>
  );
}

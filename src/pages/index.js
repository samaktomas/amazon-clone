import Head from "next/head";
import { Inter } from "@next/font/google";
import Header from "@/components/Header";
import Banner from "@/components/Banner";
import ProductFeed from "@/components/ProductFeed";

const inter = Inter({ subsets: ["latin"] });

export default function Home({ products }) {
  return (
    <div className="br-gray-100">
      <Head>
        <title>Amazon App</title>
      </Head>
      <Header />
      <main className="max-w-screen-2xl mx-auto">
        {/* Banner */}
        <Banner />

        {/* ProductFeed */}
        <ProductFeed products={products} />
      </main>
    </div>
  );
}

export async function getServerSideProps(ctx) {
  const products = await fetch("https://fakestoreapi.com/products").then(
    (res) => res.json()
  );
  return {
    props: { products },
  };
}

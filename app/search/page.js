import Head from 'next/head';
import ProductList from '@/components/ProductList';
import SearchForm from '@/components/SearchForm';
import axios from '@/lib/axios';
import styles from "./page.module.css";

export default async function Search({ searchParams }) {
  const { q } = await searchParams;

  const res = await axios.get(`/products/?q=${q}`);
  const products = res.data.results ?? [];
  return (
    <>
      <Head>
        <title>{q} 검색 결과 - Codeitmall</title>
      </Head>
      <SearchForm initialValue={q} />
      <h2 className={styles.title}>
        <span className={styles.keyword}>{q}</span> 검색 결과
      </h2>
      <ProductList className={styles.productList} products={products} />
    </>
  );
}

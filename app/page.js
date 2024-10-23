import styles from "./page.module.css";
import ProductList from "@/components/ProductList";
import axios from '@/lib/axios';
import SearchForm from "@/components/SearchForm";

export default async function Home() {
  const res = await axios.get('/products');
  const products = res.data.results;

  return (
    <>
    <SearchForm />
    <ProductList className={styles.productList} products={products}/>
    </>
  );
}

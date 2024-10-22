import axios from '@/lib/axios';
import styles from "./page.module.css";
import StarRating from '@/components/StarRating';
import Spinner from '@/components/Spinner';
import Image from 'next/image';
import SizeReviewContainer from '@/components/SizeReviewContainer';

export default async function Product({ params }) {
  const { id: productId } = await params;
  const res = await axios.get(`/products/${productId}`);
  const product = res.data;  

  if (!product) return (
    <div className={styles.loading}>
      <Spinner />
    </div>
  );

  const res2 = await axios.get(`/size_reviews/?product_id=${productId}`);
  const sizeReviews = res2.data.results ?? [];

  return (
    <>
        <h1 className={styles.name}>
          {product.name}
          <span className={styles.englishName}>{product.englishName}</span>
        </h1>
        <div className={styles.content}>
          <div className={styles.image}>
            <Image fill style={{objectFit: 'cover'}} src={product.imgUrl} alt={product.name} />
          </div>
          <div>
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>제품 정보</h2>
              <div className={styles.info}>
                <table className={styles.infoTable}>
                  <tbody>
                    <tr>
                      <th>브랜드 / 품번</th>
                      <td>
                        {product.brand} / {product.productCode}
                      </td>
                    </tr>
                    <tr>
                      <th>제품명</th>
                      <td>{product.name}</td>
                    </tr>
                    <tr>
                      <th>가격</th>
                      <td>
                        <span className={styles.salePrice}>
                          {product.price.toLocaleString()}원
                        </span>{' '}
                        {product.salePrice.toLocaleString()}원
                      </td>
                    </tr>
                    <tr>
                      <th>포인트 적립</th>
                      <td>{product.point.toLocaleString()}</td>
                    </tr>
                    <tr>
                      <th>구매 후기</th>
                      <td className={styles.starRating}>
                        <StarRating value={product.starRating} />{' '}
                        {product.starRatingCount.toLocaleString()}
                      </td>
                    </tr>
                    <tr>
                      <th>좋아요</th>
                      <td className={styles.like}>
                        ♥
                        {product.likeCount.toLocaleString()}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>
            <SizeReviewContainer product={product} styles={styles} sizeReviews={sizeReviews} />
          </div>
        </div>
    </>
  );
}

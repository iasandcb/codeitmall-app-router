'use client';
import SizeReviewForm from '@/components/SizeReviewForm';
import SizeReviewList from '@/components/SizeReviewList';
import { useState } from 'react';

export default function SizeReviewContainer({ styles, sizeReviews: initialSizeReviews, product }) {
  const [sizeReviews, setSizeReviews] = useState(initialSizeReviews);
  return (
    <>
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>사이즈 추천하기</h2>
          <SizeReviewForm setSizeReviews={setSizeReviews} styles={styles} product={product} />
        </section>
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>사이즈 추천</h2>
          <SizeReviewList sizeReviews={sizeReviews ?? []} />
        </section>
    </>
  );
}
'use client';

import { useState } from 'react';
import Dropdown from '@/components/Dropdown';
import Input from '@/components/Input';
import Button from '@/components/Button';
import sizeReviewLabels from '@/lib/sizeReviewLabels';
import axios from '@/lib/axios';

export default function SizeReviewForm({ styles, product, setSizeReviews }) {
  const [formValue, setFormValue] = useState({
    size: 'M',
    sex: 'male',
    height: 173,
    fit: 'good',
  });

  async function handleSubmit(e) {
    e.preventDefault();
    const sizeReview = {
      ...formValue,
      productId: product.id,
    };
    const res = await axios.post('/size_reviews/', sizeReview);
    const newSizeReview = res.data;
    setSizeReviews((prevSizeReviews) => [
      newSizeReview,
      ...prevSizeReviews,
    ]);
  };

  async function handleInputChange(e) {
    const { name, value } = e.target;
    handleChange(name, value);
  }

  async function handleChange(name, value) {
    setFormValue({
      ...formValue,
      [name]: value,
    });
  };

  return (
    <>
                  <form className={styles.sizeForm} onSubmit={handleSubmit}>
              <label className={styles.label}>
                사이즈
                <Dropdown
                  className={styles.input}
                  name="size"
                  value={formValue.size}
                  options={[
                    { label: 'S', value: 'S' },
                    { label: 'M', value: 'M' },
                    { label: 'L', value: 'L' },
                    { label: 'XL', value: 'XL' },
                  ]}
                  onChange={handleChange}
                />
              </label>
              <label className={styles.label}>
                성별
                <Dropdown
                  className={styles.input}
                  name="sex"
                  value={formValue.sex}
                  onChange={handleChange}
                  options={[
                    { label: sizeReviewLabels.sex['male'], value: 'male' },
                    { label: sizeReviewLabels.sex['female'], value: 'female' },
                  ]}
                />
              </label>
              <label className={styles.label}>
                키
                <Input
                  className={styles.input}
                  name="height"
                  min="50"
                  max="200"
                  type="number"
                  value={formValue.height}
                  onChange={handleInputChange}
                />
              </label>
              <label className={styles.label}>
                사이즈 추천
                <Dropdown
                  className={styles.input}
                  name="fit"
                  value={formValue.fit}
                  options={[
                    { label: sizeReviewLabels.fit['small'], value: 'small' },
                    { label: sizeReviewLabels.fit['good'], value: 'good' },
                    { label: sizeReviewLabels.fit['big'], value: 'big' },
                  ]}
                  onChange={handleChange}
                />
              </label>
              <Button className={styles.submit}>작성하기</Button>
            </form>
</>
  )
}
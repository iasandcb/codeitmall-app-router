import styles from './SearchForm.module.css';
import { redirect } from 'next/navigation'


export default function SearchForm({ initialValue = '' }) {
  const handleSubmit = async (formData) => {
    'use server'
    redirect(`/search?q=${encodeURI(formData.get('q'))}`);
  };

  return (
    <form className={styles.searchForm} action={handleSubmit}>
      <input
        className={styles.searchInput}
        name="q"
        defaultValue={initialValue}
        placeholder="찾고 싶은 옷을 검색해보세요."
      />
      <button type="submit" className={styles.searchButton}>검색</button>
    </form>
  );
}

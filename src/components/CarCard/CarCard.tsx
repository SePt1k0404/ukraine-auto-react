import styles from './CarCard.module.css';

export const CarCard = () => {
  return (
    <li className={styles['car-card']}>
      <img
        src='https://autodnk.com/wp-content/uploads/2024/08/911-gt3-rs-1.webp'
        alt='Car Model'
        className={styles['car-card__image']}
      />
      <div className={styles['car-card__info']}>
        <h2 className={styles['car-card__title']}>Car Model</h2>
        <p className={styles['car-card__year']}>Year: 2025</p>
        <p className={styles['car-card__features']}>
          Key features: Fast, Reliable
        </p>
        <div className={styles['car-card__actions']}>
          <button className={styles['car-card__like-btn']}>❤️ Like</button>
          <span className={styles['car-card__likes']}>10 likes</span>
        </div>
      </div>
    </li>
  );
};

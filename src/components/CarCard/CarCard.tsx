import styles from './CarCard.module.css';
import {
  AiFillHeart,
  AiOutlineCalendar,
  AiOutlineDollar,
  AiOutlineTool,
} from 'react-icons/ai';

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
        <p className={styles['car-card__year']}>
          <AiOutlineCalendar className={styles['car-card__calendar-icon']} />{' '}
          Year: 2025
        </p>
        <p className={styles['car-card__features']}>
          <AiOutlineTool className={styles['car-card__key-icon']} /> Key
          features: Fast, Reliable
        </p>
        <p className={styles['car-card__price']}>
          <AiOutlineDollar className={styles['car-card__price-icon']} /> Price:
          $100,000
        </p>
        <div className={styles['car-card__actions']}>
          <button className={styles['car-card__like-btn']}>
            <AiFillHeart className={styles['car-card__like-icon']} /> Like
          </button>
          <span className={styles['car-card__likes']}>
            <AiFillHeart className={styles['car-card__likes-icon']} /> 10 likes
          </span>
        </div>
      </div>
    </li>
  );
};

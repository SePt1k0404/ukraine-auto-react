import { CarCard } from '../../components/CarCard/CarCard';
import styles from './Home.module.css';

export const Home = () => {
  return (
    <div className={styles['wrapper']}>
      <h1 className={styles['home-page__title']}>Ukraine auto home page:</h1>
      <ul className={styles['cars-list']}>
        <CarCard />
        <CarCard />
        <CarCard />
        <CarCard />
      </ul>
    </div>
  );
};

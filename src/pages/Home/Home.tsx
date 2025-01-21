import { CarCard } from '../../components/CarCard/CarCard';
import { CarsSearch } from '../../components/CarsSearch/CarsSearch';
import styles from './Home.module.css';

export const Home = () => {
  return (
    <div className={styles['wrapper']}>
      <h1 className={styles['home-page__title']}>Ukraine auto home page:</h1>
      <CarsSearch className={styles['cars-search']} />
      <ul className={styles['cars-list']}>
        <CarCard />
        <CarCard />
        <CarCard />
        <CarCard />
      </ul>
    </div>
  );
};

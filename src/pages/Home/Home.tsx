import { CarCard } from '../../components/CarCard/CarCard';
import { CarsSearch } from '../../components/CarsSearch/CarsSearch';

export const Home = () => {
  return (
    <>
      <h1
        className='animate-fadeIn text-secondary-text text-center font-bold text-4xl uppercase tracking-widest relative mb-7
      after:content-[""] after:block after:w-20 after:h-1 after:mt-2 after:mx-auto after:rounded-sm after:bg-gradient-to-r from-main-color to-pink-500'
      >
        Ukraine auto home page:
      </h1>
      <CarsSearch className='animate-fadeIn' />
      <ul className='animate-fadeInUp grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-6 list-none p-0 my-0 mx-auto max-w-[1200px]'>
        <CarCard />
        <CarCard />
        <CarCard />
        <CarCard />
      </ul>
    </>
  );
};

import { Routes, Route } from 'react-router-dom';
import './App.css';
import { SharedLayout } from './components/SharedLayout/SharedLayout';
import { Home } from './pages/Home/Home';
import { About } from './pages/About/About';
import { Services } from './pages/Services/Services';
import { Contact } from './pages/Contact/Contact';
import { UserProfile } from './pages/UserProfile/UserProfile';
import PopUp from './components/PopUp/PopUp';
import { CarCard } from './pages/CarCard/CarCard';
import { Error } from './pages/Error/Error';
import { FavoriteCars } from './pages/FavoriteCars/FavoriteCars';
function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<SharedLayout />}>
          <Route index element={<Home />} />
          <Route path='about' element={<About />} />
          <Route path='services' element={<Services />} />
          <Route path='contact' element={<Contact />} />
          <Route path='profile' element={<UserProfile />} />
          <Route path='carCard/:carId' element={<CarCard />} />
          <Route path='favoriteCars' element={<FavoriteCars />} />
          <Route path='favoriteCars/carCard/:carId' element={<CarCard />} />
          <Route path='*' element={<Error />} />
        </Route>
      </Routes>
      <PopUp />
    </>
  );
}

export default App;

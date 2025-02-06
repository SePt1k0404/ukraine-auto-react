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
import { PrivateRouts } from './components/PrivateRouts/PrivateRouts';
import { Checkout } from './pages/Checkout/Checkout';
import { Comparison } from './pages/Comparison/Comparison';
import { FAQ } from './pages/FAQ/FAQ';
import { PrivacyPolicy } from './pages/PrivacyPolicy/PrivacyPolicy';
function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<SharedLayout />}>
          <Route index element={<Home />} />
          <Route path='about' element={<About />} />
          <Route path='services' element={<Services />} />
          <Route path='contact' element={<Contact />} />
          <Route path='compare' element={<Comparison />} />
          <Route path='faq' element={<FAQ />} />
          <Route path='privacy-policy' element={<PrivacyPolicy />} />

          <Route
            path='profile'
            element={<PrivateRouts element={<UserProfile />} />}
          />
          <Route path='carCard/:carId' element={<CarCard />} />
          <Route
            path='/favoriteCars'
            element={<PrivateRouts element={<FavoriteCars />} />}
          />
          <Route
            path='favoriteCars/carCard/:carId'
            element={<PrivateRouts element={<CarCard />} />}
          />
          <Route
            path='favoriteCars/carCard/:carId/checkout'
            element={<PrivateRouts element={<Checkout />} />}
          />
          <Route
            path='carCard/:carId/checkout'
            element={<PrivateRouts element={<Checkout />} />}
          />
          <Route path='*' element={<Error />} />
        </Route>
      </Routes>
      <PopUp />
    </>
  );
}

export default App;

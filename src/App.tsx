import { Routes, Route } from 'react-router-dom';
import Header from './components/container/Header';
import Footer from './components/container/Footer';
import Hero from './components/container/Hero';
import Trending from './components/container/Trending';
import NewRelease from './components/container/NewRelease';
import MovieDetail from './components/container/MovieDetail';
import FavoritesPage from './components/container/Favorites';
import { SelectedMovieProvider } from './components/context/SelectedMovieProvider';
import { FavoritesProvider } from './components/context/FavoritesProvider';
import { Toaster } from 'sonner';

const HomePage = () => (
  <>
    <Hero />
    <Trending />
    <NewRelease />
  </>
);

function App() {
  return (
    <SelectedMovieProvider>
      <FavoritesProvider>
        <div className='bg-black text-white font-[Poppins] min-h-screen flex flex-col'>
          <Header />
          <main className='flex-1'>
            <Routes>
              <Route path='/' element={<HomePage />} />
              <Route path='/movie/:id' element={<MovieDetail />} />
              <Route path='/favorites' element={<FavoritesPage />} />
            </Routes>
          </main>
          <Footer />
          <Toaster
            position='top-center'
            visibleToasts={1} // only one toast at a time
          />
        </div>
      </FavoritesProvider>
    </SelectedMovieProvider>
  );
}

export default App;

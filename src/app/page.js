



import Banner from './components/Banner';
import Header from './components/Header';
import HeroCarousel from './components/HeroCarousel';
import Categories from './components/Categories';
import Trending  from './components/Trending';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* <Banner /> */}
      <Header />
      <HeroCarousel />
      <Categories />
      <Trending />
    </div>
  );
}

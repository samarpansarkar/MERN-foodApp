import { useState } from "react";
import ExploreMenu from "../../components/ExploreMenu/ExploreMenu";
import HeroCarousel from "../../components/HeroCarousel/HeroCarousel";
import FoodDisplay from "../../components/FoodDisplay/FoodDisplay";

const HomePage = () => {
  const [category, setCategory] = useState("All");

  return (
    <div className='pt-4 animate-fade-in'>
      <HeroCarousel />
      <ExploreMenu category={category} setCategory={setCategory} />
      <FoodDisplay category={category} />

      {/* Footer Navigation Hint */}
      <div className='my-10 flex items-center justify-center'>
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className='group flex flex-col items-center gap-2 text-gray-400 hover:text-primary-600 transition-colors duration-300'
        >
          <span className="text-sm font-medium">Back to Top</span>
          <div className="w-8 h-8 rounded-full border-2 border-current flex items-center justify-center group-hover:-translate-y-1 transition-transform">
            ↑
          </div>
        </button>
      </div>
    </div>
  );
};

export default HomePage;

import { useState } from "react";
import ExploreMenu from "../../components/ExploreMenu/ExploreMenu";
import Header from "../../components/Header/Header";
import FoodDisplay from "../../components/FoodDisplay/FoodDisplay";

const HomePage = () => {
  const [category, setCategory] = useState("All");
  return (
    <div className='pt-4'>
      <Header />
      <ExploreMenu category={category} setCategory={setCategory} />
      <FoodDisplay category={category} />
      <div className='h-10 flex items-center justify-evenly'>
        <a
          href='/'
          className='hover:bg-emerald-500 px-10 duration-700 rounded-lg'>
          <h1 className='text-4xl font-semibold'>SpaNFood</h1>
          <span>(Click to navigate to the top.)</span>
        </a>
      </div>
    </div>
  );
};

export default HomePage;

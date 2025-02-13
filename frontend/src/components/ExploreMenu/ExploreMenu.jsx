import "./ExploreMenu.css";
import { menu_list } from "../../assets/assets";

const ExploreMenu = ({ category, setCategory }) => {
  return (
    <div className='explore-menu' id='explore-menu'>
      <h1>Explore our menu</h1>
      <p className='explore-menu-text'>
        {" "}
        Choose form a diverse menu featuring a delectable array of dishes. Our
        mission is to satisfy your craving and elevate your dining experience,
        one delicious meal at a time.
      </p>
      <div className='explore-menu-list motion-preset-pop motion-duration-1000'>
        {menu_list.map((item) => {
          return (
            <div
              key={item.id}
              onClick={() =>
                setCategory((prev) =>
                  prev === item.menu_name ? "All" : item.menu_name
                )
              }
              className='explore-menu-list-item'>
              <img
                className={category === item.menu_name ? "active" : ""}
                src={item.menu_image}
                alt=''
              />
              <p>{item.menu_name}</p>
            </div>
          );
        })}
      </div>
      <hr />
    </div>
  );
};

export default ExploreMenu;

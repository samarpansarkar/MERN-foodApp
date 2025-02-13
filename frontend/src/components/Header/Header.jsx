import "./Header.css";

const Header = () => {
  return (
    <div className='header'>
      <div className='header-contents'>
        <h2>Order your favorite food here</h2>
        <p>
          Choose from a diverse selection of authentic Indian cuisine. Enjoy
          your meal with ease.
        </p>
        <a href='/#explore-menu'>View Menu</a>
      </div>
    </div>
  );
};

export default Header;

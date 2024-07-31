import { useContext, useState } from "react";
import "./ListPage.css";
import { toast } from "react-toastify";
import axios from "axios";
import { useEffect } from "react";
import { AdminContext } from "../../context/AdminContext";

const ListPage = () => {
  const { url } = useContext(AdminContext);
  const [list, setList] = useState([]);

  const fetchList = async () => {
    const response = await axios.get(`${url}/api/food/list`);

    console.log(response.data);
    if (response.data.success) {
      setList(response.data.data), toast.success(response.data.message);
    } else {
      toast.error(response.data.message);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  //!remove food item from list
  const removeItem = async (foodId) => {
    const response = await axios.post(`${url}/api/food/remove-food`, {
      id: foodId,
    });
    await fetchList();
    if (response.data.success) {
      toast.success(response.data.message);
    } else {
      toast.error("Fail to delete");
    }
  };
  return (
    <div className='list add flex-col'>
      <p>All food list</p>
      <div className='list-table'>
        <div className='list-table-format title'>
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {list.map((item, index) => {
          return (
            <div className='list-table-format' key={index}>
              <img src={`${url}/images/` + item.image} alt='' />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>{item.price}</p>
              <div className='list-btn'>
                <button>Edit</button>
                <button onClick={() => removeItem(item._id)}>Delete</button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ListPage;

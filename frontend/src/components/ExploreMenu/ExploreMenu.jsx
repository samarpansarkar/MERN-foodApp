import { menu_list } from "../../assets/assets"

const ExploreMenu = ({ category, setCategory }) => {
    console.log(category);
    return (
        <div className="flex-col text-gray-700 border border-orange-300 my-4 p-1 rounded-md" id="explore-menu">
            <h1 className="text-orange-600  text-3xl underline text-center">Explore our menu</h1>
            <p className="max-w-[60%] my-3"> Choose form a diverse menu featuring a delectable array of dishes. Our mission is to satisfy your craving and elevate your dining experience, one delicious meal at a time.</p>
            <div className="flex justify-between items-center gap-3 text-center m-5 h-50 rounded-2xl p-1">
                {menu_list.map((item) => {
                    return (<div key={item.id} onClick={() => setCategory(item.menu_name)} className="p-2 bg-gray-100 items-center text-center text-orange-500 text-lg flex flex-col w-64 h-fit border border-red-200 rounded-full cursor-pointer">
                        < img src={item.menu_image} alt="" />
                        <p>{item.menu_name}</p>
                    </div>)
                })}
            </div>
        </div >
    )
}

export default ExploreMenu

import { useEffect, useState } from "react";
import { SidebarData } from "../../components/data/SidebarData";
import { useNavigate } from "react-router-dom";

const BottomBar = () => {
  const navigate = useNavigate();
  const [bottomBarData, setBottomBarData] = useState([]);
  const [activeButton, setActiveButton] = useState("Dashboard");

  useEffect(() => {
    setBottomBarData(SidebarData);
  }, []);

  const handleClickButton = (link, name) => {
    console.log(link);
    console.log("Clicked");
    setActiveButton(name);
    navigate(link);
  };

  return (
    <div className="flex p-2 bg-[#E6E6FA]">
      <div className="flex border-t flex-1 rounded-2xl shadow-2xl lg:hidden focus p-2">
        {bottomBarData.length > 0 &&
          bottomBarData.map((data) => (
            <button
              key={data.id}
              className={`flex justify-evenly flex-1 hover:scale-150 rounded-lg active:shadow-xl hover:shadow-xl py-2 ${
                activeButton === data.name ? "bg-[#E6E6FA]" : ""
              }`}
              onClick={() => handleClickButton(data.link, data.name)} // Correctly pass the function
            >
              {data.icon}
            </button>
          ))}
      </div>
    </div>
  );
};

export default BottomBar;

import { Icons } from "../../components/data/Icons";

const Navbar = () => {
  return (
    <div className="flex border-b p-10 border-black sticky top-0 justify-between">
      <span></span>
      <button className="lg:hidden">
        <Icons.HiMiniBars3BottomRight size="24px" />
      </button>
    </div>
  );
};

export default Navbar;

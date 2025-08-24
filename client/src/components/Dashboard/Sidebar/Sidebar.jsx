import IconButton from "../../ui/IconButton";
import { BiSolidEdit } from "react-icons/bi";
import SearchArea from "./SearchArea";
import FriendZone from "./FriendsZone";
import SearchResult from "./SearchResults";
import { useSelector } from "react-redux";

function Sidebar() {
  const { isSearchActive } = useSelector((store) => store.search);
  return (
    <div className="min-w-[400px] h-full bg-primary rounded-xl px-2 flex flex-col">
      <div className="px-2 py-3">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-inter font-semibold">Chats</h1>
          <IconButton>
            <BiSolidEdit size={22} />
          </IconButton>
        </div>

        <div className="w-full mt-4">
          <SearchArea />
        </div>
      </div>

      <div className="flex-1 overflow-y-scroll scrollBar pe-2">
        {isSearchActive ? <SearchResult /> : <FriendZone />}
      </div>
    </div>
  );
}

export default Sidebar;

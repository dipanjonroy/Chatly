import { RxCross2 } from "react-icons/rx";
import SearchInput from "../../ui/SearchInput";
import { GoSearch } from "react-icons/go";
import IconButton from "../../ui/IconButton";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import {
  clearSearcValue,
  setSearchBarActive,
  setSearchValue,
} from "../../../features/main/searchSlice";

function SearchArea() {
  const { isSearchActive, searchValue } = useSelector((store) => store.search);
  const dispatch = useDispatch();

  const handleClearSearch = () => {
    dispatch(clearSearcValue());
    dispatch(setSearchBarActive(true))
  };

  const handleSearchChange = (e) => {
    dispatch(setSearchValue(e.target.value));
  };

  return (
    <div className="flex items-center gap-2">
      {isSearchActive && (
        <IconButton onClick={() => dispatch(setSearchBarActive(false))}>
          <FaArrowLeftLong size={20} />
        </IconButton>
      )}
      <div className="relative w-full">
        <GoSearch
          size={18}
          color="#a3a5a5ff"
          className="absolute left-6 top-1/2 transform -translate-1/2"
        />
        <SearchInput
          placeholder="Search Messenger"
          onclick={() => dispatch(setSearchBarActive(true))}
          value={searchValue}
          onChange={handleSearchChange}
        />

        {searchValue && (
          <button
            className="absolute right-0 top-1/2 transform -translate-1/2 cursor-pointer w-5 h-5 border border-white flex items-center justify-center rounded-full p-1"
            onClick={handleClearSearch}
          >
            <RxCross2 size={20} />
          </button>
        )}
      </div>
    </div>
  );
}

export default SearchArea;

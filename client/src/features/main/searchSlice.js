import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isSearchActive: false,
  searchValue: "",
};

const searchSlice = createSlice({
  name: "Search",
  initialState,
  reducers: {
    setSearchBarActive: (state, action) => {
      state.isSearchActive = action.payload;
    },
    setSearchValue: (state, action) => {
      state.searchValue = action.payload;
    },
    clearSearcValue: (state) => {
      state.searchValue = "";
    },
  },
});

export const { setSearchBarActive, setSearchValue, clearSearcValue } =
  searchSlice.actions;
export default searchSlice.reducer;

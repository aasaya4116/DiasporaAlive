import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FilterState {
  activeFilters: string[];
}

const initialState: FilterState = {
  activeFilters: [],
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    toggleFilter: (state, action: PayloadAction<string>) => {
      const filter = action.payload;
      const index = state.activeFilters.indexOf(filter);
      if (index >= 0) {
        state.activeFilters.splice(index, 1);
      } else {
        state.activeFilters.push(filter);
      }
    },
    clearFilters: (state) => {
      state.activeFilters = [];
    },
  },
});

export const { toggleFilter, clearFilters } = filterSlice.actions;
export default filterSlice.reducer;
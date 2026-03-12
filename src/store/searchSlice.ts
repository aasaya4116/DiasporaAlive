import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SearchResult {
  id: string;
  name: string;
  type: string;
  relevance: number;
}

interface SearchState {
  query: string;
  results: SearchResult[];
  suggestions: string[];
  isSearching: boolean;
  showResults: boolean;
}

const initialState: SearchState = {
  query: '',
  results: [],
  suggestions: [],
  isSearching: false,
  showResults: false,
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setQuery: (state, action: PayloadAction<string>) => {
      state.query = action.payload;
    },
    setResults: (state, action: PayloadAction<SearchResult[]>) => {
      state.results = action.payload;
      state.showResults = action.payload.length > 0;
      state.isSearching = false;
    },
    setSuggestions: (state, action: PayloadAction<string[]>) => {
      state.suggestions = action.payload;
    },
    setSearching: (state, action: PayloadAction<boolean>) => {
      state.isSearching = action.payload;
    },
    clearSearch: (state) => {
      state.query = '';
      state.results = [];
      state.suggestions = [];
      state.showResults = false;
      state.isSearching = false;
    },
  },
});

export const { setQuery, setResults, setSuggestions, setSearching, clearSearch } = searchSlice.actions;
export default searchSlice.reducer;
// -> ContextAPI

// 1.  context creation 
// 2.  provider          
// 3.  consumer --> remove due to length process
// 34  useContext Hook


import React, { useContext, createContext, useReducer, useEffect } from "react";
import Reducer from "./Reducer";

let API = "https://hn.algolia.com/api/v1/search?";

const initialState = {
  isLoading: true,
  query: "HTML", 
  nbPages: 0,
  page: 0,
  hits: [],
};

const AppContext = createContext();

// now we'll create a provider function
const AppProvider = ({ children }) => {
  // const [state , setState] = useState(initialState)
  const [state, dispatch] = useReducer(Reducer, initialState);

  const fetchApidata = async (url) => {
    dispatch("SET_LOADING");

    try {
      const response = await fetch(url);
      const data = await response.json();

      console.log(data);
      dispatch({
        type: "GET_STORIES",
        payload: {
          hits: data.hits,
          nbPages: data.nbPages,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  // to remove post
  const removePost = (post_id) => {
    dispatch({
      type: "REMOVE_POST",
      payload: post_id,
    });
  };

  // to search post
  const searchPost = (searchQuerry) => {
    dispatch({
      type: "SEARCH_QUERRY",
      payload: searchQuerry,
    });
  };

  // pagination
  const getNextPage = ()=>{
    dispatch({
      type : "NEXT_PAGE"
    })
  }

  const getPrevPage = ()=>{
    dispatch({
      type : "PREV_PAGE"
    })
  }

  useEffect(() => {
    fetchApidata(`${API}query=${state.query}&page=${state.page}`);
  }, [state.query , state.page]);

  return (
    <>
      <AppContext.Provider value={{ ...state, removePost, searchPost , getNextPage , getPrevPage }}>
        {children}
      </AppContext.Provider>
    </>
  );
};

// custom hook creation
const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider, useGlobalContext };

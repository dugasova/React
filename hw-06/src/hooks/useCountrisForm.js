import { useReducer, useEffect } from "react";
import { initialState, reducer } from "../store/reducer";
import countries from "../services/countries";
import { actionCreator } from "../store/store";
import { SET_COUNTRIES_LIST, SET_SELECTED_COUNTRY, SET_SELECTED_TRANSLATION } from "../store/countries/actions";

export default function useCountrisForm() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchData = async () => {

    try {
      const countriesData = await countries.get();
      dispatch(actionCreator(SET_COUNTRIES_LIST, countriesData));
      dispatch(actionCreator(SET_SELECTED_TRANSLATION, Object.entries(countriesData[0].translations)[0][0] ));
    } catch (error) {
      console.log(error);
    }
  };

  const handleCountryChange = (value) => {
    const country = state.countriesList.findIndex(c => c.capital[0] === value);
    dispatch(actionCreator(SET_SELECTED_COUNTRY, country));
    dispatch(actionCreator(SET_SELECTED_TRANSLATION, Object.entries(state.countriesList[country].translations)[0][0] ));
  };

  const handleTranslationChange = (event) => {
    dispatch(actionCreator(SET_SELECTED_TRANSLATION, event.target.value));
  };

  const deleteCountry = async (id) => {
    try {
      await countries.delete(id);
      fetchData();
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchData();
    return () => {
      console.log('Cleanup in useEffect');
    }    
  }, []);

  const selectedCountry = state.selectedCountry;
  const selectedTranslation = state.selectedTranslation;
  const countriesList = state.countriesList;

  return {
    countriesList,
    selectedCountry,
    selectedTranslation,
    deleteCountry,
    state,
    handleCountryChange,
    handleTranslationChange
  };
};
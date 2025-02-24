import {SET_COUNTRIES_LIST, SET_SELECTED_COUNTRY, SET_SELECTED_TRANSLATION} from "./countries/actions";

const initialState = {
  countriesList: [],
  selectedCountry: null,
  selectedTranslation: ''
};

const reducer = (state = initialState, {type, payload}) => {
  switch (type) {
    case SET_COUNTRIES_LIST:
      return {
        ...state,
        countriesList: payload
      };
    case SET_SELECTED_COUNTRY:
      return {
        ...state,
        selectedCountry: payload,
      };
    case SET_SELECTED_TRANSLATION:
      return {
        ...state,
        selectedTranslation: payload
      };
    default:
      return state;
  }
};

export {reducer, initialState};
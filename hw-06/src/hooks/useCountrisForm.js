import {  useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCountry, setTranslation } from "../store/countries/slice";

export default function useCountrisForm(countries) {
  const { selectedCountry, selectedTranslation } = useSelector(
    (state) => state.countries
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (countries.length) {
      dispatch(setCountry());
    }
  }, [countries]);

  useEffect(() => {
    dispatch(setTranslation());
  }, [selectedCountry]);

  const selectCountry = (value) => {
    dispatch(setCountry(value));
  };

  const selectTranslation = (value) => {
    dispatch(setTranslation(value));
  };

  return {
    selectedCountry,
    selectedTranslation,
    selectCountry,
    selectTranslation,
  };
}
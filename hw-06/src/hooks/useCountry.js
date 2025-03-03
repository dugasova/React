import  { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import thunks from "./../store/countries/thunks"

export default function useCountry(id) {
  const {selectedCountry} = useSelector((state) => state.countries)

  const dispatch = useDispatch();

  useEffect(() => {
    !selectedCountry && dispatch(thunks.fetchCountry(id))
    
  }, []);
  const deleteCountry = (id) => {
    dispatch(thunks.fetchDeleteCountry(id))
  }

  return {deleteCountry, selectedCountry}
}

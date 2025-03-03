import { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import thunks from "./../store/countries/thunks";

export default function useCountries() {

  const { countries } = useSelector((state) => state.countries)
  const dispatch = useDispatch();

  useEffect(() => {
    !countries.length && dispatch(thunks.fetchCountries());
  }, [])

  return { countries }
}

import Button from '../Button/Button';
import './style.scss';
import useCountrisForm from '../../hooks/useCountrisForm';
import { useNavigate } from "react-router-dom";

export default function CountryForm() {
  const { selectedCountry, countriesList,
    selectedTranslation,
    handleCountryChange,
    handleTranslationChange
  } = useCountrisForm();

  const currentCountry = selectedCountry !== null ? selectedCountry : 0;
  const navigation = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigation(`/country/${currentCountry}?trans=${selectedTranslation}`);
  };

  return (
    <>
      <div className='country'>
        <h3>Capital Form Component</h3>
        {countriesList.length ? (

          <form className='countryform' onSubmit={handleSubmit}>
            <label> Select Capital: {' '}
              <select onChange={e => handleCountryChange(e.target.value)}>
                {countriesList.map((country, key) => (
                  <option key={key} value={country.capital}>
                    {country.flag} {country.capital}
                  </option>
                ))}
              </select>
            </label>
            <label> Select Translation: {' '}
              <select onChange={handleTranslationChange} value={selectedTranslation}>
                {countriesList.length ? Object.keys(countriesList[currentCountry].translations).map((key) => (
                  <option key={key} value={key}>{key}</option>
                )) : null}
              </select>
            </label>
            <Button title={`Read more about ${selectedCountry !== null
              ? countriesList[selectedCountry].name.official
              : 'capital'
              }`} className='form__btn' />
          </form>
        ) : null}
      </div>
    </>
  )
}

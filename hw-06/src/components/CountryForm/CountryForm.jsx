import Button from '../Button/Button';
import './style.scss';
import useCountrisForm from '../../hooks/useCountrisForm';
import { useNavigate } from "react-router-dom";
import useCountries from '../../hooks/useCountries';

export default function CountryForm() {
  const { countries } = useCountries();
  const {
    selectedCountry,
    selectedTranslation,
    selectCountry,
    selectTranslation
  } = useCountrisForm(countries);

  const handleSelectCountry = (e) => selectCountry(e.target.value);
  const handleSelectTranslation = (e) => selectTranslation(e.target.value);

  const navigation = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    navigation(`/country/${selectedCountry.id}?trans=${selectedTranslation}`);
  };


  return (
    <>
      <div className='country'>
        <h3>Capital Form Component</h3>
        {countries.length && selectedCountry ? (
          <form className='countryform' onSubmit={handleSubmit}>
            <label> Select Capital: {' '}
              <select onChange={handleSelectCountry} value={selectedCountry.id}>
                {countries.map((country) => (
                  <option key={country.id} value={country.id}>
                    {country.flag} {country.capital[0]}
                  </option>
                ))}
              </select>
            </label>
            <label> Select Translation: {' '}
              {selectedTranslation ? (
                <select
                  onChange={handleSelectTranslation}
                  value={selectedTranslation}
                >
                  {Object.keys(selectedCountry.translations).map((key, index) => (
                    <option key={index} value={key}>
                      {key}
                    </option>
                  ))}
                </select>
              ) : null}
            </label>
            <Button title={`Read more about ${selectedCountry.name.official} `} />
          </form>
        ) : null}
      </div>
    </>
  )
}

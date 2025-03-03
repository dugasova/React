import { Link } from "react-router-dom";
import Button from "../Button/Button";
import "./style.scss";
import useCountries from "../../hooks/useCountries";
import useCountry from "../../hooks/useCountry";

export default function CountriesList() {
  const { countries } = useCountries();
  const { deleteCountry } = useCountry();

  const handleDelete = (ind) => {
    deleteCountry(ind);
  };


  return (
    countries.length ? (
      <div className="countries__list">
        <h2>Countries</h2>
        <ul>
          {countries.map((country) => (
            <li key={country.id}>
              <Link to={`/country/${country.id}`}>{country.flag}  {country.name.official}</Link>
              <Button className="btn-delete" title="DELETE" handleClick={() => handleDelete(country.id)} />
            </li>
          ))}
        </ul>
      </div>
    ) : (
      <h2>Loading...</h2>
    )
  )
}

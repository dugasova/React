import { Link } from "react-router-dom";
import useCountrisForm from "../../hooks/useCountrisForm";
import Button from "../Button/Button";
import "./style.scss";

export default function CountriesList() {
  const { countriesList, deleteCountry } = useCountrisForm();
  return (
    countriesList.length ? (
      <div className="countries__list">
        <h2>Countries</h2>
        <ul>
          {countriesList.map((country, ind) => (
            <li key={ind}>
              <Link to={`/country/${ind}`}>{country.flag}  {country.name.official}</Link>
              <Button className="btn-delete" title="DELETE" handleClick={() => deleteCountry(ind)} />
            </li>
          ))}
        </ul>
      </div>
    ) : (
      <h2>Loading...</h2>
    )
  )
}

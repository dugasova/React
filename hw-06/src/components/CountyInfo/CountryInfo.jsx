import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import useCountrisForm from "../../hooks/useCountrisForm";
import './style.scss';

export default function CountryInfo() {
  const { id } = useParams();

  const [searchParams] = useSearchParams();
  const translation = searchParams.get(`trans`);

  const { countriesList, deleteCountry } = useCountrisForm();

  const navigation = useNavigate();

  const handleDelete = () => {
    deleteCountry(id);
    navigation("/countries");
  };

  const renderProperties = (obj) => {
    return Object.keys(obj).map(key => {
      if (key === 'id') return null;
      if (typeof obj[key] === 'object' && obj[key] !== null) {
        if (Array.isArray(obj[key])) {
          return (
            <li key={key}>
              <span className="prop_head">{key}:</span> {obj[key].join(', ')}
            </li>
          );
        } else {
          return (
            <li key={key}>
              <span className="prop_head">{key}:</span> <ul>{renderProperties(obj[key])}</ul>
            </li>
          );
        }
      } else {
        return (
          <li key={key}>
            <span className="prop_name">{key}:</span> {obj[key]}
          </li>
        );
      }
    });
  };

  return (
    id && countriesList.length > 0 ? (
      <div className="country__info">
        <h3>
          {translation && countriesList[id].translations[translation]
            ? countriesList[id].translations[translation].official
            : countriesList[id].name.official
          }
        </h3>

        <ul>
          {renderProperties(countriesList[id])}
          <li><button className="btn_delete" onClick={handleDelete}>Delete Country</button></li>
        </ul>
      </div>
    ) : null
  )
}

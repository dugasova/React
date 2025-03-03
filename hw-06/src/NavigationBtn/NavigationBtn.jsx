import { useNavigate } from "react-router-dom";

export default function NavigationBtn({ title, route }) {
  const navigation = useNavigate();
  const handleRedirect = () => navigation(route);
  return <button onClick={handleRedirect}>{title}</button>;
}
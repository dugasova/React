import CountryInfo from '../components/CountyInfo/CountryInfo'
import NavigationBtn from '../NavigationBtn/NavigationBtn'

export default function CountryRoute() {
  return (
    <div>CountryRoute
      <CountryInfo />
      <NavigationBtn title={"Back to Countries Page"} route={"/countries"} />
    </div>
  )
}

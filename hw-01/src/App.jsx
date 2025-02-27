
import React from 'react';
import './App.css';
const CARS = [
  {
    id: 1,
    brand: "Audi",
    models: [
      {
        id: 1,
        name: "A1",
        collection: [
          {
            id: 1,
            version: "Sportback",
            year: 2019,
            horsepower: 95,
            engine: 999
          },
          {
            id: 2,
            version: "Citycarver",
            year: 2019,
            horsepower: 95,
            engine: 999
          }
        ]
      },
      {
        id: 2,
        name: "Q5",
        collection: [
          {
            id: 1,
            version: "FY 2021",
            year: 2021,
            horsepower: 299,
            engine: 1984
          },
          {
            id: 2,
            version: "Sportback",
            year: 2021,
            horsepower: 299,
            engine: 1984
          }
        ]
      },
      {
        id: 3,
        name: "TT",
        collection: [
          {
            id: 1,
            version: "Coupe",
            year: 2021,
            horsepower: 197,
            engine: 1984
          },
          {
            id: 2,
            version: "Roadster",
            year: 2021,
            horsepower: 197,
            engine: 1984
          }
        ]
      }
    ]
  },
  {
    id: 2,
    brand: "BMW",
    models: [
      {
        id: 1,
        name: "8 series",
        collection: [
          {
            id: 1,
            version: "G1X LCI",
            year: 2022,
            horsepower: 333,
            engine: 2998
          },
          {
            id: 2,
            version: "G1X",
            year: 2019,
            horsepower: 340,
            engine: 2998
          }
        ]
      },
      {
        id: 2,
        name: "X6",
        collection: [
          {
            id: 1,
            version: "G06 LCI",
            year: 2023,
            horsepower: 530,
            engine: 4395
          },
          {
            id: 2,
            version: "G06",
            year: 2020,
            horsepower: 286,
            engine: 2993
          }
        ]
      }
    ]
  },
];


function App() {

  return (
    <div className=' container'>
      <h1 className="heading">Cars Specs</h1>
      <table>
        <tbody>
          {CARS.map((carBrand) => (
            <React.Fragment key={carBrand.id}>
              <tr key={carBrand.id} className="row__brand">
                <td colSpan={2}>{carBrand.brand}</td>
              </tr>
              {carBrand.models.map((carModel) => (
                <React.Fragment key={carModel.id}>
                  <tr key={carModel.id} className="row__model">
                    <td rowSpan={carModel.collection.length + 1} className="cell__model">{carModel.name}</td>
                  </tr>
                  {carModel.collection.map((item) => (
                    <tr key={item.id} className="row__collection">
                      <td>
                        <ul >
                          <li>Version: {item.version}</li>
                          <li>Year: {item.year}</li>
                          <li>Engine: {item.engine}</li>
                          <li>Horsepower: {item.horsepower}</li>
                        </ul>
                      </td>
                    </tr>
                  ))}
                </React.Fragment>
              ))}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default App

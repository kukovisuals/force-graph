import { useState } from "react";
import GraphParent from "./components/Graph/GraphParent";
import useWindowSize from "./components/WindowSize/useWindowSize";
import useIncomingOne from "./filterData/useIncomingOne";

import "./App.scss";

function App() {
  const dataset = useIncomingOne();
  const [x, y] = useWindowSize();
  const [csvFile, setCsvFile] = useState("");

  const [csvReader, setCsvReader] = useState([])
  const fileReader = new FileReader();

  const groups = 6;
  const marginX = 100;
  const marginY = 50;

  const ancho = x - marginX;
  const alto = y - marginY;

  const handleChange = (e) => {
    setCsvFile(e.target.files[0])
  }
  const handleSubmit = (e) => {
    e.preventDefault();

    if (csvFile) {
      fileReader.onload = function (event) {
        const text = event.target.result;
        csvFileToArray(text)
      };

      fileReader.readAsText(csvFile);
    }
  };

   const csvFileToArray = string => {
    const csvHeader = string.slice(0, string.indexOf("\n")).split(",");
    const csvRows = string.slice(string.indexOf("\n") + 1).split("\n");

    const array = csvRows.map(i => {
      const values = i.split(",");
      const obj = csvHeader.reduce((object, header, index) => {
        object[header] = values[index];
        return object;
      }, {});
      return obj;
    });

    setCsvReader(array);
  };
  const headerKeys = Object.keys(Object.assign({}, ...csvReader));

  
  return (
    <div className="App">
      <div className="dashBoard_component">
        <div className="loadData_components">
          <div className="loadData_component_item1">
            <div className="loadData_component_title">
              <h4>Upload File CSV</h4>
              <p>
                Look at the example on the right to guide you in how to format
                the CSV file
              </p>
            </div>
            <div className="loadData_component_csv">
              <form>
                <input
                  type="file"
                  className="loadData_components_input"
                  accept=".csv"
                  onChange={handleChange}
                />
                <img className="loadData_component_img" src="./favicon.ico" />
                <button onClick={(e) => handleSubmit(e)}>x</button>
              </form>
            </div>
          </div>

          <div className="loadData_component_item2">
            <div className="loadData_component_item2_wrapper">
              <h4>Example</h4>
              <p> teacher, student, salary </p>
              <p> Bobby, carla, 100000 </p>
              <p> Patrick, shawn, 0 </p>
              <p> Bobby, shawn, 0 </p>
              <p> Nataly, antonio, 80000 </p>
            </div>
          </div>

          <div className="loadData_component_item3">
            <input
              className="loadData_component_item_input"
              type="text"
              placeholder="minimum"
            />
            <input
              className="loadData_component_item_input"
              type="text"
              placeholder="maximum"
            />
            <div className="loadData_component_item_button">
              <button>send</button>
            </div>
          </div>

          <div className="loadData_component_item4">
            <div className="loadData_component_item4_wrapper">
              <h4>Salary Range</h4>
              <p>Specify the desired range of salary </p>
              <p>minimum: 90000</p>
              <p>maximum: 190000</p>
            </div>
          </div>
        </div>
      </div>

      <GraphParent
        nodes={dataset}
        width={ancho}
        height={alto}
        grupos={groups}
      />
    </div>
  );
}

export default App;

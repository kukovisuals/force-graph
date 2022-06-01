import { useState } from "react";

import GraphParent from "./components/Graph/GraphParent";
import useWindowSize from "./components/WindowSize/useWindowSize";
import useIncomingOne from "./filterData/useIncomingOne";

import "./App.scss";

const initialSalary = { minimum: 70000, maximum: 200000 };

function App() {
  const [x, y] = useWindowSize();
  const [csvFile, setCsvFile] = useState("");

  const [csvReader, setCsvReader] = useState([]);

  const [salary, setSalary] = useState(initialSalary);
  // const [sendSalary, setSendSalary] = useState([]);

  const [groupsName, setGroupName] = useState("");
  // const [group, setGroup] = useState([]);

  const [circleSize, setCircleSize] = useState({ main: 50, min: 3, max: 15 });
  const [sendCircleSize, setSendCircleSize] = useState({
    parent: 50,
    minimo: 3,
    maximo: 15,
  });


  const marginX = 50;
  const marginY = 50;

  const ancho = x - marginX;
  const alto = y - marginY;

  const handleChange = (e) => {
    setCsvFile(e.target.files[0]);
  };
  const handleSubmit = (e) => {
    e.preventDefault();

      const fileReader = new FileReader();
    if (csvFile) {
      fileReader.onload = function (event) {
        const text = event.target.result;
        csvFileToArray(text);
      };

      fileReader.readAsText(csvFile);
    }
    setCsvFile("");
  };

  const csvFileToArray = (string) => {
    const csvHeader = string.slice(0, string.indexOf("\n")).split(",");
    const csvRows = string.slice(string.indexOf("\n") + 1).split("\n");

    const array = csvRows.map((i) => {
      const values = i.split(",");
      const obj = csvHeader.reduce((object, header, index) => {
        // console.log(header)
        if (header === "salary") {
          object[header] = +values[index];
        } else {
          object[header] = values[index];
        }
        return object;
      }, {});
      return obj;
    });

    setCsvReader(array);
  };

  // const handleSalarySubmit = (e) => {
  //   e.preventDefault();
  //   setSendSalary([salary.minimum, salary.maximum]);
  // };

  const handleCirclesSubmit = (e) => {
    e.preventDefault();
    let { main, min, max } = circleSize;
    let parent = +main;
    let minimo = +min;
    let maximo = +max;

    if (parent > 100) {
      parent = 100;
      alert("mmm don't make it bigger then 100 ");
    } else if (parent < 0) {
      parent = 10;
      alert("The size of the group can't be lower then 0 ");
    }

    if (minimo === maximo) {
      alert("The size of lowest and highest can't be the same ");
      minimo = 3;
      maximo = 15;
    } else if (minimo > 100) {
      minimo = 25;
    } else if (minimo < 0) {
      main = 3;
      alert(" can't be lower then 0 ");
    }

    if (maximo > 100) {
      maximo = 50;
    } else if (maximo < 0) {
      maximo = 15;
      alert("can't be lower then 0 ");
    }

    setSendCircleSize({ parent, minimo, maximo });
  };

  const [school, groups] = useIncomingOne(csvReader, sendCircleSize);

  console.log(school, groups);
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
                <div className="loadData_component_csv_wrapper">
                  <input
                    type="file"
                    className="loadData_components_input"
                    accept=".csv"
                    onChange={handleChange}
                  />
                  {/* <img className="loadData_component_img" src="./favicon.ico" /> */}
                </div>
                <button onClick={(e) => handleSubmit(e)}>&#10004;</button>
              </form>
            </div>
          </div>

          <div className="loadData_component_item2">
            <div className="loadData_component_item2_wrapper">
              <div className="loadData_component_item2_wrapper_text">
                <h4>The groups</h4>
                <p>
                  Type name of the group ie. if the name in the data is
                  <b> Carla Human Service</b>, just type: <b>carla</b>
                </p>
              </div>
              <form>
                <input
                  className="loadData_component_item2_input"
                  value={groupsName}
                  onChange={(e) => setGroupName(e.target.value)}
                />
                <button className="hideButton">x</button>
              </form>
            </div>
          </div>

          <div className="loadData_component_item4">
            <div className="loadData_component_item4_wrapper">
              <h4>Size of Circles</h4>
              <form onSubmit={handleCirclesSubmit}>
                <div className="loadData_component_item4_items">
                  <input
                    required
                    type="text"
                    value={circleSize.main}
                    onChange={(e) =>
                      setCircleSize({ ...circleSize, main: e.target.value })
                    }
                  />
                  <span>Group</span>
                </div>
                <div className="loadData_component_item4_items">
                  <input
                    required
                    type="text"
                    value={circleSize.min}
                    onChange={(e) =>
                      setCircleSize({ ...circleSize, min: e.target.value })
                    }
                  />
                  <span>Lowest</span>
                </div>
                <div className="loadData_component_item4_items">
                  <input
                    required
                    type="text"
                    value={circleSize.max}
                    onChange={(e) =>
                      setCircleSize({ ...circleSize, max: e.target.value })
                    }
                  />
                  <span>Greatest</span>
                </div>
                <div className="loadData_component_item4_items">
                  <button className="loadData_component_item4_button">
                    &#10004;
                  </button>
                </div>
              </form>
            </div>
          </div>

          <div className="loadData_component_item3">
            <form
              // onSubmit={handleSalarySubmit}
              className="loadData_component_form"
            >
              <input
                className="loadData_component_item_input"
                type="text"
                placeholder="minimum"
                value={salary.minimum}
                onChange={(e) => setSalary({ minimum: e.target.value })}
              />
              <input
                className="loadData_component_item_input"
                type="text"
                placeholder="maximum"
                value={salary.maximum}
                onChange={(e) => setSalary({ maximum: e.target.value })}
              />
              <div className="loadData_component_item_button">
                <button>send</button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {school.length > 0 ? (
        <GraphParent
          nodes={school}
          width={ancho}
          height={alto}
          groups={groups}
        />
      ) : (
        <p>Waiting for data...</p>
      )}
    </div>
  );
}

export default App;

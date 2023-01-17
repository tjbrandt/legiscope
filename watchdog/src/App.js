import "./App.css";
import Loading from "./components/Loading";
// import Table from "./components/Table";
import React, { Suspense } from "react";
import { getMemberData } from "./modules/propublicaAPIcalls";

const Table = React.lazy(() => import("./components/Table"));

function App() {
  const [senatorList, setSenatorList] = React.useState([]);
  const [representativeList, setRepresentativeList] = React.useState([]);
  const [graphsData, setGraphsData] = React.useState({
    dwNominate: 0,
    votesWithPartyPercent: 49,
    votesAgainstPartyPercent: 51,
    missedVotesPercent: 5,
  });

  const changeGraphs = (newData) => {
    //TODO finish this function to update Graphs component based on which member's button was clicked, then pass to Table component to pass to Button within
  };

  //API call to get congress person data from ProPublica

  React.useEffect(
    () =>
      async function () {
        // proPublicaAPI function from module performs call twice to gather information from both chambers
        const senatorList = await getMemberData("senate");
        const representativeList = await getMemberData("house");

        setSenatorList(senatorList);
        setRepresentativeList(representativeList);
      },
    []
  );

  return (
    <div className="App">
      <div className="graphs">
        <h1>Graphs</h1>
      </div>
      <Suspense fallback={<Loading />}>
        <Table
          senatorList={senatorList}
          representativeList={representativeList}
        />
      </Suspense>
    </div>
  );
}

export default App;

import "./App.css";
import Loading from "./components/Loading";
// import Table from "./components/Table";
import React, { Suspense } from "react";
import { getMemberData } from "./modules/propublicaAPIcalls";
import Graphs from "./components/Graphs";

const Table = React.lazy(() => import("./components/Table"));

function App() {
  const [senatorList, setSenatorList] = React.useState([]);
  const [representativeList, setRepresentativeList] = React.useState([]);
  const [searchList, setSearchList] = React.useState([]);
  const [graphsData, setGraphsData] = React.useState({
    dwNominate: 0,
    votesWithPartyPercent: 49,
    votesAgainstPartyPercent: 51,
    missedVotesPercent: 5,
  });

  const changeGraphs = (memberID) => {
    //TODO finish this function to update Graphs component based on which member's button was clicked, then pass to Table component to pass to Button within
    //TODO having some troubles with various errors, probably related to API issues when I dealt with tables; try to figure it out

    const foundItem = searchList.find(
      (profile) => profile.personalDetails.id === memberID
    );
    const { statistics } = foundItem;
    setGraphsData({
      dwNominate: statistics.dwNominate,
      votesWithPartyPercent: statistics.votesWithPartyPercent,
      votesAgainstPartyPercent: statistics.votesAgainstPartyPercent,
      missedVotesPercent: statistics.missedVotesPercent,
    });
  };
  // React.useEffect(changeGraphs, []);

  //API call to get congress person data from ProPublica

  React.useEffect(
    () =>
      async function () {
        // proPublicaAPI function from module performs call twice to gather information from both chambers
        const senatorList = await getMemberData("senate");
        const representativeList = await getMemberData("house");

        setSenatorList(senatorList);
        setRepresentativeList(representativeList);
        setSearchList([...senatorList, ...representativeList]);
      },
    []
  );

  return (
    <div className="App">
      <div className="graphs">
        <Graphs
          dwNominate={graphsData.dwNominate}
          votesWithPartyPercent={graphsData.votesWithPartyPercent}
          votesAgainstPartyPercent={graphsData.votesAgainstPartyPercent}
          missedVotesPercent={graphsData.missedVotesPercent}
        />
      </div>
      <Suspense fallback={<Loading />}>
        <Table
          senatorList={senatorList}
          representativeList={representativeList}
          changeGraphs={changeGraphs}
        />
      </Suspense>
    </div>
  );
}

export default App;

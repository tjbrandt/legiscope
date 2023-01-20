import "./App.css";
import Loading from "./components/Loading";
// import Table from "./components/Table";
import React, { Suspense, useEffect } from "react";
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
    imageURL: "congressprofiles/default.jpg",
    name: "",
  });

  const changeGraphs = (memberID) => {
    //TODO finish this function to update Graphs component based on which member's button was clicked, then pass to Table component to pass to Button within
    //TODO graphs update, but not sure if they do with correct numbers, look into this and fix if needed

    const foundItem = searchList.find(
      (profile) => profile.personalDetails.id === memberID
    );
    const { statistics } = foundItem;
    const { personalDetails } = foundItem;
    console.log("stats for", memberID, "are", statistics);
    const newGraphData = {
      dwNominate: statistics.dwNominate,
      votesWithPartyPercent: statistics.votesWithPartyPercent,
      votesAgainstPartyPercent: statistics.votesAgainstPartyPercent,
      missedVotesPercent: statistics.missedVotesPercent,
      imageURL: `congressprofiles/${memberID}.jpg`,
      name: `${personalDetails.firstName} ${personalDetails.lastName}`,
    };
    setGraphsData((prevGraphs) => ({ ...prevGraphs, ...newGraphData }));
  };

  function replaceImage(error) {
    error.target.src = "congressprofiles/Noimgavailable.jpg";
  }

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
      <div>
        <Graphs {...graphsData} replaceImage={replaceImage} />
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

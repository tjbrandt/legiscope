import "./App.css";
import Loading from "./components/Loading";
import React, { Suspense } from "react";
import { getMemberData } from "./modules/propublicaAPIcalls";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Graphs from "./components/Graphs";
import CurrentListButton from "./components/CurrentListButton";
import PaginatedTable from "./components/PaginatedTable";

const Table = React.lazy(() => import("./components/Table"));

function App() {
  //states
  const [senatorList, setSenatorList] = React.useState([]);
  const [representativeList, setRepresentativeList] = React.useState([]);
  const [currentList, setCurrentList] = React.useState([]);
  const [graphsData, setGraphsData] = React.useState({
    dwNominate: 0,
    votesWithPartyPercent: 49,
    votesAgainstPartyPercent: 51,
    missedVotesPercent: 5,
    imageURL: "congressprofiles/default.jpg",
    name: "",
  });
  const [showHero, setShowHero] = React.useState(true);

  //API call to get congress person data from ProPublica
  //TODO set up error checking to return an error component if API calls fail, then set up ternery-esque variable, like in Table for senate vs house
  React.useEffect(
    () =>
      async function () {
        // proPublicaAPI function from module performs call twice to gather information from both chambers
        const senatorList = await getMemberData("senate");
        const representativeList = await getMemberData("house");

        setSenatorList(senatorList);
        setRepresentativeList(representativeList);
        setCurrentList(senatorList);
      },
    []
  );

  //update graphs area to show data and image based on the member clicked in list
  const changeGraphs = (memberID) => {
    const foundItem = currentList.find(
      (profile) => profile.personalDetails.id === memberID
    );
    const { statistics } = foundItem;
    const { personalDetails } = foundItem;
    const newGraphData = {
      party: personalDetails.party,
      dwNominate: statistics.dwNominate,
      votesWithPartyPercent: statistics.votesWithPartyPercent,
      votesAgainstPartyPercent: statistics.votesAgainstPartyPercent,
      missedVotesPercent: statistics.missedVotesPercent,
      imageURL: `congressprofiles/${memberID}.jpg`,
      name: `${personalDetails.firstName} ${personalDetails.lastName}`,
    };
    setGraphsData((prevGraphs) => ({ ...prevGraphs, ...newGraphData }));
    setShowHero((prevHero) => {
      if (prevHero === true) {
        prevHero = false;
      }
    });
  };

  function replaceImage(error) {
    error.target.src = "congressprofiles/Noimgavailable.jpg";
  }

  //switch between Senate and House lists
  function changeCurentList() {
    setCurrentList((prevList) =>
      prevList === senatorList ? representativeList : senatorList
    );
  }

  return (
    <div className="App">
      <Header />
      {showHero ? (
        <Hero />
      ) : (
        <div>
          <Graphs {...graphsData} replaceImage={replaceImage} />
        </div>
      )}

      <CurrentListButton changeCurentList={changeCurentList} />
      <Suspense fallback={<Loading />}>
        {/* <Table changeGraphs={changeGraphs} currentList={currentList} /> */}
        <PaginatedTable changeGraphs={changeGraphs} currentList={currentList} />
      </Suspense>
    </div>
  );
}

export default App;

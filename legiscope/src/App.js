import "./App.css";
import React from "react";
import getMemberData from "./modules/propublicaAPIcalls";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Graphs from "./components/Graphs";
import CurrentListButton from "./components/CurrentListButton";
import { statesAbbreviations } from "./modules/unitedStates";
import SearchField from "./components/SearchField";
import SelectField from "./components/SelectField";
import PaginatedTable from "./components/PaginatedTable";
import Error from "./components/Error";

function App() {
  const [senatorList, setSenatorList] = React.useState([]);
  const [representativeList, setRepresentativeList] = React.useState([]);
  const [currentList, setCurrentList] = React.useState([]);
  const [currentListName, setCurrentListName] = React.useState("senate");
  const [searchValue, setSearchValue] = React.useState("");
  const [filterValue, setFilterValue] = React.useState("");
  const [filteredList, setFilteredList] = React.useState([]);
  const [graphsData, setGraphsData] = React.useState({
    dwNominate: 0,
    votesWithPartyPercent: 49,
    votesAgainstPartyPercent: 51,
    missedVotesPercent: 5,
    imageURL: "congressprofiles/default.jpg",
    name: "",
  });
  const [showHero, setShowHero] = React.useState(true);
  const [error, setError] = React.useState(false);

  //API call to get congress person data from ProPublica

  React.useEffect(
    () =>
      async function () {
        // proPublicaAPI function from module performs call twice to gather information from both chambers
        try {
          const senatorList = await getMemberData("senate");
          const representativeList = await getMemberData("house");

          setSenatorList(senatorList);
          setRepresentativeList(representativeList);
          setCurrentList(senatorList);
        } catch (err) {
          console.log(err);
          setError(true);
        }
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
    setCurrentListName((prevName) =>
      prevName === "senate" ? "house" : "senate"
    );
  }

  //show table items that match search and filtering by state/territory
  function handleSearch(event) {
    console.log(event.target.value);
    setSearchValue(event.target.value);
  }

  function handleFilter(event) {
    const stateAbbreviation = statesAbbreviations[event.target.value];
    setFilterValue(stateAbbreviation);
  }

  React.useEffect(() => {
    if (filterValue === "") {
      setFilteredList(currentList);
      document.getElementById("selectedState").selectedIndex = 0;
    }
    const searchResultList = currentList.filter((person) => {
      const fullName = `${person.personalDetails.firstName} ${person.personalDetails.lastName}`;
      return (
        fullName.toLowerCase().includes(searchValue.toLowerCase()) &&
        person.personalDetails.state.includes(filterValue)
      );
    });
    setFilteredList(searchResultList);
  }, [filterValue, searchValue, currentList]);

  function resetSearchAndFilter() {
    setSearchValue("");
    setFilterValue("");
  }

  return (
    <div className="App">
      <Header />
      {showHero ? (
        <Hero />
      ) : (
        <div className="app--graphs-container">
          <Graphs {...graphsData} replaceImage={replaceImage} />
        </div>
      )}
      <section className="app--filter">
        <div className="app--filter-all">
          {" "}
          <CurrentListButton
            changeCurentList={changeCurentList}
            currentListName={currentListName}
            resetSearch={resetSearchAndFilter}
          />
          <div className="app--filter-inputs">
            {" "}
            <SearchField
              searchValue={searchValue}
              handleSearch={handleSearch}
            />
            <SelectField handleFilter={handleFilter} />
            <button
              className="app--filter-inputs-reset"
              onClick={resetSearchAndFilter}
            >
              Reset
            </button>
          </div>
        </div>
      </section>

      <section className="app--table">
        {" "}
        {error ? (
          <Error />
        ) : searchValue || filterValue ? (
          <PaginatedTable
            changeGraphs={changeGraphs}
            currentList={filteredList}
          />
        ) : (
          <PaginatedTable
            changeGraphs={changeGraphs}
            currentList={currentList}
          />
        )}
      </section>
      <Footer />
    </div>
  );
}

export default App;

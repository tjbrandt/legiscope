import React from "react";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import GaugeChart from "react-gauge-chart";

// import { getPersonalReasons } from "../modules/propublicaAPIcalls"; <- unavailable as of 1/10/23, see related note on "propublicaAPIcalls.js"

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Graphs(props) {
  // grab "personal explanations" from propublicaAPI
  // const [personalReasons, setPersonalReasons] = React.useState([]);

  // React.useEffect(
  //   () =>
  //     async function () {
  //       // proPublicaAPI function from module performs call twice to gather information from both chambers
  //       const topPersonalReasons = await getPersonalReasons(props.id);
  //       setPersonalReasons(topPersonalReasons);
  //     },
  //   []
  // );
  //as of 1/10/23, unable to get data for personalReasons; see related note on "propublicaAPIcalls.js"

  //calculate where dwNominate pointer should go based on:
  // ((input - min) * 100) / (max - min),
  //where input comes from dwNominate, max = 1, and min = -1
  const dwNominatePercent = (props.dwNominate + 1) / 2;

  function determineDwNominateDisplay(dwNominatePercent) {
    let dwNominateDisplay;
    if (dwNominatePercent <= 0.33) {
      dwNominateDisplay = "Liberal";
    } else if (dwNominatePercent <= 0.66) {
      dwNominateDisplay = "Moderate";
    } else if (dwNominatePercent > 0.66) {
      dwNominateDisplay = "Conservative";
    } else {
      dwNominateDisplay = "Unknown";
    }
    return dwNominateDisplay;
  }

  const dwNominateData = {
    percent: dwNominatePercent,
    alignment: determineDwNominateDisplay(dwNominatePercent),
  };

  const partyVotesData = {
    labels: ["Votes With Party", "Votes Against Party"],
    datasets: [
      {
        label: "% of Votes",
        data: [props.votesWithPartyPercent, props.votesAgainstPartyPercent],
        backgroundColor: ["rgba(255,255,0,.75)", "rgba(0,255,255,.75)"],
        borderColor: ["rgba(255,255,0,1)", "rgba(0,255,255,1)"],
        borderWidth: 1,
      },
    ],
    options: { animation: false },
  };

  const attendanceData = {
    labels: ["Votes Missed", "Votes Attended"],
    datasets: [
      {
        label: "% of Votes",
        data: [props.missedVotesPercent, 1 - props.missedVotesPercent],
        backgroundColor: ["rgba(255,255,0,.75)", "rgba(0,255,255,.75)"],
        borderColor: ["rgba(255,255,0,1)", "rgba(0,255,255,1)"],
        borderWidth: 1,
      },
    ],
    options: { animation: false },
  };

  const [defaultImage, setDefaultImage] = React.useState(
    "congressprofiles/Noimgavailable.jpg"
  );

  function replaceImage(error) {
    error.target.src = defaultImage;
  }

  const initialGraphDisplay = {
    imageURL: props.imageURL,
    attendanceDataDisplay: attendanceData,
    partyVotesDisplay: partyVotesData,
    dwNominateDisplay: dwNominateData,
  };

  const [graphsDisplay, setGraphsDisplay] = React.useState(initialGraphDisplay);
  //TODO prep function to show graphs after user clicks button in TableItem component

  //TODO for some reason, the GaugeChart loads in immediately, while the Doughnut's take a while; might be simply related to load times, need to look into this further
  return (
    <div>
      <div className="list-item__image">
        <img
          src={graphsDisplay.imageURL}
          alt="congress profile"
          onError={replaceImage}
        ></img>
      </div>
      <div>
        This is where the VotesWith/VotesAgainst data should go:{" "}
        <Doughnut data={graphsDisplay.partyVotesDisplay} />{" "}
      </div>
      <div>
        This is where the Votes Attendance data should go:{" "}
        <Doughnut data={graphsDisplay.attendanceDataDisplay} />{" "}
      </div>
      <div>
        This is where the dwNominateData should go:{" "}
        <GaugeChart
          id="dwNominate"
          percent={graphsDisplay.dwNominateDisplay.percent}
          textColor="#000000"
        />
        This person is {graphsDisplay.dwNominateDisplay.alignment}
      </div>
    </div>
  );
}

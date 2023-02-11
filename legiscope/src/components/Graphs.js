import React from "react";

import {
  Chart as ChartJS,
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  Title,
  SubTitle,
} from "chart.js";
import { Doughnut } from "react-chartjs-2";

// import { getPersonalReasons } from "../modules/propublicaAPIcalls"; <- unavailable as of 1/10/23, see related note on "propublicaAPIcalls.js"

ChartJS.register(
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  Title,
  SubTitle
);

ChartJS.defaults.font.family = "Merriweather-Regular";
ChartJS.defaults.font.size = 20;

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

  //chart and dataset options/styles
  const chartColors = {
    red: "rgb(232, 72, 85)",
    blue: "rgb(4, 139, 168)",
    green: "rgb(171,209,181)",
    gray: "rgb(212,210,213)",
    black: "rgb(22,16,50)",
  };

  const partvVotesChartOptions = {
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: false,
      },
    },
  };

  const voteAttendenceChartOptions = {
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: false,
      },
    },
  };

  const doughnutDataOptions = {
    backgroundColor: [chartColors.blue, chartColors.red],
    borderColor: [chartColors.blue, chartColors.red],
    borderWidth: 1,
    circumference: 180,
    rotation: -90,
  };

  //calculate dwNominate scale should go based on: ((input - min) * 100) / (max - min),
  //where input comes from dwNominate, max = 1, and min = -1
  const dwNominatePercent = ((props.dwNominate + 1) / 2) * 100;

  function determineDwNominateDisplay(dwNominatePercent) {
    let dwNominateDisplay = { ideology: "", color: "" };
    if (dwNominatePercent <= 33) {
      dwNominateDisplay.ideology = "Liberal";
      dwNominateDisplay.color = chartColors.blue;
    } else if (dwNominatePercent <= 66) {
      dwNominateDisplay.ideology = "Moderate";
      dwNominateDisplay.color = chartColors.green;
    } else if (dwNominatePercent > 66) {
      dwNominateDisplay.ideology = "Conservative";
      dwNominateDisplay.color = chartColors.red;
    } else {
      dwNominateDisplay.ideology = "Unknown";
      dwNominateDisplay.color = chartColors.gray;
    }

    return dwNominateDisplay;
  }

  const dwChartOptions = {
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: false,
      },
    },
  };

  const dwDataOptions = {
    backgroundColor: [
      determineDwNominateDisplay(dwNominatePercent).color,
      chartColors.gray,
    ],
    borderColor: [
      determineDwNominateDisplay(dwNominatePercent).color,
      chartColors.gray,
    ],
    borderWidth: 1,
    circumference: 180,
    rotation: -90,
  };

  const partyVotesData = {
    labels: ["Votes With Party", "Votes Against Party"],
    datasets: [
      {
        label: "% of Votes",
        data: [props.votesWithPartyPercent, props.votesAgainstPartyPercent],
        ...doughnutDataOptions,
      },
    ],
  };

  const attendanceData = {
    labels: ["Votes Attended", "Votes Missed"],
    datasets: [
      {
        label: "% of Votes",
        data: [100 - props.missedVotesPercent, props.missedVotesPercent],
        ...doughnutDataOptions,
      },
    ],
  };

  const dwNominateData = {
    labels: [determineDwNominateDisplay(dwNominatePercent).ideology],
    datasets: [
      {
        label: "% Leaning",
        data: [dwNominatePercent, 100 - dwNominatePercent],
        ...dwDataOptions,
      },
    ],
  };

  const graphsDisplay = {
    imageURL: props.imageURL,
    attendanceDataDisplay: attendanceData,
    partyVotesDisplay: partyVotesData,
    dwNominateDisplay: dwNominateData,
    name: props.name,
    party: props.party,
  };

  return (
    <section className="app--graphs">
      <div className="app--graphs-name">
        <h1>{graphsDisplay.name ? `Data for ${graphsDisplay.name}` : ""}</h1>
      </div>
      <section className="display-container">
        {" "}
        <div className="image-container">
          {" "}
          <img
            src={graphsDisplay.imageURL}
            alt="congress profile"
            onError={props.replaceImage}
          ></img>
          <div className={`name-container__${graphsDisplay.party}`}>
            <span className="name">{graphsDisplay.name}</span>
          </div>
        </div>
        <div className="graphs-container">
          <div className="graphs">
            {" "}
            <div>
              {" "}
              <Doughnut
                data={graphsDisplay.partyVotesDisplay}
                options={partvVotesChartOptions}
                id="vote-alignment"
              />
            </div>
            <div>
              {" "}
              <Doughnut
                data={graphsDisplay.attendanceDataDisplay}
                options={voteAttendenceChartOptions}
                id="vote-attendence"
              />{" "}
            </div>
            <div>
              {" "}
              <Doughnut
                data={graphsDisplay.dwNominateDisplay}
                options={dwChartOptions}
                id="ideology"
              />
            </div>
          </div>
          <div className="labels">
            {" "}
            <div className="label">
              {" "}
              <p>{props.votesWithPartyPercent.toFixed(2)}%</p>
              <p>Vote Alignment</p>
            </div>
            <div className="label">
              {" "}
              <p>{(100 - props.missedVotesPercent).toFixed(2)}%</p>
              <p>Vote Attendence</p>
            </div>
            <div className="label">
              {" "}
              <p>Ideology:</p>
              <p>{dwNominateData.labels}</p>
            </div>
          </div>
          <div className="explanations-container">
            <ul className="explanations">
              <li>
                Vote Alignment: how often this member votes with their party.
              </li>
              <li>
                Vote Attendence: how often this member participates in votes.
              </li>
              <li>
                Ideology: an estimate of this member's political leanings based
                on the dwNominate methodology.
              </li>
            </ul>
          </div>
        </div>
      </section>
    </section>
  );
}
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
  //chart and dataset options/styles
  const chartColors = {
    red: "rgb(232, 72, 85)",
    blue: "rgb(4, 139, 168)",
    green: "rgb(26, 66, 38)",
    gray: "rgb(212,210,213)",
    black: "rgb(22,16,50)",
  };

  const chartOptions = {
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: false,
      },
    },
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

  const doughnutDataOptions = {
    backgroundColor: [chartColors.blue, chartColors.red],
    borderColor: [chartColors.blue, chartColors.red],
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
                options={chartOptions}
                id="vote-alignment"
              />
            </div>
            <div>
              {" "}
              <Doughnut
                data={graphsDisplay.attendanceDataDisplay}
                options={chartOptions}
                id="vote-attendence"
              />{" "}
            </div>
            <div>
              {" "}
              <Doughnut
                data={graphsDisplay.dwNominateDisplay}
                options={chartOptions}
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
                Ideology: an estimate of this member's political leaning based
                on the DW-Nominate methodology.
              </li>
            </ul>
          </div>
        </div>
      </section>
    </section>
  );
}

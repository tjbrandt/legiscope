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
  Title
);

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
  };

  const doughnutChartOptions = {
    plugins: {
      title: {
        display: true,
        text: "Doughnut Chart",
        color: "blue",
        font: {
          size: 34,
        },
        padding: {
          top: 30,
          bottom: 30,
        },
        responsive: true,
        animation: {
          animateScale: true,
        },
      },
      legend: {
        position: "bottom",
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

  //TODO learn and adjust charts to have labels on the bottom and have the gauge chart show dDND result in "title" section rather than a label
  //TODO adjust -ChartOptions variables to match design goals
  //TODO remove labels from dwChart

  //calculate where dwNominate pointer should go based on:
  // ((input - min) * 100) / (max - min),
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
      title: {
        display: true,
        text: `${props.name} is considered ${
          determineDwNominateDisplay(dwNominatePercent).ideology
        }`,
        color: "blue",
        font: {
          size: 34,
        },
        padding: {
          top: 30,
          bottom: 30,
        },
        responsive: true,
        animation: {
          animateScale: true,
        },
      },
      legend: {
        position: "bottom",
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

  //TODO edit dwNominate graph to replace key with "graph title" that shows % and leaning

  return (
    <section>
      <div>
        <h1>Data for {graphsDisplay.name}</h1>
      </div>
      <div className="graphs-container">
        <div className="graphs">
          <div className="image-container">
            <img
              src={graphsDisplay.imageURL}
              alt="congress profile"
              onError={props.replaceImage}
            ></img>
            <div className={`name-container__${graphsDisplay.party}`}>
              <span className="name">{graphsDisplay.name}</span>
            </div>
          </div>
          <Doughnut
            className="graphs"
            data={graphsDisplay.partyVotesDisplay}
            options={doughnutChartOptions}
          />{" "}
          <Doughnut
            className="graphs"
            data={graphsDisplay.attendanceDataDisplay}
            options={doughnutChartOptions}
          />{" "}
          <Doughnut
            className="graphs"
            data={graphsDisplay.dwNominateDisplay}
            options={dwChartOptions}
          />
        </div>
      </div>
    </section>
  );
}

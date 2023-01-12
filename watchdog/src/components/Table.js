import React, { Suspense } from "react";
import { getMemberData } from "../modules/propublicaAPIcalls";
// import Details from "./Details";
const MemberDetails = React.lazy(() => import("./TableItem"));

//using a lazy render apprach to getting Details -> as of 01/10/23, I don't fully understand what's going on, but it seems to work. in case it doesn't work out later on, attempt to fix or revert to basic import approach

export default function List() {
  const [senatorList, setSenatorList] = React.useState([]);
  const [representativeList, setRepresentativeList] = React.useState([]);

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
  // TODO holding on to below console logs - current issue where renders are triggering useEffect more than once, even though I'm following guidelines that I'm aware of, need to investigate further
  //   const firstSenator = senatorList[0];
  //   const firstHouse = houseList[0];
  //   console.log(firstSenator);
  //   console.log(firstHouse);
  //   console.log(senatorList);

  function getDetailsComponents(chamberList) {
    const memberGroup = chamberList.map((profile) => {
      let { id, firstName, lastName, title, party, state } =
        profile.personalDetails;
      let {
        twitterAccount,
        facebookAccount,
        youtubeAccount,
        websiteURL,
        contactFormURL,
        phoneNumber,
      } = profile.contactInfo;
      let {
        dwNominate,
        missedVotesPercent,
        votesWithPartyPercent,
        votesAgainstPartyPercent,
      } = profile.statistics;

      return (
        <Suspense>
          <MemberDetails
            key={id}
            id={id}
            firstName={firstName}
            lastName={lastName}
            title={title}
            party={party}
            state={state}
            twitterAccount={twitterAccount}
            facebookAccount={facebookAccount}
            youtubeAccount={youtubeAccount}
            websiteURL={websiteURL}
            contactFormURL={contactFormURL}
            phoneNumber={phoneNumber}
            dwNominate={dwNominate}
            missedVotesPercent={missedVotesPercent}
            votesWithPartyPercent={votesWithPartyPercent}
            votesAgainstPartyPercent={votesAgainstPartyPercent}
            imageURL={`congressprofiles/${id}.jpg`}
          />
        </Suspense>
      );
    });
    return memberGroup;
  }

  const senatorDetailsComponents = getDetailsComponents(senatorList);
  const representativeDetailsComponents =
    getDetailsComponents(representativeList);

  return (
    <div>
      <section>{senatorDetailsComponents}</section>
      <h1>This is the list for representatives</h1>
      <section>{representativeDetailsComponents}</section>
    </div>
  );
}

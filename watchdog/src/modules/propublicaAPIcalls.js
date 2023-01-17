import axios from "axios";

//apiCall info
const currentCongress = 117;
const apiConfig = {
  headers: {
    "X-API-KEY": "n22gDuWizet5es8pM29aS3DPAyfc6uLd3QobALHF",
  },
};

//get list of members from ProPublica and map them to profiles to later distribute as props
async function getMemberData(chamber) {
  const membersUrl = `https://api.propublica.org/congress/v1/${currentCongress}/${chamber}/members.json`;

  const membersData = await axios.get(membersUrl, apiConfig);

  const memberResults = membersData.data.results[0].members;

  const memberList = memberResults.map((result) => {
    let {
      id,
      first_name,
      last_name,
      short_title,
      party,
      state,
      twitter_account,
      facebook_account,
      youtube_account,
      url,
      contact_form,
      phone,
      dw_nominate,
      missed_votes_pct,
      votes_with_party_pct,
      votes_against_party_pct,
    } = result;

    const profile = {
      id: id,
      personalDetails: {
        firstName: first_name,
        lastName: last_name,
        title: short_title,
        party: party,
        state: state,
      },

      contactInfo: {
        twitterAccount: twitter_account,
        facebookAccount: facebook_account,
        youtubeAccount: youtube_account,
        websiteURL: url,
        contactFormURL: contact_form,

        phoneNumber: phone,
      },

      statistics: {
        dwNominate: dw_nominate,
        missedVotesPercent: missed_votes_pct,
        votesWithPartyPercent: votes_with_party_pct,
        votesAgainstPartyPercent: votes_against_party_pct,
      },
    };

    return profile;
  });

  return memberList;
}

//as of 1/10/23, the Personal Reasons url leads to a 500 error from ProPublica; as such, we won't be able to extract data. Commenting out code to decide what to do with it (fingers crossed ProPublica will have a fix soon)

// async function getPersonalReasons(idnumber) {
//   const memberID = idnumber;
//   const personalReasonsURL = `https://api.propublica.org/congress/v1/members/${memberID}/explanations/${currentCongress}.json`;

//   //get personal reasons from API
//   const personalReasonsData = await axios.get(personalReasonsURL, apiConfig);
//   console.log(personalReasonsData);

//   //map each result to an array
//   const personalReasons = personalReasonsData.data.results[0].map((result) => {
//     return result.category;
//   });

//   //establish counts of each reason
//   const counts = {};
//   for (let reason of personalReasons) {
//     counts[reason] = counts[reason] ? counts[reason] + 1 : 1;
//   }

//   //get top 3 reasons by sorting counts and pulling
//   const topCounts = Object.entries(counts)
//     .sort((a, b) => b[1] - a[1])
//     .slice(0, 3);

//   //return array with names
//   return [topCounts[0][0], topCounts[1][0], topCounts[2][0]];
// }

export { getMemberData };

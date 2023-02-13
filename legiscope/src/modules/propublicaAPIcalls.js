import axios from "axios";

//apiCall info
//Be sure to check if current congress data is available; as of 2/2/23, the 118th Senate chamber is unavailable;
const currentCongress = 117;
const apiConfig = {
  headers: {
    "X-API-KEY": `${process.env.REACT_APP_PP_API_KEY}`,
  },
};

//note: for security reasons, I am storing my API key in an .env file; for a quick tutorial on replicating this apporach, see this StackOverflow question: https://stackoverflow.com/questions/48699820/how-do-i-hide-an-api-key-in-create-react-app

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
      personalDetails: {
        firstName: first_name,
        lastName: last_name,
        title: short_title,
        party: party,
        state: state,
        id: id,
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

export default getMemberData;

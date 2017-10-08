const express = require('express');
const router = express.Router();
const axios = require('axios');
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
if (!GITHUB_TOKEN) throw new Error("Supply GitHub token");

const graphql = `{
  organization(login:"hacksheffield") {
    avatarUrl
    databaseId
    repository(name:"people"){
      name
      object(expression:"master:_data/people.yml"){
        ... on Blob {
          text
        }
      }
    }
    teams (first: 100){
      edges {
        node{
          description
          teamsUrl
          url
          slug
          combinedSlug
          name
          members (first: 100){
            edges {
              node {
                name
                bio
                url
                login
                location
                bioHTML
                email
                avatarUrl
                websiteUrl
                isCampusExpert
              }
            }
          }
        }
      }
    }
  }
}`;

/* GET home page. */
router.get('/', (req, res, next) => {
  axios.post('https://api.github.com/graphql', { query: graphql }, { headers: {'Authorization': `Bearer ${GITHUB_TOKEN}`}})
    .then((graphqlRes) => {
      console.log(graphqlRes.data);
      const people = graphqlRes.data.data.organization.teams.edges.map(edge => edge.node)[0].members.edges.map(edge => edge.node);
      res.render('index', { title: 'Teams', people: people, teamname: 'HackSheffield TEAM'});
    })
    .catch((err) => {
      console.log(err);
      res.render('error', {});
  });
});

module.exports = { router };

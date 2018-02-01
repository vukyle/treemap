import '../css/index.sass';
import '../data/people.json';

const axios = require('axios');

(() => {
    //Imports the data
    function importData() {
        return axios.get('../data/people.json')
        .then(function(response) {
            const data = response.data;
            return data;
        })
        .catch(function(error) {
            console.log(error);
        });
    }

    //responsible for creating the DOM elements that make up the chart
    const chart = {
        createHeaderComponent: function(result) {
            const container = document.querySelector('#container');
            const teamArray = createTeamArray(result);
            function createTeamArray(data) {
                const result = [];
                data.forEach(function(element, index){
                    if(data.indexOf(element.team, index + 1) === -1) {
                        if(result.indexOf(element.team) === -1) {
                            result.push(element.team);
                        }
                    }
                });
                return result;
            }
            function createTeamDiv(input) {
                const teamContainer = document.createElement("DIV");
                const teamDiv = document.createElement("H2");
                const ul = document.createElement("UL");

                teamContainer.className = 'team__container';
                teamContainer.id  = input;
                teamDiv.className = 'team__header';
                teamDiv.textContent = input;

                teamContainer.appendChild(teamDiv);
                return teamContainer;
            }

            for(let i = 0; i < teamArray.length; i++) {
                container.appendChild(createTeamDiv(teamArray[i]));
            }
        },
        createProfile: function(data) {
            const teamData = this.organizeIntoTeams(data);
            function teamContainer(id) {
                return document.getElementById(id);
            }

            function createName(firstName, lastName) {
                const h4 = document.createElement("H4");
                h4.className = 'team__h4';
                h4.textContent = firstName + ' ' + lastName;
                return h4;
            }

            function createList(input) {
                const listItem = document.createElement("LI");
                listItem.textContent = input;
                return listItem;
            }

            function createEmail(input) {
                const email = document.createElement("A");
                email.textContent = input;
                email.href = 'mailto:' + input;
                email.className = 'team__email';
                return email;
            }

            for (var property in teamData) {
                for (let i = 0; i < teamData[property].length; i++) {
                    const profile = document.createElement("UL");

                    profile.appendChild(createName(teamData[property][i].first_name, teamData[property][i].last_name));
                    profile.appendChild(createList(teamData[property][i].role));
                    profile.appendChild(createEmail(teamData[property][i].email));
                    profile.appendChild(createList(teamData[property][i].phone));
                    teamContainer(property).appendChild(profile);
                }
            }
        },

        //returns data organized by teams
        organizeIntoTeams: function(data) {
            const teamObj = {};
            const team = createTeamArray(data);
            function createTeamArray(data) {
                const result = [];
                data.forEach(function(element, index){
                    if(data.indexOf(element.team, index + 1) === -1) {
                        if(result.indexOf(element.team) === -1) {
                            result.push(element.team);
                        }
                    }
                });
                return result;
            }
            team.forEach(function(element,index) {
                teamObj[element] = [];
            });
            for (let i = 0; i < data.length; i++){
                for (let property in teamObj) {
                    if (property === data[i].team) {
                        teamObj[property].push(data[i]);
                    }
                }
            }
            return teamObj;
        },
        //Renders the components to be viewed on the browser
        render: function() {
            const data = importData();
            data.then((result) => {
                this.createHeaderComponent(result);
                this.createProfile(result);
            });
        }
    };
    chart.render();
})();

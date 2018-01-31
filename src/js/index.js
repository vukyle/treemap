import '../css/index.sass';
import '../data/people.json';

const axios = require('axios');

(() => {
    //Imports the data
    function importData() {
        return axios.get('../data/people.json')
        .then(function(response) {
            //console.log(response.data[1].team);
            const data = response.data;
            //console.log(response.data);
            return data;
        })
        .catch(function(error) {
            console.log(error);
        });
        //return axios.get('../data/people.json');
    }

    //Tree map component
    const TreeMap = {
        createHeaderComponent: function(result) {
            //console.log(result);
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
                //console.log(result);
                return result;
            }
            function createTeamDiv(input) {
                const teamContainer = document.createElement("DIV");
                const teamDiv = document.createElement("DIV");

                teamContainer.className = 'team__container';
                teamDiv.className = 'team__header';
                teamDiv.textContent = input;
                teamContainer.appendChild(teamDiv);
                return teamContainer;
            }

            for(let i = 0; i < teamArray.length; i++) {
                //console.log(teamArray[i]);
                container.appendChild(createTeamDiv(teamArray[i]));
            }
            //console.log(teamArray);
        },
        createProfile: function(data) {
            console.log(data);
        },
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
                    //console.log(teamObj[property]);
                    if (property === data[i].team) {
                        teamObj[property].push(data[i]);
                    }
                }
            }
            // for (let property in teamObj) {
            //     console.log(teamObj[property]);
            // }
            console.log(teamObj);
            console.log(team);
            // const data = importData();
            // data.then((result) => {
            //
            // });
        },
        render: function() {
            const data = importData();
            //console.log(data);
            data.then((result) => {
                //console.log(result[1].team);
                // result.forEach(function(element, index) {
                //     console.log(element.team);
                // });
                this.createHeaderComponent(result);
                this.createProfile(result);
                this.organizeIntoTeams(result);
            });
        }
    };
    TreeMap.render();
})();

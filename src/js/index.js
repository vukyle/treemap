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

    //importData();
    //Tree map component
    const TreeMap = {
        createHeaderComponent: function(teamName) {
            console.log(teamName);
        },
        render: function() {
            const data = importData();
            data.then(function(result) {
                console.log(result[1]);
            });
            console.log('hello');
        }
    };
    TreeMap.render();
})();

/**
 * Created by jgarcia on 26/11/2018.
 * This modules contains function to process the questions and answers from clients
 */

//load questions file
var data = require('./questions.json');
var clients_data =  new Object();

//returns the list of questions and answers
var questions = function(){
    return data;
}

//add a new client defined by its id (from socket.io)
var add_client = function(id){
    clients_data[id] = new Object();
}

//set the name of a client defined by its id (from socket.io)
var set_client_name = function (id, name){
    if(clients_data.hasOwnProperty(id)) {
        clients_data[id].name = name;
    }else{
        console.error('client id ' + id, ' does not exists');
    }
}

// returns an array of clients names (if any)
var get_clients_names = function(){
    var reply = [];

    var keys = Object.keys(clients_data);
    var length = keys.length;
    var i;

    for(i = 0; i<length; i++) {
        var clientID = keys[i];
        var name = clients_data[clientID].name;
        if (name !== 'undefined') {
            reply.push(name);
        }
    }
    return reply;
}

//remove a client with its id (from socket.io)
var remove_client = function(id){
    delete clients_data[id];
}

//returns the number of connected clients (even those without a name)
var clients_count = function (){
    return Object.keys(clients_data).length;
}

// updates the data structure containing client answers. 
// Question must be 'q1', 'q2' or 'q3'
// Answer must be 0, 1 or 2
var update_client_answer = function(id, question, answer){
    clients_data[id][question] = answer;
}

//returns an object with counts for each answer of each question
var get_answers_counts = function (){
    var reply = {"q1":[0,0,0], "q2":[0,0,0], "q3":[0,0,0]};

    var keys = Object.keys(clients_data);
    var length = keys.length;
    var i;

    for(i = 0; i<length; i++){
        var clientID = keys[i];
        var answers = clients_data[clientID];

        if(answers.hasOwnProperty('q1')) {
            var index = answers['q1'];
            reply['q1'][index]++;
        }

        if(answers.hasOwnProperty('q2')) {
            var index = answers['q2'];
            reply['q2'][index]++;
        }

        if(answers.hasOwnProperty('q3')) {
            var index = answers['q3'];
            reply['q3'][index]++;
        }
    }
    return reply;
}

exports.questions = questions;
exports.add_client = add_client;
exports.remove_client = remove_client;
exports.set_client_name = set_client_name;
exports.get_clients_names = get_clients_names;
exports.update_client_answer = update_client_answer;
exports.clients_count = clients_count;
exports.get_answers_counts = get_answers_counts;
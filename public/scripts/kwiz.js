var kwiz;
kwiz = {
    socket: 'undefined',
    content: 'undefined'
};

//retrieve UI elements and start communication with the server
kwiz.start = function () {
    //retrieve the content
    kwiz.content = document.getElementById('content');

    //init communication
    kwiz.socket = io('http://localhost:8080');
    kwiz.socket.on('quiz', kwiz.createQuestionsUiFromData);
}

//use a description object to create the UI
kwiz.createQuestionsUiFromData = function (data) {

    //remove existing components if any in the content
    while (kwiz.content.firstChild) {
        kwiz.content.removeChild(kwiz.content.firstChild);
    }

    //extract some content from the kwiz
    var quiz = data.quiz; //quiz is an array of questions
    var nbQuestions = quiz.length;

    //variables declaration

    //variables in the loop
    var question, questionId, title, answer, options;
    var p_title, questionDiv, radioDiv;

    //variables in the nested loop
    var nbOptions;
    var option, label, labelID, radio, radioID, br, span, p_answersID;

    for (let questionIdx = 0; questionIdx < nbQuestions; questionIdx++) {
        //extract content from the question
        question = quiz[questionIdx];
        questionId = question.id;
        title = question.question;
        answer = question.answer;
        options = question.options;
        nbOptions = options.length;

        //create the content div
        questionDiv = document.createElement('div');
        questionDiv.setAttribute('class', 'question-block row');
        questionDiv.setAttribute('id', questionId);

        //create a paragraph to display the question
        p_title = document.createElement('p');
        p_title.setAttribute('class', 'question');
        p_title.innerHTML = title;

        //create a div that will be a radio button (BootStrap) content
        radioDiv = document.createElement("div");
        radioDiv.setAttribute("class", "options radio");

        //iterate over each options to create the radio buttons and labels
        for (let optionID = 0; optionID < nbOptions; optionID++) {

            //get the option text
            option = options[optionID];

            //create a label and radio button for each option
            labelID = 'label_' + questionId + '_' + optionID;
            radioID = 'radio_' + questionId + '_' + optionID;
            p_answersID = 'p_' + questionId + '_' + optionID;

            label = document.createElement('label');
            label.setAttribute("value", option);
            label.setAttribute('for', radioID);
            label.setAttribute('id', labelID);
            label.setAttribute('name', questionId);
            label.setAttribute('class', 'option');
            label.answer = answer;
            label.innerHTML = option;

            radio = document.createElement('input');
            radio.setAttribute("type", "radio");
            radio.setAttribute("value", option);
            radio.setAttribute("id", radioID);
            radio.setAttribute("name", questionId);
            radio.answer = answer;
            radio.optionId = optionID;
            kwiz.createClickListener(radio);

            //add a br to change line
            br = document.createElement('br');

            //add the elements to the radio div
            radioDiv.appendChild(radio);
            radioDiv.appendChild(label);
            radioDiv.appendChild(br);
        }

        //add the elements to the quesiton div and content
        questionDiv.appendChild(p_title);
        questionDiv.appendChild(radioDiv);
        kwiz.content.appendChild(questionDiv);
    }
}

kwiz.createClickListener = function (radio) {
    var questionId = radio.getAttribute('name');
    var optionId = radio.optionID

    radio.onclick = function () {
        console.log(questionId + " " + optionId);
    }
}
/*
Table of Contents
1. Variable Library
2. One Rep Max Functions
3. Utility Functions

*/

// 1. Variable Library
let overheadMax = 105;
let squatMax = 255;
let deadliftMax = 295;
let benchpressMax = 135;
let pullupMax = 12;

let maxArray = [overheadMax,squatMax,deadliftMax,benchpressMax,pullupMax];

//2. One Rep Max Functions
function updateMaxArray() {
    maxArray = [overheadMax,squatMax,deadliftMax,benchpressMax,pullupMax];
}

function displayMax() {
    displayMessage(maxArray);
}

function increaseMax() {
    //Every 3-6 weeks, run increaseMax() to increase one rep max amounts for calculations
    overheadMax+=5;
    squatMax+=10;
    deadliftMax+=10;
    benchpressMax+=5;
    pullupMax+=2;

    updateMaxArray();
    displayMax();
}
function decreaseMax() {
    //Every 3-6 weeks, run increaseMax() to increase one rep max amounts for calculations
    overheadMax-=5;
    squatMax-=10;
    deadliftMax-=10;
    benchpressMax-=5;
    pullupMax-=2;

    updateMaxArray();
    displayMax();
}

function percentMax(percent) {
    //calculate the percent of the maxes and return an array
    let array = copyBasicArray(maxArray);
    for (let i=0; i< array.length; i++) {
        array[i] = Math.round(array[i]*percent/100);
    }
    return array;
}


//3. Utility Functions
function displayMessage(message) {
    //display a message in the HTML
    document.getElementById("message").innerHTML = message;
}

function copyBasicArray(arrayOriginal) {
    let newArray = [];
    for (let i = 0; i < arrayOriginal.length; i++) {
        newArray[i] = arrayOriginal[i];
    }
    return newArray;
}

//TEST FUNCTIONS
function test() {
    displayMessage(percentMax(50));
}

function createTable(spreadsheetUrl, spreadsheetGid) {
    let url = String(spreadsheetUrl) + "gviz/tq?tqx=out:html&tq&"; + String(spreadsheetGid);
    return url
}

let data = createTable("https://docs.google.com/spreadsheets/d/1v8PSKnko46nlGdALRc5eiFs1ULIkGAoA/", "gid=1959902914");

displayMessage("Test");
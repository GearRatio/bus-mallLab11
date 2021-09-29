"use strict";

//products is the parent element
let allImgEls = document.getElementById("products");
//identify left, center, right images
let leftImgEl = document.getElementById("left");
let centerImgEl = document.getElementById("center");
let rightImgEl = document.getElementById("right");

let onScreen = [
    document.getElementById("left"),
    document.getElementById("center"),
    document.getElementById("right"),
];

let imgOneIndex = null;
let imgTwoIndex = null;
let imgThreeIndex = null;

//need total clicks
let totalClicks = 0;
let totalRounds = 25;

//array to store product
const allImgs = [];
// console.log(allImgs);
const imgNames = [
    "bag",
    "banana",
    "bathroom",
    "boots",
    "breakfast",
    "bubblegum",
    "chair",
    "cthulhu",
    "dog-duck",
    "dragon",
    "pen",
    "pet-sweep",
    "scissors",
    "shark",
    "tauntaun",
    "unicorn",
    "water-can",
    "wine-glass",
];

//constructor function
function busImage(name, fileExtension = "jpg") {
    this.name = name;
    this.clicks = 0;
    this.timeShown = 0;
    this.url = `img/${name}.${fileExtension}`;
    allImgs.push(this);
}
//object literal for chartjs

function buildImg() {
    for (let i = 0; i < imgNames.length; i++) {
        new busImage(imgNames[i]);
    }
}

buildImg();
new busImage("sweep", "png");

//create random function
function randomImgNum() {
    return Math.floor(Math.random() * allImgs.length);
}

//render function
function renderImgs() {
    let clickedImg = []; // stores three random numbers
    // console.log(leftImgEl.name, rightImgEl.name, centerImgEl.name);

    while (clickedImg.length < 3) {
        let randomNum = randomImgNum();
        if (
            allImgs[randomNum].name !== leftImgEl.name &&
            allImgs[randomNum].name !== rightImgEl.name &&
            allImgs[randomNum].name !== centerImgEl.name
        ) {
            if (!clickedImg.includes(randomNum)) {
                //if clicked img doesn't contain number then push it
                // console.log(allImgs[randomNum]);
                clickedImg.push(randomNum);
            }
        }
    }
    imgOneIndex = clickedImg.pop();
    imgTwoIndex = clickedImg.pop();
    imgThreeIndex = clickedImg.pop();

    leftImgEl.src = allImgs[imgOneIndex].url;
    centerImgEl.src = allImgs[imgTwoIndex].url;
    rightImgEl.src = allImgs[imgThreeIndex].url;

    leftImgEl.name = allImgs[imgOneIndex].name;
    centerImgEl.name = allImgs[imgTwoIndex].name;
    rightImgEl.name = allImgs[imgThreeIndex].name;

    allImgs[imgOneIndex].timeShown++;
    allImgs[imgTwoIndex].timeShown++;
    allImgs[imgThreeIndex].timeShown++;
}

//event handler
function imgClick(event) {
    event.preventDefault();
    totalClicks++;
    let imageClicked = event.target;
    console.log(imageClicked);
    for (let i = 0; i < allImgs.length; i++) {
        if (imageClicked.name == allImgs[i].name) {
            allImgs[i].clicks++;
        }
    }
    renderImgs();
    //once 25 clicks achieved remove event listeners and show button.
    if (totalClicks === 25) {
        removeClicks();
        createButton();
        let buttonEl = document.getElementById("tally");
        buttonEl.addEventListener("click", statResults);
        //need to remove event listener on button once clicked
    }
}

//remove event listener from photos.
function removeClicks() {
    leftImgEl.removeEventListener("click", imgClick);
    centerImgEl.removeEventListener("click", imgClick);
    rightImgEl.removeEventListener("click", imgClick);
}

function createButton() {
    let totals = document.getElementById("results");
    let buttonEl = document.createElement("button");
    buttonEl.innerText = "View Results";
    buttonEl.setAttribute("id", "tally");
    totals.appendChild(buttonEl);
}
let barLabels = [];
let barClicks = [];
let barSeen = [];

function statResults(event) {
    event.target.remove();
    let totals = document.getElementById("totals");
    for (let i = 0; i < allImgs.length; i++) {
        //create li for each index busimage
        let resultStat = document.createElement("li");
        barLabels.push(allImgs[i].name);
        barClicks.push(allImgs[i].clicks);
        barSeen.push(allImgs[i].timeShown);
        resultStat.innerText = `${allImgs[i].name} had ${allImgs[i].clicks} votes and was seen ${allImgs[i].timeShown} times.`;
        totals.appendChild(resultStat);
    }
    renderChart();
    console.log(barLabels, barClicks, barSeen);
}

//render data to chart
function renderChart() {
    let chartEl = document.getElementById("bar-chart");
    chartEl.innerHTML = "";
    //grab canvas element
    let ctx = chartEl.getContext("2d");
    //holds names of images in array
    const products = [];

    //need to display vote totals
    //need to display number of times product was viewed

    var myChart = new Chart(ctx, {
        type: "bar",
        data: {
            //needs a reference to object
            labels: barLabels,
            datasets: [{
                    //
                    label: "Seen",
                    data: barSeen,
                    backgroundColor: ["rgba(255, 99, 132, 0.2)"],
                    borderColor: ["rgba(255, 99, 132, 1)"],
                    borderWidth: 1,
                },
                {
                    //
                    label: "Clicks",
                    data: barClicks,
                    backgroundColor: ["rgba(255, 99, 132, 0.2)"],
                    borderColor: ["rgba(255, 99, 132, 1)"],
                    borderWidth: 1,
                },
            ],
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                },
            },
        },
    });
}

renderImgs();
leftImgEl.addEventListener("click", imgClick);
centerImgEl.addEventListener("click", imgClick);
rightImgEl.addEventListener("click", imgClick);
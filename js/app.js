"use strict";

//identify left, center, right images
let allImgEls = document.getElementById("products");
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
    let clickedImg = []; // stores three numbers
    console.log(leftImgEl.name, rightImgEl.name, centerImgEl.name);

    while (clickedImg.length < 3) {
        let randomNum = randomImgNum();
        console.log(leftImgEl.name, allImgs[randomNum]);
        if (
            allImgs[randomNum].name !== leftImgEl.name &&
            allImgs[randomNum].name !== rightImgEl.name &&
            allImgs[randomNum].name !== centerImgEl.name
        ) {
            //
        }
        if (!clickedImg.includes(randomNum)) {
            //if clicked img doesn't contain number then push it
            clickedImg.push(randomNum);
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
    if (totalClicks === 25) {
        leftImgEl.removeEventListener("click", imgClick);
        centerImgEl.removeEventListener("click", imgClick);
        rightImgEl.removeEventListener("click", imgClick);
        createButton();
        let buttonEl = document.getElementById("tally");
        buttonEl.addEventListener("click", statResults);
    }
}

function createButton() {
    let totals = document.getElementById("results");

    let buttonEl = document.createElement("button");
    buttonEl.innerText = "View Results";
    buttonEl.setAttribute("id", "tally");
    totals.appendChild(buttonEl);
}

function statResults() {
    let totals = document.getElementById("totals");
    for (let i = 0; i < allImgs.length; i++) {
        //create li for each index busimage
        let resultStat = document.createElement("li");
        resultStat.innerText = `${allImgs[i].name} had ${allImgs[i].clicks} votes and was seen ${allImgs[i].timeShown} times.`;
        totals.appendChild(resultStat);
    }
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
            labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
            datasets: [{
                label: "# of Votes",
                data: [12, 19, 3, 5, 2, 3],
                backgroundColor: [
                    "rgba(255, 99, 132, 0.2)",
                    "rgba(54, 162, 235, 0.2)",
                    "rgba(255, 206, 86, 0.2)",
                    "rgba(75, 192, 192, 0.2)",
                    "rgba(153, 102, 255, 0.2)",
                    "rgba(255, 159, 64, 0.2)",
                ],
                borderColor: [
                    "rgba(255, 99, 132, 1)",
                    "rgba(54, 162, 235, 1)",
                    "rgba(255, 206, 86, 1)",
                    "rgba(75, 192, 192, 1)",
                    "rgba(153, 102, 255, 1)",
                    "rgba(255, 159, 64, 1)",
                ],
                borderWidth: 1,
            }, ],
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
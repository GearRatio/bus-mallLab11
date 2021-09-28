"use strict";

//identify left, center, right images
let allImgEls = document.getElementById("products");
let leftImgEl = document.getElementById("left");
let centerImgEl = document.getElementById("center");
let rightImgEl = document.getElementById("right");

//need total clicks
let totalClicks = 0;
let totalRounds = 25;

//array to store product
const allImgs = [];
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
    while (clickedImg.length < 3) {
        //
        let randomNum = randomImgNum();
        while (!clickedImg.includes(randomNum)) {
            //if clicked img doesn't contain number then push it
            clickedImg.push(randomNum);
        }
    }
    let imgOneIndex = clickedImg.pop();
    let imgTwoIndex = clickedImg.pop();
    let imgThreeIndex = clickedImg.pop();

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

renderImgs();
leftImgEl.addEventListener("click", imgClick);
centerImgEl.addEventListener("click", imgClick);
rightImgEl.addEventListener("click", imgClick);
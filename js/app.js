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
        if (imageClicked.name === allImgs[i].name) {
            allImgs[i].clicks++;
            console.log(allImgs[i]);
        }
    }
    renderImgs();
    if (totalClicks === 25) {
        leftImgEl.removeEventListener("click", imgClick);
        centerImgEl.removeEventListener("click", imgClick);
        rightImgEl.removeEventListener("click", imgClick);
    }
}
renderImgs();
leftImgEl.addEventListener("click", imgClick);
centerImgEl.addEventListener("click", imgClick);
rightImgEl.addEventListener("click", imgClick);

console.log(allImgs);
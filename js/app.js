'use strict';
// ***** GLOBALS *****
console.log('Hello Jordan');

let pictureArray = [];
let votingRounds = 25;

// ***** DOM WINDOWS *****
let imgContainer = document.getElementById('img-container');

let imgOne = document.getElementById('img-one');
let imgTwo = document.getElementById('img-two');
let imgThree = document.getElementById('img-three');


let resultsBtn = document.getElementById('show-results-btn');
let resultsList = document.getElementById('results-container');

// ***** CONSTRUCTOR FUNCTION *****

function RandomImage(name, imgExtension = 'jpg') {
  this.name = name;
  this.img = `img/${name}.${imgExtension}`;
  this.votes = 0;
  this.views = 0;

}

// ***** HELPER FUNCTIONS / UTILITIES *****

function randomIndex() {
  return Math.floor(Math.random() * pictureArray.length);
}

function renderImg() {
  let imgOneIndex = randomIndex();
  let imgTwoIndex = randomIndex();
  let imgThreeIndex = randomIndex();

  // Validation to make sure numbers are unique
  while (imgOneIndex === imgTwoIndex || imgOneIndex === imgThreeIndex || imgTwoIndex === imgThreeIndex) {
    imgTwoIndex = randomIndex();
    imgThreeIndex = randomIndex();
  }

  imgOne.src = pictureArray[imgOneIndex].img;
  imgTwo.src = pictureArray[imgTwoIndex].img;
  imgThree.src = pictureArray[imgThreeIndex].img;
  imgOne.title = pictureArray[imgOneIndex].name;
  imgOne.alt = `this is an image of ${pictureArray[imgOneIndex].name}`;
  imgTwo.title = pictureArray[imgTwoIndex].name;
  imgTwo.alt = `this is an image of ${pictureArray[imgTwoIndex].name}`;
  imgThree.title = pictureArray[imgThreeIndex].name;
  imgThree.alt = `this is an image of ${pictureArray[imgThreeIndex].name}`;

  pictureArray[imgOneIndex].views++;
  pictureArray[imgTwoIndex].views++;
  pictureArray[imgThreeIndex].views++;
}

// ***** EVENT HANDLERS*****

function handleClick(event) {

  let imgClicked = event.target.title;
  // console.dir(imgClicked);

  for (let i = 0; i < pictureArray.length; i++) {
    if (imgClicked === pictureArray[i].name) {
      pictureArray[i].votes++;
    }
  }

  votingRounds--;
  renderImg();
  if(votingRounds === 0){
    imgContainer.removeEventListener('click', handleClick);
  }
}

function handleResults(){
  if(votingRounds === 0){
    for(let i = 0; i < pictureArray.length; i++){
      let liElem = document.createElement('li');
      liElem.textContent = `${pictureArray[i].name} - views: ${pictureArray[i].views} & votes: ${pictureArray[i].votes}`;
      resultsList.appendChild(liElem);
    }
    resultsBtn.removeEventListener('click', handleResults);
  }
}

// ***** EXECUTABLE CODE *****
let bag = new RandomImage('bag');
let banana = new RandomImage('banana');
let bathroom = new RandomImage('bathroom');
let boots = new RandomImage('boots');
let breakfast = new RandomImage('breakfast');
let bubblegum = new RandomImage('bubblegum');
let chair = new RandomImage('chair');
let cthulhu = new RandomImage('cthulhu');
let dogDuck = new RandomImage('dog-duck');
let dragon = new RandomImage('dragon');
let pen = new RandomImage('pen');
let petSweep = new RandomImage('pet-sweep');
let scissors = new RandomImage('scissors');
let shark = new RandomImage('shark');
let sweep = new RandomImage('sweep', 'png');
let tauntaun = new RandomImage('tauntaun');
let unicorn = new RandomImage('unicorn');
let waterCan = new RandomImage('water-can');
let wineGlass = new RandomImage('wine-glass');



pictureArray.push(bag, banana, bathroom, boots, breakfast, bubblegum, chair, cthulhu, dogDuck, dragon, pen, petSweep, scissors, shark, sweep, tauntaun, unicorn, waterCan, wineGlass);

renderImg();

imgContainer.addEventListener('click', handleClick);
resultsBtn.addEventListener('click', handleResults);

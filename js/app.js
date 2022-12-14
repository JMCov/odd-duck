'use strict';
// ***** GLOBALS *****
console.log('Hello Jordan');

let pictureArray = [];
let votingRounds = 25;
let preIndex = [-1, -1, -1];


// ***** DOM WINDOWS *****
let imgContainer = document.getElementById('img-container');

let imgOne = document.getElementById('img-one');
let imgTwo = document.getElementById('img-two');
let imgThree = document.getElementById('img-three');


let resultsBtn = document.getElementById('show-results-btn');
let canvasElem = document.getElementById('myChart');

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
  while (preIndex.includes(imgOneIndex) || imgOneIndex === imgTwoIndex || imgOneIndex === imgThreeIndex) {
    imgOneIndex = randomIndex();
  }

  while (preIndex.includes(imgTwoIndex) || imgOneIndex === imgTwoIndex || imgTwoIndex === imgThreeIndex) {
    imgTwoIndex = randomIndex();
  }

  while (preIndex.includes(imgThreeIndex) || imgThreeIndex === imgTwoIndex || imgOneIndex === imgThreeIndex) {
    imgThreeIndex = randomIndex();
  }

  preIndex[0] = imgOneIndex;
  preIndex[1] = imgTwoIndex;
  preIndex[2] = imgThreeIndex;
  console.log(preIndex);

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

function renderChart() {
  let pictureName = [];
  let pictureVotes = [];
  let pictureViews = [];

  for (let i = 0; i < pictureArray.length; i++) {
    pictureName.push(pictureArray[i].name);
    pictureVotes.push(pictureArray[i].votes);
    pictureViews.push(pictureArray[i].views);
  }

  let chartObj = {
    type: 'bar',
    data: {
      labels: pictureName,
      datasets: [{
        label: '# of Votes',
        data: pictureVotes,
        borderWidth: 1

      },
      {
        label: '# of Views',
        data: pictureViews,
        borderWidth: 1

      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  };

  new Chart(canvasElem, chartObj);
}

// ***** EVENT HANDLERS*****

function handleClick(event) {

  let imgClicked = event.target.title;

  for (let i = 0; i < pictureArray.length; i++) {
    if (imgClicked === pictureArray[i].name) {
      pictureArray[i].votes++;
    }
  }

  votingRounds--;
  renderImg();
  if (votingRounds === 0) {
    imgContainer.removeEventListener('click', handleClick);
  }

  let stringifiedPictures = JSON.stringify(pictureArray);
  localStorage.setItem('myPictures', stringifiedPictures);
  console.log('Stringified data', stringifiedPictures);

}

function handleResults() {
  if (votingRounds === 0) {
    renderChart();
  }
}
// ***** EXECUTABLE CODE *****

let storedPictures = localStorage.getItem('myPictures');
let parsedData = JSON.parse(storedPictures);

if (storedPictures) {
  pictureArray = parsedData;
} else {
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
}

renderImg();

imgContainer.addEventListener('click', handleClick);
resultsBtn.addEventListener('click', handleResults);

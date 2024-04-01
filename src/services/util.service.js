export const utilService = {
    makeId,
    makeLorem,
    getRandomIntInclusive,
    debounce,
    randomPastTime,
    getRandomColor,
    saveToStorage,
    loadFromStorage,
    darkenColor,
    getColorAlfa,
    bringColor,
    cmpsOrderCapsLk,
}


function darkenColor(rgbString, amount) {
    let [r, g, b] = rgbString.match(/\d+/g).map(Number);
    r = Math.max(0, r - amount);
    g = Math.max(0, g - amount);
    b = Math.max(0, b - amount);
    return `rgb(${r}, ${g}, ${b})`;
  }


function makeId(length = 6) {
    var txt = ''
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length))
    }

    return txt
}

function makeLorem(size = 100) {
    var words = ['The sky', 'above', 'the port', 'was', 'the color of television', 'tuned', 'to', 'a dead channel', '.', 'All', 'this happened', 'more or less', '.', 'I', 'had', 'the story', 'bit by bit', 'from various people', 'and', 'as generally', 'happens', 'in such cases', 'each time', 'it', 'was', 'a different story', '.', 'It', 'was', 'a pleasure', 'to', 'burn']
    var txt = ''
    while (size > 0) {
        size--
        txt += words[Math.floor(Math.random() * words.length)] + ' '
    }
    return txt
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1)) + min //The maximum is inclusive and the minimum is inclusive 
}


function randomPastTime() {
    const HOUR = 1000 * 60 * 60
    const DAY = 1000 * 60 * 60 * 24
    const WEEK = 1000 * 60 * 60 * 24 * 7

    const pastTime = getRandomIntInclusive(HOUR, WEEK)
    return Date.now() - pastTime
}

function debounce(func, timeout = 300) {
    let timer
    return (...args) => {
        clearTimeout(timer)
        timer = setTimeout(() => { func.apply(this, args) }, timeout)
    }
}


  
function bringColor() {
    const rgbColors = [
        "rgb(23, 90, 99)",
        "rgb(3, 127, 76)",
        "rgb(0, 200, 117)",
        "rgb(156, 211, 38)",
        "rgb(202, 182, 65)",
        "rgb(255, 203, 0)",
        "rgb(120, 75, 209)",
        "rgb(157, 80, 221)",
        "rgb(0, 126, 181)",
        "rgb(87, 155, 252)",
        "rgb(102, 204, 255)",
        "rgb(187, 51, 84)",
        "rgb(223, 47, 74)",
        "rgb(255, 0, 127)",
        "rgb(255, 90, 196)",
        "rgb(255, 100, 46)",
        "rgb(253, 171, 61)",
        "rgb(127, 83, 71)",
        "rgb(196, 196, 196)",
        "rgb(117, 117, 117)"
      ]

      return rgbColors
}



function getRandomColor() {
    const rgbColors = bringColor();
    const randomIndex = Math.floor(Math.random() * rgbColors.length); 
    console.log('color', rgbColors[randomIndex]);
    return rgbColors[randomIndex]; 
}

  function getColorAlfa(rgbColor) {
  const rgbValues = rgbColor.match(/\d+/g);
  const rgbaColor = `rgba(${rgbValues[0]}, ${rgbValues[1]}, ${rgbValues[2]}, 0.5)`;
  return rgbaColor;
}

// function getRandomColor() {
//     let letters = '0123456789ABCDEF';
//     let color = '#';
//     for (let i = 0; i < 6; i++) {
//       color += letters[Math.floor(Math.random() * 16)];
//     }
//     return color;
//   }

function saveToStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value))
}

function loadFromStorage(key) {
    const data = localStorage.getItem(key)
    return (data) ? JSON.parse(data) : undefined
}

function cmpsOrderCapsLk(key) {
    switch (key) {
        case "people":
          return "Person"
        case "status":
          return "Status"
        case "priority":
          return "Priority"
        case "timeLine":
            return "TimeLine"
        default:
          return
  
      }
}

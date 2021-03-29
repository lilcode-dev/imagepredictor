const getImageData = () => document.querySelector('.img-predict');
const mobilenetReady = () => {
    console.log('mobilenet is ready!');
}
const colorThief = new ColorThief();
let mobilenet = ml5.imageClassifier('MobileNet', mobilenetReady());

const fileReceived = (fileName) => {
    console.log(`file name: ${fileName}`);
    predictImage();
}
let resultsPredict;
const predictImage = () => {
    mobilenet.predict( getImageData(), (err, results) => {
        console.log(results);
        resultsPredict = results;
        palleteColors();
        loadingCircle.style.display = 'none';
        console.log('klk')
        resultsDiv.style.display = 'block'
        setInterval(1000, setResults());
    });
}


const labelResults = document.querySelectorAll('.label-result span')
const setResults = () => {
    try{
        labelResults[0].innerText = resultsPredict[0].label;
        document.querySelector('#results-0 div').ldBar.set(100 * (resultsPredict[0].confidence))
        labelResults[1].innerText = resultsPredict[1].label;
        document.querySelector('#results-1 div').ldBar.set(100 * (resultsPredict[1].confidence))
        labelResults[2].innerText = resultsPredict[2].label;
        document.querySelector('#results-2 div').ldBar.set(100 * (resultsPredict[2].confidence))
    } catch(error) {
        console.log(error);
    }
    
}


const palleteColors = () => {
    let colors = colorThief.getPalette(getImageData());
    let twoColors = [[...colors[0]],[...colors[1]]];
    document.documentElement.style.setProperty('--color1', `rgb(${twoColors[0][0]},${twoColors[0][1]},${twoColors[0][2]})`);
    document.documentElement.style.setProperty('--color1', `rgb(${twoColors[1][0]},${twoColors[1][1]},${twoColors[1][2]})`);
}
window.onload = function() {
    const bar0 = document.querySelector('#results-0 div').ldBar;
    const bar1 = document.querySelector('#results-1 div').ldBar;
    const bar2 = document.querySelector('#results-2 div').ldBar;
    console.log(bar0)
}

// Progress Bar

// var barResult1 = new ldBar("#results-0", {
//     "stroke": '#f00',
//     "stroke-width": 20,
//     "preset": "circle",
//     "value": 0,
//     "duration": 3,
//     "precision": 0.01
//    });
//    console.log(barResult1);
//    barResult1.set(0);
//    setInterval(200, barResult1.set(28.2999783754))
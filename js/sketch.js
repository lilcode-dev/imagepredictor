const getImageData = () => document.querySelector('.img-predict');
const mobilenetReady = () => {
    console.log('mobilenet is ready!');
}
const colorThief = new ColorThief();
let mobilenet = ml5.imageClassifier('MobileNet', mobilenetReady());
const fileReceived = (fileName) => {
    console.log(`file name: ${fileName}`);
}
const predictImage = () => {
    mobilenet.predict( getImageData(), (err, results) => {
        console.log(results);
    }).then((response) => {
        palleteColors();
        footer.style.position = 'inherit';
        loadingCircle.style.display = 'none';
        resultsDiv.style.display = 'flex';
        setResults(response)
    })
}

const labelResults = document.querySelectorAll('.label-result span')

// fixing data-duration error (loading.io)

let bar0 = new ldBar(document.querySelector('#results-0 div'));
let bar1 = new ldBar(document.querySelector('#results-1 div'));
let bar2 = new ldBar(document.querySelector('#results-2 div'));

//
const setResults = (results) => {
    bar0.set(0);
    labelResults[0].innerText = results[0].label;
    setTimeout(() => {
        bar0.set(100 * (results[0].confidence));
        console.log('bar0!')
    }, 500);
    bar1.set(0);
    labelResults[1].innerText = results[1].label;
    setTimeout(() => {
        bar1.set(100 * (results[1].confidence));
        console.log('bar1!')
    }, 500);
    bar2.set(0);
    labelResults[2].innerText = results[2].label;
    setTimeout(() => {
        bar2.set(100 * (results[2].confidence));
        console.log('bar2!')
    }, 500);
    setTimeout(() => {
        resetButton.style.display = "block";
    }, 4000);
}

// set colors in background

const palleteColors = () => {
    let colors = colorThief.getPalette(getImageData());
    let twoColors = [[...colors[0]],[...colors[1]]];
    document.documentElement.style.setProperty('--color1', `rgb(${twoColors[0][0]},${twoColors[0][1]},${twoColors[0][2]})`);
    document.documentElement.style.setProperty('--color2', `rgb(${twoColors[1][0]},${twoColors[1][1]},${twoColors[1][2]})`);
}

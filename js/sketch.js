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

const predictImage = () => {
    mobilenet.predict( getImageData(), (err, results) => {
        console.log(results);
    });
}

// Progress Bar

// var bar = new ldBar(".results", {
//     "stroke": '#f00',
//     "stroke-width": 10,
//     "preset": "circle",
//     "value": 0,
//     "duration": 3,
//     "precision": 0.01
//    });
//    bar.set(0);
//    setInterval(200, bar.set(28.2999783754))
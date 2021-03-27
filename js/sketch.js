const mobilenetReady = () => {
    console.log('mobilenet is ready!');
}
let mobilenet = ml5.imageClassifier('MobileNet', mobilenetReady());

const fileReceived = (fileName) => {
    console.log(`file name: ${fileName}`);
    predictImage();
}
const getImageData = () => document.querySelector('.img-predict');

const predictImage = () => {
    mobilenet.predict( getImageData(), (err, results) => {
        console.log(results);
    });
}
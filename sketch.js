
let img, video;
let objectDetector;
let detections;

function preload(){
    // img = loadImage('cat-dog.jpg');
    video = createCapture(VIDEO, videoReady);
    objectDetector = ml5.objectDetector('cocossd', modelReady);
}

function modelReady(){
    console.log('Model is Raedy!!');
    
}

function videoReady(){
    objectDetector.detect(video, gotResults);
}

function gotResults(err, res){
    if(err){
        console.error(err);
    } else {
        detections = res;
        objectDetector.detect(video, gotResults);
    }
}

function setup(){
    createCanvas(720, 560);
    background(0);
    // image(img, 0, 0, width, height);
    video.hide();
}

function draw(){
    // image(img, 0, 0, width, height);
    image(video, 0, 0, width, height);
    detections?.map((res) => {
        stroke(0, 255, 0);
        strokeWeight(4);
        noFill();
        rect(res.x, res.y, res.width, res.height);
        noStroke();
        fill(0);
        textSize(24);
        text(res.label+" "+Math.floor(res.confidence * 100), res.x + 10, res.y + 50);
    })
}
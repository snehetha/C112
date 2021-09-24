var prediction1="";
var prediction2="";
Webcam.set({
    width: 350,
    height: 300,
    image_format:"png",
    png_quality:100
});
var cam=document.getElementById("camera");
Webcam.attach("#camera");
function take_snapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML='<img id="cap" src="'+data_uri+'">';
    });
}
console.log("ml5 version",ml5.version);
var classifier=ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/sUc9e5xoV/model.json",modelLoaded);
function modelLoaded(){
    console.log("modelisloaded");
}
function speak(){
    var synth=window.speechSynthesis;
    var speak_data_1="the prediction one is" +prediction1;
     var speak_data_2="the prediction two is" +prediction2;
     var utter=new SpeechSynthesisUtterance(speak_data_1+speak_data_2);
     synth.speak(utter);
}
function predict(){
    var img=document.getElementById("cap");
classifier.classify(img,gotresult);
}
function gotresult(error,results){
    if (error){
        console.error(error);
    }
    else {
        console.log(results);
        document.getElementById("result_emotion_name").innerHTML = results[0].label; 
        document.getElementById("result_emotion_name2").innerHTML = results[1].label;
         prediction_1 = results[0].label;
         prediction_2 = results[1].label;
speak();
if(results[0].label=="happy"){
    document.getElementById("update_emoji").innerHTML="&#128522;";
}
if(results[0].label=="sad"){
    document.getElementById("update_emoji").innerHTML="&#128532;";
}
if(results[0].label=="angry"){
    document.getElementById("update_emoji").innerHTML="&#128548;";
}
if(results[1].label=="happy"){
    document.getElementById("update_emoji2").innerHTML="&#128522;";
}
if(results[1].label=="sad"){
    document.getElementById("update_emoji2").innerHTML="&#128532";
}
if(results[1].label=="angry"){
    document.getElementById("update_emoji2").innerHTML="&#128548;";
}
    }
}
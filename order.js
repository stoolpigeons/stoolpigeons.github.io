var stageCount =1;

const stage1 = {
    "title":"Lets start",
    "info":"First, lets get a name for this order:",
    "subtext":"Psst! Make sure you know what you're getting into; We don't do refunds nor returns...",
    "varToStore":"clientName"
};

const stage2 = {
    "title":"Make sure we can talk",
    "info":"Next, we will need an email. Preferably the club/buisiness email of your club/buisiness.",
    "subtext":"Please do not give us a fake email; It will hurt you alot more than it will hurt us.",
    "varToStore":"clientEmail"
};

const stage3 = {
    "title":"s3title",
    "info":"s3info",
    "subtext":"s3subtext",
    "varToStore":"clientVar3"
};

var client = {
    "clientName":"",
    "clientEmail":"",
    "clientVar3":""
};

const stageIndex=[];
stageIndex["s1"] = stage1;
stageIndex["s2"] = stage2;
stageIndex["s3"] = stage3;

var orderJ = document.getElementById("orderWindow");
var orderI = document.getElementById("orderInfo");
var orderS = document.getElementById("orderSubtext");
var orderT = document.getElementById("orderTitle");
var textF = document.getElementById("cName");



 function fadeReset() {
    orderI.innerHTML = stageIndex["s" + stageCount]["info"];
    orderS.innerHTML = stageIndex["s" + stageCount]["subtext"];
    orderT.innerHTML = stageIndex["s" + stageCount]["title"];
    fade("in", orderJ, 20, null)

}

function submitButton() {
    if(textF.value != ""){
        client[stageIndex["s" + stageCount]["varToStore"]] = document.getElementById("cName").value;
        textF.value = "";
        console.log("User input '" + client[stageIndex["s" + stageCount]["varToStore"]] + ".");
        fade("out", orderJ, 10, true);
        stageCount += 1;


        //Form req
        return false;


    }
}



function fade(type, element, fadeI, anim) {
    //Fading in
    if(type=="in") {
        var stopI = false;
        var opac = 0.1;
        element.style.display = 'block';
        var timer = setInterval(function () {
            if (opac >= 1 && stopI == false){
                console.log("Finished fading in.")
                stopI = true;
            }
            else if(stopI==false){
                element.style.opacity = opac;
                element.style.filter = 'alpha(opacity=' + opac * 100 + ")";
                opac += opac * 0.1;
            }

        }, fadeI);
    }

    //Fading out
    else if(type=="out") {
        var stopO = false;
        var opac = 1;
        var timer = setInterval(function () {
            if (opac <= 0 && stopO == false){
                if(anim==true){
                    fadeReset(); 
                }
                console.log("Finished fading out.")
                stopO = true;
            }
            else if(stopO == false) {
                element.style.opacity = opac;
                element.style.filter = 'alpha(opacity=' + opac * 100 + ")";
                opac -= (opac * 0.1)+0.01;
            }

        }, fadeI);

    }

    //Error Handling
    else {
        console.log("Error: Input for fade(func).type not 'in' or 'out'")
    }
}


//Startup code
orderJ.style.opacity = 0;
orderJ.style.filter = 'alpha(opacity=0)';
orderI.innerHTML = stageIndex["s" + stageCount]["info"];
orderS.innerHTML = stageIndex["s" + stageCount]["subtext"];
orderT.innerHTML = stageIndex["s" + stageCount]["title"];
fade("in", orderJ, 20, null)
console.log("'order.js' enabled")

function test(){
    Email.send(
    "pigeonorderrecieve@gmail.com",
    "pigeonorderrecieve@gmail.com",
    "OmgYas",
    "It work omg",
    {
        token: "8b8e07b3-2f54-4291-877c-2ef7ab9c2d17",
        callback: function done(message) { alert("sent") }   
    }
);
}

//token: 8b8e07b3-2f54-4291-877c-2ef7ab9c2d17


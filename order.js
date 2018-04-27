var savedScripts = []

var stepA = false;

var stageCount =1;

var randClickProtection = 0;

var client = {
    "clientName":"",
    "clientEmail":"",
    "null":"",
    "clientDesign":"",
    "clientShirtColor":"",
    "clientDesignColor":"",
    "clientDesignPosition":""
};

const stage1 = {
    "title":"Let's start",
    "info":"First, let's get a name for this order:",
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
    "title":"Got it!",
    "info":"Name: " + client["clientName"]+"</br>"+"Email: "+client["clientEmail"],
    "subtext":"Made a mistake? Click the button to re-submit your credentials.",
    "varToStore":"null"
};




const stageIndex=[];
stageIndex["s1"] = stage1;
stageIndex["s2"] = stage2;
stageIndex["s3"] = stage3;



var confirmJ = document.getElementById("confirmWindow");
var orderJ = document.getElementById("orderWindow");
var orderI = document.getElementById("orderInfo");
var orderS = document.getElementById("orderSubtext");
var orderT = document.getElementById("orderTitle");
var textF = document.getElementById("cName");
var designJ = document.getElementById("designWindow");
var nButton = document.getElementById("nextButton");
var fileD = document.getElementById("fileDisplay");
var inputField = document.getElementById("inputfile");
var dPos = document.getElementById("showPlacePicked");
var sColor = document.getElementById("showColorPicked");
var dColor =  document.getElementById("showColorPickedDes");
var bButton = document.getElementById("orderButton");
var shirtNum = document.getElementById("number");
var entireJ = document.getElementById("entireWindow");



function submitButton() {
    console.log("pressed");
    if(stageCount == Object.keys(stageIndex).length) {
            stageCount = 1;
            fade("out", orderJ, 10, true, "part1Reset");
            stageIndex["s1"]["title"]="Let's restart";
            stageIndex["s1"]["info"]="Let's get a name for this order.";
    }
    else if(textF.value != ""){
        if(stageCount != Object.keys(stageIndex).length){
            client[stageIndex["s" + stageCount]["varToStore"]] = textF.value;
            fade("out", orderJ, 10, true, "part1Reset");
            stageCount += 1;
            console.log("User input '" + client[stageIndex["s" + stageCount]["varToStore"]] + ".");
        }




        textF.value = "";
        //Form req
        return false;


    }
}



function fade(type, element, fadeI, doScript, script) {
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
                if(doScript==true){
                    savedScripts[script]();
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
fade("in", orderJ, 20, null, null);
console.log("'order.js' enabled");

function submitOrder() {
    client["shirtNumber"] = shirtNum.value;
    Email.send(
        "pigeonorderrecieve@gmail.com",
        "pigeonorderrecieve@gmail.com",
        "Order from " + client["clientName"] + " at " + client["clientEmail"],
        "Name: " + client["clientName"]+" | Email: "+ client["clientEmail"]+" | Shirt Quantity: " + client["shirtNumber"] + " | Shirt Color: "+client["clientShirtColor"]+" | Design Color: "+client["clientDesignColor"]+" | Design Position: "+client["clientDesignPosition"]+" | Design: "+client["clientDesign"],
        {token: "63cb3a19-2684-44fa-b76f-debf422d8b00"}
    );
}

savedScripts["buttonReset"] = function() {
    fade("in", nButton, 20, null, null);
}

savedScripts["buttonOut"] =  function() {
    nButton.style.display = "none";
}

savedScripts["killDJ"] = function() {
    designJ.style.display = "none"
}

savedScripts["killOJ"] = function() {
    entireJ.style.display = "none"
}

savedScripts["part1Reset"] = function() {
    stageIndex["s3"]["info"] = "Name: " + client["clientName"]+"</br>"+"Email: "+client["clientEmail"]
    orderI.innerHTML = stageIndex["s" + stageCount]["info"];
    orderS.innerHTML = stageIndex["s" + stageCount]["subtext"];
    orderT.innerHTML = stageIndex["s" + stageCount]["title"];
    fade("in", orderJ, 20, null, null);
    if(stageCount == (Object.keys(stageIndex).length)) {
        textF.style.display = 'none';
        if(stepA == false){
            nButton.style.display = "inline";
            savedScripts["buttonReset"]();
            stepA = true;
        }
    }
    else{
        textF.style.display = 'inline';
    }

}

function nextStep() {
    designJ.style.display = "inline";
    fade("in", designJ, 20, null, null);
    fade("out", nButton, 20, true, "buttonOut");

}


function orderButton() {
    if(randClickProtection < 1){
        bButton.innerHTML = "Are you sure?";
        randClickProtection +=1
    } else {
        submitOrder();
        fade("out", designJ, 20, true, "killDJ");
        fade("out", entireJ, 20, true, "killOJ");
        confirmJ.style.display = "inline";
        fade("in", confirmJ, 20, null, null);
    }

}

function encodeImageFileAsURL(element) {
  var file = element.files[0];
  var reader = new FileReader();
  reader.onloadend = function() {
    console.log('RESULT', reader.result)
    client["clientDesign"] = "" + reader.result
    fileD.src = client["clientDesign"];
    fileD.style.display = "inline";

  }
  reader.readAsDataURL(file);
}

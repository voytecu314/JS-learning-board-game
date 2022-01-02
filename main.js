const fields = document.querySelectorAll('.fields');
const dice = document.getElementById('dice-canvas');
const playerBoard = document.querySelectorAll('.player-board');
const table = document.getElementById('highscore-tbl');

let playersPoints = [], playersPointsHistory = [], playerFieldBefore = [], names = [], correctAns = [], lucky = [], dicePts = [], diceAvg = [], beatenPts = [], beaten = [];
let round=0, nameCounter=0,playerDirection, namePrompt, beatenColor, beatenPlayerNumber, randomBefore=6, secondThrow, secondQuestion, correct = 0, incorrect = 0;
let color = ["red","blue","green","orange","yellow","lightgrey","pink","cadetblue","darkgoldenrod","rebeccapurple","aqua","burlywood","coral","darkmagenta","firebrick","indigo","khaki","lavender","maroon","midnightblue"];

const changDirectionToLeft = [-9,9,7,5,3,1,-1,-3,-5,-7,-9];

const cnv = document.getElementById("cnv");
const ctx = cnv.getContext("2d");

/*SET NUMBERS ON BOARD*/
for(let i=10; i<92;i+=20){
    for(let j=0; j<10; j++){
        fields[i+j].childNodes[0].innerText=10-j+i;
    }
}
/*SET NUMBERS ON BOARD*/

function setPlayerBoard(index) {
    playerBoard[index].childNodes[0].style.color=color[index];
    playerBoard[index].childNodes[1].style.color=color[index];
    playerBoard[index].childNodes[2].style.color=color[index];
    playerBoard[index].childNodes[0].style.visibility='visible';
    playerBoard[index].childNodes[0].innerText=`Player ${index+1}`;
    playerBoard[index].childNodes[1].style.visibility='visible';
    playerBoard[index].childNodes[2].style.visibility='visible';
    playerBoard[index].childNodes[2].innerText=names[nameCounter];
}

while(namePrompt!=="START" && nameCounter<color.length){
namePrompt = prompt("Enter player name or type START to begin the game","START");
names.push(namePrompt);

if(namePrompt==='START') {alert('Lets begin!'); break;}
else if(nameCounter==19) {alert('Max allowed number of players! Lets begin.');}

setPlayerBoard(nameCounter);

nameCounter++;
}

for(let i=0; i<names.length-1; i++){
    correctAns.push([]);
    dicePts.push(0);
    beatenPts.push(0);
    beaten.push(0);
    lucky.push(0);
    playersPoints[i]=0;
    playerFieldBefore[i]=0;
}

console.log(names);

function setDirection(playerPts) {
                
            // playerDirection = (Math.floor(playersPoints[playerNumber]-1/10)%2) ? "left" : "right";

            switch(playerPts) {
                case 1: case 2: case 3: case 4: case 5: case 6: case 7: case 8: case 9: case 10: 
                case 21: case 22: case 23: case 24: case 25: case 26: case 27: case 28: case 29: case 30:
                case 41: case 42: case 43: case 44: case 45: case 46: case 47: case 48: case 49: case 50:
                case 61: case 62: case 63: case 64: case 65: case 66: case 67: case 68: case 69: case 70:
                case 81: case 82: case 83: case 84: case 85: case 86: case 87: case 88: case 89: case 90:
                    playerDirection = "right"; break;
                case 11: case 12: case 13: case 14: case 15: case 16: case 17: case 18: case 19: case 20: 
                case 31: case 32: case 33: case 34: case 35: case 36: case 37: case 38: case 39: case 40:
                case 51: case 52: case 53: case 54: case 55: case 56: case 57: case 58: case 59: case 60:
                case 71: case 72: case 73: case 74: case 75: case 76: case 77: case 78: case 79: case 80:
                case 91: case 92: case 93: case 94: case 95: case 96: case 97: case 98: case 99: case 100:
                    playerDirection = "left"; break;
            }

            return playerDirection;
}

function setField(fieldNo, playerNo) {
    fields[fieldNo].childNodes[2].style.color=color[playerNo];
    fields[fieldNo].childNodes[4].style.color=color[playerNo];
    fields[fieldNo].childNodes[4].innerText=names[playerNo];
    fields[fieldNo].childNodes[2].style.visibility="visible";
    fields[fieldNo].childNodes[4].style.visibility="visible";
}

function winner(playerNo) {
    document.getElementById('winner').style.color=color[playerNo];
    document.getElementById('winner').innerText=`Winner!`;
    document.getElementById('winner-name').style.color=color[playerNo];
    document.getElementById('winner-name').innerText=names[playerNo];
    document.getElementById('king').style.color=color[playerNo];
    document.getElementById('king').style.visibility='visible';
    alert(`${names[playerNo]} ` + "WINS!\n" + `Score: ${playersPoints} in ${round+1} rounds`)
    for(let i=0; i<playersPoints.length ;i++) {
        drawChart(i);
    }
    createStats();
}

function displayRound(playerNo) {
    document.getElementById('winner').innerText=`Round: ${round+1}`;
    document.getElementById('winner-name').style.color=color[playerNo];
    document.getElementById('winner-name').innerText=names[playerNo];
}

function drawChart(playerNo) {
    document.getElementById('chart').style.display="block";
    let tempRoundArray = [];
    let move = 0, chartRoundFraction, fontPx;

    chartRoundFraction = (round<6)?48:(round<10)?30:(round<=12)?24:(round<=16)?18:15;

    if(playerNo==0) {
        fontPx = (round<=10)?"8px":(round<=16)?"6px":"4px";
        ctx.font = fontPx +" Arial";
        ctx.strokeStyle = "#FFFFFF";
        ctx.fillStyle = "black";
        ctx.beginPath();

        for(let i=0; i<=round; i++){
            tempRoundArray = playersPointsHistory[i][0]; 
            move+=chartRoundFraction;
            ctx.fillText(`R. ${i+1}`, move-(chartRoundFraction/2)-5, 30);  
            ctx.moveTo(move, cnv.height);
            ctx.lineTo(move, 0);
        }
        
        ctx.stroke();
    }

    ctx.strokeStyle = ctx.fillStyle = color[playerNo];

    move = 0;

    ctx.beginPath();
    
    for(let i=0; i<=round; i++){
        tempRoundArray = playersPointsHistory[i][playerNo];
        ctx.moveTo(move, cnv.height-tempRoundArray[playerNo]);
            console.log(tempRoundArray+ " - " +round+ " - " + (i+1)+" : "+tempRoundArray.length);
            for(let j=0; j<tempRoundArray.length; j++){
                ctx.lineTo(move, cnv.height-tempRoundArray[j]);
                console.log(move +":"+move);
                if(j!=tempRoundArray.length-1){
                    move+=(chartRoundFraction/(tempRoundArray.length-1));
                }
            }
          if(i==round) {
            ctx.fillText(`${names[playerNo]}\n${playersPoints[playerNo]}`, move+1, cnv.height-playersPoints[playerNo]);
          }
    }
    
    ctx.stroke();
}

function createStats() {
    let tableRow;
    for(let i=0; i<names.length-1; i++){
        correctAns[i].forEach(function myFunction(ans) {
            if(ans) correct++; else incorrect++;
          });
        
        diceAvg[i] = dicePts[i]/(round+1);
        tableRow=`<tr>
                    <td>${i+1}</td>
                    <td>${names[i]}</td>
                    <td>${playersPoints[i]}</td>
                    <td>${correct}</td>
                    <td>${lucky[i]}</td>
                    <td>${incorrect}</td>
                    <td>${beaten[i]}</td>
                    <td>${beatenPts[i]}</td>
                    <td>${dicePts[i]}</td>
                    <td>${diceAvg[i].toPrecision(3)}</td>
                  </tr>\n`
        table.innerHTML+=tableRow;
        correct = 0;
        incorrect = 0;
    }
}

function statsOn() {
    document.getElementById('stats-window').style.display="block";
}

function statsOff() {
    document.getElementById('stats-window').style.display="none";
}

function chartOff() {
    document.getElementById('chart').style.display="none";
}

fetch("./quiz.json")
    .then(function(resp) {
        return resp.json();
    })
    .then(function(data) {
    

        function throwDice(playerPoints,playerNumber) {

            displayRound(playerNumber);

            alert(`Please throw the dice ${names[playerNumber]}`);
            
            if(playerPoints===0) {
                playerBoard[playerNumber].style.display='none';
            }

            let playerField, diceRotationY, diceRotationX, repeatRotationCounter=0;
            let random = Math.ceil(Math.random()*6); //dice
            dicePts[playerNumber]+=random;

            switch(random) {
                case 1: diceRotationY=90; diceRotationX=360; break;
                case 2: diceRotationY=270; diceRotationX=360; break;
                case 3: diceRotationY=360; diceRotationX=90; break;
                case 4: diceRotationY=360; diceRotationX=-90; break;
                case 5: diceRotationY=180; diceRotationX=360; break;
                case 6: diceRotationY=360; diceRotationX=360; break;
            }

            if(random===randomBefore){
                repeatRotationCounter++;
                if(repeatRotationCounter%2==0) {
                    dice.style.transform=`rotateY(${diceRotationY+360}deg) rotateX(${diceRotationX+360}deg)`;
                    } else {
                    dice.style.transform=`rotateY(${diceRotationY-360}deg) rotateX(${diceRotationX-360}deg)`;
                    }
                
                } else {
                    dice.style.transform=`rotateY(${diceRotationY}deg) rotateX(${diceRotationX}deg)`;
                    repeatRotationCounter=0;
                }
            

            randomBefore=random;

            playersPoints[playerNumber]+=random; 
            playersPointsHistory[round][playerNumber].push(playersPoints[playerNumber]);
            
            console.log(`${names[playerNumber]} got ${random}, his pts is ${playersPoints[playerNumber]} in round ${round+1}`);

            playerDirection = setDirection(playersPoints[playerNumber]);

            playerField = (playerDirection==="right") ? playersPoints[playerNumber] : playersPoints[playerNumber] + changDirectionToLeft[playersPoints[playerNumber]%10];


            if(fields[playerFieldBefore[playerNumber]].childNodes[2].style.color===color[playerNumber]) {
                fields[playerFieldBefore[playerNumber]].childNodes[2].style.visibility="hidden";
                fields[playerFieldBefore[playerNumber]].childNodes[4].style.visibility="hidden";
            }

            if( playersPoints[playerNumber] >100) winner(playerNumber);
            
            if(fields[playerField-1].childNodes[2].style.visibility==="visible"){
                beatenColor = fields[playerField-1].childNodes[2].style.color;
                for(let i=0; i<playersPoints.length; i++){
                    if(beatenColor===color[i]) {beatenPlayerNumber=i; break;}
                }
                playersPointsHistory[round][beatenPlayerNumber].push(0);
                beatenPts[beatenPlayerNumber] -= playersPoints[beatenPlayerNumber];
                beaten[beatenPlayerNumber]++;
                console.log("beaten: "+beatenPts+" : "+beaten);
                playersPoints[beatenPlayerNumber]=0;
                playerBoard[beatenPlayerNumber].style.display='flex';
            }

            setField(playerField-1, playerNumber);
                
            playerFieldBefore[playerNumber] = playerField-1;
            
            console.log(playersPoints);
            if(random==6) {
                lucky[playerNumber]++;
                alert('Lucky! You got 6, you will throw the dice again.')
                throwDice(playerPoints,playerNumber);
            } else if(!secondThrow) jsQuestion(playerNumber,playerDirection);
        }

        /*After dice comes JS answers mechanism*/

        function jsQuestion(playerNumber,playerDirection) {

            let randomQuestion = Math.floor(Math.random()*data.length);
            let answer = prompt(data[randomQuestion][0],data[randomQuestion][1]);

            while(answer.toUpperCase()!=="A" && answer.toUpperCase()!=="B" && answer.toUpperCase()!=="C") {
                answer = prompt(data[randomQuestion][0],data[randomQuestion][1]);
            }

            
            if(answer.toUpperCase()===data[randomQuestion][2]) { 

                fields[playerFieldBefore[playerNumber]].childNodes[2].style.visibility="hidden";
                fields[playerFieldBefore[playerNumber]].childNodes[4].style.visibility="hidden"; 

                correctAns[playerNumber].push(true);

                alert("Very good answer!\n\nBONUS: Jump to next row.");
                console.log(playerDirection+":"+playerFieldBefore[playerNumber]);

                if(fields[playerFieldBefore[playerNumber]+10] && fields[playerFieldBefore[playerNumber]+10].childNodes[2].style.visibility==="visible"){
                    beatenColor = fields[playerFieldBefore[playerNumber]+10].childNodes[2].style.color;
                    for(let i=0; i<playersPoints.length; i++){
                        if(beatenColor===color[i]) {beatenPlayerNumber=i; break;}
                    }

                    setField(playerFieldBefore[playerNumber], beatenPlayerNumber);

                    beatenPts[beatenPlayerNumber] -= (playersPoints[beatenPlayerNumber]-playersPoints[playerNumber])
                    beaten[beatenPlayerNumber]++;
                    console.log("beaten: "+beatenPts+" : "+beaten);
                    playersPoints[beatenPlayerNumber] = playersPoints[playerNumber];
                    // (playerDirection==="right") ? playerFieldBefore[playerNumber] + 1 : playerFieldBefore[playerNumber] + 1 -  changDirectionToLeft[(playerFieldBefore[playerNumber]+1)%10]; //??
                    playersPointsHistory[round][beatenPlayerNumber].push(playersPoints[beatenPlayerNumber]);
                    playerFieldBefore[beatenPlayerNumber] = playerFieldBefore[playerNumber];
                }

                playersPoints[playerNumber] = (playerDirection==="right") ? playerFieldBefore[playerNumber] + 11 +  changDirectionToLeft[((playerFieldBefore[playerNumber]+1)%10)] : playerFieldBefore[playerNumber] + 11 ;

                playersPointsHistory[round][playerNumber].push(playersPoints[playerNumber]);

                console.log(playerDirection+":"+playerFieldBefore[playerNumber]);
                
                if( playerFieldBefore[playerNumber]+10 >=100) winner(playerNumber);
                

                setField(playerFieldBefore[playerNumber]+10, playerNumber);
                playerDirection = setDirection(playersPoints[playerNumber]);

                playerFieldBefore[playerNumber] = playerFieldBefore[playerNumber]+10;

                console.log(`${names[playerNumber]} got bonus \n ${playersPoints}`);

                secondThrow = !secondThrow;

                if(secondThrow){
                    secondQuestion = prompt("Another question or dice throw?","Type Q for question or T for throw");
                    while(secondQuestion.toUpperCase()!=="Q" && secondQuestion.toUpperCase()!=="T") {
                        secondQuestion = prompt("Another question or dice throw?","Type Q for question or T for throw");
                    }
                    if(secondQuestion.toUpperCase()==="T"){
                        throwDice(playersPoints[playerNumber],playerNumber);
                    } else {
                        jsQuestion(playerNumber,playerDirection);
                        }
                }
            
            } else {alert("Answer not correct, good luck next time");
                fields[playerFieldBefore[playerNumber]].childNodes[2].style.visibility="visible";
                fields[playerFieldBefore[playerNumber]].childNodes[4].style.visibility="visible";
                correctAns[playerNumber].push(false);
                playersPointsHistory[round][playerNumber].push(playersPoints[playerNumber]);
                    }
        }

        for(let j=0; j<20; j++) {
            playersPointsHistory.push([]);
            if(j==19) alert('This is the last round!')
            for(let k=0; k<playersPoints.length; k++){
                playersPointsHistory[j].push([]);
            }
            for(let i=0; i<playersPoints.length; i++){
                alert(`NEXT MOVE: ${names[i]}`);
                secondThrow = false;
                throwDice(playersPoints[i],i)
            }
            console.log(playersPointsHistory);
            round++;
        }

    });
/***************************************/


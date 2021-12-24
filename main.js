const fields = document.querySelectorAll('.fields');
let playersPoints = [], playerFieldBefore = [], names = [], round=1, nameCounter=0, namePrompt, beatenColor, beatenPlayerNumber;
let color = ["red","blue","green","orange","yellow","lightgrey","pink","cadetblue","darkgoldenrod","rebeccapurple","aqua","burlywood","coral","darkmagenta","firebrick","indigo","khaki","lavender","maroon","midnightblue"];
const changDirectionToLeft = [-9,9,7,5,3,1,-1,-3,-5,-7,-9];

while(namePrompt!=="START" || nameCounter>color.length){
namePrompt = prompt("Enter player name or type START to begin the game","START");
names.push(namePrompt);
nameCounter++;}

for(let i=0; i<names.length-1; i++){
    playersPoints[i]=0;
    playerFieldBefore[i]=0;
}

console.log(names);


/*SET NUMBERS ON BOARD*/
for(let i=10; i<92;i+=20){
    for(let j=0; j<10; j++){
        fields[i+j].childNodes[0].innerText=10-j+i;
    }
}
/*SET NUMBERS ON BOARD*/

fetch("./quiz.json")
    .then(function(resp) {
        return resp.json();
    })
    .then(function(data) {
        console.log(data[11][0]);
    




        function throwDice(playerPoints,playerNumber) {

            let playerField, playerDirection;
            let random = Math.ceil(Math.random()*6); //dice
            
            
            playersPoints[playerNumber]+=random; 
            if( playersPoints[playerNumber] >100) {alert(`Player ${playerNumber+1} ` + "WINS!\n" +playersPoints)}
            console.log(`${names[playerNumber]} got ${random}, his pts is ${playersPoints[playerNumber]} in round ${round}`);
            
            // playerDirection = (Math.floor(playersPoints[playerNumber]-1/10)%2) ? "left" : "right";

            switch(playersPoints[playerNumber]) {
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
            

            playerField = (playerDirection==="right") ? playersPoints[playerNumber] : playersPoints[playerNumber] + changDirectionToLeft[playersPoints[playerNumber]%10];


            if(fields[playerFieldBefore[playerNumber]].childNodes[2].style.color===color[playerNumber]) {
                fields[playerFieldBefore[playerNumber]].childNodes[2].style.visibility="hidden";
                fields[playerFieldBefore[playerNumber]].childNodes[4].style.visibility="hidden";
            }

            
            if(fields[playerField-1].childNodes[2].style.visibility==="visible"){
                beatenColor = fields[playerField-1].childNodes[2].style.color;
                for(let i=0; i<playersPoints.length; i++){
                    if(beatenColor===color[i]) {beatenPlayerNumber=i; break;}
                }
                playersPoints[beatenPlayerNumber]=0;
            }

            fields[playerField-1].childNodes[2].style.color=color[playerNumber];
            fields[playerField-1].childNodes[4].style.color=color[playerNumber];
            fields[playerField-1].childNodes[4].innerText=names[playerNumber];
            fields[playerField-1].childNodes[2].style.visibility="visible";
            fields[playerField-1].childNodes[4].style.visibility="visible";
                
            playerFieldBefore[playerNumber] = playerField-1;
            
            jsQuestion(playerNumber,playerDirection);

        }

        /*After dice comes JS answers mechanism*/

        function jsQuestion(playerNumber,playerDirection) {

            let randomQuestion = Math.floor(Math.random()*data.length);
            let answer = prompt(data[randomQuestion][0],data[12][1]);

            while(answer.toUpperCase()!=="A" && answer.toUpperCase()!=="B" && answer.toUpperCase()!=="C") {
                answer = prompt(data[randomQuestion][0],data[12][1]);
            }

            
            if(answer.toUpperCase()===data[12][2]) { alert("Very good answer!");
            
                fields[playerFieldBefore[playerNumber]].childNodes[2].style.visibility="hidden";
                fields[playerFieldBefore[playerNumber]].childNodes[4].style.visibility="hidden"; 

                if(fields[playerFieldBefore[playerNumber]+10] && fields[playerFieldBefore[playerNumber]+10].childNodes[2].style.visibility==="visible"){
                    beatenColor = fields[playerFieldBefore[playerNumber]+10].childNodes[2].style.color;
                    for(let i=0; i<playersPoints.length; i++){
                        if(beatenColor===color[i]) {beatenPlayerNumber=i; break;}
                    }

                    fields[playerFieldBefore[playerNumber]].childNodes[2].style.color=color[beatenPlayerNumber];
                    fields[playerFieldBefore[playerNumber]].childNodes[4].style.color=color[beatenPlayerNumber];
                    fields[playerFieldBefore[playerNumber]].childNodes[4].innerText=names[beatenPlayerNumber];
                    fields[playerFieldBefore[playerNumber]].childNodes[2].style.visibility="visible";
                    fields[playerFieldBefore[playerNumber]].childNodes[4].style.visibility="visible";

                    playersPoints[beatenPlayerNumber] = (playerDirection==="right") ? playerFieldBefore[playerNumber] + 1 : playerFieldBefore[playerNumber] + 1 -  changDirectionToLeft[(playerFieldBefore[playerNumber]+1)%10]; //??

                    playerFieldBefore[beatenPlayerNumber] = playerFieldBefore[playerNumber];
                }
                

                if( playerFieldBefore[playerNumber]+10 >=100) {alert(`${names[playerNumber]} ` + "WINS!\n" +playersPoints)}
                fields[playerFieldBefore[playerNumber]+10].childNodes[2].style.color=color[playerNumber];
                fields[playerFieldBefore[playerNumber]+10].childNodes[4].style.color=color[playerNumber];
                fields[playerFieldBefore[playerNumber]+10].childNodes[4].innerText=names[playerNumber];
                fields[playerFieldBefore[playerNumber]+10].childNodes[2].style.visibility="visible";
                fields[playerFieldBefore[playerNumber]+10].childNodes[4].style.visibility="visible";

                playersPoints[playerNumber] = (playerDirection==="right") ? playerFieldBefore[playerNumber] + 11 +  changDirectionToLeft[((playerFieldBefore[playerNumber]+1)%10)] : playerFieldBefore[playerNumber] + 11 ;

                playerFieldBefore[playerNumber] = playerFieldBefore[playerNumber]+10;
                
            
            } else {alert("Answer not correct, good luck next time");
                fields[playerFieldBefore[playerNumber]].childNodes[2].style.visibility="visible";
                fields[playerFieldBefore[playerNumber]].childNodes[4].style.visibility="visible";

                    }


        }

        for(let j=0; j<20; j++) {
            for(let i=0; i<playersPoints.length; i++){
                alert(`NEXT MOVE ${names[i]}`);
                throwDice(playersPoints[i],i)
            }
            round++;
            console.log(playersPoints);
        }

    });
/***************************************/


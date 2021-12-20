const fields = document.querySelectorAll('.fields');
let playersPoints = [1,1,1,1];
const changDirectionToLeft = [-10,8,6,4,2,0,-2,-4,-6,-8];
let playerFieldBefore = [0,0,0,0];

/*SET NUMBERS ON BOARD*/
for(let i=10; i<92;i+=20){
    for(let j=0; j<10; j++){
        fields[i+j].childNodes[0].innerText=10-j+i;
    }
}
/*SET NUMBERS ON BOARD*/

function moveAuto(playerPoints,playerNumber) {

    let color = ["red","blue","green","orange"];
    let playerField, playerDirection;

    playersPoints[playerNumber]+=Math.ceil(Math.random()*6); 

    
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
        case 51: case 52: case 53: case 55: case 55: case 56: case 57: case 58: case 59: case 60:
        case 71: case 72: case 73: case 74: case 75: case 77: case 77: case 78: case 79: case 80:
        case 91: case 92: case 93: case 94: case 95: case 96: case 97: case 99: case 99: case 100:
            playerDirection = "left"; break;

    }
    

    playerField = (playerDirection==="right") ? playersPoints[playerNumber] : playersPoints[playerNumber] + changDirectionToLeft[playersPoints[playerNumber]%10]+1;


    if( playersPoints[playerNumber] >=100) {alert(`Player ${playerNumber+1} ` + "WINS!")}


    if(fields[playerFieldBefore[playerNumber]].childNodes[2].style.color===color[playerNumber])
    {fields[playerFieldBefore[playerNumber]].childNodes[2].style.visibility="hidden";}
    
    fields[playerField-1].childNodes[2].style.color=color[playerNumber];
    fields[playerField-1].childNodes[2].style.visibility="visible";
    playerFieldBefore[playerNumber] = playerField-1;

 }

for(let j=0; j<5; j++) {
    for(let i=0; i<playersPoints.length; i++){
        moveAuto(playersPoints[i],i)
    }

console.log(playersPoints);
}

// setInterval(moveAuto,600,playersPoints[0],0);
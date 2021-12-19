const fields = document.querySelectorAll('.fields');
let playersPoints = [0,0]; 
const changDirectionToLeft = [9,7,5,3,1,-1,-3,-5,-7,-9];
let playerFieldBefore = [0,0];

/*SET NUMBERS ON BOARD*/
for(let i=10; i<92;i+=20){
    for(let j=0; j<10; j++){
        fields[i+j].childNodes[0].innerText=10-j+i;
    }
}
/*SET NUMBERS ON BOARD*/

function moveAuto(playerPoints,playerNumber) {

    playerPoints+=Math.ceil(Math.random()*6);

    let color = ["red","blue"];

    let playerField, playerDirection;
    playerDirection = (Math.floor(playerPoints/10)%2) ? "left" : "right";
   
    playerField = (playerDirection==="right") ? playerPoints : playerPoints-1 + changDirectionToLeft[playerPoints%10]+1;

    fields[playerFieldBefore[playerNumber]].childNodes[2].style.visibility="hidden";
    fields[playerField-1].childNodes[2].style.color=color[playerNumber];
    fields[playerField-1].childNodes[2].style.visibility="visible";
    playerFieldBefore[playerNumber] = playerField;

    // if(player1Direction==="right") {
    // fields[player1points].childNodes[2].style.visibility="visible";} 
    // else if(player1Direction==="left") {
    // fields[player1points-1 + changDirectionToLeft[player1points%10]+1].childNodes[2].style.visibility="visible";
    // }

    playersPoints[playerNumber]+=playerPoints;
    // if(player1points>=100) {alert("WIN!")}
 }

// for(let j=0; j<10; j++) {}
    for(let i=0; i<playersPoints.length; i++){
        moveAuto(playersPoints[i],i)
    }

console.log(playersPoints);
//setInterval(moveAuto,500);
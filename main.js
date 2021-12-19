var fields = document.querySelectorAll('.fields');

for(let i=10; i<91;i+=20){
    for(let j=0; j<10; j++){
        fields[i+j].childNodes[0].innerText=10-j+i;
    }
}


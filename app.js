let gameSeq = [];
let userSeq = [];

let btns = ["yellow", "red", "purple", "green"];

let started = false;
let level = 0;

let highestScore = 0;

let h2 = document.querySelector("h2");
let h3 = document.querySelector("h3");

document.addEventListener("keypress", function(){
     if(started == false){
        console.log("game started!");
        started = true;

        levelUp();
     }
});

function btnFlash(btn){
    btn.classList.add("flash");
    setTimeout(function(){
        btn.classList.remove("flash");
    }, 250);
}

function btnFlashUser(btn){
    btn.classList.add("greenFlash");
    setTimeout(function(){
        btn.classList.remove("greenFlash");
    }, 250);
}

function levelUp(){
    userSeq = [];

    level++;
    h2.innerText = `Level: ${level}`;

    let randIdx = Math.floor(Math.random() * 3);
    let randColor = btns[randIdx];
    let randbtn = document.querySelector(`.${randColor}`);

    gameSeq.push(randColor);
    // console.log(gameSeq);
    btnFlash(randbtn);
}

function checkAns(idx){
    // console.log("curr level: ", level);
    // let idx = level - 1;

    if(userSeq[idx] === gameSeq[idx]){
        if(userSeq.length == gameSeq.length){
            setTimeout(levelUp, 1000);
        }
    }else{
        h2.innerHTML = `Game Over! Your score was <b>${level}</b> </br>Press any key to restart`;
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function(){
            document.querySelector("body").style.backgroundColor = "white";
        }, 150);
        
        if((highestScore<level)){
            highestScore = level;
            h3.innerHTML = `High Score: <b>${highestScore}</b>`;
        }
        reset();
    }
}

function btnPress(){
    let btn = this;
    btnFlashUser(btn);

    let userColor = btn.getAttribute("id");
    userSeq.push(userColor);

    checkAns(userSeq.length-1);
}

let allBtns = document.querySelectorAll(".btn");
for(let btn of allBtns){
    btn.addEventListener("click", btnPress);
}

function reset(){
    started = false;
    gameSeq= [];
    level = 0;
    userSeq = [];
}
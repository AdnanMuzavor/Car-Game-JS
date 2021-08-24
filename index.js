const score = document.querySelector(".score");
const startScreen = document.querySelector(".startScreen");
const gameArea = document.querySelector(".gameArea");
const keys = {
  ArrowUp: false,
  ArrowDown: false,
  ArroeLeft: false,
  ArrowRight: false,
};

const player = {speed:5,score:0};
//Provision to make out which key is pressed and which is not

const keydown = (e) => {
  e.preventDefault;


  keys[e.key] = true;
  // console.log(keys);
};

const keyup = (e) => {
  e.preventDefault;


  keys[e.key] = false;
};

// const direct=()=>{
//   while(keys.ArrowUp===true){
//     car.offsettop++;
//   }
// }
document.addEventListener("keydown", keydown);
document.addEventListener("keyup", keyup);

const movelines=()=>{
 let lines=document.querySelectorAll(".line");
 lines.forEach((function(item){
 if(item.y>=700){

   item.y=item.y-800;
 }
   item.y=item.y+player.speed;
  
   item.style.top=item.y+"px";
 }))
}

const iscollide=(a,b)=>{
  arect=a.getBoundingClientRect();
  brect=b.getBoundingClientRect();
  //if given conditin=ons becomes false that means coliision occured so return true hence statement is like this
  return !((arect.bottom<brect.top)||(arect.top>brect.bottom)||arect.right<brect.right||(arect.left>brect.right));
}

const moveenemy=(car)=>{
  let enemy=document.querySelectorAll(".enemycar");
  enemy.forEach((function(item){
 if(item.y>=700){
  
   item.y=item.y-800;
   item.style.left=Math.floor(Math.random()*300)+"px";
 }
 if(iscollide(car,item)){console.log("HITTTTTTTTTTTTTTT");
player.start=false;
startScreen.classList.remove("hide");
const one=`GAME OVER<br>YOUR FINAL SCORE IS:${player.score+1}<br>PRESS HERE TO START THE GAME.<br><br>HINT:AVOID CRASHING WITH CARS`;
const s2=`GAME OVER<br>YOUR FINAL SCORE IS:${player.score+1}<br>PRESS HERE TO START THE GAME.<br><br>HINT:You can bypass the cars from extreme corners!`;

var random=Math.floor(Math.random()*100);

if(random>=50){startScreen.innerHTML=one;}
else if(random <50){startScreen.innerHTML=s2;}

}
   item.y=item.y+player.speed;
  
   item.style.top=item.y+"px";
 }))
}


const gamePlay = () => {
  

  let road=gameArea.getBoundingClientRect();
 
    let car=document.querySelector(".car");
  if (player.start === true) {
      movelines();  
      moveenemy(car);
 
    if(keys.ArrowUp && player.y>0){
     
      player.y-=player.speed;
      
    }
    if(keys.ArrowDown && player.y<road.height-120){
      player.y+=player.speed;
    }
    if(keys.ArrowLeft && player.x>0){
      player.x-=player.speed;
    }
    if(keys.ArrowRight && player.x<(road.width-90)){
      player.x+=player.speed;
    
    }
 car.style.top=player.y+"px";
 car.style.left=player.x+"px";
 player.score++;
 score.innerText="SCORE: "+player.score;
 window.requestAnimationFrame(gamePlay);
  }
};


function randomcar(){
  function c(){
    let hex=Math.floor(Math.random()*100);
    console.log(hex);
    return hex;
  }
  if(c()>0 && c()<=15){return "url(car2.png)"}
  else if(c()>15 && c()<25){return "url(car3.png)"}
  else if(c()>=25 && c()<45){return "url(car4.png)"}
  else if(c()>=45 && c()<55){return "url(car5.png)"}
  else if(c()>=55 && c()<65){return "url(car6.png)"}
  else if(c()>=65 && c()<80){return "url(car9.png)"}
  else if(c()>=80 && c()<90){return "url(car11.png)"}
  else{return "url(car12.png)"}
}
function start() {
  player.start = true;
  player.score=0;
  gameArea.classList.remove("hide");
  gameArea.innerHTML="";
  startScreen.classList.add("hide");
  window.requestAnimationFrame(gamePlay);
  let car = document.createElement("div");
  car.setAttribute("class", "car");
  gameArea.appendChild(car);

  player.x = car.offsetLeft;
  player.y = car.offsetTop;
 


  //To generate lines
  for(x=0;x<4;x++){
  let roadline=document.createElement("div");
  roadline.setAttribute("class","line");
  roadline.y=150*x;
 
  roadline.style.top=110*x+"px";
  gameArea.appendChild(roadline);
  }

  //to generate cars
  for(x=0;x<4;x++){
  let enemycar=document.createElement("div");
  enemycar.setAttribute("class","enemycar");
  enemycar.y=150*x;

  enemycar.style.backgroundImage=randomcar();
  enemycar.style.top=enemycar.y+"px";
  enemycar.style.left=Math.floor(Math.random()*350)+"px";
  console.log(enemycar.style.left);
  gameArea.appendChild(enemycar);
  }
}

startScreen.addEventListener("click", start);
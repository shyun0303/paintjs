const canvas = document.getElementById("jsCanvas");
const colors = document.getElementsByClassName("jsColor");
const ctx = canvas.getContext("2d");
const sizeBar = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const save = document.getElementById("jsSave");

const INITIAL_CR = "#2c2c2c";
const CANVAS_SIZE = 700;

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

ctx.fillStyle="white";
ctx.fillRect(0,0,CANVAS_SIZE,CANVAS_SIZE);

ctx.fillStyle=INITIAL_CR;
ctx.strokeStyle = INITIAL_CR;
ctx.lineWidth = 2.5;





let painting = false;
let filling = false;

function onMouseMove(event){
 const x = event.offsetX;
 const y = event.offsetY;
    
 if(!painting){
     ctx.beginPath();
     ctx.moveTo(x,y);    
 }else{
     ctx.lineTo(x,y);
     ctx.stroke();
 }
}
function stopPainting(){
    painting=false;
}
function startPainting(){
    painting = true;
}

function onMouseDown(event){
    painting = true;
}
function handleColor(event){
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
}
function sizeBarUpDown(event){
    const strokeSize=event.target.value;
    ctx.lineWidth=strokeSize;
    console.log(event.target.value);
    

}
function handleMode(){
    if(filling===true){
        filling=false;
        mode.innerText="Fill"
    }
    else{
        filling=true;
        mode.innerText="Paint"
       
    }
    }
function handleCanvasClick(){
    if(filling===true){
    ctx.fillRect(0,0,CANVAS_SIZE,CANVAS_SIZE)
}
}
function handleCM(event){
    event.preventDefault();
}
function handleSave(){
    const image = canvas.toDataURL("image/png");
    const  link = document.createElement("a");
    link.href = image;
    link.download = "paintjs";
    link.click();
}

if(canvas){
    canvas.addEventListener("mousemove",onMouseMove);
    canvas.addEventListener("mousedown",startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("click",handleCanvasClick);
    canvas.addEventListener("contextmenu", handleCM);
}
Array.from(colors).forEach(color => color.addEventListener("click" , handleColor));
if(sizeBar){
sizeBar.addEventListener("input", sizeBarUpDown);
}
if(mode){
    mode.addEventListener("click", handleMode);
}
if(save){
    save.addEventListener("click", handleSave)
}
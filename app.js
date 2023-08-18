// responsive nav
const navBtn = document.querySelector(".navtogglebtn");
const responSiveNav = document.querySelector(".responsive-nav");
const cursor = document.querySelector('.cursor');

const mouseCoordinates = {
   x_axis: 0,
   y_axis: 0
}

window.addEventListener('mousemove',(e)=>{

   mouseCoordinates.x_axis = e.clientX;
   mouseCoordinates.y_axis = e.clientY;

   cursor.animate({
      top: `${mouseCoordinates.y_axis}px`,
      left: `${mouseCoordinates.x_axis}px`
   },{fill: "forwards", duration: 250})
})


navBtn.addEventListener('click',()=>{
   const visibility = responSiveNav.getAttribute("data-visible");
   console.log(visibility);
   if(visibility === "false"){
      responSiveNav.setAttribute("data-visible", "true");
   } else {
      responSiveNav.setAttribute("data-visible","false")
   }
})

const sizeTool = document.querySelector(".size-tool");
const sizeContent = document.querySelector(".accordian-size-content-part");
const colorTool = document.querySelector(".color-tool");
const colorContent = document.querySelector(".accordian-color-content-part");
const allColorList = document.querySelectorAll(".color-list");
const colorDisc = document.querySelectorAll(".color");
const container = document.getElementById("app");
let eraserColor = "black"
// Line width
const lineWidth = document.querySelectorAll(".line-width");
const customWidth = document.getElementById("line-width-custom-value");

// Drawing tools
const brushBtn = document.querySelector(".brush");
const eraserBtn = document.querySelector(".eraser");
const clearCanvas = document.querySelector(".clear");

// Custom color
const colorInput = document.getElementById("custom-color");

//
let toggleWarning = false;
let toggleDrawSign = false;
const warningSign = document.querySelector(".clear-cavas-warning-sign")
const drawNowSign = document.querySelector(".draw-success-sign")

// 
let canvasIsClear = false;

// Eraser
const eraserSize = document.getElementById("line-width-custom-value-eraser");
const viusalEraser = document.getElementById("visualEraser");

// canvas colorPicker
const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");
const canvasColorPicker = document.getElementById("color-picker");

// canvas.width = container.offsetWidth - 250;
// canvas.height = container.offsetHeight;

let colorValue;
let lineWidthValue = 1;
let drawOnCanvas = false;
let eraserSizeValue = 50;
viusalEraser.style.width = `${eraserSizeValue}px`;
viusalEraser.style.height = `${eraserSizeValue}px`;
eraserSize.value = eraserSizeValue

eraserSize.addEventListener("input", () => {
   eraserSizeValue = parseInt(eraserSize.value);
   viusalEraser.style.width = `${eraserSizeValue}px`;
   viusalEraser.style.height = `${eraserSizeValue}px`;
   cursor.style.height = `${eraserSizeValue}px`;
   cursor.style.width = `${eraserSizeValue}px`;
});

customWidth.addEventListener("input", () => {
   lineWidth.forEach((line)=>{
      line.setAttribute('data-selected',"false");
   })
   document.querySelector(".line-custom-value").setAttribute("data-selected", "true");
   if (customWidth.value >= 1 && customWidth.value <= 100) {
      document.querySelector(".visual-custom-line-width").style.height = `${customWidth.value}px`;
      lineWidthValue = customWidth.value;
   }
});

brushBtn.addEventListener("click", () => {
   drawOnCanvas === false ? (drawOnCanvas = true) : (drawOnCanvas = false);
   if (drawOnCanvas) {
      colorValue = colorInput.value;
      lineWidthValue = customWidth.value;
   } else {
      return;
   }
   const visibility = brushBtn.getAttribute("data-active");
   visibility === "false"
      ? brushBtn.setAttribute("data-active", "true")
      : brushBtn.setAttribute("data-active", "false");
   eraserBtn.setAttribute("data-active", "false");
   cursor.style.height = `8px`;
   cursor.style.width = `8px`;
   cursor.style.background = "white"
   cursor.style.border = `0px solid white`
});

lineWidth.forEach((line) => {
   line.addEventListener("click", () => {
     lineWidthValue = parseInt(line.textContent);
     customWidth.value =  parseInt(line.textContent);
     document.querySelector(".line-custom-value").setAttribute("data-selected", "false");
     lineWidth.forEach((otherLine) => {
       otherLine.setAttribute("data-selected", "false");
     })
     line.setAttribute("data-selected", "true");
   });
 });

eraserBtn.addEventListener("click", () => {
   drawOnCanvas = false;
   const visibility = eraserBtn.getAttribute("data-active");
   colorValue = "black";
   lineWidthValue = "24";
   visibility === "false"
      ? eraserBtn.setAttribute("data-active", "true")
      : eraserBtn.setAttribute("data-active", "false");
   brushBtn.setAttribute("data-active", "false");
   cursor.style.height = `${eraserSizeValue}px`;
   cursor.style.width = `${eraserSizeValue}px`;
   cursor.style.background = "transparent"
   cursor.style.border = `2px solid white`
});


colorTool.addEventListener("click", () => {
   const visibility = colorContent.getAttribute("data-visible");
   visibility === "false"
      ? colorTool.setAttribute("data-visible", "true")
      : colorTool.setAttribute("data-visible", "false");
   visibility === "false"
      ? colorContent.setAttribute("data-visible", "true")
      : colorContent.setAttribute("data-visible", "false");

});


sizeTool.addEventListener("click", () => {
   const visibility = sizeContent.getAttribute("data-visible");
   visibility === "false"
      ? sizeTool.setAttribute("data-visible", "true")
      : sizeTool.setAttribute("data-visible", "false");
   visibility === "false"
      ? sizeContent.setAttribute("data-visible", "true")
      : sizeContent.setAttribute("data-visible", "false");
});

for (let i = 0; i < allColorList.length; i++) {
   colorDisc[i].style.background = allColorList[i].textContent
      .split(" ")
      .join("")
      .toLowerCase();

   allColorList[i].addEventListener('click', () => {
      colorValue = allColorList[i].textContent.split(" ").join("").toLowerCase();
      cursor.style.background = colorValue;
   })
}




colorInput.addEventListener("input", () => {
   colorValue = colorInput.value;
});

// Canvas setup
if(window.innerWidth <= 729){
   canvas.width = container.offsetWidth;
}else {
   canvas.width = container.offsetWidth - 250;
}
canvas.height = container.offsetHeight;

window.addEventListener('resize', (e) => {
   if(window.innerWidth <= 729){
      canvas.width = container.offsetWidth;
      canvas.height = container.offsetHeight;
   }else {
      canvas.width = container.offsetWidth - 250;
      canvas.height = container.offsetHeight;
   }
})

function getCanvasPosition() {
   const rect = canvas.getBoundingClientRect();
   return {
      x: rect.left,
      y: rect.top,
   };
}

const paint = {
   x: undefined,
   y: undefined,
};

function Paint() {
   this.x = 200;
   this.y = 200;
   this.width;
   this.eraserWidth;
   this.radius;
   this.color;

   this.draw = function () {
      c.lineWidth = lineWidthValue;
      c.lineCap = "round";
      c.lineTo(this.x, this.y);
      c.strokeStyle = this.color;
      c.stroke();
      c.beginPath();
      c.moveTo(this.x, this.y);
   };

   this.erase = function () {
      c.lineWidth = this.eraserWidth;
      c.lineCap = "round";
      c.lineTo(this.x, this.y);
      c.strokeStyle = eraserColor;
      c.stroke();
      c.beginPath();
      c.moveTo(this.x, this.y);
   };

   this.update = function (color, linewidthSize, eraserWidth) {
      if (drawOnCanvas) {
         this.width = linewidthSize;
      } else {
         this.eraserWidth = eraserWidth;
      }

      this.color = color;
      this.x = paint.x;
      this.y = paint.y;

      if (drawOnCanvas) {
         this.draw();

      } else {
         this.erase();
      }
   };
}

let draw = false;

canvas.addEventListener("mousemove", function (e) {
   const canvasPos = getCanvasPosition();
   paint.x = e.clientX - canvasPos.x;
   paint.y = e.clientY - canvasPos.y;
});

canvas.addEventListener("mousedown", function () {
   c.beginPath();
   draw = true;
});


canvas.addEventListener("mouseup", function () {
   draw = false;
   c.beginPath();
});

const brush = new Paint();

function animate() {

   if (draw) {
      if (drawOnCanvas) {
         brush.update(colorValue, lineWidthValue, eraserSizeValue);
      } else {
         canvasIsClear = false;
         brush.update("black", lineWidthValue, eraserSizeValue);
      }
   }


   requestAnimationFrame(animate);
}


animate();
canvasColorPicker.addEventListener("input", () => {
   if (canvasIsClear) {
      canvas.style.background = canvasColorPicker.value;
      eraserColor = canvasColorPicker.value;
      brush.update(eraserColor, lineWidthValue, eraserSizeValue)
      animate();
   } else if(!canvasIsClear){
      toggleWarning = true;
      warningSign.setAttribute("data-visible", toggleWarning);
      setTimeout(() => {
         toggleWarning = false;
         warningSign.setAttribute("data-visible", toggleWarning);
      }, 1000)
   }
})


clearCanvas.addEventListener('click', () => {
   canvasIsClear = true;
   toggleDrawSign = true;
   brushBtn.setAttribute("data-active", "false");
   eraserBtn.setAttribute("data-active", "false");
   brush.update(eraserColor, lineWidthValue, eraserSizeValue)
   drawNowSign.setAttribute("data-visible", toggleDrawSign);
   setTimeout(() => {
      toggleDrawSign = false;
      drawNowSign.setAttribute("data-visible", toggleDrawSign);
   }, 1000);
   c.clearRect(0, 0, canvas.width, canvas.height);
   cursor.style.height = `8px`;
   cursor.style.width = `8px`;
   cursor.style.background = "white"
   cursor.style.border = `0px solid white`
});

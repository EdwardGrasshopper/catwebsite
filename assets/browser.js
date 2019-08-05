console.log("Hello World")
let t = setInterval(changeBackgroundColor, 2000);
let choices = ['skyblue', 'cyan', 'blue', 'blueviolet', 'orange'];
function getRandomColor() {
  let randomNumber = Math.floor(Math.random() * choices.length)
  let randomColor = choices[randomNumber];
  return randomColor;
}
let oldColor = getRandomColor();
function changeBackgroundColor() {
  let newColor = getRandomColor();
  document.body.style = `background-color: ${newColor}`;
  if(oldColor == newColor) {
    console.log("Same color selected")
    changeBackgroundColor();
  } else {
    oldColor = newColor;
  }

}
let n = 0
const stopbutton = document.getElementById("stopbutton");
stopbutton.addEventListener("click", function () {
  // stopbutton.disabled = true; (greys out the button)
  if(t===0) {
    console.log(t)
    console.log("Time has resumed")
    t = setInterval(changeBackgroundColor, 2000);
    console.log(t);
    stopbutton.innerHTML = "Keep the background color"
    
  } else {
    console.log(t);
    console.log("Time has been stopped")
    clearInterval(t);
    if(n < 10) {
      stopbutton.innerHTML = "I want a different color!"
    } else if(n < 20) {
      stopbutton.innerHTML = "You sure are picky, aren't you?"
    } else if(n >= 20) {
      stopbutton.innerHTML = "Don't you have better things to do?"
      stopbutton.disabled = true;
    }
    n++;
    t = 0;
  }
})
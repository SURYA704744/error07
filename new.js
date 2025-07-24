const display = document.getElementById("display");
const buttons = document.querySelectorAll(".buttons button");

let expression = "";
let result = 0;

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    switch (button.id) {
      case "clear":
        expression = "";
        result = 0;
        display.value = "";
        break;
      case "backspace":
        expression = expression.slice(0, -1);
        display.value = expression;
        break;
      case "equals":
        try {
          result = eval(expression);
          display.value = result;
        } catch (error) {
          display.value = "Error";
        }
        break;
      default:
        expression += button.textContent;
        display.value = expression;
    }
  });
});
function updateclock() {
    const now =new Date();
    const hours = now.getHours().toLocaleString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds(). toString().padStart(2, '0');

    document.getElementById('hours') .innerText = hours;
    document.getElementById('minutes').innerText = minutes;
    document.getElementById('seconds').innerText = seconds;
}
updateclock();
setInterval(updateclock, 1000); 


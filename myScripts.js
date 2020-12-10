const displayOut = document.getElementById("display_ecuation");
const decimal = document.getElementById("decimal");
const clearAll = document.getElementById("clear");
const numbers = document.getElementsByClassName("number");
const operators = document.getElementsByClassName("operator");
let displayIn = "0"; let pendingValue; let newArr = []; let updateDisplayOut; let performOperation;
               
   // Updating the display
  updateDisplayOut = (e) => {
   let btnText = e.target.innerText;
   if(displayIn === "0") { 
      displayIn = "";
   } else if (displayIn === "-0") displayIn = "-";
   
   if (displayIn !== 0)
	   clearAll.innerText = "C";
	
   // Append the content of the button we clicked to our displayIn variable and display it
   displayIn += btnText; 
   displayOut.innerText = displayIn;
   
   // Digits limit
   if (displayIn.length === 10) {
   displayOut.innerText = "digits limit";
   displayIn = "";	
	}
   
}
	
	// Clear
clearAll.onclick = () => {
  displayIn = "0";
  pendingValue = undefined;
  newArr = [];
  displayOut.innerHTML = displayIn;
  clearAll.innerText = "AC";
}

	//Decimal
decimal.onclick = () => {
  if (!displayIn.includes(".")) displayIn += ".";
   displayOut.innerText = displayIn;
}
	
    performOperation = (e) => {
    let operator = e.target.innerText;
    switch (operator) {
        case "+":
			if (newArr[newArr.length-1] === "+") break;
			
			if (newArr[newArr.length-1] === "-" || newArr[newArr.length-1] === "/" || newArr[newArr.length-1] === "*") {
				newArr[newArr.length-1] = "+";
				break;
			}
			
            pendingValue = displayIn;
			displayOut.innerText = displayIn;
            displayIn = "0";
            newArr.push(pendingValue);
            newArr.push("+");
            break;
        case "-":
			if (newArr[newArr.length-1] === "-") break;
			
			if (newArr[newArr.length-1] === "+" || newArr[newArr.length-1] === "/" || newArr[newArr.length-1] === "*") {
				newArr[newArr.length-1] = "-";
				break;
			}
            
			pendingValue = displayIn;
			displayOut.innerText = displayIn;
            displayIn = "0";
            newArr.push(pendingValue);
            newArr.push("-");
            break;
         case "x":
			if (newArr[newArr.length-1] === "*") break;
			
			if (newArr[newArr.length-1] === "-" || newArr[newArr.length-1] === "/" || newArr[newArr.length-1] === "+") {
				newArr[newArr.length-1] = "*";
				break;
			}
		
            pendingValue = displayIn;
			displayOut.innerText = displayIn;
            displayIn = "0";
            newArr.push(pendingValue);
            newArr.push("*");
            break;
			
          case "/":
            if (newArr[newArr.length-1] === "/") break;
			
			if (newArr[newArr.length-1] === "-" || newArr[newArr.length-1] === "+" || newArr[newArr.length-1] === "*") {
				newArr[newArr.length-1] = "/";
				break;
			}
			
			pendingValue = displayIn;
			displayOut.innerText = displayIn;
            displayIn = "0";
            newArr.push(pendingValue);
            newArr.push("/");
            break;
          case "+/-":
        if (displayIn[0] !== "-") {
            displayIn = "-" + displayIn;
            displayOut.innerText = displayIn;
            break;
        }
        else {
            displayIn = displayIn.substring(1);
            displayOut.innerText = displayIn;
          break;
        }
        case "%":
			displayIn = displayIn / 100;
			displayOut.innerText = displayIn;
		
        case "=":
            newArr.push(displayIn);
            let evaluation = eval(newArr.join(" "));	
            displayIn = evaluation + ""; 
            displayOut.innerText = displayIn;
			newArr = []; 
            break;
        default:
            break;
    }
}
    
for (let i = 0; i < numbers.length; i++) {
    numbers[i].addEventListener("click", updateDisplayOut);
}

for (let i = 0; i < operators.length; i++) {
    operators[i].addEventListener("click", performOperation);
}


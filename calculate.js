const PREC = 12;
var initial_val = "", op = "", answer ="0";
var done = true, float_num = false, second_num = false, completed = false ;
var temp, display;

var history = [];

window.onload = function() {
	var elements = document.body.getElementsByTagName("*");
	for (var i =0; i < elements.length; i++) {
		switch (elements[i].id) {
			case "one": 
				elements[i].addEventListener("click", function(){ number("1"); });
				break;
			case "two": 
				elements[i].addEventListener("click", function(){ number("2"); });
				break;
			case "three": 
				elements[i].addEventListener("click", function(){ number("3"); });
				break;
			case "four": 
				elements[i].addEventListener("click", function(){ number("4"); });
				break;
			case "five": 
				elements[i].addEventListener("click", function(){ number("5"); });
				break;
			case "six": 
				elements[i].addEventListener("click", function(){ number("6"); });
				break;
			case "seven": 
				elements[i].addEventListener("click", function(){ number("7"); });
				break;
			case "eight": 
				elements[i].addEventListener("click", function(){ number("8"); });
				break;
			case "nine": 
				elements[i].addEventListener("click", function(){ number("9"); });
				break;
			case "zero": 
				elements[i].addEventListener("click", function(){ number("0"); });
				break;
				
			case "power2":
				elements[i].addEventListener("click", power2);
				break;
			case "power3":
				elements[i].addEventListener("click", power3);
				break;

			case "sqrt":
				elements[i].addEventListener("click", sqrt);
				break;
			case "factorial":
				elements[i].addEventListener("click", factorial);
				break;

			
			/*case "percent":
				elements[i].addEventListener("click", percent);	
				break; */
			case "add":
				elements[i].addEventListener("click", function(){ basic("+"); });
				break;
			case "sub":
				elements[i].addEventListener("click", function(){ basic("-"); });
				break;
			case "mul":
				elements[i].addEventListener("click", function(){ basic("*"); });
				break;
			case "div":
				elements[i].addEventListener("click", function(){ basic("/"); });
				break;
			case "powerY":
				elements[i].addEventListener("click", function(){ basic("^"); });
				break;
			


			case "equal":
				elements[i].addEventListener("click", equal);
				break;
			case "clear":
				elements[i].addEventListener("click", function() { reset("0");});
				break;
			case "delete":
				elements[i].addEventListener("click", del);
				break;

			default:
				break;
		}
	}
	/*  */
}

function number(input){
	display = document.getElementById("result");
	temp = display.value;
	
	if (display.value.match(/[a-z]/i))
		display.value = "0";
	
	if (second_num) {
		display.value = "0";
		second_num = false;
	}
	
	if (display.value == "0")
		temp = input;
	else {
		if (temp.length < PREC)
			temp += input;
	}
	display.value = temp;
	completed = true;
	toExp();
}









//Function x^2
function power2() {
  document.getElementById("history").innerHTML = localStorage.getItem("answer");

	display = document.getElementById("result");
	answer = Math.pow(display.value, 2);
	console.log(answer);
	answer = (answer*1).toString();
	reset(answer);
    	localStorage.setItem("answer", answer);
	document.getElementById("history").innerHTML = localStorage.getItem("answer");

	

	//const answer = localStorage.getItem("answer");

}









//Function x^3
function power3() {
	display = document.getElementById("result");
	answer = Math.pow(display.value, 3);
	console.log(answer);
	answer = (answer*1).toString();
	reset(answer);
	localStorage.setItem("answer", answer);
	document.getElementById("history").innerHTML = localStorage.getItem("answer");

}

/*function power2(x) {
return xx;
}
function power3(x) {
return xsquare(x);
reset(answer);
}*/





//Function sqrt
function sqrt() {
	display = document.getElementById("result");
	answer = Math.sqrt(display.value);
	answer = (answer*1).toString();
	console.log(answer);
	reset(answer);
	localStorage.setItem("answer", answer);
	document.getElementById("history").innerHTML = localStorage.getItem("answer");

}



//Function factorial
function factorial() {
	display = document.getElementById("result");
	answer = fact(display.value);
	if (answer == 0)
		answer = "Cannot calculate";
	else 
		answer = (answer*1).toString();
		console.log(answer);
		reset(answer);
		localStorage.setItem("answer", answer);
	 document.getElementById("history").innerHTML = localStorage.getItem("answer");

}



//Basic operations: +, -, *, /,^
function basic(operator){	
	display = document.getElementById("result");
	if (op == "") {
		initial_val = display.value;
		op = operator;
	}
	else {
		if (completed) {
			equal();
			initial_val = answer;
			op = operator;
		}
		else
			op = operator;
	}
	completed = false;
	second_num = true;
}

//Find result =
function equal(){
		if (completed && op!="") {
		if (op =="^")
		{
	
			answer = Math.pow(initial_val, display.value);
			console.log(answer);
			localStorage.setItem("answer", answer);
			document.getElementById("history").innerHTML = localStorage.getItem("answer");

  		}
  		else {
			console.log(initial_val + op + display.value);
			answer = eval(initial_val + op + display.value);
			console.log(answer);
		}

		reset(answer);
		localStorage.setItem("answer", answer);
		document.getElementById("history").innerHTML = localStorage.getItem("answer");

	}



}



//Percent
/* function percent(){
	display = document.getElementById("result");
	if (op != "") {
		answer = eval(initial_val+"*"+display.value+"/100");
		answer = (answer*1).toString();
		display.value = answer;
		toExp();
	}
	
} */



//Delete last input
function del() {
	display = document.getElementById("result");
	if ((display.value.length <= 1) || display.value.match(/[a-z]/i)) {
		display.value = "0";
		float_num = false;
	}
	else  {
		if (display.value.substr(display.value.length-1) == ".")
			float_num = false;
		display.value = display.value.substr(0, display.value.length-1);		
	}
	answer = display.value;
	toExp();
}

//Reset display to val and all other properties to initial values
function reset(val) {
	//set display value
	document.getElementById("result").value = val;
	toExp();
	//reset all properties
	initial_val = "";
	op = "";
	float_num = false;
	second_num = false;
	completed = false;
}

//Compute factorial of n (n = integer)
function fact(n) {
	if (n.toString().indexOf(".") != -1) {
		console.log("Cannot calculate factorial for float numbers!");
		return 0;
	}
	else {
		try {
			if (n == 0)
				return 1;
			else
				return n*fact(n-1);
		}
		catch (err) {
			console.log("Cannot calculate factorial for big numbers!")
			reset("NaN");
		}
	}
}

//If display value is bigger than PREC digits, we make it in scientific notation
function toExp() {
	display = document.getElementById("result");
	if (display.value.length > PREC)
		display.value = (Number(display.value).toExponential(PREC)*1).toString();	
}


const resultList = document.getElementById('result')
function eventListeners() {
		document.querySelector('#form').addEventListener('result',newStorage);
	}


	function newStorage(e){
	e.preventDefault();

	//READ THE TEXT AREA

	const result = document.getElementById('result').value;

	////Create an <li> element

	const li = document.createElement('li');
	li.textContent = result;
storageList.appendChild(li);
}






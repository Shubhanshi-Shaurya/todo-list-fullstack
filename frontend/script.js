//JAVASCRIPT 

const inputBox=document.getElementById("input-box");
const listContainer=document.getElementById("list-container");

async function addTask(){

if(inputBox.value === ""){
document.getElementById("error").textContent =
"The list must contain something";
}

else{

await fetch("http://localhost:5000/tasks",{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
text:inputBox.value
})
});

inputBox.value="";
showTask();

}

}

listContainer.addEventListener("click",function(e){
    if(e.target.tagName==="LI"){
        e.target.classList.toggle("checked");
        saveData();
    }
    else if(e.target.tagName==="SPAN"){
        e.target.parentElement.remove();
        saveData();
    }
},false);
 
function saveData(){
    localStorage.setItem("data",listContainer.innerHTML);
}

async function showTask(){

const res = await fetch("http://localhost:5000/tasks");
const data = await res.json();

listContainer.innerHTML="";

data.forEach(task => {

let li = document.createElement("li");
li.innerHTML = task.text;

listContainer.appendChild(li);

});

}
showTask();


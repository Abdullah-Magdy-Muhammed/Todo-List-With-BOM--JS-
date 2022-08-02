let input    = document.querySelector(".input");
let submit   = document.querySelector(".add");
let tasksDiv = document.querySelector(".tasks");

// empty arrary to story tasks
let arrayOfTasks = [];

// check if there is data IN local storage
if (localStorage.getItem("tasks")) {
    arrayOfTasks = JSON.parse(localStorage.getItem("tasks"));
}

// trigger get data from local storage
getDataFromLocalStorage();
// add tasks
submit.onclick = function () {
    if(input.value !== "");{
        addTaskToArray(input.value); // add tasks to array of tasks
        input.value = ""; // empty input field
    }   
}

// click on task element
tasksDiv.addEventListener("click", (e) => {
    // delete button
    if (e.target.classList.contains("del")) {
        // remove tasks from local storage
        deleteTaskWithId(e.target.parentElement.getAttribute("data-id"));

        // remove element form page
        e.target.parentElement.remove();  
    }
        // task element
        if (e.target.classList.contains("task")){
            // toggle comleted for the task
            toggleStatusTaskWith(e.target.getAttribute("data-id"))
            // toggle done class
            e.target.classList.toggle("done");
        }
});
function addTaskToArray(taksText) {
    // Task Data
    const task = {
        id: Date.now(),
        title: taksText,
        completed: false
    }
    // push task to array of tasks
    arrayOfTasks.push(task);

    // add tasks to page
    addElementToPageFrom(arrayOfTasks);

    // add tasks to local storage
    addDataToLocalStorageFrom(arrayOfTasks);  
}
function addElementToPageFrom(arrayOfTasks) {
    // empty tasks Div
    tasksDiv.innerHTML = '';
    // looping on array of tasks
    arrayOfTasks.forEach((task) => {
        // create main div
        let div = document.createElement('div');
        div.className = 'task';
        //check if class is done already
        if(task.completed){
            div.ClassName = 'task completed';
        } 
        div.setAttribute("data-id", task.id);
        div.appendChild(document.createTextNode(task.title));
        // create delete button 
        let span = document.createElement('span');
        span.className = "del";
        span.appendChild(document.createTextNode("Delete"));
        div.appendChild(span);
        // add taska div to tasks container
        tasksDiv.appendChild(div);
    })
}
function addDataToLocalStorageFrom(arrayOfTasks) {
    window.localStorage.setItem("tasks",JSON.stringify(arrayOfTasks));
}  

function getDataFromLocalStorage() {
    let data = window.localStorage.getItem("tasks");
    if (data) {
        let tasks = JSON.parse(data);
        addElementToPageFrom(tasks);
    }
}

function deleteTaskWithId(taskId) {
    arrayOfTasks = arrayOfTasks.filter((task) => task.id != taskId); 
    addDataToLocalStorageFrom(arrayOfTasks);
}

function toggleStatusTaskWith(taskId) {
    for (i=1; i<arrayOfTasks.length; i++){
        if(arrayOfTasks[i]== taskId){
            arrayOfTasks[i].completed == false? arrayOfTasks[i].completed = true: arrayOfTasks[i].completed == false; 
        }
    }    
    addDataToLocalStorageFrom(arrayOfTasks);

}
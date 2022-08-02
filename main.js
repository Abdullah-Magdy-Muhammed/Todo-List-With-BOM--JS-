let input    = document.querySelector(".input");
let submit   = document.querySelector(".add");
let tasksDiv = document.querySelector(".tasks");

// empty arrary to story tasks
let arrayOfTasks = [];
// add tasks
submit.onclick = function () {
    if(input.value !== "");{
        addTaskToArray(input.value); // add tasks to array of tasks
        input.value = ""; // empty input field
    }   
}
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
function removeTask(buttonpressed) {
    let id = buttonpressed.parentNode.parentNode.getAttribute('data-task-id');
    let DT = confirm(`Are you sure you want to delete this task?`)
    if (DT == true) {
        tasks[id].delete = true;
        displayTasks();
        console.log(`A task move to trash.`)
    } else {
        alert(`Delete task canceled!!`)
    }
}









//   function removeTask(btnComleteElement) {
//     let id = btnComleteElement.parentNode.parentNode.getAttribute('data-task-id');
//     tasks[id].delete = true;
//     displayTasks();
//   }

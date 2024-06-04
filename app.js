let tasks = [{
  title: 'Register on VP',
  done: true,
  delete: false,
  username: `?`
}, {
  title: 'Learn React.js',
  done: false,
  delete: false,
  username: `?`
}, {
  title: 'Learn Express.js',
  done: false,
  delete: false,
  username: `?`
}];

/** {
  id : 1,
  title : '',
  dueDate : null,
  done : false,
  description : '',
  userName : ''
}
*/




function addTaskBtnClicked() {
  //get the task title from the input
  //get the task input element
  let inputElement = document.querySelector("#new-task");


  //get the value of the element
  let newTaskValue = inputElement.value;
  document.querySelector("#new-task").value = ``
  if (!newTaskValue) return;

  let inputEl = document.querySelector("#user-name-input");
  let userName = inputEl.value;
  console.log(`a new task has been added by ${userName} `);

  let newTaskObject = {
    title: newTaskValue,
    done: false,
    delete: false,
    username: userName,
  };
  //add the task object to the tasks array
  tasks.push(newTaskObject);

  //display the task in the document
  displayTasks();
}

function displayTasks() {

  let todoSectionElement = document.querySelector("#todo-list");
  todoSectionElement.innerHTML = `<h2 class="task-header">To Do - <span></span></h2>`;

  let doneSectionElement = document.querySelector('#done-list');
  doneSectionElement.innerHTML = `<h2 class="task-header">Done - <span></span></h2>`;

  for (let i = 0; i < tasks.length; i++) {
    let task = tasks[i];

    let taskElement = buildTaskElement(task, i);
    if (task.delete == true) {
      console.log(`Delete button pressed. `)
    } else {
      if (task.done) {
        doneSectionElement.appendChild(taskElement);
      } else {
        todoSectionElement.appendChild(taskElement);
      }
    }
  }
}

function taskCompleted(btnComleteElement) {
  let id = btnComleteElement.parentNode.parentNode.getAttribute('data-task-id');
  tasks[id].done = true;
  displayTasks();
  let inputEl123 = document.querySelector("#user-name-input");
  let userName123 = inputEl123.value;
  console.log(`Task completed by ${userName123}`)
}


function buildTaskElement(task, index) {
  let taskElement = document.createElement("div");
  taskElement.classList.add("task");
  //
  taskElement.setAttribute('data-task-id', index);


  taskElement.innerHTML = `<p>${task.title}<br><span id="userNameToDisplay">Added by ${task.username}</span></p>
  <div>
  ${task.done ? "" :
      `<button onclick="taskCompleted(this)">
      <svg
        width="19"
        height="24"
        viewBox="0 0 25 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect x="0.0487061" width="30" height="30" rx="5" fill="none" />
        <path
          d="M23.7851 10.6739L12.7851 21.6739C12.7213 21.7378 12.6455 21.7885 12.562 21.8231C12.4785 21.8577 12.3891 21.8755 12.2987 21.8755C12.2084 21.8755 12.1189 21.8577 12.0355 21.8231C11.952 21.7885 11.8762 21.7378 11.8123 21.6739L6.99982 16.8614C6.87081 16.7324 6.79834 16.5574 6.79834 16.375C6.79834 16.1926 6.87081 16.0176 6.99982 15.8886C7.12882 15.7596 7.30378 15.6871 7.48622 15.6871C7.66866 15.6871 7.84363 15.7596 7.97263 15.8886L12.2987 20.2155L22.8123 9.70109C22.9413 9.57209 23.1163 9.49962 23.2987 9.49962C23.4812 9.49962 23.6561 9.57209 23.7851 9.70109C23.9141 9.8301 23.9866 10.0051 23.9866 10.1875C23.9866 10.3699 23.9141 10.5449 23.7851 10.6739Z"
          fill="black"
        />
      </svg>
    </button>`}
    <button onclick="removeTask(this)">
      <svg
        width="19"
        height="24"
        viewBox="0 0 25 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect x="0.0487061" width="30" height="30" rx="5" fill="none" />
        <path
          d="M22.6112 8.125H7.48621C7.30387 8.125 7.129 8.19743 7.00007 8.32636C6.87114 8.4553 6.79871 8.63016 6.79871 8.8125C6.79871 8.99484 6.87114 9.1697 7.00007 9.29864C7.129 9.42757 7.30387 9.5 7.48621 9.5H8.17371V21.875C8.17371 22.2397 8.31857 22.5894 8.57643 22.8473C8.8343 23.1051 9.18403 23.25 9.54871 23.25H20.5487C20.9134 23.25 21.2631 23.1051 21.521 22.8473C21.7788 22.5894 21.9237 22.2397 21.9237 21.875V9.5H22.6112C22.7935 9.5 22.9684 9.42757 23.0973 9.29864C23.2263 9.1697 23.2987 8.99484 23.2987 8.8125C23.2987 8.63016 23.2263 8.4553 23.0973 8.32636C22.9684 8.19743 22.7935 8.125 22.6112 8.125ZM20.5487 21.875H9.54871V9.5H20.5487V21.875ZM10.9237 6.0625C10.9237 5.88016 10.9961 5.7053 11.1251 5.57636C11.254 5.44743 11.4289 5.375 11.6112 5.375H18.4862C18.6685 5.375 18.8434 5.44743 18.9723 5.57636C19.1013 5.7053 19.1737 5.88016 19.1737 6.0625C19.1737 6.24484 19.1013 6.4197 18.9723 6.54864C18.8434 6.67757 18.6685 6.75 18.4862 6.75H11.6112C11.4289 6.75 11.254 6.67757 11.1251 6.54864C10.9961 6.4197 10.9237 6.24484 10.9237 6.0625Z"
          fill="black"
        />
      </svg>
    </button>
  </div>`;

  return taskElement;
}
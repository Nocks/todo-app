const todoInputBox = document.querySelector('.app__input-box');
let todoListContainer = document.querySelector('.app__list-container');
let listItemWrapper = document.createElement('div');
let todoInput = '';

let prepareUserInput = () => {
  // generate listItemWrapper HTML
  listItemWrapper.classList.add('app__list-item-wrapper', 'active-todo');
  listItemWrapper.innerHTML = `<span class="app__complete-toggler app__input-ring"></span>`;
  listItemWrapper.innerHTML += `<span class="app__todo-item"></span>`;
  listItemWrapper.innerHTML += `<span class="app__delete-item"><img src="images/icon-cross.svg" alt="delete entry item"></span>`;
  // Grab todo span object
  const todoItemSpan = listItemWrapper.querySelector('.app__todo-item');
  // Inject todo input into listItemWrapper HTML
  todoItemSpan.textContent = todoInput;
};

let countItemsLeft = () => {
  let activeTodo = document.querySelectorAll('.active-todo');
  return activeTodo.length;
};

let updateItemsLeftCount = () => {
  const itemsLeft = document.querySelector(".app__items-left");
  const itemsLeftCount = countItemsLeft();
  if (itemsLeftCount === 0) {
    itemsLeft.textContent = 'No items yet';
  } else if (itemsLeftCount === 1) {
    itemsLeft.textContent = `${itemsLeftCount} item left`;
  } else if (itemsLeftCount > 1) {
    itemsLeft.textContent = `${itemsLeftCount} items left`;
  }
};

window.addEventListener('load', (event) => {
  updateItemsLeftCount();
});

todoInputBox.addEventListener('keypress', (event) => {
  if (event.key === 'Enter') {
    // Capture user todo input
    todoInput = todoInputBox.value;
    // Clear the input box
    todoInputBox.value = '';
    // Insert user todo input into premade HTML object
    prepareUserInput();
    // Append the prepared user input to the todoListContainer
    let clonedItem = listItemWrapper.cloneNode(true)
    todoListContainer.appendChild(clonedItem);
    // update the count of todo items that are active
    updateItemsLeftCount();
  }
});

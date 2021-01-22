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

let countActiveItemsLeft = () => {
  let activeTodo = document.querySelectorAll('.active-todo');
  return activeTodo.length;
};

let updateItemsLeftCount = () => {
  const itemsLeftWrapper = document.querySelector(".app__items-left");
  const availableItems = document.querySelector(".app__list-item-wrapper");
  const activeItemsLeftCount = countActiveItemsLeft();

  if (availableItems === null && activeItemsLeftCount === 0) {
    itemsLeftWrapper.textContent = 'No items yet';
  } else if (activeItemsLeftCount === 0) {
    itemsLeftWrapper.textContent = `No item left`;
  } else if (activeItemsLeftCount === 1) {
    itemsLeftWrapper.textContent = `${activeItemsLeftCount} item left`;
  } else if (activeItemsLeftCount > 1) {
    itemsLeftWrapper.textContent = `${activeItemsLeftCount} items left`;
  }
};

window.addEventListener('load', (event) => {
  updateItemsLeftCount();
});

todoInputBox.addEventListener('keypress', (event) => {
  if (event.key === 'Enter' &&  todoInputBox.value !== '') {
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

    // Only add once, an event listener to todoListContainer on first todo item
    if (todoListContainer.childElementCount === 1) {
      todoListContainer.addEventListener('click', (event) => {
        if (event.target.classList.contains('app__input-ring')) {
          event.target.classList.toggle('completed');
          const todoItemTextWrapper = event.target.parentNode.querySelector('.app__todo-item');
          todoItemTextWrapper.classList.toggle('completed');
          event.target.parentNode.classList.toggle('active-todo');
          event.target.parentNode.classList.toggle('completed-todo');
          updateItemsLeftCount();
        };
      });
    };
  };
});

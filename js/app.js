const todoInputBox = document.querySelector('.app__input-box');
let todoListContainer = document.querySelector('.app__list-container');
let listItemWrapper = document.createElement('div');
let todoInput = '';

let prepareUserInput = () => {
  // generate listItemWrapper HTML
  listItemWrapper.classList.add('app__list-item-wrapper', 'active-todo', 'show-item');
  listItemWrapper.innerHTML = `<span class="app__complete-toggler app__input-ring"></span>`;
  listItemWrapper.innerHTML += `<span class="app__todo-item"></span>`;
  listItemWrapper.innerHTML += `<span class="app__delete-item"><img src="images/icon-cross.svg" class="app__delete-img" alt="delete entry item"></span>`;
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

window.addEventListener('load', () => updateItemsLeftCount());

// Grab and add event listener to theme changer
document.querySelector('.app__theme-changer-img').addEventListener('click', () => {

  // Grab header section of app
  const header = document.querySelector('.header');

  // Grab the container of the app
  const appContainer = document.querySelector('.app');

  // Grab the container of the app
  const body = document.querySelector('body');

  setTimeout(() => {
    // Toggle theme changer icons after 2 secs on click
    header.classList.toggle('light-theme');
    if (header.classList.contains('light-theme')) {
      document.querySelector('.app__theme-changer-img').src = "images/icon-moon.svg";
      // Toggle 'light-theme' on the class of the app container
      appContainer.classList.toggle('light-theme');
      // Toggle 'light-theme' on the class of the body
      body.classList.toggle('light-theme');
    } else {
      document.querySelector('.app__theme-changer-img').src = "images/icon-sun.svg";
      // Toggle 'light-theme' on the class of the app container
      appContainer.classList.toggle('light-theme');
      // Toggle 'light-theme' on the class of the body
      body.classList.toggle('light-theme');
    };
  }, 2000);
});

todoInputBox.addEventListener('keypress', event => {
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
      todoListContainer.addEventListener('click', event => {
        // Check if click was the todo complete toggle button
        if (event.target.classList.contains('app__input-ring')) {
          event.target.classList.toggle('completed');
          const todoItemTextWrapper = event.target.parentNode.querySelector('.app__todo-item');
          todoItemTextWrapper.classList.toggle('completed');
          event.target.parentNode.classList.toggle('active-todo');
          event.target.parentNode.classList.toggle('completed-todo');
          // Update the UI of the items left
          updateItemsLeftCount();
        };
        // Check if click was the delete button - on mobile view
        if (event.target.classList.contains('app__delete-img')) {
          // Delete the todo whose delete button was clicked on
          todoListContainer.removeChild(event.target.parentNode.parentNode);
          // Update the UI of the items left
          updateItemsLeftCount();
        };
      });
    };
  };
});


// Grab the 'clear completed' button
const clearCompletedBtn = document.querySelector('.app__clear-completed');
// Add an event listener to the 'clear completed' button
clearCompletedBtn.addEventListener('click', event => {
  // Grab all todo items that have been checked as completed
  const completedTodoItems = document.querySelectorAll('.completed-todo');
  // Check and see if there's one or more completed items
  // before deleting.
  if (completedTodoItems.length >= 1) {
    Array.from(completedTodoItems).forEach(completedTodoItem => {
      todoListContainer.removeChild(completedTodoItem);
    });
    // Update the UI of the items left
    updateItemsLeftCount();
  };
});


// Function to get the siblings of the currently clicked menu item
// Inspired by this article: https://gomakethings.com/how-to-get-all-of-an-elements-siblings-with-vanilla-js/
const getSiblings = elem => {

  // Setup siblings array and get the first sibling
  const siblings = [];
  let sibling = elem.parentNode.firstChild;

  // Loop through each sibling and push to the array
  while (sibling) {
    // Ensure that node is of type element and not the clicked menu item
    if (sibling.nodeType === 1 && sibling !== elem) {
      siblings.push(sibling);
    }
    sibling = sibling.nextSibling;
  }

  return siblings;
};

// Function to make the selected menu item appear active
const activateMenuItem = (elem) => {

  // Grab the siblings of the currently selected menu item (elem)
  const siblings = getSiblings(elem);

  for (let siblingIndex in siblings) {
    if (siblings[siblingIndex].classList.contains('active-menu-item')) {
      siblings[siblingIndex].classList.remove('active-menu-item');
    };
  };
  if (!elem.classList.contains('active-menu-item')) {
    // Make the currently clicked menu item active
    elem.classList.add('active-menu-item');
  };
};

// Menu items on mobile view
const mobileAllMenuItem = document.querySelector('.app__menu--secondary .app__all-list');
const mobileActiveMenuItem = document.querySelector('.app__menu--secondary .app__active');
const mobileCompletedMenuItem = document.querySelector('.app__menu--secondary .app__completed');

// The wrapper for menu items on mobile view
const menuSecondaryWrapper = document.querySelector(".app__menu--secondary");

// Add an event listener to wrapper for menu items on mobile view
menuSecondaryWrapper.addEventListener('click', event => {
  if (
    event.target === mobileAllMenuItem ||
    event.target === mobileActiveMenuItem ||
    event.target === mobileCompletedMenuItem
  ) {
    activateMenuItem(event.target);
  };
  toggleFilterItems(event.target);
});

// Menu items on desktop view
const desktopAllMenuItem = document.querySelector('.app__menu--primary .app__all-list');
const desktopActiveMenuItem = document.querySelector('.app__menu--primary .app__active');
const desktopCompletedMenuItem = document.querySelector('.app__menu--primary .app__completed');

// The wrapper for menu items on desktop view
const menuPrimaryWrapper = document.querySelector(".app__menu--primary");

// Add an event listener to wrapper for menu items on desktop view
menuPrimaryWrapper.addEventListener('click', event => {
  if (
    event.target === desktopAllMenuItem ||
    event.target === desktopActiveMenuItem ||
    event.target === desktopCompletedMenuItem
  ) {
    activateMenuItem(event.target);
  };
  toggleFilterItems(event.target);
});

const toggleFilterItems = (elem) => {
  if (
    elem === mobileAllMenuItem || elem === desktopAllMenuItem
  ) {
    const allTodoItems = todoListContainer.children;

    // Only perform filtering when there are todo items
    if (allTodoItems.length !== 0) {
      // Convert HTML collections to an array
      Array.from(allTodoItems).forEach((todoItem) => {
        if (todoItem.classList.contains('hide-item')) {
          todoItem.classList.remove('hide-item');
          todoItem.classList.add('show-item');
        };
      });
    };
  } else if (
    elem === mobileActiveMenuItem || elem === desktopActiveMenuItem
  ) {
    const allTodoItems = todoListContainer.children;
    // Only perform filtering when there are todo items
    if (allTodoItems.length !== 0) {
      // Convert HTML collectionss to an array
      Array.from(allTodoItems).forEach((todoItem) => {
        if (!todoItem.classList.contains('show-item')) {
          todoItem.classList.add('show-item');
          if (todoItem.classList.contains('completed-todo')) {
            todoItem.classList.remove('show-item');
            todoItem.classList.add('hide-item');
          };
          if (todoItem.classList.contains('active-todo')) {
            todoItem.classList.add('show-item');
            todoItem.classList.remove('hide-item');
          };
        } else {
          if (todoItem.classList.contains('completed-todo')) {
            todoItem.classList.remove('show-item');
            todoItem.classList.add('hide-item');
          };
        }
      });
    };
  } else if (
    elem === mobileCompletedMenuItem || elem === desktopCompletedMenuItem
  ) {
    const allTodoItems = todoListContainer.children;
    // Only perform filtering when there are todo items
    if (allTodoItems.length !== 0) {
      // Convert HTML collections to an array
      Array.from(allTodoItems).forEach((todoItem) => {
        if (!todoItem.classList.contains('show-item')) {
          todoItem.classList.add('show-item');
          if (todoItem.classList.contains('active-todo')) {
            todoItem.classList.remove('show-item');
            todoItem.classList.add('hide-item');
          }
          if (todoItem.classList.contains('completed-todo')) {
            todoItem.classList.add('show-item');
            todoItem.classList.remove('hide-item');
          }
        } else {
          if (todoItem.classList.contains('active-todo')) {
            todoItem.classList.remove('show-item');
            todoItem.classList.add('hide-item');
          };
        };
      });
    };
  };
};

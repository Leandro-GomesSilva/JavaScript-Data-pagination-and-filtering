/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/

/*
For assistance:
   Check out the "Project Resources" section of the Instructions tab: https://teamtreehouse.com/projects/data-pagination-and-filtering#instructions
   Reach out in your Slack community: https://treehouse-fsjs-102.slack.com/app_redirect?channel=unit-2
*/


/***
 * `createElement` function:
 * This function creates a HTML element and sets up to 4 (optional) attributes to the element.
 * In case the desired HTML element does not need one or more of the above mentioned attributes, the function will receive for the corresponding parameter an empty string as argument. 
 * The empty string is "Falsy" and will not trigger the corresponding 'if statement' that sets the corresponding attribute to the element object.
 * The function returns the HTML element.
 * 
 * @param {string} tagName - Set which HTML element / HTML tag will be created in the function (e.g. 'p', 'div', 'input', 'li')
 * @param {string} tagAttribute1 - Define an optional first extra attribute for the HTML element.
 * @param {string|number} valueAttribute1 - Define the value of the above mentioned attribute
 * @param {string} tagAttribute2 - Define an optional second extra attribute for the HTML element.
 * @param {string|number} valueAttribute2 - Define the value of the above mentioned attribute.
 * @param {string} tagAttribute3 - Define an optional third extra attribute for the HTML element.
 * @param {string|number} valueAttribute3 - Define the value of the above mentioned attribute.
 * @param {string} tagAttribute4 - Define an optional forth extra attribute for the HTML element.
 * @param {string|number} valueAttribute4 - Define the value of the above mentioned attribute.
 * @returns {Object} A DOM element / HTML element
 * 
 */

function createElement(tagName, tagAttribute1, valueAttribute1, tagAttribute2, valueAttribute2, tagAttribute3, valueAttribute3, tagAttribute4, valueAttribute4) {
   const tag = document.createElement(tagName);
   if (tagAttribute1) {
      tag[tagAttribute1] = valueAttribute1;
   }
   if (tagAttribute2) {
      tag[tagAttribute2] = valueAttribute2;
   }
   if (tagAttribute3) {
      tag[tagAttribute3] = valueAttribute3;
   }
   if (tagAttribute4) {
      tag[tagAttribute4] = valueAttribute4;
   }
   return tag;
}


/***
 * Create the `showPage` function
 * This function will create and insert/append the elements needed to display a "page" of nine students.
 * 
 * @param {array} list - An array of student objects.
 * @param {number} page - The page that should be displayed.
 * @returns
 * 
 */

function showPage(list, page) {
   
   // Easy mathematical logic to calculate the start and the end index of the students array (itemsPerPage is a global variable - see comments below).
   const startIndex = (page * itemsPerPage) - itemsPerPage;
   const endIndex = page * itemsPerPage - 1;
   
   // Selecting the ul element and removing any students previously displayed.
   const ul = document.querySelector('ul.student-list');
   ul.innerHTML = '';

   for (let i = 0; i < list.length; i += 1) {
      
      if ( i >= startIndex && i <= endIndex ) {
         
         // Creating the HTML elements via the 'createElement' function
         const li = createElement('li', 'className', 'student-item cf');
         const divStudentDetails = createElement('div', 'className', 'student-details');
         const imgAvatar = createElement('img', 'className', 'avatar', 'src', list[i].picture.large, 'alt', 'Profile Picture');
         const h3 = createElement('h3', 'textContent', list[i].name.first + ' ' + list[i].name.last);
         const spanEmail = createElement('span', 'className', 'email', 'textContent', list[i].email);
         const divJoinedDetails = createElement('div', 'className', 'joined-details');
         const spanDate = createElement('span', 'className', 'date', 'textContent', 'Joined ' + list[i].registered.date);

         // Appending the HTML elements to the HTML file
         ul.appendChild(li);
         li.appendChild(divStudentDetails);
         divStudentDetails.appendChild(imgAvatar);
         divStudentDetails.appendChild(h3);
         divStudentDetails.appendChild(spanEmail);
         li.appendChild(divJoinedDetails);
         divJoinedDetails.appendChild(spanDate);
      }
   }
   return;
}


/***
 * Create the `addPagination` function
 * This function will create and insert/append the elements needed for the pagination buttons
 * 
 * @param {array} list - An array of student objects.
 * @returns
 * 
 */

function addPagination(list) {
   
   // Easy mathematical logic to calculate how many buttons should be displayed (itemsPerPage is a global variable - see comments below).
   const numberButtons = Math.ceil(list.length / itemsPerPage);
   
   // Selecting the ul element and removing any pagination buttons previously displayed.
   const ul = document.querySelector('ul.link-list');
   ul.innerHTML = '';

   // Creating the HTML elements for each Button. In case the page only needs 1 button, no button will be created.
   if (numberButtons > 1) {
      for (let i = 1; i <= numberButtons; i += 1) {
         const li = createElement('li');
         const button = createElement('button', 'type', 'button', 'textContent', i);
         ul.appendChild(li);
         li.appendChild(button);
      }

      // Activating the first button by default
      ul.querySelector('li').children[0].className = 'active';
      
      // After a 'click', it 'activates' the clicked button, removes the class 'active' of all other buttons and shows the corresponding page.
      ul.addEventListener('click', (e) => {
         if (e.target.tagName === 'BUTTON') {
            targetButton = e.target;
            targetButton.className = 'active';
            let li = ul.children;
            for (let i = 0; i < li.length; i += 1) {
               if (i != targetButton.textContent - 1) {
                  li[i].firstElementChild.className = '';
               }
            }
            showPage(currentData, targetButton.textContent);
         }
      });
   }
   return;
}


// Setting a the list of student objects to a 'let' global variable. The 'currentData' variable will be dynamically changed according to the search bar. 
let currentData = data;

// Declaring this as a global variable, so that it appears only one time in the code and remains consistent in case one decides to change it. 
// I declared it as a 'let' variable to be able to change it via console and test the versatility of the program. 
let itemsPerPage = 9;

// Call functions
showPage(currentData, 1);
addPagination(currentData);


/****** For extra credit ******/

// Adding a Search Component

const header = document.querySelector('header');
const label = createElement('label', 'htmlFor', 'search', 'className', 'student-search');
const input = createElement('input', 'id', 'search', 'placeholder', 'Search by name...');
const searchButton = createElement('button', 'type', 'button');
const imgSearch = createElement('img', 'src', 'img/icn-search.svg', 'alt', 'Search icon');

header.appendChild(label);
label.appendChild(input);
label.appendChild(searchButton);
searchButton.appendChild(imgSearch);

// Adding Functionality to the Search Component

searchButton.addEventListener('click', dynamicSearch);

// Improving functionality by adding a keyup event listener

input.addEventListener('keyup', dynamicSearch);

// Adding the HTML elements to display the message "No results found". 

const body = document.querySelector('body');
const divNoResults = createElement('div', 'className', 'js-noresults');
const pNoResults = createElement('p', 'textContent', 'No results found');

divNoResults.style.color = 'tomato';
divNoResults.style.textAlign = 'center';
divNoResults.style.fontSize = '20px';
divNoResults.style.fontWeight = 'bold';
divNoResults.style.display = 'none';
body.appendChild(divNoResults);
divNoResults.appendChild(pNoResults);


// I wanted to improve the program further by adding a second button, 'Reset', that will substitute the 'magnifying glass' button in following cases: 
// 1- No results were found.
// 2- The 'magnifying glass' button was clicked and a filtered list is being shown.
// By clicking the reset button, the students list i.e. the visualization will reset to its default state (all students).

const resetButton = createElement('button', 'type', 'button', 'textContent', 'Reset');
searchButton.style.display = 'initial';
resetButton.style.display = 'none';
label.appendChild(resetButton);

resetButton.addEventListener('click', () => {
   input.value = '';
   dynamicSearch();
});


/***
 * `dynamicSearch` function:
 * This function is attached to both Event Listeners of the Search Component and is also called inside the Event Handler of the Reset Button.
 * It searches the whole array of student objects and checks if the first or the last name of the students 'includes' the 'input value' from the Search Field.
 * If it includes, the function 'pushes' the whole array element to the array 'filteredList'. 
 * Finally, the global variable 'currentData' is rewritten with the 'filteredList' and passed to the functions 'showPage' and 'addPagination'.
 * 
 * @returns
 * 
 */

function dynamicSearch() {
   const inputValue = input.value.toUpperCase();
   const filteredList = [];

   for (let i = 0; i < data.length; i += 1) {
      if ( data[i].name.first.toUpperCase().includes(inputValue) || data[i].name.last.toUpperCase().includes(inputValue) ) {
         filteredList.push(data[i]);
      }
   }

   /*** 
   * Handling 'keyup' events
   * Make the text 'No results found' and the 'Reset button' visible. 
   * I improved this 'if statement' so that the program does not go unnecessarily inside it (for example, if no student is being shown BUT the searchButton is already invisible).
   */
   if (window.event.target.tagName !== 'BUTTON' && window.event.target.tagName !== 'IMG') {
      if (filteredList.length === 0 && searchButton.style.display === 'initial') {
         divNoResults.style.display = 'initial';
         resetButton.style.display = 'initial';
         searchButton.style.display = 'none';
      }  else if (filteredList.length !== 0 && searchButton.style.display === 'none') {
         divNoResults.style.display = 'none';
         resetButton.style.display = 'none';
         searchButton.style.display = 'initial';
      }
   }
   
   /***
    * Handling 'click' events
    * Cleaning the search bar and changing accordinly the the 'reset button' for the 'magnifying glass button' or vice-versa
    */
   if (window.event.target.tagName === 'BUTTON' || window.event.target.tagName === 'IMG') {
      if (searchButton.style.display === 'initial') {
         input.value = '';
         resetButton.style.display = 'initial';
         searchButton.style.display = 'none';
      } else if (resetButton.style.display === 'initial') {
         divNoResults.style.display = 'none';
         resetButton.style.display = 'none';
         searchButton.style.display = 'initial';
      }
   }

   currentData = filteredList;
   showPage(currentData, 1);
   addPagination(currentData);
   
   return;
}
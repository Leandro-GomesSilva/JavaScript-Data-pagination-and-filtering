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
 * This function will create a dynamic DOM element and set its ClassName as well as two extra attributes.
 * In case the desired DOM element not need a Class as well as 1 or 2 of the possible extra attributes, the function will receive an empty string for the corresponding parameters. 
 * The empty string is "Falsy" and will not trigger the corresponding 'if statement'.
 * The function returns the DOM element.
 * 
 * @param {string} tagName - Set which HTML element / HTML tag will be created in the function (e.g. 'p', 'div', 'input', 'li')
 * @param {string} tagClassName - Set the Class of the HTML element
 * @param {string} tagAttribute1 - Define a first extra attribute for the HTML element. If the extra attribute is not needed, the function will be called with an empty string as argument. 
 * @param {string or number} valueAttribute1 - Define the value of the first extra attribute that will be set for the HTML element
 * @param {string} tagAttribute2 - Define a second extra attribute for the HTML element. If the extra attribute is not needed, the function will be called with an empty string as argument. 
 * @param {string or number} valueAttribute2 - Define the value of the second extra attribute that will be set for the HTML element
 * @returns {Object} A DOM element / HTML element
 * 
 */

function createElement (tagName, tagClassName, tagAttribute1, valueAttribute1, tagAttribute2, valueAttribute2) {
   const tag = document.createElement(tagName);
   if (tagClassName) {
      tag.className = tagClassName;
   }
   if (tagAttribute1) {
      tag[tagAttribute1] = valueAttribute1;
   }
   if (tagAttribute2) {
      tag[tagAttribute2] = valueAttribute2;
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
   const itemsPerPage = 9;
   const startIndex = (page * itemsPerPage) - itemsPerPage;
   const endIndex = page * itemsPerPage - 1;
   const ul = document.querySelector('.student-list');
   ul.innerHTML = '';

   for (let i = 0; i < list.length; i += 1) {
      
      if ( i >= startIndex && i <= endIndex ) {
         
         // Creating the HTML elements via the 'createElement' function
         const li = createElement('li', 'student-item cf');
         const divStudentDetails = createElement('div', 'student-details');
         const imgAvatar = createElement('img', 'avatar', 'alt', 'Profile Picture');
         const h3 = createElement('h3', '');
         const spanEmail = createElement('span', 'email');
         const divJoinedDetails = createElement('div', 'joined-details');
         const spanDate = createElement('span', 'date');

         // Setting further attributes that are dynamically determined i.e. dependend of the index of the list array
         imgAvatar.src = list[i].picture.large;
         h3.textContent = list[i].name.first + ' ' + list[i].name.last;
         spanEmail.textContent = list[i].email;
         spanDate.textContent = 'Joined ' + list[i].registered.date;

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
   const itemsPerPage = 9;
   const numberButtons = Math.ceil(list.length / itemsPerPage);

   const ul = document.querySelector('.link-list');
   ul.innerHTML = '';

   // Creating the HTML elements for each Button. In case the page only needs 1 button, then no button will be create.
   if (numberButtons > 1) {
      for (let i = 1; i <= numberButtons; i += 1) {
         const li = document.createElement('li');
         const button = document.createElement('button');
         button.type = 'button';
         button.textContent = i;
         li.appendChild(button);
         ul.appendChild(li);
      }

      // Activating the first button by default
      const firstButton = ul.querySelector('li').children[0];
      firstButton.className = 'active';
      
      // After a 'click', it activates the clicked button, removes the class 'active' of all other buttons and shows the corresponding page.
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


// Setting a the list of student objects to a 'let' global variable. This 'currentData' variable will be dynamically changed according to the search bar. 
let currentData = data;

// Call functions
showPage(currentData, 1);
addPagination(currentData);


/****** For extra credit ******/

// Adding a Search Component

const header = document.querySelector('header');
const label = createElement('label', 'student-search', 'for', 'search');
const input = createElement('input', '', 'id', 'search', 'placeholder', 'Search by name...');
const button = createElement('button', '', 'type', 'button');
const imgSearch = createElement('img', '', 'src', 'img/icn-search.svg', 'alt', 'Search icon');

header.appendChild(label);
label.appendChild(input);
label.appendChild(button);
button.appendChild(imgSearch);

// Adding Functionality to the Search Component

button.addEventListener('click', dynamicSearch);

// Improving functionality by adding a keyup event listener

input.addEventListener('keyup', dynamicSearch);

// Adding the HTML elements to display the message "No results found" when applicable

const divPage = document.querySelector('div.page');
const divNoResults = document.createElement('div');
divNoResults.innerHTML = 'No results found';
divNoResults.style.color = 'tomato';
divPage.appendChild(divNoResults);
divNoResults.style.display = 'none';


/***
 * `dynamicSearch` function:
 * This function is attached to both Event Listeners of the Search Component.
 * It searches the whole array of student objects and checks if the first or the last name of the students 'includes' the 'input value' from the Search Field.
 * Once it includes, the function 'pushes' the whole array element to the array 'filteredList'. 
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

   // If no match is found, the text for 'No results found' is made visible.
   if (filteredList.length === 0) {
      divNoResults.style.display = 'initial';
   } else divNoResults.style.display = 'none';
   
   currentData = filteredList;
   showPage(currentData, 1);
   addPagination(currentData);
   
   return;
}
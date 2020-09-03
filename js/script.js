/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/

/*
For assistance:
   Check out the "Project Resources" section of the Instructions tab: https://teamtreehouse.com/projects/data-pagination-and-filtering#instructions
   Reach out in your Slack community: https://treehouse-fsjs-102.slack.com/app_redirect?channel=unit-2
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



/*
Create the `showPage` function
This function will create and insert/append the elements needed to display a "page" of nine students
*/
function showPage(list, page) {
   const itemsPerPage = 9;
   const startIndex = (page * itemsPerPage) - itemsPerPage;
   const endIndex = page * itemsPerPage - 1;
   const ul = document.querySelector('.student-list');
   ul.innerHTML = '';

   for (let i = 0; i < list.length; i += 1) {
      
      if ( i >= startIndex && i <= endIndex ) {
         
         const li = createElement('li', 'student-item cf');
         const divStudentDetails = createElement('div', 'student-details');
         const imgAvatar = createElement('img', 'avatar', 'alt', 'Profile Picture');
         const h3 = createElement('h3', '');
         const spanEmail = createElement('span', 'email');
         const divJoinedDetails = createElement('div', 'joined-details');
         const spanDate = createElement('span', 'date');

         imgAvatar.src = list[i].picture.large;
         h3.textContent = list[i].name.first + ' ' + list[i].name.last;
         spanEmail.textContent = list[i].email;
         spanDate.textContent = 'Joined ' + list[i].registered.date;

         ul.appendChild(li);
         li.appendChild(divStudentDetails);
         divStudentDetails.appendChild(imgAvatar);
         divStudentDetails.appendChild(h3);
         divStudentDetails.appendChild(spanEmail);
         li.appendChild(divJoinedDetails);
         divJoinedDetails.appendChild(spanDate);
      }
   }
}


/*
Create the `addPagination` function
This function will create and insert/append the elements needed for the pagination buttons
*/

function addPagination(list) {
   const itemsPerPage = 9;
   const numberButtons = Math.ceil(list.length / itemsPerPage);

   const ul = document.querySelector('.link-list');
   ul.innerHTML = '';

   if (numberButtons > 1) {
      for (let i = 1; i <= numberButtons; i += 1) {
         const li = document.createElement('li');
         const button = document.createElement('button');
         button.type = 'button';
         button.textContent = i;
         li.appendChild(button);
         ul.appendChild(li);
      }

      const firstButton = ul.querySelector('li');
      firstButton.className = 'active';
      
      ul.addEventListener('click', (e) => {
         if (e.target.tagName === 'BUTTON') {
            targetButton = e.target;
            let li = ul.children;
            targetButton.className = 'active';
            for (let i = 0; i < li.length; i += 1) {
               if (i != targetButton.textContent - 1) {
                  li[i].firstElementChild.className = '';
               }
            }
            showPage(currentData, targetButton.textContent);
         }
      });
   }
}

let currentData = data;

// Call functions
showPage(currentData, 1);
addPagination(currentData);


/****** For extra credit ******/

// Adding a Search Component

const h2 = document.querySelector('header');
const label = createElement('label', 'student-search', 'for', 'search');
const input = createElement('input', '', 'id', 'search', 'placeholder', 'Search by name...');
const button = createElement('button', '', 'type', 'button');
const imgSearch = createElement('img', '', 'src', 'img/icn-search.svg', 'alt', 'Search icon');

h2.appendChild(label);
label.appendChild(input);
label.appendChild(button);
button.appendChild(imgSearch);

// Adding Functionality to the Search Component

button.addEventListener('click', dynamicSearch);

// Improving functionality by adding a keyup event listener

input.addEventListener('keyup', dynamicSearch);

// Adding the elements to display, when necessary, the message for No results

const divPage = document.querySelector('div.page');
const divNoResults = document.createElement('div');
divNoResults.innerHTML = '<strong>No results found</strong>';
divNoResults.style.color = 'tomato';
divPage.appendChild(divNoResults);
divNoResults.style.display = 'none';


function dynamicSearch() {
   inputValue = input.value.toUpperCase();
   filteredList = [];
   for (let i = 0; i < data.length; i += 1) {
      if ( data[i].name.first.toUpperCase().includes(inputValue) || data[i].name.last.toUpperCase().includes(inputValue) ) {
         filteredList.push(data[i]);
      }
   }

   if (filteredList.length === 0) {
      divNoResults.style.display = 'initial';
   } else divNoResults.style.display = 'none';
   
   currentData = filteredList;
   showPage(currentData, 1);
   addPagination(currentData);
}
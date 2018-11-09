
/*********************************************************************************************
// Teamtreehouse - Full Stack Javascript Techdegree                                           /
// FSJS - Pagination and Filtering                                                            /
// Project 2                                                                                  /
// DatPhamQuoc
// Shooting for "Exceed Expectations"
**********************************************************************************************/

/***********************************************************************************************/
const containDiv = document.querySelector('.page');
const headerDiv = document.querySelector('.page-header');
const searchDiv = document.createElement('div');
const searchInput = document.createElement('input');
const searchButton = document.createElement('button');
const pageLinksDiv = document.createElement('div');
const pageLinksUl = document.createElement('ul');
const notFound = document.createElement('h1');
const originalLi = Array.from(document.getElementsByClassName('student-item'));   //Array contain all user 'Li' element
const userNames = Array.from(document.querySelectorAll('h3'));   //Array contain all user's name
const userEmails = Array.from(document.querySelectorAll('.email'));   //Array contain all user's email
let currentOriginalPage = 1 ;   // Current displayed page at 'Origin' mode
let currentSearchPage = 1;   // Current displayed page at 'Search' mode
let pageLinksNumber = 1;
let numberOfPageLinks;   //Store number of page links
let searchResult = [];   //Array contain searching result
let searchWord = '';     //Search word

//Dynamically insert search form to HTML
searchDiv.className = 'student-search';
searchInput.placeholder = 'Search for student...';
searchButton.innerHTML = 'Search'
searchDiv.appendChild(searchInput);
searchDiv.appendChild(searchButton);
headerDiv.appendChild(searchDiv);

//Create pagination links 'Div'
containDiv.appendChild(pageLinksDiv).appendChild(pageLinksUl);
pageLinksDiv.className = 'pagination';

/*---------------Dynamically add pagination Link to HTML----------------------*/

// Determine number of page links
function determineNumberOfPageLinks (caculatedArray) {
  numberOfPageLinks = Math.ceil(caculatedArray.length/10);
}


/*
Page Link has 2 states (mode) - 'Origin' and 'Searchs -. 'Origin' mode is for
normal pagination of original user list. 'Search' mode is used when searching
events are fired.
*/
// Create each page link
function createPageLinks (number, mode) {
  let pageLinksLi = document.createElement('li');
  pageLinksLi.innerHTML = "<a href=\"#\">" + number + "</a>"
  pageLinksLi.className = mode;
  pageLinksUl.appendChild(pageLinksLi);
}

// Dynamically add pagination links to HTML
function printPageLinks(caculatedArray, mode) {
  pageLinksUl.innerHTML = '';
  determineNumberOfPageLinks(caculatedArray);
  for (let number = 1; number <= numberOfPageLinks; number++) {
    createPageLinks(number, mode);
  }
}

/*--------------- Loading, pagination dispay and searching functions ----------*/

// Hide all selected array
function hideAll(arrayToBeHide) {
  for (let i = 0; i < arrayToBeHide.length; i++) {
    arrayToBeHide[i].style.display = 'none';
  }
}

// Display first 10 student
function loadEventDisplay (arrayToBeDisplay) {
  if (arrayToBeDisplay.length <= 10) {
    for (let i = 0; i < arrayToBeDisplay.length; i++) {
      arrayToBeDisplay[i].style.display = '';
    }
  } else {
    for (let i = 0; i < 10; i++) {
      arrayToBeDisplay[i].style.display = '';
    }
  }
}

// Pagination display when a page link clicked
function paginatedDisplay (arrayToBePaginate) {
  if (pageLinksUl.firstChild.className === 'origin') {
    if (currentOriginalPage == numberOfPageLinks) {
      for (let i = currentOriginalPage*10 -10; i < arrayToBePaginate.length; i++) {
        arrayToBePaginate[i].style.display = '';
      }
    } else {
      for (let i = currentOriginalPage*10 -10; i < currentOriginalPage*10; i++) {
        arrayToBePaginate[i].style.display = '';
      }
    }
  } else if (pageLinksUl.firstChild.className === 'search') {
    if (currentSearchPage == numberOfPageLinks) {
      for (let i = currentSearchPage*10 -10; i < arrayToBePaginate.length; i++) {
        arrayToBePaginate[i].style.display = '';
      }
    } else {
      for (let i = currentSearchPage*10 -10; i < currentSearchPage*10; i++) {
        arrayToBePaginate[i].style.display = '';
      }
    }
  }
}

//Searching for matches
function searching (nameArray, emailArray, searchArray ) {
  for (let i= 0; i < nameArray.length; i++) {
    let name = nameArray[i].textContent.toLowerCase();
    let email = emailArray[i].textContent.toLowerCase();
    // add matched 'li' element to searchArray
    if (name.indexOf(searchWord) !== -1 || email.indexOf(searchWord) !== -1) {
      searchArray.push(userNames[i].parentNode.parentNode);
    }
  }
}

// Reset page link's highlight
function resetActive () {
  const resetActive = document.querySelectorAll('a');
  for (let i = 0 ; i < resetActive.length; i++) {
    resetActive[i].className ='';
  }
}

// Dynamically include a message in the HTML to tell the user there are no matches.
function notResultFound () {
  pageLinksUl.innerHTML = '';
  notFound.innerHTML = 'No results found';
  notFound.style.textAlign = 'center';
  containDiv.appendChild(notFound);
}


/*--------------- Page laod display and pagination display -------------------*/

hideAll(originalLi);
//  First 10 students are shown when the page loads
window.addEventListener('load', () => {
  loadEventDisplay(originalLi);
  printPageLinks(originalLi, 'origin');
  pageLinksUl.firstChild.firstChild.className = 'active'; // Highlight first page link
})


//
pageLinksUl.addEventListener('click', (event) => {
  if (event.target.tagName == 'A') {
    if (event.target.parentElement.className == 'origin') {
      hideAll(originalLi);
      resetActive();
      event.target.className = 'active'; // Highlight selected page link
      pageLinksNumber = parseInt(event.target.textContent);
      currentOriginalPage = pageLinksNumber;
      paginatedDisplay(originalLi);

    }else if (event.target.parentElement.className == 'search') {
      hideAll(searchResult);
      resetActive();
      event.target.className = 'active';
      currentSearchPage = parseInt(event.target.textContent);
      paginatedDisplay(searchResult);
    }
  }
})



/*--------------- Searching 'keyup' events -----------------------------------*/

searchInput.addEventListener('keyup', () => {
  searchWord = searchInput.value.toLowerCase();
  searchResult = [];
  notFound.innerHTML ='';
  if (searchWord !== '') {
    hideAll(originalLi);
    searching (userNames, userEmails, searchResult)
    if (searchResult.length === 0) {
      hideAll(originalLi);
      notResultFound();
    }else {
      loadEventDisplay(searchResult);
      printPageLinks(searchResult, 'search');
      pageLinksUl.firstChild.firstChild.className = 'active';  // Highlight first page link
    }
  }else {
    hideAll(originalLi);
    printPageLinks(originalLi, 'origin');
    paginatedDisplay(originalLi);
    // Re-highlight the current page link before searching.
    const activeLink = Array.from(document.getElementsByTagName('a'));
    activeLink[currentOriginalPage - 1].className = 'active';
  }
});


/*--------------- Searching 'click' events -----------------------------------*/

searchButton.addEventListener('click', () => {
  searchWord = searchInput.value.toLowerCase();
  searchResult = [];
  notFound.innerHTML ='';
  if (searchWord !== '') {
    hideAll(originalLi);
    searching (userNames, userEmails, searchResult)
    if (searchResult.length === 0) {
      hideAll(originalLi);
      notResultFound();
    }else {
      loadEventDisplay(searchResult);
      printPageLinks(searchResult, 'search');
      pageLinksUl.firstChild.firstChild.className = 'active';  // Highlight first page link
    }
  }else {
    hideAll(originalLi);
    printPageLinks(originalLi, 'origin');
    paginatedDisplay(originalLi);
    // Re-highlight the current link page before searching
    const activeLink = Array.from(document.getElementsByTagName('a'));
    activeLink[currentOriginalPage - 1].className = 'active';
  }
});

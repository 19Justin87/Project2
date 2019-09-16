// Project # 2 List Pagination and Filtering

// Two Global Variables
// Variable student item
// Variable to indicate number of students per page
const studentItems = document.getElementsByClassName("student-item");
const offset = 10;

appendPageLinks(studentItems);
showPage(1, studentItems);
addSearch();

function hideAllStudents() {
    for(var i = 0; i < studentItems.length; i += 1) {
        studentItems[i].style.display = "none";
    }
}

// Fuction to let user know that no student exist by that name
function showNoResults() {
    hideAllStudents()

    let pageNode = document.getElementsByClassName("page");
    let warningDiv = document.createElement("div");
    let warningHeadline = document.createElement("h4");
    let warningText = document.createTextNode("No students by that name...");

    warningDiv.classList.add("warning");
    warningHeadline.appendChild(warningText);
    warningDiv.appendChild(warningHeadline);
    pageNode[0].appendChild(warningDiv);
}


// Function to display page number and student list
function showPage(pageNumber, studentList) {

    if(studentList.length <= 0) {
        return showNoResults();
    }

    // List of Links
    let pageLinks = document.querySelectorAll(".pagination ul li a");

    // Class Removal
    for(var i = 0; i < pageLinks.length; i += 1) {
        pageLinks[i].classList.remove("active");
    }

    hideAllStudents();

    // Link to active
    if(pageLinks.length > 0) {
        pageLinks[pageNumber - 1].classList.add("active");
    }

    // Show remaining students
    if(pageNumber == Math.ceil(studentList.length / offset)) {
        for(var i = (pageNumber * offset) - offset; i < studentList.length; i++) {
            studentList[i].style.display = "block";
        }
    } else { 
        for(var i = (pageNumber*offset) - offset; i < (pageNumber * offset); i += 1) {
        studentList[i].style.display = "block";
        }   
    }           
 }

 function appendPageLinks(studentList) {
    let numOfPages;
    
    // Get Node
    let pageNode = document.getElementsByClassName("page");

    let linkDiv = document.getElementsByClassName("pagination");
    if(linkDiv.length > 0) {
        pageNode[0].removeChild(linkDiv[0]);
    }
    
    let warningDiv = document.getElementsByClassName("warning");
    if(warningDiv.length > 0) {
        pageNode[0].removeChild(warningDiv[0]);
    }

    // How many pages are needed
    numOfPages = Math.ceil(studentList.length / offset);

    // One or more 
    if(numOfPages > 1) {
        
        
        linkDiv = document.createElement("div");
        let pageList = document.createElement("ul");
        let pageListItem = document.createElement("li");
        
        // Page link section
        pageNode[0].appendChild(linkDiv);
        linkDiv.appendChild(pageList);
        linkDiv.className = "pagination";

        // Every page
        for(let i = 1; i <= numOfPages; i += 1) {
            // add a page link to the page link section
            let pageLink = document.createElement("a"); 
            let pageNumberText = document.createTextNode(i); 
            pageLink.setAttribute("href", "#");  
            pageLink.addEventListener("click", function() { 
                showPage(i, studentList);
            });
            pageList.appendChild(pageListItem);  
            pageListItem.appendChild(pageLink);  
            pageLink.appendChild(pageNumberText);  
        }
    }
}

// Add search bar 
function addSearch() {

    let pageHeader = document.getElementsByClassName("page-header");
    
    let studentSearchDiv = document.createElement("div");
    let inputBox = document.createElement("input");
    let searchButton = document.createElement("button");
    let buttonText = document.createTextNode("Search");
   
    studentSearchDiv.classList.add("student-search");
    inputBox.setAttribute("placeholder", "Search for students..");
    
    // Append nodes and put them in DOM
    searchButton.appendChild(buttonText);
    studentSearchDiv.appendChild(inputBox);
    studentSearchDiv.appendChild(searchButton);
    pageHeader[0].appendChild(studentSearchDiv);

    // Respond when clicked
    searchButton.addEventListener("click", function() {
        searchList();
    });
}

function searchList() {
    
    let searchResults = [];

    // Search input
    let searchInput = document.getElementsByTagName("input");
    let searchString = searchInput[0].value.toLowerCase();

    // Students names and emails
    let studentNames = document.querySelectorAll('.student-details h3');
    let studentEmails = document.getElementsByClassName("email");

    if(searchString == "") {
        showPage(1, studentItems);
    }

    // Create a new list
    for(var i = 0; i < studentItems.length; i += 1) {
        let studentName = studentNames[i].innerHTML.toLowerCase();
        let studentEmail = studentEmails[i].innerHTML.toLowerCase();
        if(studentName.includes(searchString) || studentEmail.includes(searchString)) {
            searchResults.push(studentItems[i])
        }
    }

    appendPageLinks(searchResults);
    showPage(1, searchResults);
}

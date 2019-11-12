// SPA SINGLE PAGE App


//
let activePage = "family";

// hide all pages
function hideAllPages() {
  let pages = document.querySelectorAll(".page");
  for (let page of pages) {
    page.style.display = "none";
  }
}

// show page or tab
function showPage(pageId) {
  activePage = pageId;
  hideAllPages();
  document.querySelector(`#${pageId}`).style.display = "block";
  location.href = `#${pageId}`;
  setActiveTab(pageId);
}

// sets active tabbar/ menu item
function setActiveTab(pageId) {
  let pages = document.querySelectorAll(".tabbar a");
  for (let page of pages) {
    if (`#${pageId}` === page.getAttribute("href")) {
      page.classList.add("active");
    } else {
      page.classList.remove("active");
    }
  }
}

// set default page
function setDefaultPage() {
  let page = "family";
  if (location.hash) {
    page = location.hash.slice(1);
  }
  showPage(page);
}
setDefaultPage();

// google sheet
let sheetId = "1ScnzWSiRCaz3FzBRA9du_zrmGVASpwjbvSDtotKjuEM";
let sheetNumber = 1;
let sheetUrl = `https://spreadsheets.google.com/feeds/list/${sheetId}/${sheetNumber}/public/full?alt=json`;
console.log(sheetUrl);
let teachers = [];
let family = [];


// Appends json data to the DOM
function appendTeachers(teachers) {
  console.log(teachers);
  let htmlTemplate = "";
  for (let teacher of teachers) {
    htmlTemplate += `
        <article>
          <img src="${teacher['gsx$img']['$t']}">
          <h4>${teacher['gsx$name']['$t']}</h4>
          <p> Mail: <a href="mailto:${teacher['gsx$email']['$t']}">${teacher['gsx$email']['$t']}</a></p>
          <p> Age: ${teacher['gsx$age']['$t']}</p>
          <p> Phone: ${teacher['gsx$phone']['$t']}</p>
            <p> Position: ${teachers['gsx$position']['$t']}</p>
        </article>
      `;
  }
  document.querySelector("#teachers").innerHTML += htmlTemplate;
}

// Fetches json person data from the file persons.json
let filteredTeachers = [];
let filteredFamily = [];

// Fetch json family members from json file
function loadFamilyMembers() {
  fetch('json/family.json')
    .then(function(response) {
      return response.json();
    })
    .then(function(json) {
      console.log("Family Members: ");
      console.log(json);
      family = json;
      appendFamily(json, "family");
    });
}

//Fetches json teacher data from the sheet url online
function loadTeachers() {
  fetch(sheetUrl)
    .then(function(response) {
      return response.json();
    })
    .then(function(json) {
      console.log("Teachers: ");
      console.log(json);
      teachers = json.feed.entry;
      appendTeachers(json.feed.entry);
    });
}

//appends json data to the DOM- family
function appendFamily(family, type) {
  let htmlTemplate = "";
  for (let member of family) {
    htmlTemplate += `
    <article>
      <h4>${member.name}</h4>
      <a href='mailto:${member.mail}'>${member.mail}</a>
    </article>
    `;
  }
  document.querySelector("#family-members").innerHTML = htmlTemplate;
}

//appends json data to the DOM- teachers
function appendTeachers(teachers) {
  console.log(teachers);
  let htmlTemplate = "";
  for (let teacher of teachers) {
    htmlTemplate += `
          <article>
            <img src="${teacher['gsx$img']['$t']}">
            <h4>${teacher['gsx$name']['$t']}</h4>
            <p> Mail: <a href="mailto:${teacher['gsx$email']['$t']}">${teacher['gsx$email']['$t']}</a></p>
            <p> Age: ${teacher['gsx$age']['$t']}</p>
            <p> Phone: ${teacher['gsx$phone']['$t']}</p>
              <p> Position: ${teacher['gsx$position']['$t']}</p>
          </article>`;
  }
  document.querySelector("#teachers").innerHTML = htmlTemplate;
}

//loads and appends json post data to the DOM
function loadPosts() {
  fetch('http://jsonplaceholder.typicode.com/posts')
    .then(function(response) {
      return response.json();
    })
    .then(function(posts) {
      console.log(posts);
      let htmlTemplate = "";
      for (let post of posts) {
        htmlTemplate += `
        <article>
          <h4>${post.title}</h4>
          <p>${post.body}</p>
        </article>
        `;
      }
      document.querySelector("#posts").innerHTML = htmlTemplate;
    });
}
//search function
function search(value) {
  let filteredTeachers = [];
  let filteredFamily = [];
  console.log(value);
  let searchQuery = value.toLowerCase();

  if (activePage === "family") {
    for (let member of family) {
      let name = member.name.toLowerCase();

      if (name.includes(searchQuery)) {
        filteredFamily.push(member);
        console.log(filteredFamily);
        appendFamily(filteredFamily);
      }
    }
  }
  else if (activePage === "teachers") {
    for (let teacher of teachers) {
      let name = teacher['gsx$name']['$t'].toLowerCase();
      if (name.includes(searchQuery)) {
        filteredTeachers.push(teacher);
        console.log(filteredTeachers);
        appendTeachers(filteredTeachers);

      }
    }
  }
}

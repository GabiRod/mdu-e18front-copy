"use strict";

let sheetId = "1ScnzWSiRCaz3FzBRA9du_zrmGVASpwjbvSDtotKjuEM";
let sheetNumber = 1;
let sheetUrl = `https://spreadsheets.google.com/feeds/list/${sheetId}/${sheetNumber}/public/full?alt=json`;
console.log(sheetUrl);

fetch(sheetUrl)
  .then(function(response) {
    return response.json();
  })
  .then(function(json) {
    console.log(json);
    appendPersons(json.feed.entry);
  });

/*
Appends json data to the DOM
*/
function appendPersons(persons) {
  console.log(persons);
  let htmlTemplate = "";
  for (let person of persons) {
    htmlTemplate += `
    <div class=card" style="width: 18rem;>
      <img src=$[persons] class=card-img-top alt="...">
        <div class="card-body">
            <h5 class="card-title">Card title</h5>
            <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
              <a href="#" class="btn btn-primary">Go somewhere</a>
              </div>
              </div>
        <article>
          <img src="${person['gsx$img']['$t']}">
          <h4>${person['gsx$name']['$t']}</h4>
          <p> Mail: <a href="mailto:${person['gsx$email']['$t']}">${person['gsx$email']['$t']}</a></p>
          <p> Age: ${person['gsx$age']['$t']}</p>
          <p> Phone: ${person['gsx$phone']['$t']}</p>
            <p> Position: ${person['gsx$position']['$t']}</p>
        </article>
      `;
  }
  document.querySelector("#persons").innerHTML += htmlTemplate;
}

"use strict";
let tabs = document.querySelector("#tabs")
let instance = M.Tabs.init(tabs);

document.addEventListener('DOMContentLoaded', function() {
let elems = document.querySelectorAll('select');
let instances = M.FormSelect.init(elems);
  });

  function showLoader(show) {
    let loader = document.querySelector('.preloader-wrapper');
    if (show) {
      loader.classList.remove("hide");
    } else {
      loader.classList.add("hide");
    }
  }

  // =========== Movie SPA functionality =========== //
  let movies = [];
  // fetch all movies from WP
  function getMovies() {
    fetch('http://movie-api.cederdorff.com/wp-json/wp/v2/posts?_embed')
      .then(function(response) {
        return response.json();
      })
      .then(function(json) {
        console.log(json);
        appendMovies(json);
        movies = json;
        setTimeout(function() {
          showLoader(false);
        }, 500);
      });
  }
  getMovies();

  // append movies to the DOM
  function appendMovies(movies) {
    let htmlTemplate = "";

    for (let movie of movies) {
      htmlTemplate += `
      <div class="col s12 m4">
        <div class="card">
          <div class="card-image">
            <img src="${movie.acf.img}">
              <a class="btn-floating halfway-fab waves-effect waves-light red"><i class="material-icons">add</i></a>
          </div>
          <div class="card-content">
            <span class="card-title">${movie.title.rendered} (${movie.acf.year})</span>
            <p${movie.acf.description}</p>
          </div>
            <div class="card-action">
              <a href="${movie.acf.trailer}" target="_blank">trailer</a>
            </div>
        </div>
      </div>
      `;
    }

    document.querySelector('#card1').innerHTML = htmlTemplate;
  }

  // append all genres as select options (dropdown)
  function appendGenres(genres) {
    let htmlTemplate = "";
    for (let genre of genres) {
      htmlTemplate += `
        <option value="${genre.id}">${genre.name}</option>
      `;
    }
    document.querySelector('#select-genre').innerHTML += htmlTemplate;
  }

  // fetch all genres / categories from WP
  function getGenres() {
    fetch('http://movie-api.cederdorff.com/wp-json/wp/v2/categories')
      .then(function(response) {
        return response.json();
      })
      .then(function(categories) {
        console.log(categories);
      });
  }
  getGenres();

  // genre selected event - fetch movies by selected category
  function genreSelected(genreId) {
  showLoader(true);
    console.log(`Genre Id:${genreId}`);
    if (genreId ) {
  showLoader(true);
    fetch(`http://movie-api.cederdorff.com/wp-json/wp/v2/posts?_embed&categories=${genreId}`)
      .then(function(response) {
        return response.json();
      })
      .then(function(movies) {
        console.log(movies);
        appendMoviesByGenre(movies);
          showLoader(false);
      });
    } else {
      }
  }

  // append movies by genre
  function appendMoviesByGenre(moviesByGenre) {
    let htmlTemplate = "";

    for (let movie of moviesByGenre) {
      htmlTemplate += `
      <div class="col s12 m6">
        <div class="card">
          <div class="card-image">
            <img src="${movie.acf.img}">
              <a class="btn-floating halfway-fab waves-effect waves-light red"><i class="material-icons">add</i></a>
          </div>
          <div class="card-content">
            <span class="card-title">${movie.title.rendered} (${movie.acf.year})</span>
            <p${movie.acf.description}</p>
          </div>
            <div class="card-action">
              <a href="${movie.acf.trailer}" target="_blank">trailer</a>
            </div>
        </div>
      </div>
      `;
    }

    // if no movies, display feedback to the user
    if (moviesByGenre.length === 0) {
      htmlTemplate = `
        <p>No Movies</p>
      `;
    }
    document.querySelector('#card2').innerHTML = htmlTemplate;
  }

  // search functionality
  function search(value) {
    let searchQuery = value.toLowerCase();
    let filteredMovies = [];
    for (let movie of movies) {
      let title = movie.title.rendered.toLowerCase();
      if (title.includes(searchQuery)) {
        filteredMovies.push(movie);
      }
    }
    console.log(filteredMovies);
    appendMovies(filteredMovies);
  }

  function showPage(pageId) {
  hideAllPages();
  document.querySelector(`#${pageId}`).style.display = "block";
  location.href = `#${pageId}`;
  setActiveTab(pageId);}

  function addNewMovie() {
    let title = document.querySelector("#title").value;
    let description = document.querySelector("#description").value;
    let year = document.querySelector("#year").value;
    let trailer = document.querySelector("#trailer").value;
    let img = document.querySelector("#img").value;
}
    let newMovie = {
      title: title,
      description: description,
      year: year,
      trailer: trailer,
      img: img
    };

    console.log(newMovie);
    movies.push(newMovie);
    console.log(movies);
    appendMovies(movies);

    document.querySelector("#title").value = "";
    document.querySelector("#description").value = "";
    document.querySelector("#year").value = "";
    document.querySelector("#trailer").value = "";
    document.querySelector("#img").value = "";

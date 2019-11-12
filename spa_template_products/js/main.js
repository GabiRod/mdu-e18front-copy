"use strict";

// =========== Single Page Application functionality =========== //

// hide all pages
function hideAllPages() {
  let pages = document.querySelectorAll(".page");
  for (let page of pages) {
    page.style.display = "none";
  }
}

// show page or tab
function showPage(pageId) {
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
  let page = "products";
  if (location.hash) {
    page = location.hash.slice(1);
  }
  showPage(page);
}

setDefaultPage();

// =========== Product functionality =========== //

// let products = [{
//         brand: "Apple",
//         model: "Mac Book 13",
//         price: "1200",
//         img: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/macbook-air-space-gray-select-201810?wid=904&hei=840&fmt=jpeg&qlt=80&op_usm=0.5,0.5&.v=1541713862468"
// },
//     {
//         brand: "Apple",
//         model: "Mac Book 15",
//         price: "1300",
//         img: "https://im9.cz/sk/iR/importprodukt-orig/e99/e996f5e453fb4014d06b4163d3f804d5--mmf250x250.jpg"
// },
//     {
//         brand: "Apple",
//         model: "Mac Book 13",
//         price: "1500",
//         img: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/macbook-air-space-gray-select-201810?wid=904&hei=840&fmt=jpeg&qlt=80&op_usm=0.5,0.5&.v=1541713862468"
// },
//     {
//         brand: "Asus",
//         model: "ASUS 5687 HL",
//         price: "1500",
//         img: "https://azcd.joycemayne.com.au/media/catalog/product/cache/23/image/992x558/9df78eab33525d08d6e5fb8d27136e95/t/p/tp412ua-ec047t.jpg"
// }
// ];
// console.log(products);

let products = [];

fetch('json/products.json')
  .then(function(response) {
    return response.json();
  })

  .then(function(json) {
    console.log(json);
    products = (json);
    appendProducts(json);
  });

function appendProducts(productArray) {
  let htmlTemplate = "";

  for (let product of productArray) {
    console.log(product);

    htmlTemplate += `
        <img src="${product.img}">
        <h2> ${product.model} <h2>
        <h2> ${product.brand} <h2>
        <h2> ${product.price} <h2>
`;
  }
  document.querySelector("#products-container").innerHTML = htmlTemplate;

};

function addNewProduct() {
  let brand = document.querySelector("#brand").value;
  let model = document.querySelector("#model").value;
  let price = document.querySelector("#price").value;
  let img = document.querySelector("#img").value;

  let newProduct = {
    brand: brand,
    model: model,
    price: price,
    img: img
  };

  console.log(newProduct);
  products.push(newProduct);
  console.log(products);
  appendProducts(products);

  document.querySelector("#brand").value = "";
  document.querySelector("#model").value = "";
  document.querySelector("#price").value = "";
  document.querySelector("#img").value = "";
  showPage("products");
}

function search(value) {
  console.log(value);
  let searchQyery = value.toLowerCase();
  let filteredProducts = [];

  for (let product of products) {
    let model = product.model.toLowerCase();
    let brand = product.brand.toLowerCase();

    if (model.includes(searchQyery) || brand.includes(searchQyery)) {
      filteredProducts.push(product);
    }
  };
  console.log(filteredProducts);
  appendProducts(filteredProducts);
}

const productsContainer = document.getElementById("products-container");
const arrowImage = document.getElementById("imageDownload");

function detectBrowser() {
  const userAgent = navigator.userAgent;

  if (userAgent.indexOf("Chrome") > -1) {
    return "Chrome";
  } else if (
    userAgent.indexOf("Safari") > -1 &&
    userAgent.indexOf("Chrome") === -1
  ) {
    return "Safari";
  } else if (userAgent.indexOf("Firefox") > -1) {
    return "Firefox";
  } else if (
    navigator.appName === "Microsoft Internet Explorer" ||
    userAgent.indexOf("Trident") > -1
  ) {
    return "Internet Explorer";
  } else if (userAgent.indexOf("Edge") > -1) {
    return "Edge";
  } else {
    return "Unknown";
  }
}

const browserName = detectBrowser();

function createProductCard(product) {
  const cardElement = document.createElement("div");
  cardElement.classList.add("product-card");

  const productName = document.createElement("h3");
  productName.classList.add("title-card");
  productName.textContent = product.name_prod;

  const buttonDownload = document.createElement("button");
  buttonDownload.innerHTML = "download";
  buttonDownload.classList.add("button-download");
  buttonDownload.innerHTML += `<svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M15 0C6.72517 0 0 6.71012 0 15C0 23.2899 6.71013 30 15 30C23.2899 30 30 23.2899 30 15C30 6.71012 23.2748 0 15 0ZM12.2768 14.6239H13.2547C13.4654 14.6239 13.6459 14.4584 13.6459 14.2327V8.33501C13.6459 8.12438 13.8114 7.94382 14.0371 7.94382H15.9629C16.1735 7.94382 16.3541 8.10933 16.3541 8.33501V14.2327C16.3541 14.4433 16.5195 14.6239 16.7452 14.6239H17.7231C18.0391 14.6239 18.2196 15 18.0241 15.2558L15.3009 18.671C15.1505 18.8666 14.8495 18.8666 14.6991 18.671L11.991 15.2558C11.7803 15 11.9609 14.6239 12.2768 14.6239ZM23.5155 20.2507V21.65C23.5155 21.8606 23.3501 22.0411 23.1244 22.0411H8.39516H6.86056C6.64993 22.0411 6.46941 21.8756 6.46941 21.65V20.2507V16.4443C6.46941 16.2337 6.63489 16.0532 6.86056 16.0532H8.00401C8.21464 16.0532 8.39516 16.2186 8.39516 16.4443V19.8596C8.39516 20.0702 8.56067 20.2507 8.78635 20.2507H21.1534C21.3641 20.2507 21.5446 20.0853 21.5446 19.8596V16.4443C21.5446 16.2337 21.7101 16.0532 21.9358 16.0532H23.1394C23.35 16.0532 23.5306 16.2186 23.5306 16.4443V20.2507H23.5155Z" fill="white"/>
  </svg>`;

  buttonDownload.addEventListener("click", function () {
    const filename = product.link;
    const content = "This is the content of the downloaded file.";
    const blob = new Blob([content], { type: "text/plain" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = filename;
    link.click();

    window.URL.revokeObjectURL(url);

    setTimeout(function () {
      if (browserName === "Firefox") {
        return arrowImage.classList.add("block-arrow");
      } else if (browserName === "Chrome") {
        return arrowImage.classList.add("rotate-block");
      } else {
        return arrowImage.classList.add("block-arrow");
      }
    }, 4000);
  });

  const licenseName = document.createElement("p");
  licenseName.classList.add("text-deskription");
  licenseName.textContent = product.license_name;

  const priceBlock = document.createElement("div");
  priceBlock.classList.add("container-price-absolute");
  priceBlock.innerHTML = `<div class="container-price-relative"><h3>$${
    product.amount
  }</h3><p class="text-year">/per year</p><div  class=${
    product.price_key === "50%" ? "image-diskount" : "none"
  }><img src="./image/50OFF.svg"/></div> <div class=${
    product.is_best ? "check" : "none"
  }> <p>${product.is_best ? "Best value" : ""}</p></div></div>`;

  const bestLabel = document.createElement("span");
  bestLabel.classList.add("best-label");
  bestLabel.textContent = product.is_best ? "Best" : "";

  cardElement.appendChild(priceBlock);
  cardElement.appendChild(productName);
  cardElement.appendChild(licenseName);
  cardElement.appendChild(buttonDownload);

  return cardElement;
}

function fetchItems() {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", "https://veryfast.io/t/front_test_api.php", true);

  xhr.onload = function () {
    if (xhr.status === 200) {
      const data = JSON.parse(xhr.responseText);
      const products = data.result.elements;
      products.forEach((product) => {
        const productCard = createProductCard(product);
        productsContainer.appendChild(productCard);
      });
    } else {
      console.error("Error fetching data:", xhr.statusText);
    }
  };

  xhr.send();
}

fetchItems();

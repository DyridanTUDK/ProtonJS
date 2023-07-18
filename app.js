const auth = "RltyStaGlBsh2fyFr4qZ2yzQHEwcmPGVUuCWRPcYB5wjj0fQcVVt3nYD";
const gallery = document.querySelector(".gallery");
const searchInput = document.querySelector(".input");
const form = document.querySelector(".search-form");
const more = document.querySelector(".more");
let searchValue;
let page = 1;
let fetchLink;
let currentSearch;
// Event Listerners;
searchInput.addEventListener("input", updateInput);
form.addEventListener("submit", (e) => {
  e.preventDefault();
  currentSearch = searchValue;
  searchPhotos(searchValue);
});

more.addEventListener("click", loadMore);

async function fetchApi(url) {
  const dataFetch = await fetch(url, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: auth,
    },
  });
  const data = await dataFetch.json();
  return data;
}

function updateInput(e) {
  console.log(e.target.value);
  searchValue = e.target.value;
}

async function curatedPhotos() {
  fetchLink = "https://api.pexels.com/v1/curated?per_page=15";
  const data = await fetchApi(fetchLink);
  console.log(data);
  generatePhotos(data);
}

async function searchPhotos(query) {
  clear();
  fetchLink = `https://api.pexels.com/v1/search?query=${query}=&per_page=15`;
  const data = await fetchApi(fetchLink);
  generatePhotos(data);
}

function generatePhotos(data) {
  data.photos.forEach((photo) => {
    const galleryImg = document.createElement("div");
    galleryImg.classList.add("gallery-img");
    galleryImg.innerHTML = `
    <div class="gallery-info">
    <p>${photo.photographer}</p> 
    <a href=${photo.src.original}>Download</a>
    </div>
    <img src=${photo.src.large}></img>
    `;
    gallery.append(galleryImg);
  });
}

function clear() {
  gallery.innerHTML = "";
  searchInput.value = "";
}

async function loadMore() {
  page++;
  if (currentSearch) {
    fetchLink = `https://api.pexels.com/v1/search?query=${currentSearch}=&per_page=15&page=${page}`;
  } else {
    fetchLink = `https://api.pexels.com/v1/curated?per_page=15&page=${page}`;
  }
  const data = await fetchApi(fetchLink);
  generatePhotos(data);
}
curatedPhotos();

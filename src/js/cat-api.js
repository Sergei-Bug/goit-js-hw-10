const API_KEY =
  'live_I9MmbfLfWHUfPtPXLNkdj861OU2YvqZQ9CcuzKMdHBbjXCmyNhSrmVyqHD8872Rh';
export function fetchBreeds() {
  return fetch(`https://api.thecatapi.com/v1/breeds`).then(response =>
    response.json()
  );
}

export function fetchCatByBreed(breedId) {
  return fetch(
    `https://api.thecatapi.com/v1/images/search?api_key=${API_KEY}&breed_ids=${breedId}&has_breeds=1`
  ).then(response => response.json());
}

export function fetchInfoById(breedId) {
  return fetch(
    `https://api.thecatapi.com/v1/images/${breedId}?api_key=${API_KEY}`
  ).then(response => response.json());
}

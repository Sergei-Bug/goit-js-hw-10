import { fetchBreeds, fetchCatByBreed, fetchInfoById } from './js/cat-api';
import SlimSelect from 'slim-select';
import Notiflix from 'notiflix';

const API_KEY =
  'live_I9MmbfLfWHUfPtPXLNkdj861OU2YvqZQ9CcuzKMdHBbjXCmyNhSrmVyqHD8872Rh';

const refs = {
  select: document.querySelector('.breed-select'),
  catInfo: document.querySelector('.cat-info'),
  loader: document.querySelector('.loader'),
};

const textErrorEl = refs.loader.nextElementSibling;

fetchBreeds()
  .then(resp => {
    const arrayOption = resp
      .map(el => `<option value=${el.id}> ${el.name} </option>`)
      .join();

    refs.select.innerHTML = arrayOption;

    const customSelect = new SlimSelect({ select: '#single' });

    refs.loader.classList.add('is-hidden');
    refs.select.classList.remove('is-hidden');
    textErrorEl.classList.add('is-hidden');
  })
  .catch(error => console.warn(error));
refs.select.addEventListener('change', function () {
  textErrorEl.classList.add('is-hidden');

  const breedId = this.value;
  refs.catInfo.innerHTML = '';
  refs.loader.classList.remove('is-hidden');

  fetchCatByBreed(breedId)
    .then(res => {
      res.forEach(element => {
        refs.catInfo.insertAdjacentHTML(
          'beforeend',
          `<img class="photo-cat" src=${element.url}>`
        );

        fetchInfoById(element.id)
          .then(resp => {
            console.log(resp);

            refs.catInfo.insertAdjacentHTML(
              'beforeend',
              `<h1>${resp.breeds[0].name}</h1> 
                <p>${resp.breeds[0].description}</p>
                <p><b>Temperament: </b>${resp.breeds[0].temperament}</p>`
            );
          })
          .catch(err => console.log(err));
      });
    })
    .catch(err => {
      console.warn(err);
      textErroeEl.classList.remove('is-hidden');
      Notiflix.Notify.failure(
        'Oops! Something went wrong! Try reloading the page!'
      );
    })
    .finally(() => {
      refs.loader.classList.add('is-hidden');
    });
});

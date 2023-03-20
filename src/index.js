import './css/styles.css';
import debounce from 'lodash.debounce';
import { fetchCountries } from './fetchCountries';
import Notiflix from 'notiflix';

Notiflix.Notify.init({
  position: 'center-top',
});

const DEBOUNCE_DELAY = 300;

const input = document.querySelector('#search-box');
const list = document.querySelector('.country-list');
const info = document.querySelector('.country-info');

function clearMarkup (ref){
  ref.innerHTML = '';
}

input.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));

function onSearch (e) {
  e.preventDefault();
 searchQuery = input.value.trim();
 if(!searchQuery){
  clearMarkup(list);
  clearMarkup(info);
  return;
 }

 fetchCountries(searchQuery)
 .then(data => {
  if(data.length > 10){
    clearMarkup(list);
    clearMarkup(info);
    Notiflix.Notify.info("Too many matches found. Please enter a more specific name.");
    return ;
 }
 renderMarkup(data);
})
.catch(error => {
  clearMarkup(list);
  clearMarkup(info);
  Notiflix.Notify.failure('Oops, there is no country with that name');
});

function renderMarkup (data) {
if(data.length === 1){
  clearMarkup(list);
  const countryinfoMarkup = infoMarkup(data);
  info.innerHTML = countryinfoMarkup;
} else {
  clearMarkup(info);
  const countrylistMarkup = listMarkup(data);
  list.innerHTML = countrylistMarkup;
}
};

function listMarkup(data) {
  return data.map(({name, flags }) => `<li class="country-list-li"><img src="${flags.svg}" alt="${name.official}" width="60" height="40">${name.official}</li>`
  )
  .join('');
};

function   infoMarkup(data) {
  return data.map(
    ({ name, capital, population, flags, languages }) =>
      `<img src="${flags.svg}" alt="${name.official}" width="200" height="100">
      <h1>${name.official}</h1>
      <p>Capital: ${capital}</p>
      <p>Population: ${population}</p>
      <p>Languages: ${Object.values(languages)}</p>`
  );
}};
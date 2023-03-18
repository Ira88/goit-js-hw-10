import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';
const input = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');
const DEBOUNCE_DELAY = 300;


input.addEventListener('input', debounce(
    onInput, DEBOUNCE_DELAY));

function cleanHtml() {
    countryInfo.innerHTML = '';
    countryList.innerHTML = '';
  }
  function onInput (){
    const trimmedValue = input.value.trim();
    // console.log(trimmedValue)
    
    if (trimmedValue === ''){ 
        cleanHtml();
        return;
    }
       fetchCountries(trimmedValue).then(foundData => {
        if (foundData.length > 10){
            Notiflix.Notify.info(
                'Too many matches found. Please enter a more specific name.'
            );
            return;
        } 
        if(foundData.length >= 2 && foundData.length <= 10){
            renderCountryList(foundData);

        } 
        if (foundData.length === 1){ 
            renderOneCountry(foundData);
        }
        //  if (foundData.length === 0){ 
        //     Notiflix.Notify.failure('Oops, there is no country with that name');
        // } 
        }).catch(error => {
            console.log(error)
            // Notiflix.Notify.failure('Oops, there is no country with that name')
        })
    
  }
  function renderCountryList(countries){
    const markup = countries.map(country => {
        return `<li>
        <img src="${country.flags.svg}" alt="Flag of ${country.name.official}" 
        width="40" hight="30">
        <p>${country.name.official}</p>
        </li>`;
    }).join('');
    countryList.innerHTML = markup;
}
function renderOneCountry(countries){
    const markup = countries.map(country => {
        // console.log(country.languages)
        const lang = Object.values(country.languages).join(', ')
        // console.log(lang)
        return `<li>
        <img src="${country.flags.svg}" alt="Flag of ${country.name.official}" 
        width="40" hight="30">
        <p>${country.name.official}</p>
        <p><b>Capital</b>: ${country.capital}</p>
        <p><b>Population</b>: ${country.population}</p>
        <p><b>Languages</b>:${lang}</p>
        </li>`;
    }).join('');
    countryList.innerHTML = markup;
 }


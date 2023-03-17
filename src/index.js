import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';
const input = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');
const DEBOUNCE_DELAY = 300;
input.addEventListener('input', debounce(e => {
    const trimmedValue = input.value.trim();
    cleanHtml();
    if (trimmedValue !== ''){
       fetchCountries(trimmedValue).then(foundData => {
        if (foundData.length > 10){
            Notiflix.Notify.info(
                'Too many matches found. Please enter a more specific name.'
            );
        } else if(foundData.length === 0){
            Notiflix.Notify.failure('Oops, there is no country with that name');
        } else if(foundData.length >= 2 && foundData.length <= 10){
            renderCountryList(foundData);

        } else if(foundData.length === 1){
            renderOneCountry(foundData);
        }
        });
    }
}, DEBOUNCE_DELAY));
console.log('hello')
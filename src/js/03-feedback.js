import throttle from 'lodash.throttle';

const formEl = document.querySelector('.feedback-form');
const emailEl = document.querySelector('[name=email]');
const textEl = document.querySelector('[name=message]');

const STORAGE_KEY = 'feedback-form-state';
let formData = {};

formEl.addEventListener('submit', onSubmitForm);
formEl.addEventListener('input', throttle(onInputForm, 500));

function onSubmitForm(e) {
  e.preventDefault();
  e.target.reset();
  localStorage.removeItem(STORAGE_KEY);
}

function onInputForm(e) {
  formData[e.target.name] = e.target.value;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

onFilledUpForm();

function onFilledUpForm() {
  const parsedData = JSON.parse(localStorage.getItem(STORAGE_KEY));

  if (!parsedData) return;
  emailEl.value = parsedData.email || '';
  textEl.value = parsedData.message || '';
}

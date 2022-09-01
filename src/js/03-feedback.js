import throttle from 'lodash.throttle';

const formEl = document.querySelector('.feedback-form');

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
  const localData = JSON.parse(localStorage.getItem(STORAGE_KEY));

  if (localData) {
    Object.entries(localData).forEach(([name, value]) => {
      formData[name] = value;
      formEl.elements[name].value = value;
    });
  }
}

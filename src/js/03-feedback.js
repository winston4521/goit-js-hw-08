import throttle from 'lodash.throttle';

const formEl = document.querySelector('.feedback-form');

const STORAGE_KEY = 'feedback-form-state';

formEl.addEventListener('submit', onSubmitForm);
formEl.addEventListener('input', throttle(onInputForm, 500));

function onSubmitForm(e) {
  e.preventDefault();
  e.target.reset();

  localStorage.removeItem(STORAGE_KEY);
}

function onInputForm(e) {
  let localData = localStorage.getItem(STORAGE_KEY);
  localData = localData ? JSON.parse(localData) : {};
}

onFilledUpForm();

function onFilledUpForm() {
  let localData = JSON.parse(localStorage.getItem(STORAGE_KEY));

  if (localData) {
    Object.entries(localData).forEach(([name, value]) => {
      localData[name] = value;
      formEl.elements[name].value = value;
    });
  }
}

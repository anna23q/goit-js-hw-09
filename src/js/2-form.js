const feedbackForm = document.querySelector('.feedback-form');

let formData = {
  email: '',
  message: '',
};
const { email, message } = feedbackForm.elements;

const checkFormData = () => {
  try {
    if (localStorage.length === 0) {
      return;
    }
    const formDataFromLS = JSON.parse(
      localStorage.getItem('feedback-form-state')
    );

    formData = formDataFromLS;

    for (const key in formDataFromLS) {
      feedbackForm.elements[key].value = formDataFromLS[key];
    }
  } catch (err) {
    console.log(err);
  }
};
checkFormData();

const formDataInput = event => {
  formData = { email: email.value, message: message.value };

  localStorage.setItem('feedback-form-state', JSON.stringify(formData));
};

const formDataSubmit = event => {
  event.preventDefault();
  const { currentTarget: formEl } = event;
  console.log({ email: email.value, message: message.value });

  if (email.value === '' || message.value === '') {
    return alert('Fill please all fields');
  }

  formEl.reset();
  localStorage.removeItem('feedback-form-state');
  formData = {};
};

feedbackForm.addEventListener('input', formDataInput);
feedbackForm.addEventListener('submit', formDataSubmit);

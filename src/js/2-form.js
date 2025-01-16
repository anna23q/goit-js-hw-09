const feedbackFormEl = document.querySelector('.feedback-form');

let formData = {
    email: '',
    message: '',
};

const fillFormFields = () => {
    try {
        if (localStorage.length === 0) {
            return;
        }

        const formDataFromLS = JSON.parse(localStorage.getItem('feedback-form-state'));

        formData = formDataFromLS;

        for (const key in formDataFromLS) {
            feedbackFormEl.elements[key].value = formDataFromLS[key];
        };

    } catch (error) {
        console.log(error);
    }
};

fillFormFields();

const onFormFieldInput = event => {
    const formFieldEl = event.target;

    const fieldValue = formFieldEl.value;
    const fieldName = formFieldEl.name;

    formData[fieldName] = fieldValue;

    localStorage.setItem('feedback-form-state', JSON.stringify(formData));
};

const onFeedbackFormSubmit = event => {
    event.preventDefault();

    const { email, message } = formData;

    if (!email || !message) {
        alert('Fill please all fields');
        return;
    } else {
        console.log(formData);
    };

    const { currentTarget: formEl } = event;

    formData = { email: '', message: '' };
    formEl.reset();
    localStorage.removeItem('feedback-form-state');
};

feedbackFormEl.addEventListener('input', onFormFieldInput);
feedbackFormEl.addEventListener('submit', onFeedbackFormSubmit);

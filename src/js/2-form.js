const formEl = document.querySelector('.js-feedback-form');

let formData = { 
    email: "",
    message: "",
}

const fillFormFields = () => {
    try {
        if (localStorage.length === 0) {
            return;
        };

        const formDataFormLS = JSON.parse(localStorage.getItem('feedback-form-state'));

        formData = formDataFormLS;

        for (const key in formDataFormLS) {
            formEl.elements[key].value = formDataFormLS[key];
        }
    } catch (error) {
        console.log(error);
    }
}

fillFormFields();

const onFormFieldInput = event => {
    const { target: formFieldEL } = event;

    const fieldValue = formFieldEL.value;
    const fieldName = formFieldEL.name;

    formData[fieldName] = fieldValue;

    localStorage.setItem("feedback-form-state", JSON.stringify(formData));
}

const onFeedbackFormSubmit = event => {
    event.preventDefault();

    if(formEl.elements.email.value.trim() === "" || formEl.elements.message.value.trim() === "") {
        alert('All form fields must be filled in');
        return;
    }

    localStorage.removeItem("feedback-form-state");
    formEl.reset();
}


formEl.addEventListener('input', onFormFieldInput);
formEl.addEventListener('submit', onFeedbackFormSubmit);

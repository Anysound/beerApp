export const validateForm = () => {
    // всплытие формы
  const btnModal = document.querySelector('#btnModal');
  const modal = document.querySelector('#exampleModal');
  btnModal.addEventListener('click', (evt) => {
    evt.preventDefault();
    modal.style.display = 'block';
  });

  // закрытие формы 
  const form = document.querySelector('#exampleModal');
  form.addEventListener('click', (evt) => {
    if (evt.target === form) {
      form.style.display = 'none';
    }
  });

  const closeBtn = form.querySelector('.close');
  closeBtn.addEventListener('click', () => {
    form.style.display = 'none';
  });

  // валидация формы
  // проверка отдельных полей на валидность
  const phoneContainer = document.querySelector('.form-group .container:first-child');
  const phone = form.querySelector('#inputPhone');

  const setFrownIcon = (icon) => {
    icon.classList.remove('fas', 'fa-pen');
    icon.classList.add('far', 'fa-frown');
  }

  const setSmileIcon = (icon) => {
    icon.classList.remove('far', 'fa-frown');
    icon.classList.add('far', 'fa-smile');
  }

  phone.addEventListener('input', (evt) => {
    evt.preventDefault();
    const icon = phoneContainer.querySelector('i[aria-hidden=true]');
    setFrownIcon(icon);

    if (phone.value.length >= 7) {
      setSmileIcon(icon);
      phone.setAttribute('validated', true);
      checkFields();
    } else {
      icon.classList.remove('far', 'fa-smile')
      setFrownIcon(icon);
      phone.removeAttribute('validated');
      btnSubmit.setAttribute('disabled', true);
    }
  });

  const emailContainer = document.querySelector('.form-group .container:nth-child(2)');
  const email = form.querySelector('#inputEmail');
  email.addEventListener('input', (evt) => {
    evt.preventDefault();
    const icon = emailContainer.querySelector('i[aria-hidden=true]');
    setFrownIcon(icon);

    const regExp = /^[\w-\.]+@[\w-]+\.[a-z]{2,4}$/i;
    const value = email.value;
    const Isvalid = regExp.test(value);
    if (Isvalid) {
      setSmileIcon(icon);
      email.setAttribute('validated', true);
      checkFields()
    } 
    else {
      icon.classList.remove('far', 'fa-smile');
      setFrownIcon(icon);
      email.removeAttribute('validated');
      btnSubmit.setAttribute('disabled', true);
    }
  });

  const passwordContainer = document.querySelector('.form-group .container:nth-child(3)');
  const password = form.querySelector('#inputPassword');

  password.addEventListener('input', (evt) => {
    const icon = passwordContainer.querySelector('i[aria-hidden=true]');
    setFrownIcon(icon);

    if (password.value.length >= 6) {
      setSmileIcon(icon);
      password.setAttribute('validated', true);
      checkFields();
    } else {
      icon.classList.remove('far', 'fa-smile');
      setFrownIcon(icon);
      password.removeAttribute('validated');
      btnSubmit.setAttribute('disabled', true);
    }
  });

  const btnSubmit = form.querySelector('#btnSubmit');
  btnSubmit.setAttribute('disabled', true);

  // проверка формы на валидность
  function checkFields() {
    const inputs = Array.from(form.querySelectorAll('input:not(input[type=submit])'));
    const isValidForm = inputs.every((it) => {
      return it.getAttribute('validated');
    });
    if (isValidForm) {
      btnSubmit.removeAttribute('disabled');
    }
  };
}

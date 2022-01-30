const validateEmail = (inputEmail) => {
  let mailFormat = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  if (inputEmail.match(mailFormat)) {
    return true;
  }
  return false;
};

export default validateEmail;

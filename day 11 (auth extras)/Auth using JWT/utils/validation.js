const checkEmail = (email) => {
  const re = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/;
  return re.test(email);
};

const checkPassword = (password) => {
  // regex for minimum eight characters, atleast one letter and one number
  const re = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  return re.test(password);
};

const checkName = (name) => {
  // check if name has minimum 3 characters
  const re = /^[a-zA-Z0-9]{3,}$/;
  return re.test(name);
};

module.exports = {
  checkEmail,
  checkPassword,
  checkName,
};

// perform check using regular expressions

module.exports.isValidEmail = (email) => {
  const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
};

module.exports.isValidPassword = (password) => {
  const re = /^(?=.*\d).{8,}$/;
  return re.test(password);
};

/**
 * @summary Validate Song data
 * @param {Song} request.body.required - song info
 * @returns {object} 400 - Bad request response
 */

const validateSong = (req, res, next) => {
  const { name, singer } = req.body;

  if (!name || !singer)
    return res.status(400).json({
      status: "error",
      message: "name or singer cannot be empty",
    });

  if (name.length < 3 || singer.length < 3)
    return res.status(400).json({
      status: "error",
      message: "name or singer length cannot be less than 3",
    });

  next();
};

module.exports = validateSong;

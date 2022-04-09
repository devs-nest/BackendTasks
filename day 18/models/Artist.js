const { DataTypes } = require("sequelize");
const sequelize = require("../database/sequelize.js");

const Artist = sequelize.define(
  "Artist",
  {
    Name: {
      field: "Name",
      type: DataTypes.STRING,
      allowNULL: false,
    },
    Nationality: {
      type: DataTypes.STRING,
      allowNULL: false,
    },
    Gender: {
      type: DataTypes.STRING,
      allowNULL: false,
    },
    "Birth Year": {
      type: DataTypes.STRING,
      allowNULL: false,
    },
    "Death Year": {
      type: DataTypes.STRING,
      allowNULL: false,
    },
  },
  {
    freezeTableName: true, // doesn't change table name
    indexes: [
      {
        Name: "Artist_tgm", // indexing table name
        concurrently: true,
        using: "GIN", // algo used for indexing
        fields: ["Name"], // fields to be indexed
        operator: "gin_trgm_ops", // operator used
      },
    ],
  }
);

module.exports = Artist;

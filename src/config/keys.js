console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV === "production") {
  module.exports = require("./prod.js");
} else {
  module.exports = require("./dev.js");
}

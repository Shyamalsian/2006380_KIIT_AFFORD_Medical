const superagent = require("superagent");

const resolver = async (url) => {
  try {
    const { body } = await superagent.get(url);
    return body;
  } catch (err) {
    console.error(err);
  }
};

module.exports = { resolver };

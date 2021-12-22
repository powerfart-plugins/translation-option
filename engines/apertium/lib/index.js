
const { encode } = require('querystring');

const API_ENDPOINT = 'https://apertium.org/apy/translate';

/* eslint-disable object-property-newline */
module.exports = function (text, { from, to }) {
  return fetch(API_ENDPOINT, {
    method: 'POST',
    body: encode({ langpair: `${from}|${to}`, q: text }),
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
  })
    .then(async (res) => {
      const json = await res.json();
      const error = new Error();

      if (res.ok) {
        return json;
      }
      error.code = json.message.toUpperCase().replaceAll(' ', '_');
      error.name = json.explanation;
      throw error;
    })
    .then((res) => ({
      text: res.responseData.translatedText,
      lang: from
    }));
};

const { httpGet } = require('./mock-http-interface');

/**
 * @param {GetArnieQuotesInput} urls
 * @returns {ArnieQuoteResponse}
 */
const getArnieQuotes = async (urls) => {
  return await Promise.all( urls.map(httpGet) ).then( elems => {
    return elems.map( res => {
      try {
        const body = JSON.parse(res.body);
        return {
          [res.status === 200 ? 'Arnie Quote' : 'FAILURE']: body.message 
        }
      }
      catch (err) {
        return { 'FAILURE': 'Your request has been terminated' }
      }
    })
  });
};

module.exports = {
  getArnieQuotes,
};

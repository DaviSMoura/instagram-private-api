require('dotenv').config();
const fs = require('fs');
const { IgApiClient } = require('./dist');
const USERNAME = process.env.IG_USERNAME;
const PASSWORD = process.env.IG_PASSWORD;
console.log(USERNAME);
(async () => {
  const ig = new IgApiClient();
  ig.state.generateDevice(USERNAME);
  let result;
  try {
    if (fs.existsSync('cookies/' + USERNAME + '.json')) {
      let data = fs.readFileSync('cookies/' + USERNAME + '.json', { encoding: 'utf-8' });

      ig.request.setHeaders(JSON.parse(data), USERNAME);

      result = await ig.fbsearch.topSearch('hyd');
      //console.log(result)
    } else {
      console.log('not exists');
      await ig.account.login(USERNAME, PASSWORD);
      let data = ig.request.getDefaultHeaders();
      fs.writeFileSync('cookies/' + USERNAME + '.json', JSON.stringify(data), { encoding: 'utf-8' });
    }
  } catch (e) {
    console.log(ig.request.getDefaultHeaders());
    console.log(e);
  }
  console.log(result);
})();

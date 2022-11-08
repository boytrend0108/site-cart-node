const moment = require('moment');// connect moment library
const fs = require('fs');
const path = require('node:path');
const statsJSON = path.resolve(__dirname, './db/stats.json');// create ablolute link
// const statsJSON = 'C:/Users/Lenovo/YandexDisk/GeekBrains/JS/All_repo_from_JS_class/site-cart2/8.1.project_express_src/dist/server/db/stats.json'
const logger = (name, action) => {
  fs.readFile(statsJSON, 'utf-8', (err, data) => {
    if (err) {
      console.log(err);
    } else {
      const stat = JSON.parse(data);
      stat.push({
        time: moment().format('DD MMM YYYY, h:mm:ss a'),// specify current time
        prod_name: name,
        action: action,
      });
      fs.writeFile(statsJSON, JSON.stringify(stat, null, 4), (err) => {
        if (err) {
          console.log(err);
        }
      });
    }
  })
};
// export logger outside
module.exports = logger;

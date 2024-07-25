const fs = require("node:fs");
const path = require("node:path");

const logsPath = path.join(__dirname, "../json/logs.json");

const GetDate = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1; // שימו לב: חודשים מתחילים מ-0 ב-JavaScript
  const day = today.getDate();
  const hours = today.getHours();
  const minutes = today.getMinutes();
  const seconds = today.getSeconds();

  return `${day}-${month}-${year} ${hours}:${minutes}`;
};

exports.logs = (req, res, next) => {
  const ip = req.rawHeaders[1].split(":")[0];
  const date = GetDate();

  fs.readFile(logsPath, (err, data) => {
    const arrLogs = err ? [] : JSON.parse(data);
    const newLog = {
      [ip]: date,
    };
    arrLogs.push(newLog);
    console.log(arrLogs);
    fs.writeFile(logsPath, JSON.stringify(arrLogs), (err) => {
      if (err) throw err;
      console.log("The file has been saved!");
    });
  });

  next();
};

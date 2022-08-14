const fs = require('fs');
const path = require('path');

const directory = 'src';

let files = [];

const getFilesRecursively = directory => {
  const filesInDirectory = fs.readdirSync(directory);
  for (const file of filesInDirectory) {
    const absolute = path.join(directory, file);
    if (fs.statSync(absolute).isDirectory()) {
      getFilesRecursively(absolute);
    } else {
      files.push(absolute);
    }
  }
};
getFilesRecursively(directory);
for (const file of files) {
  console.log(file);
  if (file.includes('.js')) {
    fs.unlink(file, err => {
      if (err) throw err;
    });
  } else {
    console.log('no');
  }
}

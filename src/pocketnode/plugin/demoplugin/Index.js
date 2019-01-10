const FileSystem = require("fs");
const Path = require("path");

const Lang = {};

FileSystem.readdirSync(__dirname + "/lang/").forEach(file => {
  if(Path.extname(file) !== ".json") return;
  
  let name = path.basename(file, ".json");
  
  Lang[name] = require(__dirname + "/lang/" + file);
});

module.exports = Lang;

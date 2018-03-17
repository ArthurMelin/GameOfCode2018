const convert = require('xml-js');
const fs = require('fs');

var stfu = './inputs/autopedestres/';

var files = fs.readdirSync(stfu);

for (var i = 0; i < files.length; i++)
{
    var name = files[i];
    var xml = fs.readFileSync(stfu + name);
    var res = convert.xml2json(xml, {compact: false, spaces: 4});
    var newfile = name.substr(0, name.length - 4);
    newfile += ".json";
    fs.createWriteStream("./json/" + newfile);
    fs.writeFileSync("./json/" + newfile, res);
}

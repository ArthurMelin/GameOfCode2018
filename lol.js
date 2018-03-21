const convert = require('xml-js');
const fs = require('fs');

distanceBetween = function(lat1, lon1, lat2, lon2) {
  var lat = [lat1, lat2]
  var lng = [lon1, lon2]
  var R = 6378137;
  var dLat = (lat[1]-lat[0]) * Math.PI / 180;
  var dLng = (lng[1]-lng[0]) * Math.PI / 180;
  var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
  Math.cos(lat[0] * Math.PI / 180 ) * Math.cos(lat[1] * Math.PI / 180 ) *
  Math.sin(dLng/2) * Math.sin(dLng/2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  var d = R * c;
  return Math.round(d);
}

var stfu = './inputs/autopedestres/';

var files = fs.readdirSync(stfu);

for (var i = 0; i < files.length; i++)
{
    var name = files[i];
    var xml = fs.readFileSync(stfu + name);
    var res = convert.xml2json(xml, {compact: false, spaces: 4});
    var newfile = name.substr(0, name.length - 4);
    newfile += ".json";
    console.log(newfile)
    try {
    fs.createWriteStream("./json/" + newfile);
    res_json = JSON.parse(res)
    better_res_json = {
        time: res_json.elements[0].elements[0].elements[0].elements[0].text,
        name: res_json.elements[0].elements[1].elements[0].elements[0].text,
        steps: [],
        distance: 0.0
    }
    old_lat = 4242.0
    old_lon = 4242.0
    for (var j = 0; j < res_json.elements[0].elements[1].elements[1].elements.length; j++) {
        latitude = parseFloat(res_json.elements[0].elements[1].elements[1].elements[j].attributes.lat)
        longitude =  parseFloat(res_json.elements[0].elements[1].elements[1].elements[j].attributes.lon)
        better_res_json.steps.push({
		"latitude": latitude,
		"longitude": longitude,
        })
        if (old_lat != 4242.0)
            better_res_json.distance += distanceBetween(old_lat, old_lon, latitude, longitude)
        old_lat = latitude
        old_lon = longitude
    }
    better_res_json.distance /= 1000
    better_res = JSON.stringify(better_res_json, undefined, 2)
    fs.writeFileSync("./json/" + newfile, better_res);
    } catch (err) {
    	    console.log(err)
    	    continue
    }
}

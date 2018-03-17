var map;
var data;
var trails = [];

const TRAILS_CATEGORIES = [ 5, 10, 15, 20, 30 ];

function initTrails(_data) {
	data = _data;

	for (var i = 0; TRAILS_CATEGORIES.length + 1; i++)
		trails.push([]);

	for (var i = 0; data.length; i++) {
		var cat;
		for (cat = 0; cat < TRAILS_CATEGORIES.length; cat++) {
			if (data[i].distance < TRAILS_CATEGORIES[cat]) {
				break;
			}
		}

		points = []
		for (var j = 0; j < data[i].steps.length; j++) {
			points.push({
				lat: data[i].steps[j].latitude,
				lng: data[i].steps[j].longitude,
			});
		}

		trails[cat].push(new google.maps.Polyline({
			path: points,
			geodesic: true,
			strokeColor: '#ee0000',
			strokeOpacity: 1.0,
			strokeWeight: 2
		}));
	}
}

function drawTrails(cat) {
	for (var i = 0; i < trails.length; i++) {
		map_set = cat == -1 || cat == i ? map : null;
		for (var j = 0; j < trails[i].length; j++) {
			trails[i][j].setMap(map_set);
		}
	}
}

function initMap() {
	map = new google.maps.Map(document.getElementById('map'), {
		zoom: 10,
		minZoom: 10,
		center: new google.maps.LatLng(49.6, 6.116667),
		mapTypeId: google.maps.MapTypeId.HYBRID,
		streetViewControl: false,
		styles: [
			{
				featureType: 'road',
				stylers: [
					{
						visibility: 'off'
					}
				]
			}
		]
	});
}

function initUI() {
	$('.button-collapse').sideNav();
	$('.modal').modal();

	filters = $('.length-filters li');
	filters[0].click(function() {
		drawTrails(-1);
	});

	for (var i = 0; i < TRAILS_CATEGORIES.length + 1; i++) {
		console.log(i);
		filters[i + 1].click(function() {
			drawTrails(i);
		});
	}

	$('.about a').click(function() {
		$('#modal-about').modal('open');
	});

	Materialize.toast('Loading trails data...');

	$.ajax({
		datatype: 'json',
		type: 'GET',
		url: 'json/trails.json',
		success: (function(data) {
			$('.toast').first()[0].M_Toast.remove();
			initTrails(data);
			drawTrails(-1);
		}),
		error: (function(what, status, error) {
			$('.toast').first()[0].M_Toast.remove();
			Materialize.toast('Failed to load trails data', 5000);
		})
	});
}

$(document).ready(function() {
	initUI();
});

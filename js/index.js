var map;
var trails = [];

const TRAILS_CATEGORIES = [ 5, 10, 15, 20, 30 ];
const TRAILS_CATEGORIES_COLORS = [
	'#00e600', '#1a8fb2', '#e5de10', 'ed6b21', '#ed2020', '#760687' ];


function initTrails(data) {
	for (var i = 0; i < TRAILS_CATEGORIES.length + 1; i++)
		trails.push([]);

	for (var i = 0; i < data.length; i++) {
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
				lng: data[i].steps[j].longitude
			});
		}

		trail = new google.maps.Polyline({
			path: points,
			geodesic: true,
			strokeColor: TRAILS_CATEGORIES_COLORS[cat],
			strokeOpacity: 1.0,
			strokeWeight: 2
		});

		const trailData = data[i];
		trail.addListener('click', function() {
			var modal_html = '<h4>' + trailData.name + '</h4>'
				+ '<p>Length: ' + trailData.distance.toFixed(1) + 'km</p>';

			var modal = $('#modal-trail-info');
			var content = modal.find('.modal-content');
			content.empty();
			content.append(modal_html);
			modal.modal('open');
		});

		trails[cat].push(trail);
	}
}

function drawTrails(cat) {
	for (var i = 0; i < trails.length; i++) {
		map_set = cat == -1 || cat == i ? map : null;
		for (var j = 0; j < trails[i].length; j++) {
			trails[i][j].setMap(map_set);
		}
	}

	filters = $('.length-filters li');
	filters.each(function() {
		$(this).removeClass('active');
	});
	$(filters[cat + 1]).addClass('active');
}

function initMap() {
	map = new google.maps.Map(document.getElementById('map'), {
		zoom: 10,
		minZoom: 10,
		center: new google.maps.LatLng(49.80, 6.1),
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

	filters = $('.length-filters li a');
	$(filters[0]).click(function() {
		drawTrails(-1);
	});

	for (var i = 0; i < TRAILS_CATEGORIES.length + 1; i++) {
		const _i = i;
		$(filters[i + 1]).click(function() {
			drawTrails(_i);
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
		error: (function(req, status, error) {
			$('.toast').first()[0].M_Toast.remove();
			Materialize.toast('Failed to load trails data', 5000);
			console.error(error)
		})
	});
}

$(document).ready(function() {
	initUI();
});

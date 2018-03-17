var map;

function initMap() {
	map = new google.maps.Map(document.getElementById("map"), {
		zoom: 10,
		center: new google.maps.LatLng(49.6, 6.116667),
		mapTypeId: google.maps.MapTypeId.HYBRID
	});
}

function initUI() {
	$(".button-collapse").sideNav();
}

$(document).ready(function() {
	initUI();
});

var map;

function initMap() {
	map = new google.maps.Map(document.getElementById("map"), {
		zoom: 10,
		minZoom: 10,
		center: new google.maps.LatLng(49.6, 6.116667),
		mapTypeId: google.maps.MapTypeId.HYBRID,
		streetViewControl: false,
		styles: [
			{
				featureType: "road",
				stylers: [
					{
						visibility: "off"
					}
				]
			}
		]
	});
}

function initUI() {
	$(".button-collapse").sideNav();
	$(".modal").modal();

	if (navigator.geolocation) {
		$(".locate").removeClass("hide");
		$(".locate a").click(function() {
			navigator.geolocation.getCurrentPosition(function(position) {
				var pos = {
						lat: position.coords.latitude,
						lng: position.coords.longitude
					};

				map.panTo(pos);
				map.setZoom(15);
			}, function() {
				alert("Location unavailable");
			});
		});
	}

	$(".about a").click(function() {
		$("#modal-about").modal("open");
	});
}

$(document).ready(function() {
	initUI();
});

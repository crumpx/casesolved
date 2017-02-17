
	function onReady(callback) {
		var intervalID = window.setInterval(checkReady, 1000);

		function checkReady() {
				if (document.getElementsByTagName('body')[0] !== undefined) {
						window.clearInterval(intervalID);
						callback.call(this);
				}
		}
	}

	function show(id, value) {
			document.getElementById(id).style.display = value ? 'block' : 'none';
	}

	onReady(function () {
			show('container', true);
			show('loading', false);

	});

	$(document).ready(function(){
		if ($(window).width() < 768) {
			$(document).on('click', function (e) {
				if ($(e.target).closest("#nav-menu").length === 1 || 
						$(e.target).closest(".toggle-menu").length === 1){
		
							$(".nav-menu").slideToggle();
						} else if ($('.nav-menu').css('display') === 'block') {
							$(".nav-menu").slideToggle();	        		
						}
			});
		}

		if ($(window).width() >= 768) {
			$('footer').css('display','block');
		}



		$(window).scroll(function() {
			if ($('.navbar').offset().top > $('.navbar').height()) {
				$('.navbar').css('background-color','#333');
				$('a .navbar-brand').css('color', '#fff');
				$('.nav-menu').css('background', '#333');
				$('.nav-menu a').css('color', '#fff');
				$('.back-button a').css('color', '#fff');
				if ($(window).width()<=1023) {							
					$('.toggle-menu').css('color', '#fff');
				} 			
			} else {
				$('.navbar').css('background-color','#fff');
				$('a .navbar-brand').css('color', '#000');
				$('.nav-menu').css('background', '#fff');
				$('.nav-menu a').css('color', '#777');
				$('.back-button a').css('color', '#777');
				$('.nav-menu a:nth-last-of-type(-n+2)').css('color', '#fff');
				if ($(window).width()<=1023) {							
					$('.toggle-menu').css('color', '#777');
				} 
			}
		});


		$(document).on('click', 'a', function(event){
			var path = window.location.pathname;
			console.log(window.location);
			if (path === '/') {
				if (this.href.indexOf('#') !== -1) {
					$('html, body').animate({
							scrollTop: $( $.attr(this, 'href') ).offset().top -20
					}, 500);
				}
			} else if(path === '/blog' && this.href.indexOf('#') !== -1) {
				this.href = window.location.origin;	
			}
});

		$(document).scroll(function () {
			var y = $(this).scrollTop();
			var wHeight = $(window).height();
			var dHeight = $(document).height();
			if ( y >= dHeight - wHeight - 200 ) {
				$('footer').fadeIn();
			} else {
				$('footer').fadeOut();
			}
		});

function map_init() {
		var storeLocation = new google.maps.LatLng(40.7741313,-73.9092129,18);
		var mapOptions = {
				zoom: 16,
				center: storeLocation,
				mapTypeId: google.maps.MapTypeId.map
		};
		var map = new google.maps.Map(document.getElementById('store-map'), mapOptions);

		 //=====Initialise Default Marker    
		var marker = new google.maps.Marker({
				position: storeLocation,
				map: map,
				title: 'Case Solved'
		 //=====You can even customize the icons here
		});

		 //=====Initialise InfoWindow
		var infowindow = new google.maps.InfoWindow({
			content: '{% include landing/map-marker.html %}'
	 });

	 //=====Eventlistener for InfoWindow
	google.maps.event.addListener(marker, 'click', function() {
		infowindow.open(map,marker);
	});
}

google.maps.event.addDomListener(window, 'load', map_init);

});


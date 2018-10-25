var chevron = '<svg version="1.1" width="18" height="12" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve"><path class="chevron" stroke="none" fill="rgba(0,0,0,0.2)" d="M 14.21,10.57 L 8.93,5.28 3.64,10.57 1,7.93 8.93,0 16.85,7.93 14.21,10.57 Z M 14.21,10.57" /></svg>';

$(document).ready(function(){

	// Detect touchscreen and add 'touchable' class to body
	var is_touch_device = 'ontouchstart' in document.documentElement;
	if (is_touch_device) {
    	$('body').addClass('touchable');
    }
    
    // Add 'back to top' links where specified
    $('.link2top').append($('<a href="#top" class="back2top">' +chevron+ '</a>'));
    //<span class="glyphicon glyphicon-chevron-up"></span>

	// Add 'smooth scrolling' to anchor links
    $('a[href^="#"]').bind('click.smoothscroll',function (e) {
        e.preventDefault();
      
        var target = this.hash, $target = $(target);
        
        var speed = 1000;
        if (this.hash === '#top') {
        	speed = $(this).offset().top / 3;
        } else {
	        speed = $target.offset().top / 2;
        }
      
        $('html, body').stop().animate({
            'scrollTop': $target.offset().top
        }, speed, function () {
            var baseUrl = window.location.href.split('#')[0];
            window.location.replace( baseUrl + target );
        });
    });
    
    // Build the image galleries
	$(".image-links li").click(function(){
	
		// get parent list
		var ul = $(this).parent();
		
		// get index in list + properties
		var index = ul.children('li').index(this);
		var needsRotate = $(this).data("od-rotate");
		var newUrl = $(this).data("od-url");
		
		// get related elements
		var iphone = $("#" + ul.data("od-id"));
		var img = iphone.children("img");
		var captionUl = ul.siblings('.image-captions');
		var captionLi = $(captionUl.children('li').get(index));
		
		// update the 'active' list items
		ul.children(".active").removeClass("active");
		$(this).addClass("active");
		captionUl.children(".active").removeClass("active");
		captionLi.addClass("active");
		
		// if current img matches newImg already, there's nothing for us to do
		if (newUrl === img.attr("src")) { return; }
		
		// otherwise, build the new img with alt tag from captions
		var newImg = $('<img src='+newUrl+' />').css('opacity',0);
		newImg.attr('alt', captionLi.text());
		
		// build and insert loading spinner
		var spinner = $('<div class="spinner" />');
		img.after(spinner);
		spinner.after(newImg);
		
		// once image loads, set opacity to trigger css transition
		// transition animation duration is 200ms
		newImg.load(function() {
		    newImg.css('opacity',1);
		    
		    // also add/remove 'rotate' class to rotate the screenshot
		    if (needsRotate) {
			    iphone.addClass("rotate");
		    } else {
			    iphone.removeClass("rotate");
		    }
		    
		    // remove spinner, but AFTER animations finish
			function removeImg() {
			    spinner.remove();
			    img.remove();
			}
		    setTimeout(removeImg, 250); 
		});
	}); // end image-links


});	

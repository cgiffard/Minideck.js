// Basic interaction for slides

;(function() {
	var slideAdvanceKeys = [13,32,38,39];
	var slideReverseKeys = [37,40];
	var handlersAttached = false;
	var currentSlide = 0;
	var slides = [];
	var changing = false;

	var inArray = function(check,array) {
		return array.reduce(function(prev,current) {
			return prev || current === check;
		},false);
	};

	var attachHandlers = function() {
		document.addEventListener("keyup",function(eventData) {
			if (inArray(eventData.keyCode,slideAdvanceKeys)) {
				nextSlideAction();
			} else if (inArray(eventData.keyCode,slideReverseKeys)) {
				prevSlide();
			} else if (eventData.keyCode === 71) {
				jumpToSlide(parseInt(prompt("Slide?"),10)-1);
			}
		},false);

		window.addEventListener("hashchange",function(eventData) {
			if (!changing) {
				jumpToSlide(parseInt(window.location.hash.substr(1),10)-1);
			}
		})

		handlersAttached = true;
	};

	var scanSlides = function() {
		var unprocessedSlides =
			[].slice.call(document.querySelectorAll("section.slide"),0);
		
		unprocessedSlides.forEach(function(item) {
			var animationItems = [].slice.call(item.querySelectorAll("[order]"),0);
			animationItems.forEach(function(animationItem) {
				animationItem.className += " hidden";
				animationItem.autoHide = !!animationItem.hasAttribute("autohide");
				animationItem.show = function() {
					animationItem.className = animationItem.className.replace(/\s+hidden/ig,"");
					animationItem.className += " visible";
				};
				animationItem.hide = function() {
					animationItem.className = animationItem.className.replace(/\s+visible/ig,"");
					animationItem.className += " hidden autohidden";
				};
			});

			slides.push({
				"title": item.getAttribute("title"),
				"node": item,
				"animationItems": animationItems,
				"slideAnimationsComplete": 0,
				"hide": function() {
					// Using classes, not styles, so all show/hide style/animation
					// can be set via css
					item.className = item.className.replace(/\s+visible/ig,"");
				},
				"show": function() {
					item.className += " visible";
				}
			});
		});
	};

	var jumpToSlide = function(slideIndex) {
		console.log("Jump to slide %d?",slideIndex);
		slideIndex = slideIndex < 0 ? 0 : slideIndex;
		slideIndex = slideIndex > slides.length - 1 ? slides.length - 1 : slideIndex;
		if (slides[slideIndex] && slideIndex != currentSlide) {
			changing = true;
			window.location.hash = slideIndex+1;
			slides[currentSlide].hide();
			slides[slideIndex].show();
			currentSlide = slideIndex;

			window.setTimeout(function() {
				changing = false;
			},100);
		}
	};

	var prevSlide = function() {
		jumpToSlide(currentSlide-1);
	};

	var nextSlideAction = function() {
		if (slides[currentSlide].slideAnimationsComplete < slides[currentSlide].animationItems.length) {
			if (slides[currentSlide].animationItems[slides[currentSlide].slideAnimationsComplete-1] &&
				slides[currentSlide].animationItems[slides[currentSlide].slideAnimationsComplete-1].autoHide) {
				
				slides[currentSlide].animationItems[slides[currentSlide].slideAnimationsComplete-1].hide();
			}

			slides[currentSlide].animationItems[slides[currentSlide].slideAnimationsComplete].show();
			slides[currentSlide].slideAnimationsComplete ++;
		} else {
			jumpToSlide(currentSlide+1);
		}
	};

	document.addEventListener("readystatechange",function(eventData) {
		if ((document.readyState === "interactive" || document.readyState === "complete")
				&& !handlersAttached) {
			scanSlides();
			attachHandlers();

			if (parseInt(window.location.hash.substr(1),10) > 0) {
				jumpToSlide(parseInt(window.location.hash.substr(1),10)-1);
			}
		}
	},false);
})()
import $ from 'jquery';
import waypoints from '../../../../node_modules/waypoints/lib/noframework.waypoints';
import smoothScroll from 'jquery-smooth-scroll';

class StickyHeader {
	constructor() {
		this.lazyImages = $('.lazyload');
		// Grab any elements with a class of site-header
		// and create a collection in this.siteHeader
		this.siteHeader = $('.site-header');

		this.headerTriggerElement = $('.large-hero__title');
		this.pageSections = $('.page-section');
		this.headerLinks = $('.primary-nav a');
		this.createHeaderWaypoint();
		this.createPageSectionWaypoints();
		this.addSmoothScrolling();
		this.refreshWaypoints();
	}

	refreshWaypoints() {
		// First argument is the event you want to be on the lookout for
		this.lazyImages.on('load', function() {
			// Refreshes all waypoints in the browser's memory (including the ROS.js file)
			Waypoint.refreshAll();
		});
	}

	addSmoothScrolling() {
		this.headerLinks.smoothScroll({ speed: 1300 });
	}

	createHeaderWaypoint() {
		// Ensure that within the new Waypoint, 'this' still refers to the StickyHeader class
		var that = this;

		new Waypoint({
			/*
        Which element on the page should be the trigger?
        Waypoint expects a native DOM element instead of a jQuery object,
        so you have to add the [0]. The first item in a jQuery array-like object
        is a pointer to the native DOM element.
      */
			element: this.headerTriggerElement[0],
			// What needs to happen when the title element gets scrolled to?
			handler: function(direction) {
				if (direction == 'down') {
					that.siteHeader.addClass('site-header--dark');
				} else {
					that.siteHeader.removeClass('site-header--dark');
					that.headerLinks.removeClass('is-current-link');
				}
			}
		});
	}

	createPageSectionWaypoints() {
		var that = this;
		// Loop through the collection with each().
		this.pageSections.each(function() {
			/*
        Within the each method, jQuery sets the JS this keyword to point
        towards the DOM element of the pageSections collection that is currently
        looped to.
      */
			var currentPageSection = this;
			new Waypoint({
				element: currentPageSection,
				// What needs to happen when a page section gets scrolled to.
				handler: function(direction) {
					if (direction == 'down') {
						// Goal: Extract and use the custom data attribute in the HTML as a jQuery selector to target the matching header link to be able to give it a modifier class
						// The new variable matchingHeaderLink shoud equal the string value of the HTML attribute
						var matchingHeaderLink = currentPageSection.getAttribute(
							'data-matching-link'
						);

						// Remove the is-current-link CSS modified class so that at first nothing is higlighted
						that.headerLinks.removeClass('is-current-link');

						// Now use the variable as a jQuery selector
						// For example, when the #features-link is looped through, that is what the var matchingHeaderLink will be
						$(matchingHeaderLink).addClass('is-current-link');
					}
				},
				offset: '18%'
			});

			new Waypoint({
				element: currentPageSection,
				// What needs to happen when a page section gets scrolled to.
				handler: function(direction) {
					if (direction == 'up') {
						var matchingHeaderLink = currentPageSection.getAttribute(
							'data-matching-link'
						);
						that.headerLinks.removeClass('is-current-link');
						$(matchingHeaderLink).addClass('is-current-link');
					}
				},
				offset: '-40%'
			});
		});
	}
}

export default StickyHeader;

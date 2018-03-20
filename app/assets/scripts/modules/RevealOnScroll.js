import $ from 'jquery';
import waypoints from '../../../../node_modules/waypoints/lib/noframework.waypoints';

class RevealOnScroll {
	constructor(els, offset) {
		// Point to the DOM elements that should be revealed.
		this.itemsToReveal = els;
		this.offsetPercentage = offset;

		// Run the methods as soon as the page loads.
		this.hideInitially();
		this.createWaypoints();
	}

	hideInitially() {
		this.itemsToReveal.addClass('reveal-item');
	}

	createWaypoints() {
		/*
      Set a var equal to the class RevealOnScroll. Otherwise, in new Waypoint() the this keyword in this.offsetPercentage points to the Waypoint object and will not run. Instead, set this.offsetPercentage to that.offsetPercentage.
    */
		var that = this;
		this.itemsToReveal.each(function() {
			/*
        Here, the this keyword still points to the DOM object that you need.
        It points to each new element with a class of feature-item in the collection of this.itemsToReveal
      */

			var currentItem = this;

			// Create a waypoint for each item in the collection of feature-items.
			new Waypoint({
				/*
          Each waypoint object needs two properties.
          element: The DOM element that you want to watch for when you scroll down the page.
          handler: What needs to happen when the element is scrolled to.
        */

				element: currentItem,
				handler: function() {
					$(currentItem).addClass('reveal-item--is-visible');
				},
				offset: that.offsetPercentage
			});
		});
	}
}

export default RevealOnScroll;

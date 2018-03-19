import $ from 'jquery';

class MobileMenu {
	constructor() {
		this.siteHeader = $('.site-header');
		// So you	can reuse it instead of having to write $("") everytime you want to select the icon.
		this.menuIcon = $('.site-header__menu-icon');
		this.menuContent = $('.site-header__menu-content');
		this.events(); // To call the events function immediately when the constructor is run.
	}

	events() {
		// Create a separate function to listen to certain events, i.e. the event handler.
		this.menuIcon.click(this.toggleTheMenu.bind(this));
	}

	// Create a separate function for what needs to happen the item is clicked.
	toggleTheMenu() {
		this.menuContent.toggleClass('site-header__menu-content--is-visible');
		this.siteHeader.toggleClass('site-header--is-expanded');
	}
}

export default MobileMenu;

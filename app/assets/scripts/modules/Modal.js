import $ from 'jquery';

class Modal {
	constructor() {
		this.openModalButton = $('.open-modal');
		this.modal = $('.modal');
		this.closeModalButton = $('.modal__close');
		this.events();
	}

	events() {
		// clicking the open modal button
		this.openModalButton.click(this.openModal.bind(this));
		// clicking the x close modal button
		this.closeModalButton.click(this.closeModal.bind(this));
		// pushes the escape key
		$(document).keyup(this.keyPressHandler.bind(this));
	}

	keyPressHandler(e) {
		// Initialize the key from event.key if it has a value that is not undefined. If it is undefined, look for keyCode.
		let key = e.key || e.keyCode;

		//Check for the new KeyboardEvent.code for browsers that use this new attribute or the old keyCode for browsers that do not yet support key or code.
		if (key === 'Escape' || key === 'Esc' || key === 27) {
			this.closeModal();
		}
	}

	openModal() {
		this.modal.addClass('modal--is-visible');

		// prevent the browser from automatically scrolling to the top
		return false;
	}

	closeModal() {
		this.modal.removeClass('modal--is-visible');
	}
}

export default Modal;

import $ from 'jquery';
import MobileMenu from './modules/MobileMenu';
import RevealOnScroll from './modules/RevealOnScroll';
import StickyHeader from './modules/StickyHeader';
import Modal from './modules/Modal';

var mobileMenu = new MobileMenu();

/*
The first argument is which DOM elements should be selected to use the ROS class. The second argument is the offset that you want to pass along.
*/
new RevealOnScroll($('.feature-item'), '85%');
new RevealOnScroll($('.testimonial'), '60%');

var stickyHeader = new StickyHeader();
var modal = new Modal();

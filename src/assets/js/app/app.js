// dpendencies
import '../../../node_modules/bootstrap/dist/js/bootstrap.min.js';

// components
import contactList from './components/contactList';
import newContact from './components/newContact';

// styles
import '../../styles/main.scss';

/**
 * When document ready, contact list and ne contact componets are rendered
 */
$(document).ready(() => {
	contactList.render();
	newContact.render();
});


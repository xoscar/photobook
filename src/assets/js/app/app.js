// dpendencies
import '../../../node_modules/bootstrap/dist/js/bootstrap.min.js';

// components
import contactList from './components/contactList';
import newContact from './components/newContact';

// styles
import '../../styles/main.scss';

$(document).ready(() => {
	contactList.render();
	newContact.render();
});


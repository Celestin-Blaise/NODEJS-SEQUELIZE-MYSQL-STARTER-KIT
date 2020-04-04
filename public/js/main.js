const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

const refQuery = urlParams.get('id');
const nameQuery = urlParams.get('name');

console.log(refQuery, nameQuery);

const addNotesForm = document.forms.addNotes;

const addNotesBtn = document.querySelector('#addNotesBtn');

addNotesBtn.addEventListener('click', () => {
	addNotesForm.ref.value = refQuery;
	addNotesForm.name.value = nameQuery;
});

$(window).ready(function() {
	$('.preloader-wrapper').fadeOut();
	$('body').removeClass('preloader-site');
});

var Body = document.querySelector('.preloader-wrapper');
Body.style.display = 'block';

addNotesForm.addEventListener('submit', e => {
	e.preventDefault();
	const refValue = addNotesForm.ref.value;
	const nameValue = addNotesForm.name.value;
	const contentValue = addNotesForm.content.value;

	$.ajax({
		type: 'POST',
		url: 'http://localhost:5000/add',
		data: {
			id: refValue,
			name: nameValue,
			content: contentValue
		},
		success: function(res) {
			console.log(res);
			var Body = document.querySelector('.preloader-wrapper');
			Body.style.display = 'block';

			setTimeout(() => {
				location.reload();
			}, 1500);
		},
		error: function(err) {
			console.log(err);
		}
	});
	console.log('**********', refValue, contentValue, '**************');
});

const editNotesForm = document.forms.editNotes;

editNotesForm.addEventListener('submit', e => {
	e.preventDefault();
	const refValue = editNotesForm.ref.value;
	const nameValue = editNotesForm.name.value;
	const contentValue = editNotesForm.content1.value;
	$.ajax({
		type: 'POST',
		url: 'http://localhost:5000/update',
		data: {
			id: refValue,
			name: nameValue,
			content: contentValue
		},
		success: function(res) {
			console.log(res);
			var Body = document.querySelector('.preloader-wrapper');
			Body.style.display = 'block';

			setTimeout(() => {
				location.reload();
			}, 1000);
		},
		error: function(err) {
			console.log(err);
		}
	});
	console.log('**********', refValue, contentValue, '**************');
});

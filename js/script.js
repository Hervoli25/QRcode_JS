const form = document.getElementById('generate-form');
const qr = document.getElementById('qrcode');

//Event Handler for the form submission
const onGenerateSubmit = (e) => {
	e.preventDefault();
	//Calling the clearUI function to clear the QR Code
	clearUI();
	const url = document.getElementById('url').value;
	const size = document.getElementById('size').value;
	//Validation for the URL input field
	if (url === '') {
		alert('Please enter a URL');
		return;
	} else {
		showSpinner();

		setTimeout(() => {
			hideSpinner();
			generateQRCode(url, size);

			setTimeout(() => {
				const saveUrl = qr.querySelector('img').src;

				saveQRCode(saveUrl);
			}, 50);
		}, 2000);
	}
};

//QR Code Generator Logic/Library

const generateQRCode = (url, size) => {
	const qrcode = new QRCode(document.getElementById('qrcode'), {
		text: url,
		width: size,
		height: size,
		colorDark: '#000000',
		colorLight: '#ffffff',
		correctLevel: QRCode.CorrectLevel.H,
	});
};

//Show the spinner when the form is submitted
const showSpinner = () => {
	document.getElementById('spinner').style.display = 'block';
};

//Hide the spinner after 2 seconds
const hideSpinner = () => {
	document.getElementById('spinner').style.display = 'none';
};

//Clear the QR Code when the form is reset

const clearUI = () => {
	qr.innerHTML = '';
	const saveLink = document.getElementById('save-link');
	if (saveLink) {
		saveLink.remove();
	}
};

//Create The Save QR Code Button

const saveQRCode = (saveUrl) => {
	const link = document.createElement('a');
	link.id = 'save-link';
	link.classList =
		'bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded w-1/3 m-auto my-5';
	link.href = saveUrl;
	link.download = 'qrcode';
	link.innerHTML = 'Save QR Code';
	document.getElementById('generated').appendChild(link);

	link.addEventListener('click', () => {
		setTimeout(() => {
			swal('QR Code Saved Successfully');
		}, 50);
	});
};

//Calling the functions for the spinner
hideSpinner();

//Event Listeners for the form submission
form.addEventListener('submit', onGenerateSubmit);

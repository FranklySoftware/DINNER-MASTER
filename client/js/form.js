
function registerGuest() {
	var _this = this;

	_this.errorMsg = $('#form-error-msg');

	var name = $("#name").val().trim();
	var email = $("#email").val().trim();
	var company = $("#company").val().trim();
	var title = $("#job-title").val().trim();
	var linkedIn = $("#linkedinHTML").val().trim();
	var twitter = $("#twitter").val().trim();
	var defaultCopy = $("#defaultCopy").val().trim();
	//var linkedInCompany = $("#linkedin-company").val();
	//var twitterCompany = $("#twitter-company").val();

	var error = false;
	var errorMsg = "Please enter valid ";
	var re = /^$/;
	if (re.test(linkedIn) && re.test(twitter) && re.test(defaultCopy)){
		errorMsg += "LinkedIn HTML, Twitter handle or default copy";
		error = true;
	}
	re = /^[a-zA-Z +()0-9-]+$/;
    if (re.test(name)) {
    } else {
			if (error) {
				errorMsg += ", ";
			}
		errorMsg += "Name";
		error = true;
    }

		re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
		if(re.test(email)) {
		} else {
			if (error) {
				errorMsg += ", ";
			}
			errorMsg += "Email";
			error = true;
		}

		re = /^$|^[a-zA-Z +()0-9-]+$/;
    if (re.test(company)) {
    } else {
		if (error) {
			errorMsg += ", ";
		}
    errorMsg += "Company";
		error = true;
    }


	re = /^$|^[a-zA-Z +()0-9-]+$/;
	if (re.test(title)) {
	} else {
	if (error) {
		errorMsg += ", ";
	}
	errorMsg += "Job title";
	error = true;
	}


	//re = /^$|^((http[s]?|ftp):\/)?\/?([^:\/\s]+)((\/\w+)*\/)([\w\-\.]+[^#?\s]+)(.*)?(#[\w\-]+)?$/;
	re = /^$/;
	if (re.test(linkedIn)) {
		if (error) {
			errorMsg += ", ";
		}
		errorMsg += "LinkedIn HTML";
		error = true;

	} else {
	}

	/*if (re.test(linkedInCompany)) {
	} else {
	if (error) {
		errorMsg += ", ";
	}
			errorMsg += "Company LinkedIn URL";
	error = true;
}*/

	re = /^$|^[a-zA-Z +()0-9-_]+$/;
	if (re.test(twitter)) {
	} else {
	if (error) {
		errorMsg += ", ";
	}
			errorMsg += "Twitter handle";
	error = true;
	}

	/*if (re.test(twitterCompany)) {
	} else {
	if (error) {
		errorMsg += ", ";
	}
			errorMsg += "Company Twitter handle";
	error = true;
}*/

//TODO: verify twitter and linkedin or one of 2 and text area

	if (error) {
		$("#form-error-msg").text(errorMsg);
		//$("#form-error-msg").css("visibility","visible");
		$("#form-error-msg").show();
		return false;
	}

	//$("#guest-form").submit();
	$("#loading").show();
	return;

}



function doProfileImageUpload(id, name, hasPic){
	console.log("IMG upload parameters: ", id, name, hasPic);

	var modal = document.getElementById('imgModal');


	// When the user clicks on the button, open the modal

	$('#profilePicName').html(name);

	modal.style.display = "block";

	//add slug for the image for the backend
	$('#slug-id').remove();
	$('#img-slug-id').remove();
	$('#img-delete-button').prop('disabled', true);

	$('<input>').attr({
    type: 'hidden',
    id: 'slug-id',
    name: 'slug',
		value: id
	}).appendTo('#guest-profile-image-form');

	if (hasPic == 1){
		$('<input>').attr({
			type: 'hidden',
			id: 'img-slug-id',
			name: 'slug',
			value: id
		}).appendTo('#guest-profile-image-delete');

		$('#img-delete-button').prop('disabled', false);
	}


	// Get the <span> element that closes the modal
	var span = document.getElementsByClassName("modal-close")[0];
	// When the user clicks on <span> (x), close the modal
	span.onclick = function() {
			modal.style.display = "none";
	}

	// When the user clicks anywhere outside of the modal, close it
	window.onclick = function(event) {
			if (event.target == modal) {
					modal.style.display = "none";
			}
	}
}

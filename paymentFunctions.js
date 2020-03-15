<script src="https://js.braintreegateway.com/web/dropin/1.22.1/js/dropin.min.js"></script>

var continueToPaymentExam = document.getElementById("exam-payment")
continueToPaymentExam.addEventListener('click', continuetoExamPayment)
	

function continuetoExamPayment() {
	//check if values are okay
	document.getElementById("dropin-container-exam").style.display = "flex"
	document.getElementById("request-options").style.display = "none"
	
	var submitExamRequestButton = document.getElementById("submit-exam-request")
	//submitExamRequestButton.addEventListener('click', updatePendingExamRequest);

	braintree.dropin.create({
      		authorization: 'production_yks4fjkg_j3thkst7k9j6mkvc',
      		container: '#dropin-container-exam'
    	}, function (createErr, instance) {
      		submitExamRequestButton.addEventListener('click', function () {
        	instance.requestPaymentMethod(function (requestPaymentMethodErr, payload) {
          	// Submit payload.nonce to your server
          	var nonce = payload.nonce
          	var transactionAmount = document.getElementById("price").value
          	examCheckoutWithNonceAndAmount(nonce, transactionAmount)
        });
      });
    });
	
}

function examCheckoutWithNonceAndAmount(nonce, amount) {
		var xhttp = new XMLHttpRequest();
    var herokuURL = "https://tutortree-development.herokuapp.com/checkoutWithNonceAndAmount/"+nonce+"/"+amount
		xhttp.open("GET", herokuURL, true);
		xhttp.send();
    updatePendingExamRequest()
    document.getElementById("reschedule-wrapper").style.display = "none";
}

function assignmentCheckoutWithNonceAndAmount(nonce, amount) {
		var xhttp = new XMLHttpRequest();
    var herokuURL = "https://tutortree-development.herokuapp.com/checkoutWithNonceAndAmount/"+nonce+"/"+amount
		xhttp.open("GET", herokuURL, true);
		xhttp.send();
    updatePendingAssignmentRequest()
    document.getElementById("reschedule-wrapper").style.display = "none";
}
function problemCheckoutWithNonceAndAmount(nonce, amount) {
		var xhttp = new XMLHttpRequest();
    var herokuURL = "https://tutortree-development.herokuapp.com/checkoutWithNonceAndAmount/"+nonce+"/"+amount
		xhttp.open("GET", herokuURL, true);
		xhttp.send();
    updatePendingProblemRequest()
    document.getElementById("reschedule-wrapper").style.display = "none";
}

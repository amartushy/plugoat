
function loadPlugoatPortal(plugoatID) {


var storageRef = storageService.ref();
var dataRef = database.ref();

//HANDLE PROBLEM FILE UPLOADS
document.getElementById('upload-problem').addEventListener('click', openProblemDialog)
document.getElementById('problem-select').addEventListener('change', handleProblemUploadChange);

function openProblemDialog() {
	var filebutton = document.getElementById('problem-select')
  filebutton.click();
}

var problemFilePreview = document.getElementById("problem-name-preview")
var selectedProblemFile;
function handleProblemUploadChange(e) {
  selectedProblemFile = e.target.files[0];
	problemFilePreview.innerHTML = selectedProblemFile.name
}
    
document.getElementById('submit-problem-request').addEventListener('click', handleProblemUploadSubmit);
async function handleProblemUploadSubmit(e) {
  const uploadTask = await storageRef.child(`problems/${selectedProblemFile.name}`).put(selectedProblemFile);
  updatePendingProblemRequest()
}

//HANDLE ASSIGNMENT FILE UPLOADS
document.getElementById('upload-assignment').addEventListener('click', openAssignmentDialog)
document.getElementById('assignment-select').addEventListener('change', handleAssignmentUploadChange);

function openAssignmentDialog() {
	var assignmentFilebutton = document.getElementById('assignment-select')
  assignmentFilebutton.click();
}

var assignmentFilePreview = document.getElementById("assignment-file-preview")
var selectedAssignmentFile;
function handleAssignmentUploadChange(e) {
  selectedAssignmentFile = e.target.files[0];
	assignmentFilePreview.innerHTML = selectedAssignmentFile.name
}

document.getElementById('submit-assignment-request').addEventListener('click', handleAssignmentUploadSubmit)

async function handleAssignmentUploadSubmit(e) {
  const uploadTask = await storageRef.child(`assignments/${selectedAssignmentFile.name}`).put(selectedAssignmentFile);
  updatePendingAssignmentRequest();
}
//GET USERNAME
	
var username = asnyc dataRef.once("value", function(snapshot) {
	username = await snapshot.child("/users/"+plugoatID+"/username/").val()
	console.log(username)
	return(username)
	})
console.log(username)
//UPDATE FIREBASE WITH PENDING PROBLEM
async function updatePendingProblemRequest() {

		var subject = document.getElementById("subject-field").value
    var course = document.getElementById("course-field").value
    var problemBidPrice = document.getElementById("problem-bid-price").value
    var problemFileURL = ""
    await storageRef.child('/problems/'+problemFilePreview.innerHTML).getDownloadURL().then(function(url) {
    		problemFileURL = url.toString()
    })
    var problemNotes = document.getElementById("problem-notes").value
		var infoDict = {
    			"type" : "problem",
    			"subject" : subject,
          "course" : course,
          "bidPrice" : problemBidPrice,
          "problemURL" : problemFileURL,
          "notes" : problemNotes,
          "requestTime" : Math.round((new Date()).getTime() / 1000),
          "requesterId" : plugoatID,
	  "username" : username,
          "notifications" : "false"
          }
          
    var updateDict = {}
    updateDict[createRequestId()] = infoDict
    dataRef.child("/pendingRequests/").update(updateDict)   

}

//UPDATE FIREBASE WITH PENDING ASSIGNMENT
async function updatePendingAssignmentRequest() {
		var subject = document.getElementById("subject-field").value
    var course = document.getElementById("course-field").value
    var assignmentBidPrice = document.getElementById("assignment-bid-price").value
    var assignmentFileURL = ""
    await storageRef.child('/assignments/'+assignmentFilePreview.innerHTML).getDownloadURL().then(function(url) {
    		assignmentFileURL = url.toString()
    })
    var assignmentNotes = document.getElementById("assignment-notes").value
		var infoDict = {
    			"type" : "assignment",
    			"subject" : subject,
          "course" : course,
          "bidPrice" : assignmentBidPrice,
          "assignmentURL" : assignmentFileURL,
          "notes" : assignmentNotes,
          "requestTime" : Math.round((new Date()).getTime() / 1000),
          "requesterId" : plugoatID,
	  "username" : username,
          "notifications" : "false"
          }
          
    var updateDict = {}
    updateDict[createRequestId()] = infoDict
    dataRef.child("/pendingRequests/").update(updateDict)		
}
//UPDATE FIREBASE WITH PENDING EXAM 
var submitExamRequestButton = document.getElementById("submit-exam-request")
submitExamRequestButton.addEventListener('click', updatePendingExamRequest);

function updatePendingExamRequest() {
		var subject = document.getElementById("subject-field").value
    var course = document.getElementById("course-field").value
    var examBidPrice = document.getElementById("exam-bid-price").value
    var examMonth = document.getElementById("month-date").value
    var examDay = document.getElementById("day-date").value
    var examStartHour = document.getElementById("start-hour").value
    var examStartMinute = document.getElementById("start-minute").value
    var examEndHour = document.getElementById("end-hour").value
    var examEndMinute = document.getElementById("end-minute").value
    var examNotes = document.getElementById("exam-notes").value
		var infoDict = {
    			"type" : "exam",
    			"subject" : subject,
          "course" : course,
          "bidPrice" : examBidPrice,
          "examDate" : examMonth+"/"+examDay,
          "examStartTime" : examStartHour + ":" + examStartMinute,
          "examEndTime" : examEndHour + ":" + examEndMinute,
          "notes" : examNotes,
          "requestTime" : Math.round((new Date()).getTime() / 1000),
          "requesterId" : plugoatID,
	  "username" : username,
          "notifications" : "false"
          }
          
    var updateDict = {}
    updateDict[createRequestId()] = infoDict
    dataRef.child("/pendingRequests/").update(updateDict)		
}



function createRequestId() {
		var result =''
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890'
    var charactersLength = characters.length
    
    for (i = 0; i < 8; i++) {
    		result += characters.charAt(Math.floor(Math.random() * charactersLength))
    }
    return result
}

}

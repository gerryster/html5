var elementMainStatus = 0;

function cnnCheckElement() {
	if($("cnnInteractive") && elementMainStatus==0) {
		$("cnnInteractive").sendCallToFlash();
		elementMainStatus = 1;
		}
	
	if(s){
		var currentElement = "";
		
		for(i=1;i<=12;i++){
			currentElement = "cvp_videoContainerexpand" + i;
			currentElement = currentElement.toString();
			currentElementDiv = "videoContainerexpand" + i;
			currentElementDiv = currentElementDiv.toString();
			if ($(currentElement)&&$(currentElementDiv).style.display!="none") {$(currentElement).sendCallToFlash(); return}
			else {}
		}
	}
}

	
function getDataFromFlash(flashOmniData) {
	cnnContentType = flashOmniData[0];
	cnnContentURL = flashOmniData[1];
	elementFlashCall(cnnContentType, cnnContentURL);
	}
				
function getDataFromGallery(flashOmniData) {
	cnnContentType = flashOmniData;
	elementFlashCall(cnnContentType, cnnContentURL);
	}
	  
if ($$('div.cnn_stryccnwsp2 a')){
	processLinks($$('div.cnn_stryccnwsp2 a'),'NS1','iref');}

function processLinks(divElement, hpsValue,query) {
	var x=0;

	for (x in divElement)
	  {	  
	    if (divElement[x].href) {
		
		  var queryCharStart;

		  if (divElement[x].href.indexOf(';?'+query+'=') > -1){
			  var queryregEx = (query=='hpt')?new RegExp(/;\?hpt=../):new RegExp(/;\?iref=../);
			  divElement[x].href = divElement[x].href.replace(queryregEx, "");
			  }
			
		  if (divElement[x].href.indexOf(query+'=') < 0) {		
			  if (divElement[x].href.indexOf('?')> -1) {queryCharStart = '&'; }
			  else {queryCharStart = '?'; }
			  if (divElement[x].href.indexOf('javascript:')<0){
			  divElement[x].href = divElement[x].href + queryCharStart + query+"="+hpsValue; }
			  if (divElement[x].href.indexOf('javascript:cnnLiveVideo')>-1) {
				divElement[x].href = divElement[x].href.replace("')", "&"+query+"="+hpsValue+"')");}
		  }		 
		}
	}
 }
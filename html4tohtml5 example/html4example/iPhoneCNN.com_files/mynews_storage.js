var smLocalStorage = null;

function ms_initFllwT() { }

function ms_getFllwT(view) {
	var queueItem = new ms_QueueItem(ms_baseStandard+'user.api', 'get');
	queueItem.addParam('action', 'getData');
	queueItem.addParam('name', 'topics');
	queueItem.addParam('callback', view);
	var queueItemObj = queueItem.getQueueItem();
	msQueueManager.addRequest(queueItemObj);
}

function ms_setFllwT(callback, data) {
   var queueItem = new ms_QueueItem(ms_baseStandard+'user.api', 'get');
   queueItem.addParam('action', 'setData');
   queueItem.addParam('name', 'topics');
	queueItem.addParam('data', data );
   queueItem.addParam('callback', callback);
   var queueItemObj = queueItem.getQueueItem();
   msQueueManager.addRequest(queueItemObj);
}

function ms_getSaveS(view) {
	var queueItem = new ms_QueueItem(ms_baseStandard+'user.api', 'get');
	queueItem.addParam('action', 'getData');
	queueItem.addParam('name', 'stories');
	queueItem.addParam('callback', view);
	var queueItemObj = queueItem.getQueueItem();
	msQueueManager.addRequest(queueItemObj);
}

function ms_setSaveS(callback, data) {
   var queueItem = new ms_QueueItem(ms_baseStandard+'user.api', 'get');
   queueItem.addParam('action', 'setData');
   queueItem.addParam('name', 'stories');
	queueItem.addParam('data', data );
   queueItem.addParam('callback', callback);
   var queueItemObj = queueItem.getQueueItem();
   msQueueManager.addRequest(queueItemObj);
}

var ms_scrubdata = function(data) {
   //alert( data );
   //console.log( data );
   var swapChar = function (data) {
      var result = data;
      switch ( data ) {
         case '#':
            result = '&#35;';
            break;
         case '&':
            result = '&#38;';
            break;
         case '(':
            result = '&#40;';
            break;
         case ')':
            result = '&#41;';
            break;
         case '"':
            result = '&#34;';
            break;
         case "'":
            result = '&#39;';
            break;
         case '<':
            result = '&#60;';
            break;
         case '>':
            result = '&#62;';
            break;
      }
      return result;
   };
	var swapAmp = function (data) {
		var r = data.replace( /[#&]/g, swapChar );
		//console.log('returning: ' + r );
		return r;
	};
   var replacement = data.replace( /[\n\r]/g, '' )
                     .replace( /javascript:/gi, '' )
                     .replace( /<\/?script\s*([^>]+)?>/gi, '' )
                     .replace( /eval\s*\(.+?\)/g, '' )
                     .replace( /[()\"'<>]/g, swapChar )
							.replace( /&[^#]|[^&]#/g, swapAmp )
   ;
	//console.log( replacement );
	//alert( replacement );
   return replacement;
};

var scrubMrv = ms_scrubdata;

/* LEGACY CODE FOR MRV */

var baseStandardApi = 'http://audience.cnn.com/services/cnn/';
//var baseStandardApi = 'http://aud-ite.cnn.com/services/cnn/';
var storage = null;

function saveMrvUrl(title,url)
{
	var data = (title + "|" + url + "|" + mrvTime()); // enable this for MRV date sorting instead of the below
	//var data = (title + "|" + url); 

    //storage = StorageManager.getInstance().getStorage();
	//storage.load();	
	window.setTimeout( function() { mrvSmOnload( data ); }, 500 );
}

function mrvTime() { // creates date/time var to be added to MRV item 
	var currentTime = new Date()
	var month = currentTime.getMonth() + 1;
	var day = currentTime.getDate();
	var year = currentTime.getFullYear();
	var time = currentTime.getHours() + ":" + currentTime.getMinutes();
	var currentDate = month +"/"+ day +"/"+ year +"-"+ time;  // Ex.. 11/4/2009-14:42
	return currentDate;
}

var user_mrvdata;
function mrvSmOnload(data) {
	var loc_mrvdata = allCookies['mrvPages'] || null; //storage.get('memberservices.mrv');
	
	
	//check for local data first
	if(loc_mrvdata == null || loc_mrvdata == "") {
		if(ms_isLoggedIn() == true) {
			getMrvApi('returnUserMRV');
			
			//if no local and logged in check for user data, if there save and stop
			if(user_mrvdata != null || user_mrvdata) {
				getMrvApi('doMrvSave');
				return;
			} else {
				mrvdata =  data;
			}
		} 
		else {
			mrvdata = data;
		}
   } 
   else {
		mrvdata = (data + '||' + loc_mrvdata);
	}
	
		
	doMrvSave({sync:true,data:mrvdata});
}

//returns local data without saving unlike doMrvSave, more of a check
function returnUserMRV(mrvObj) {	
	msQueueManager.requestReceived();	
   var error = (typeof mrvObj.errors == 'undefined') ? false : true;
   if(!error) {   
		
		user_mrvdata = mrvObj.data;		
	}
	else {
		//console.log(error);
	}
}

function doMrvSave(jsonResponse) {
	if(!jsonResponse.sync) {
	   msQueueManager.requestReceived();
	}
   var error = (typeof jsonResponse.errors == 'undefined') ? false : true;
   if(!error) {
		var mrvdata = jsonResponse.data;		
		var truncds = deDupTrunc(mrvdata);	
		
		if ( ms_isLoggedIn() == true ) {
	      setMrvApi('setMrvApiDone',truncds);
		  //console.log('saved to mem serv - ' + truncds);
		} 		
		//save the data in the cookie
		mrvCookieListSetter(truncds);			
		//storage.put('memberservices.mrv', truncds);
	    //storage.save();		
		
   } else {
      // console.log('get mrv failure');
      // console.log(jsonResponse);
   }
}

function mrvCookieListSetter(trackData) {
	CNN_setCookie('mrvPages', trackData, 24 * 30 * 12, '/', document.domain);
}

function getMrvApi(view) {
   var queueItem = new ms_QueueItem(baseStandardApi+'user.api', 'get');
   queueItem.addParam('action', 'getData');
   queueItem.addParam('name', 'mrv');
   queueItem.addParam('callback', view);
   var queueItemObj = queueItem.getQueueItem();
   msQueueManager.addRequest(queueItemObj);
}

function setMrvApi(callback, data) {
   var queueItem = new ms_QueueItem(baseStandardApi+'user.api', 'get');
   queueItem.addParam('action', 'setData');
   queueItem.addParam('name', 'mrv');
   queueItem.addParam('data', data );
   queueItem.addParam('callback', callback);
   var queueItemObj = queueItem.getQueueItem();
   msQueueManager.addRequest(queueItemObj);
}

function setMrvApiDone(jsonResponse) {
    msQueueManager.requestReceived();
}

function deDupTrunc(mrvdater) {
	//NOW WITH SORTING!!!!
    var dater = ms_scrubdata(mrvdater).split('||');	
	//var dater = mrvdater.split('||');
	var dedups = [];  //de duped array of strings but not sorted
	var url_arr = []; //isolates the urls
	var newdups = []; //checks array of isolated urls to check against for dupes
	var objArray = []; //de duped array of arrays to grab the time and sort
	var final_arr = []; // final array
	
	//an array of urls
	for(var i = 0 ; i < dater.length ; ++i ) {
		var dater_comp = dater[i].split('|');
		var first_split = dater[i].indexOf('|') + 1;
		var last_split = dater[i].lastIndexOf('|');
		var iso_url = dater[i].substring(first_split, last_split);
		url_arr.push(iso_url);
	}
	
	//push items to the array based on title not factoring dates
	for(var x = 0 ; x < url_arr.length ; ++x ) {
		var match = newdups.indexOf( url_arr[x], 0, false );
	   if(match < 0 ) {
	      newdups.push( url_arr[x] );	
		  dedups.push( dater[x] );	
	   } else {}
	}
	
	//Sort by time
	for (m=0; m < dedups.length; m++) {
		//obj = {}; obj.title = arr_data[0]; obj.url = arr_data[1]; obj.time = arr_data[2];
		arr_data = dedups[m].split('|');
		objArray.push(arr_data);
	}	
	
	//console.dir(objArray);
	try {
		objArray.sort(objSortByDateD);
	} catch (err) {
		//console.dir(err);
	}
		
	//populate final de duped and sorted array with strings for saving
	for (z = 0; z < objArray.length; ++z) {
		var entry = objArray[z].join('|');
		final_arr.push(entry);	
	}	
	
	// legacy code: dedup our array	
	/*for(var i = 0 ; i < dater.length ; ++i ) {
	   if(dater[i].length > 0 && dedups.indexOf( dater[i], 0, false ) < 0 ) {
	      dedups.push( dater[i] );		  
	   }
	}*/
	
	// trunc our array
	mrvdater = final_arr.splice(0,10);
	var r = mrvdater.join('||');
	
	return r; // mrvdater.join('||');
}

var dateRE = /^(\d{1,2})[\/\- ](\d{1,2})[\/\- ](\d{4})/;
function objSortByDateD(a, b){ // sort dates descending
	a = a[2].replace(dateRE,"$3$2$1");
	b = b[2].replace(dateRE,"$3$2$1");
	//a = a[2];
	//b = b[2];
	if (a>b) {return -1;}
	if (a <b) {return 1;}
	return 0;
}

var cnn_strysaveurl = document.URL + '';
var cnn_savedstories = new Object();

var cnn_strycsiurl = 'topics.html';
var cnn_strycansave = 1;
var cnn_strycanfollow = 1;

var cnn_isspctpc = 0;

var cnn_t_topics = new Array();
var cnn_followtopics = new Object();
var cnn_ovrlayloadstr = '<div class="profileoverlay_bdy followtopic3"><div align="center"><div class="cnn_loadimg30px"><img src="http://i.cdn.turner.com/cnn/.element/img/3.0/global/misc/loading.gif" width="30" height="30" alt="" border="0"></div><div class="cnn_loadimgtxt">Please wait while data loads.</div></div></div>';

//STRIP " - CNN.com" FROM STORY TITLE
//STRIP " - CNN.com" FROM STORY TITLE
//STRIP " - CNN.com" FROM STORY TITLE
//STRIP " - CNN.com" FROM STORY TITLE

function cnn_stryInitSaveS() {

	var t_html = '';

	//show overlay
	//Element.update('profile_followtopic_cntr', cnn_ovrlayloadstr);
	//showOverlay('profile_followtopic9_overlay');
	//scrollTo(0, 0);

	//Check login state
	if(ms_isLoggedIn() == true) {
		
		
				var obj = {
					params: {
						name: 'stories'
					},
					onSuccess: function(response){
						console.log(response);
						cnn_strysstory(response.responseJSON);
						
					}
		};
		Member.getData(obj);

		//ms_getSaveS('cnn_strysstory');
	}
	else {
	
		//t_html += '<div class="profileoverlay_bdy">';
		//t_html += '<p><a href="#" onclick="closeOverlay(\'profile_followtopic9_overlay\');showOverlay(\'profile_signin_overlay\');return false">Log in</a> <strong>or</strong> <a href="#" onclick="closeOverlay(\'profile_followtopic9_overlay\');showOverlay(\'profile_signup_overlay\');return false">sign up</a> to save this story to your profile page.</p>';
		//t_html += '</div>';
		//Element.update('profile_followtopic_cntr', t_html);
		
		CNN_handleOverlay('profile_signin_overlay');
	
	}

}

function cnn_strysstory(jsonResponse) {

	var t_html = '';
	
	//msQueueManager.requestReceived();
 	console.log('analyzing data');
	
	var error = false;
	if(error == false) {

    	//sanitize data and load into follow topics array
		var data_s = ms_scrubdata(jsonResponse.data);
		var data_arr = new Array();
		
		if(data_s != '') { var data_arr = data_s.split('||||'); }
		
		for(i=0;i<data_arr.length;i++) {
		
			var t_str = data_arr[i];
			var t_arr = t_str.split('|||');
			cnn_savedstories[t_arr[0]] = { "title" : t_arr[1], "is_saved" : 1 };
		}
		
		if(data_arr.length >= 30) { cnn_strycansave = 0; }
		
		//test to see if you have room, to see if story is already saved and display message.
	 	console.log('start testing');
		if(cnn_savedstories[cnn_strysaveurl] && (cnn_savedstories[cnn_strysaveurl].is_saved == 1)) {

			t_html += '<div class="profileoverlay_bdy followtopic3">';
			t_html += '<p class="followtopicp1">You have already saved this story.</p>';
			t_html += '<p class="followtopicp2"><a href="/profile/?view=saved">Go to my profile page</a> to manage my saved stories</p>';
			t_html += '</div>';
		
		}
		else if(cnn_strycansave == 0) {

			t_html += '<div class="profileoverlay_bdy followtopic3">';
			t_html += '<p class="followtopicp1">You\'ve reached the maximum number of saved stories!</p>';
			t_html += '<p class="followtopicp2"><a href="/profile/?view=saved">Go to my profile page</a> to manage my saved stories</p>';
			t_html += '</div>';
		
		}
		else {
		
			t_html += '<div class="profileoverlay_bdy followtopic3">';
			t_html += '<p class="followtopicp7">Save this story to your "Saved Stories" list?</p>';
			t_html += '<p class="followtopicp5">';
			t_html += '<a href="javascript:cnn_strydosaves();" class="saveto_btn"></a>';
			t_html += '<img src="/.element/img/3.0/profile/3x5_blue_arrow.jpg" alt="" /><a href="javascript:closeOverlay(\'profile_followtopic9_overlay\');">No, cancel</a>';
			t_html += '<div class="clear"></div>';
			t_html += '</p>';
			t_html += '<p class="followtopicp2"><a href="/profile/?view=saved">Go to my profile page</a> to manage my saved stories</p>';				
			t_html += '</div>';		
		}
		
		console.log('showing overlay');
		var defOverlay = new Overlay('cnn_story_overlays');
		defOverlay.loadHLDR('profile_followtopic_cntr2');
		Element.update('profile_followtopic_cntr2', t_html);
		
	}
	else {
		
		// update ui for errors
		//console.log('get mrv failure');
		//console.log(jsonResponse);
		Element.update('profile_followtopic_cntr2', '<div class="profileoverlay_bdy">The service is temporarily unavailable, please <a href="javascript:void(0)" onclick="window.msReload();">try again</a> soon.<br/>Thank you for your patience!</div>');

	}

}

function cnn_strydosaves() {	
	//show loading scene
	Element.update('profile_followtopic_cntr2', cnn_ovrlayloadstr);
	cnn_savedstories[cnn_strysaveurl] = { "title" : document.title, "is_saved" : 1 };
	
	var t_datastr = '';
	var t_dataarr = new Array();
	var t_i = 0;
	
	for(var t_key in cnn_savedstories) {
	
		if(cnn_savedstories[t_key].is_saved == 1) {
			t_dataarr.push(t_key + '|||' + cnn_savedstories[t_key].title);
		}
		else { }
			
	}
	
	t_datastr = t_dataarr.join('||||');
	
	console.log(t_datastr);

			  		var obj = {
					params: {
						name : 'stories',
						data : t_datastr
					},
					onSuccess: function(response){
						console.log(response);
						cnn_strystorysaved(response.responseJSON);

					}
		};
		Member.setData(obj);
			//ms_setSaveS('cnn_strystorysaved', t_datastr);

}

function cnn_strystorysaved(jsonResponse) {

    //msQueueManager.requestReceived();	
	var error = (typeof jsonResponse.errors == 'undefined') ? false : true;
	//console.dir(jsonResponse);
	if(error == false) {
		//no errors, proceed
		var t_html = '';
		t_html += '<div class="profileoverlay_bdy followtopic3">';
		t_html += '<p class="followtopicp1">Story saved!</p>';
		t_html += '<p class="followtopicp2"><a href="/profile/?view=saved">Go to my profile page</a> to manage my saved stories</p>';
		t_html += '</div>';
		Element.update('profile_followtopic_cntr2', t_html);
	} else {
		//we can add another bit of testing for proper results		
		switch(jsonResponse.errors[0]){
			case 'value too large' : 
				//alert('value too large');
				var t_html = '';
				t_html += '<div class="profileoverlay_bdy followtopic3">';
				t_html += '<p class="followtopicp1">You\'ve reached the maximum number of saved stories!</p>';
				t_html += '<p class="followtopicp2"><a href="/profile/?view=saved">Go to my profile page</a> to manage my saved stories</p>';
				t_html += '</div>';
				Element.update('profile_followtopic_cntr2', t_html);
				break;
			default :
				var t_html = '';
				t_html += '<div class="profileoverlay_bdy followtopic3">';
				t_html += '<p class="followtopicp1">There was a problem saving your story. Please try again.</p>';
				t_html += '<p class="followtopicp2"><a href="/profile/?view=saved">Go to my profile page</a> to manage my saved stories</p>';
				t_html += '</div>';
				Element.update('profile_followtopic_cntr2', t_html);
		}
	}
	
}



//Load in current topics and trigger this story's topic overlay
function cnn_stryInitftopic(t_type) {

	//show overlay
	//Element.update('profile_followtopic_cntr', cnn_ovrlayloadstr);
	//showOverlay('profile_followtopic9_overlay');
	//scrollTo(0, 0);

	//Check login state
	if(ms_isLoggedIn() == true) {
	
		if(t_type == 'spc') { cnn_isspctpc = 1; }


		var obj = {
					params: {
						name: 'topics'
					},
					onSuccess: function(response){
						//console.log(response);
						cnn_stryftopic(response.responseJSON);
						
					}
		};
		Member.getData(obj);

		//ms_getFllwT('cnn_stryftopic');
	
	}
	else {
	
		//var t_html = '';
		//t_html += '<div class="profileoverlay_bdy">';
		//t_html += '<p><a href="#" onclick="closeOverlay(\'profile_followtopic9_overlay\');showOverlay(\'profile_signin_overlay\');return false">Log in</a> <strong>or</strong> <a href="#" onclick="closeOverlay(\'profile_followtopic9_overlay\');showOverlay(\'profile_signup_overlay\');return false">sign up</a> to follow this topic on your profile page and stay up-to-date on all stories we publish on this topic.</p>';
		//t_html += '</div>';
		//Element.update('profile_followtopic_cntr', t_html);
		CNN_handleOverlay('profile_signin_overlay');
		
		

	}

}


//ADD IN CHECKS FOR MAX LIMIT OF 12 TOPICS
//ADD IN CHECKS FOR MAX LIMIT OF 12 TOPICS
//ADD IN CHECKS FOR MAX LIMIT OF 12 TOPICS
//ADD IN CHECKS FOR MAX LIMIT OF 12 TOPICS
function cnn_stryftopic(jsonResponse) {

	var defOverlay = new Overlay('cnn_story_overlays');
	defOverlay.loadHLDR('profile_followtopic_cntr2');
	
	//parse thru stored data
	//msQueueManager.requestReceived();
 	var error = (typeof jsonResponse.errors == 'undefined') ? false : true;
	if(error == false) {

    	//sanitize data and load into follow topics array
		var data_s = ms_scrubdata(jsonResponse.data);
		var data_arr = new Array();
		
		if(data_s != '') { var data_arr = data_s.split('|||'); }
		
		for(i=0;i<data_arr.length;i++) {
		
			var t_str = data_arr[i];
			var t_arr = t_str.split('||');
			cnn_followtopics[t_arr[0]] = { "is_followed" : 1, "name" : t_arr[1], "is_saved" : 1 };
			
		}
		
		if(data_arr.length >= 12) { cnn_strycanfollow = 0; }
		
		if(cnn_strycanfollow == 0) {
				
			var t_html = '';
	
			t_html += '<div class="profileoverlay_bdy followtopic3">';
			t_html += '<p class="followtopicp1">You have reached the maximum number of topics to follow!</p>';
			t_html += '<p class="followtopicp2"><a href="/profile/?view=followed">Go to my profile page</a> to manage my followed topics</p>';
			t_html += '</div>';
			Element.update('profile_followtopic_cntr2', t_html);

		}
		else {
		
			if(cnn_isspctpc == 1) {
				//build fake topic obj for special
				var t_obj = { "related_topics" : [{"t_name" : cnn_spctopic_name, "t_key" : cnn_spctopic_key}] };
				Element.update('profile_followtopic_cntr2', cnn_stryftopichandle(t_obj, 'profile_followtopic_cntr2'));
			}
			else {
				//retrieve and show this story's topic choices
				CSIManager.getInstance().call(cnn_strycsiurl, '', 'profile_followtopic_cntr2', cnn_stryftopichandle, true);
			}
			
		}
		
	}
	else {
		
		// update ui for errors
		//console.log('get mrv failure');
		//console.log(jsonResponse);
		Element.update('profile_followtopic_cntr2', '<div class="profileoverlay_bdy">The service is temporarily unavailable, please <a href="javascript:void(0)" onclick="window.msReload();">try again</a> soon.<br/>Thank you for your patience!</div>');

	}
	
}

function cnn_stryftopichandle(obj, id, configObj) {

	cnn_t_topics = obj.related_topics;
	var t_html = '';
	
	t_html += '<div class="profileoverlay_bdy followtopic3"><form id="cnn_followtopicsfrm">';
		
	//if only one topic for this story
	if(cnn_t_topics.length == 1) {
	
		if(cnn_followtopics[cnn_t_topics[0].t_key] && (cnn_followtopics[cnn_t_topics[0].t_key].is_followed == 1)) {
		
			t_html += '<p class="followtopicp11"><strong>You are already following this topic.</strong></p>';
			t_html += '<p class="followtopicp2"><a href="/profile/?view=followed">Go to my profile page</a> to manage my followed topics</p>';

		}
		else {
		
			t_html += '<p class="followtopicp11"><strong>Do you want to follow <a href="http://topics.cnn.com/topics/' + cnn_t_topics[0].t_key + '">' + cnn_t_topics[0].t_name + '</a> stories?</strong> <span>You\'ll stay up-to-date on all stories we\'ll publish on this topic.</span></p>';
			t_html += '<p class="followtopicp5"><a href="javascript:cnn_stryftopicsave(\'' + cnn_t_topics[0].t_key + '\');" class="follow_btn"></a><img src="/.element/img/3.0/profile/3x5_blue_arrow.jpg" alt="" /><a href="javascript:closeOverlay(\'profile_followtopic9_overlay\');">No, cancel</a><div class="clear"></div></p><p class="followtopicp2"><a href="/profile/?view=followed">Go to my profile page</a> to manage my followed topics</p>';

			if(!cnn_followtopics[cnn_t_topics[0].t_key]) { cnn_followtopics[cnn_t_topics[0].t_key] = { "is_followed" : 0, "name" : cnn_t_topics[0].t_name, "is_saved" : 0 }; }
		
		}
				
	}
	else {
	
		//already following array
		//var t_arr2 = new Array();
		
		//test to see if all topics are already followed
		var t_availtopic = 0;
		
		t_html += '<p class="followtopicp3">Do you want to follow:</p>';
		
		for(i=0;i<cnn_t_topics.length;i++) {
		
			//if already followed
			if(cnn_followtopics[cnn_t_topics[i].t_key] && (cnn_followtopics[cnn_t_topics[i].t_key].is_followed == 1)) {
			
				//t_arr2.push('<a href="http://topics.cnn.com/topics/' + cnn_t_topics[i].t_key + '">' + cnn_t_topics[i].t_name + '</a>');
				t_html += '<input name="cnn_followchckb' + i + '" value="' + i + '" type="hidden">';
				
			}
			else {

				t_availtopic = 1;
				t_html += '<p class="followtopicp_radio"><input class="radio" name="cnn_followchckb' + i + '" value="' + i + '" type="checkbox" onclick="cnn_strytogfollowarr(\'' + cnn_t_topics[i].t_key + '\');"> <a href="http://topics.cnn.com/topics/' + cnn_t_topics[i].t_key + '">' + cnn_t_topics[i].t_name + '</a> stories?</p>';

				if(!cnn_followtopics[cnn_t_topics[i].t_key]) { cnn_followtopics[cnn_t_topics[i].t_key] = { "is_followed" : 0, "name" : cnn_t_topics[i].t_name, "is_saved" : 0 }; }
			
			}
			
		}

		if(t_availtopic == 0) {
		
			t_html = '<div class="profileoverlay_bdy followtopic3"><form id="cnn_followtopicsfrm"><p class="followtopicp11"><strong>You are already following these topics.</strong></p>';
			
		}
		else {
			
			t_html += '<p class="followtopicp4">We\'ll keep you up-to-date on stories we publish on this topic.</p>';
			t_html += '<p class="followtopicp5"><a href="javascript:cnn_stryftopicsave();" class="follow_btn"></a><img src="/.element/img/3.0/profile/3x5_blue_arrow.jpg" alt="" /><a href="javascript:closeOverlay(\'profile_followtopic9_overlay\');">No, cancel</a><div class="clear"></div></p>';

		}

		t_html += '<p class="followtopicp2"><a href="/profile/?view=followed">Go to my profile page</a> to manage my followed topics</p>';
		
	}

	t_html += '</form></div>';

	return t_html;
	
}

function cnn_stryftopicsave(sngl_key) {

	//show loading scene
	Element.update('profile_followtopic_cntr2', cnn_ovrlayloadstr);
	
	if(sngl_key && (sngl_key != '')) {
		 cnn_followtopics[sngl_key].is_followed = 1;
	} 
	
	var t_datastr = '';
	var t_dataarr = new Array();
	var t_i = 0;
	
	for(var t_key in cnn_followtopics) {
	
		if(cnn_followtopics[t_key].is_followed == 1) {
			t_dataarr.push(t_key + '||' + cnn_followtopics[t_key].name);
		}
		else { }
			
	}
	
	t_datastr = t_dataarr.join('|||');
	
	//ms_setFllwT('cnn_stryftopicset', t_datastr);
				  		var obj = {
					params: {
						name : 'topics',
						data : t_datastr
					},
					onSuccess: function(response){
						//console.log(response);
						cnn_stryftopicset(response.responseJSON);

					}
		};
		Member.setData(obj);
		
}

function cnn_strytogfollowarr(topic_id) {

	if(cnn_followtopics[topic_id].is_followed == 1) { cnn_followtopics[topic_id].is_followed  = 0; }
	else { cnn_followtopics[topic_id].is_followed  = 1; }
	
}

function cnn_stryftopicset(value) {

    //msQueueManager.requestReceived();

	//print out success text because topics have been saved	
	var t_html = '';
	var t_arr = new Array();
	
	//already following array
	var t_arr2 = new Array();
	
	t_html += '<div class="profileoverlay_bdy followtopic3">';
	
	//check to see what was added
	for(i=0;i<cnn_t_topics.length;i++) {
		if(cnn_followtopics[cnn_t_topics[i].t_key].is_followed == 1) {
			
			if(cnn_followtopics[cnn_t_topics[i].t_key].is_saved == 1) { t_arr2.push('<a href="http://topics.cnn.com/topics/' + cnn_t_topics[i].t_key + '">' + cnn_t_topics[i].t_name + '</a>'); }
			else { t_arr.push('<a href="http://topics.cnn.com/topics/' + cnn_t_topics[i].t_key + '">' + cnn_t_topics[i].t_name + '</a>'); }
			
		}
	}
	
	if(t_arr.length > 0) {
		t_html += '<p class="followtopicp7">You are now following ' + t_arr.join(' and ') + '</p>';
	}
	
	if(t_arr2.length > 0) {
		t_html += '<p class="followtopicp6">You are already following ' + t_arr2.join(' and ') + '</p>';
	}
	
	t_html += '<p class="followtopicp2"><a href="/profile/?view=followed">Go to my profile page</a> to manage my followed topics</p>';
	t_html += '</div>';
	t_html += '</div>';
	Element.update('profile_followtopic_cntr2', t_html);

}

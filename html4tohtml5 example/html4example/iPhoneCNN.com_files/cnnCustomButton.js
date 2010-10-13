
/* Copyright 2000-2006 Clickability Inc.  */
/* Clickability ButtonServer v4.01         */

document.write('<script language="JavaScript"> \n');
document.write('window.onerror=function(){clickURL=document.location.href;return true;} \n');
document.write('if(!self.clickURL) clickURL=parent.location.href; \n');
document.write('<\/script> \n');

var partnerID = 3000;
if(self.clickID){
	partnerID = clickID;
}else{
	alert('No clickID (partnerID) has been set on this page');
}
var custom=1;
var popWin="width=510,height=480,resizable=1,scrollbars=1";
var commonLoc="&fb=Y&url="+escape(getClickURL())+"&title="+escape(getClickTitle())+"&random="+Math.random()+"&partnerID="+partnerID+"&expire="+escape(getClickExpire());

var inpop  = ( (document.domain.indexOf("printthis.clickability.com")>-1)?true:false);
var _b=new Image();
var clickRan=Math.random();
var clickFac = 20;
if(clickFac==0)clickFac=1;
if(!inpop && clickRan>(1-(1/clickFac))){
    var _ti=900;
    var _qb='http://s.clickability.com/s?';
    _qb+="&7="+partnerID;
    _qb+="&8="+escape(getClickURL());
    _qb+="&10="+escape(getClickTitle());
    _qb+="&19="+_ti;
    _qb+="&21="+clickFac;
    _qb+="&18="+Math.random();
    _b.src=_qb;

}

var title_append = "&title=I+JUST+SAW+IT+ON+CNN.COM%3A ";

/****************Don't Change Below****************/

/*Functions*/
function ST () {
	window.open('http://www.savethis.clickability.com/st/saveThisApp?clickMap=saveThis'+commonLoc,'click',popWin);
	return false;
}

function STMouseOver () {
	window.status='SAVE THIS';
	return true;
}

function STMouseOut () {
	window.status='';
	return true;
}
function ET () {

	//appendedLoc = commonLoc.replace(/\&title\=/, title_append);
	//appendedLoc = appendedLoc.replace(/\-\%20CNN\.com/, "");

	window.open('http://www.emailthis.clickability.com/et/emailThis?clickMap=create'+commonLoc+'&summary='+escape(getClickSummary())+'&image='+escape(getClickImage()),'click',popWin);
	return false;
	
}

function ETMouseOver () {
	window.status='EMAIL THIS';
	return true;
}

function ETMouseOut () {
	window.status='';
	return true;
}
function PT () {
	window.open('http://www.printthis.clickability.com/pt/printThis?clickMap=printThis'+commonLoc,'click',popWin);
	return false;
}

function PTMouseOver () {
	window.status='PRINT THIS';
	return true;
}

function PTMouseOut () {
	window.status='';
	return true;
}
function MP () {
		window.open('http://www.cnn.com/virtual/2001/code/clickability2/mp_templates/etmp.html','click',popWin);
		return false;
}

function MPMouseOver () {
	window.status='MOST POPULAR';
	return true;
}

function MPMouseOut () {
	window.status='';
	return true;
}


function IR () {
	window.open('http://imware.clickability.com/imware/imware?action=rss.feeds&button=Y&destID='+partnerID,'click',popWin);
	return false;
}

function IRMouseOver () {
	window.status='RSS FEEDS';
	return true;
}

function IRMouseOut () {
	window.status='';
	return true;
}



function getClickURL() {
        if (self.clickURL) return clickURL;
        return document.location.href;
}

function getClickTitle() {
	if (self.clickTitle) return clickTitle;
	return document.title;
}
function getClickExpire() {
	if (self.clickExpire) return clickExpire; 
	return "";
}


function getClickSummary() {
	if (self.clickSummary) return clickSummary;
	return "";
}

function getClickImage() {
	if (self.clickImage) return clickImage; 
	return "";
}


window.onresize = function () {
    for (var i=0; i<document.links.length; i++) {
        document.links[i].onclick = document.links[i].onclick;
    }
}

  

function FDCPBridge(_1){
this.count=0;
this.ifc=null;
this.oform;
this.tid=0;
this.fdcp=_1.fdcp;
this.pcallback=null;
this.fd_div_id="fd_page_main";
this.rmEl=new Array();
this.st=new Array();
this.nonescnames=["d","p","r","q","bn","bv"];
this.doesc=function(_2){
oloop:
for(var x in _2){
for(var n=0;n<this.nonescnames.length;n++){
if(x==this.nonescnames[n]){
continue oloop;
}
}
_2[x]=escape(_2[x]);
}
};
this.cleanPrint=function(_5,_6,_7){
if(this.fdcp.clt.getFDDebug()){
alert("DocDomain : ["+document.domain+"]");
}
this.pcallback=_7;
if(this.fdcp.clt.mode==this.fdcp.clt.modes.printerFriendlyViewer){
_5.pfv="y";
try{
var _8=this.fdcp.clt.getCPViewerId();
if(typeof _8!="undefined"){
_5.pfvId=_8;
}
}
catch(e){
}
_5.pfUrl=this.fdcp.pfLink;
}
if(this.fdcp.browserDetect.browser=="Explorer"&&!fdcp.clt.templateTest&&this.fdcp.clt.mode!=this.fdcp.clt.modes.printerFriendlyViewer){
if(this.fdcp.clt.getFDDebug()){
alert("IE Printing");
}
FDCPLoader.fdPrintWrapper();
this.pcallback(true);
return;
}
if(typeof this.ifc!="undefined"&&this.ifc!=null){
document.body.removeChild(this.ifc);
document.body.removeChild(this.oform);
}
var _9=this.fdcp.getCpUrl();
var _a="fDContentFrame";
this.ifc=document.createElement("iframe");
this.ifc.setAttribute("src","about:blank");
this.ifc.setAttribute("id",_a);
this.ifc.setAttribute("NAME",_a);
this.ifc.setAttribute("loaded",false);
this.ifc.onload=function(){
loaded=true;
};
this.ifc.style.width="0px";
this.ifc.style.height="0px";
this.ifc.style.border="0px";
document.body.appendChild(this.ifc);
if(fdcp.browserDetect.browser!="Explorer"){
if(self.frames[_a].name!=_a){
self.frames[_a].name=_a;
}
}
this.oform=document.createElement("form");
document.body.appendChild(this.oform);
this.oform.action=_9;
this.oform.name="FDForm";
this.oform.method="post";
if(this.fdcp.clt.mode==this.fdcp.clt.modes.printerFriendlyViewer){
window.open("about:blank","pfvWindow","toolbar=0,location=0,directories=0,status=0,menubar=0,resizable=0,scrollbars=no,copyhistory=yes,width=1024,height=768,left=50, top=50,screenX=50,screenY=50");
this.oform.target="pfvWindow";
}else{
this.oform.target=_a;
}
for(var k in _5){
var pc=document.createElement("input");
pc.type="hidden";
pc.name=k;
pc.value=_5[k];
this.oform.appendChild(pc);
}
this.count=0;
if(this.fdcp.clt.getFDDebug()){
alert("CP Submit");
}
this.oform.submit();
if(this.fdcp.clt.mode==this.fdcp.clt.modes.printerFriendlyViewer){
this.pcallback(true);
this.fdcp.clt.resetMode();
this.fdcp.getCpPostDataValue=null;
return;
}
if(this.fdcp.clt.mode!=this.fdcp.clt.modes.printerFriendlyViewer){
this.tid=setInterval(function(){
this.fdcp.bridge.checkcontent();
},1000);
}
};
this.log=function(_d,_e,_f,_10){
if(_f==null){
return;
}
try{
var _11="rtype=log&";
_11+="LOG_LEVEL="+_d+"&";
_11+="LOG_MSG="+_e+"&";
if(typeof _10!="undefined"&&_10!=null){
for(var p in _10){
_11+="&"+p+"="+_10[p];
}
}
var _13=fdGetAjaxObj();
if(typeof _13=="undefined"||_13==null){
return;
}
_13.open("POST",_f,true);
_13.setRequestHeader("Content-type","application/x-www-form-urlencoded");
_13.send(_11);
}
catch(e){
}
};
this.checkcontent=function(){
try{
if(this.count<10){
if(this.ifc!=null){
var _14=this.fdcp.browserDetect.browser=="Explorer"?this.ifc.contentWindow:this.ifc.contentDocument;
if(_14!="undefined"){
var _15=this.fdcp.browserDetect.browser=="Explorer"?_14.document.forms:_14.forms;
if(typeof _15["EOC"]!="undefined"){
clearInterval(this.tid);
this.fdcp.enPt(false);
if(this.fdcp.clt.getFDDebug()){
alert("CP Content Pass - Print");
}
var _16=this.fdcp.browserDetect.browser=="Explorer"?_14:this.ifc.contentWindow;
FDCPLoader.fdPrintWrapper(_16);
this.fdcp.enPt(true);
this.pcallback(true);
return true;
}else{
this.count=this.count+1;
}
}
}else{
this.count=this.count+1;
}
}else{
clearInterval(this.tid);
this.pcallback(false);
return false;
}
}
catch(e){
if(this.fdcp.clt.getFDDebug()){
alert("CP Content Fail : ["+e.message+"]");
}
this.count=10;
clearInterval(this.tid);
this.pcallback(false);
}
};
this.removeelements=function(){
var _17=this.validateAjaxPaths();
if(!_17){
return false;
}
var _18=this.fdcp.getCpPostData();
if(_18==null){
if(this.fdcp.clt.getFDDebug()){
alert("CP Content Fail");
}
return false;
}else{
if(this.fdcp.clt.getFDDebug()){
alert("CP Content Pass");
}
}
var _19=fdcp.clt.onPrint(_18);
if(typeof _19!="undefined"&&_19!=null&&_19==false){
return false;
}
var _1a=this.getOutputDocument(_18);
if(_1a.indexOf("<FORM id=\"EOC\" />")!=-1){
var _1b=document.getElementById(this.fd_div_id);
if(_1b!=null){
if(this.togEl(true)||this.togEl(true)){
if(typeof this.fdcp.clt.onBeforeCleanPrint!="undefined"){
_1a=this.fdcp.clt.onBeforeCleanPrint(_1a);
}
_1b.style.display="block";
_1b.innerHTML=_1a;
}
}
}
};
this.validateAjaxPaths=function(){
var _1c=new RegExp("^(?:(http[s]?)://([^/:]+)(:[0-9]+)?)?(.*)");
var _1d=this.fdcp.getCpUrl();
var _1e=_1c.exec(_1d);
if(_1e==null){
return false;
}
if(_1e[2]!=""){
var d=_1c.exec(window.location);
if(_1e[1]!=undefined&&_1e[1]+_1e[2]!=d[1]+d[2]){
return false;
}
if(_1e[3]!=d[3]){
return false;
}
}
return true;
};
this.getOutputDocument=function(_20){
var _21="";
for(var x in _20){
var n;
for(n=0;n<this.nonescnames.length;n++){
if(x==this.nonescnames[n]){
break;
}
}
if(n==this.nonescnames.length){
_21+=x+"="+escape(_20[x])+"&";
}else{
_21+=x+"="+_20[x]+"&";
}
}
var _24=fdGetAjaxObj();
if(typeof _24=="undefined"||_24==null){
return "";
}
_24.open("POST",this.fdcp.getCpUrl(),false);
_24.setRequestHeader("Content-type","application/x-www-form-urlencoded");
_24.send(_21);
if(_24.status==200){
return _24.responseText;
}
return "";
};
this.revertback=function(){
var _25=document.getElementById(this.fd_div_id);
if(_25!=null){
_25.innerHTML="";
_25.style.display="none";
}
this.togEl(false);
this.fdcp.CPFailover(true);
};
this.togEl=function(bp){
var d=document;
var _28=d.body;
var _29=new Array();
if(bp){
var i=0;
this.st=[];
for(i=0;i<_28.childNodes.length;i++){
if(typeof _28.childNodes[i].id!="undefined"&&_28.childNodes[i].id==this.fd_div_id){
continue;
}else{
if(_28.childNodes[i].nodeName=="STYLE"||_28.childNodes[i].nodeName=="LINK"){
if(_28.childNodes[i].disabled){
continue;
}else{
_28.childNodes[i].disabled=true;
this.st.push(_28.childNodes[i]);
}
}else{
this.rmEl.push(_28.childNodes[i]);
}
}
}
try{
for(i=0;i<this.rmEl.length;i++){
_28.removeChild(this.rmEl[i]);
_29.push(this.rmEl[i]);
}
}
catch(err){
if(_28.childNodes.length>0){
var e=_28.childNodes[0];
for(i=0;i<_29.length;i++){
_28.insertBefore(_29[i],e);
}
}else{
for(i=0;i<_29.length;i++){
_28.appendChild(_29[i]);
}
}
this.rmEl.length=0;
return false;
}
if(d.styleSheets){
var ss;
for(var i=0;i<d.styleSheets.length;i++){
ss=d.styleSheets[i];
if(this.fdcp.clt.cpc.stylesheets!=undefined){
var _2d=false;
for(var cps=0;cps<this.fdcp.clt.cpc.stylesheets.length;cps++){
if(ss.href==this.fdcp.clt.cpc.stylesheets[cps]){
_2d=true;
break;
}
}
if(!_2d){
if(ss.disabled==false){
ss.disabled=true;
this.st.push(ss);
}
}
}else{
if(ss.disabled==false){
ss.disabled=true;
this.st.push(ss);
}
}
}
}
}else{
for(var i=0;i<this.rmEl.length;i++){
_28.appendChild(this.rmEl[i]);
}
this.rmEl.length=0;
for(var i=0;i<this.st.length;i++){
this.st[i].disabled=false;
}
}
return true;
};
this.loadHandler=function(_2f){
if(navigator.appName.indexOf("Microsoft")!=-1&&parseInt(navigator.appVersion)>=4&&navigator.userAgent.indexOf("Windows")!=-1){
if(document.body!=null){
var div=document.createElement("div");
div.setAttribute("id",this.fd_div_id);
div.style["display"]="none";
document.body.appendChild(div);
div.innerHTML="FD HIDDEN DIV";
}
if(_2f.clt.cpc!=null&&_2f.clt.getcpStat()=="y"){
window.attachEvent("onbeforeprint",this.handleOnBeforePrint);
window.attachEvent("onafterprint",function(){
_2f.bridge.revertback();
_2f.clt.resetMode();
});
}
}
if(typeof Ajax=="undefined"){
var _31=this.fdcp.clt.getCfg("ajaxlib");
if(typeof _31=="undefined"||_31==null){
return;
}
var e=document.createElement("script");
e.src=_31;
e.type="text/javascript";
document.getElementsByTagName("head")[0].appendChild(e);
}
};
this.handleOnBeforePrint=function(){
if(fdcp.clt.mode==fdcp.clt.modes.unset){
fdcp.clt.mode=fdcp.clt.modes.filePrint;
}
fdcp.bridge.removeelements();
};
}
function FDCP(){
this.clt=FDCPLoader.FDCPClient;
this.bridge=new FDCPBridge({fdcp:this});
this.fdser=new FDSerializer(this.clt);
this.tstr=this.clt.getTPath();
this.logUrl=this.clt.getLPath();
this.pfLink=null;
this.linkClicked=false;
if(this.clt.getFDDebug()){
alert("TPath : ["+this.clt.getTPath()+"] Tmpl : ["+this.clt.getTmpl()+"] Div : ["+this.clt.getDiv()+"]");
}
this.cpEn=function(){
return fdcp.clt.cpc!=null&&fdcp.clt.getcpStat()=="y";
};
this.browserSupported=function(){
if(this.browserDetect.browser=="Opera"){
return false;
}else{
if((this.browserDetect.browser=="Safari")&&(this.browserDetect.OS=="Windows")){
return false;
}else{
return true;
}
}
};
this.getCpUrl=function(){
return this.tstr+"?"+(new Date()).getTime();
};
this.linkPrintHandler=function(_33){
if(_33!=undefined){
this.pfLink=_33;
}
if(this.cpEn()==false||!this.browserSupported()){
this.CPFailover(false);
return true;
}
try{
if(fdcp.linkClicked!=true){
fdcp.linkClicked=true;
var _34=this.getCpPostData();
this.clt.blkwidth=this.fdser.getWidestBlkWidth();
var _35=this.clt.onPrint(_34);
if(typeof _35!="undefined"&&_35!=null&&_35==false){
if(this.clt.getFDDebug()){
alert("onPrint() returned "+_35+", failing over");
}
this.CPFailover(false);
return false;
}
if(_34!=null){
if(this.clt.getFDDebug()){
alert("CPPostData - Pass");
}
this.bridge.cleanPrint(_34,this.clt.getTO(),function(_36){
fdcp.CPFailover(_36);
});
}else{
if(this.clt.getFDDebug()){
alert("CPPostData - Fail (cpdata is null)");
}
this.CPFailover(false);
}
}
}
catch(e){
if(this.clt.getFDDebug()){
alert("CPPostData - Fail (error): "+e.message);
}
fdcp.CPFailover(false);
}
return true;
};
this.getCpPostDataValue;
this.getCpPostData=function(){
if(typeof this.getCpPostDataValue!="undefined"&&this.getCpPostDataValue!=null){
return this.getCpPostDataValue;
}
if(typeof this.clt.getDiv()=="undefined"||this.clt.getDiv()==null||this.clt.getDiv().length==0){
this.bridge.log("ERROR","No division defined",this.logUrl);
return null;
}
if(typeof this.clt.getSegment()=="undefined"||this.clt.getSegment()==null){
this.bridge.log("ERROR","No segment defined",this.logUrl);
return null;
}
var pc=null;
if(typeof fdcp.clt.onBeforeContentSerialization=="function"){
fdcp.clt.onBeforeContentSerialization();
}
try{
pc=this.getPCXPath();
}
catch(e){
this.bridge.log("ERROR","Error parsing primary content.",this.logUrl);
return null;
}
finally{
if(typeof fdcp.clt.onAfterContentSerialization=="function"){
fdcp.clt.onAfterContentSerialization();
}
}
if(pc!=null&&pc.length==0){
pc=null;
}
var _38=null;
try{
_38=this.getImages();
}
catch(e){
this.bridge.log("ERROR","Error parsing for image data.",this.logUrl);
return null;
}
var _39=this.clt.getTmpl();
if(typeof _39=="undefined"||_39==null||_39.length==0){
pc="";
this.tmpl="";
}
var act="Unknown";
if(fdcp.clt.mode==fdcp.clt.modes.filePrint){
act="Chrome";
}else{
if(fdcp.clt.mode==fdcp.clt.modes.printLink||fdcp.clt.mode==fdcp.clt.modes.printerFriendlyViewer){
act="Link";
}
}
var _3b={d:this.clt.getDiv(),a:navigator.appName+" "+navigator.userAgent,s:this.clt.getSegment(),u:window.location.href,p:this.clt.getPFF(),r:this.clt.getRfmt(),q:"1.0",bn:this.browserDetect.browser,bv:this.browserDetect.version,template:_39,ci:_38,act:act};
if(pc!=null){
_3b.pc=pc;
}
var qp=this.clt.getVR();
if(typeof qp!="undefined"&&qp!=null){
for(var ki in qp){
_3b[ki]=qp[ki];
}
}
if(this.clt.getTemplateTest()){
_3b.tt=this.clt.getTemplateTest();
}
this.getCpPostDataValue=_3b;
return _3b;
};
this.getPCXPath=function(){
var _3e=new Array();
for(var i=0;i<this.xpathDefs.length;i++){
var _40=this.xpathDefs[i];
if(_40.selection=="exclude"){
var _41=this.getXPathNodes(_40);
if(_41==null){
return null;
}
for(var j=0;j<_41.length;j++){
_3e.push(_41[j]);
}
}
}
this.fdser.setExcludes(_3e);
var pc=new Object();
var _44=new Object();
var _45="";
for(var i=0;i<this.xpathDefs.length;i++){
var _40=this.xpathDefs[i];
if(_40.selection=="include"){
if(typeof _40.target=="undefined"||_40.target==null||_40.target==""){
_40.target="default";
}
var _46=this.getXPathNodes(_40);
if(_46==null){
return null;
}
if((typeof pc[_40.target]=="undefined"||pc[_40.target]==null)&&_46.length>0){
pc[_40.target]=new Array();
_44[_40.target]=_40.mode;
}
for(var j=0;j<_46.length;j++){
if((_45=="P"&&_46[j].nodeType==3)||(i!=0&&j==0)){
this.fdser.newpg(pc[_40.target]);
}
this.fdser.serializeNode(_46[j],pc[_40.target],null,_40.inlineDiv?"false":"true",_40.mode);
if(_40.pagebreak=="all"){
pc[_40.target].push("<pagebreak />");
}
if(_40.linebreak=="all"){
pc[_40.target].push("<text style=\"color: rgb(0, 0, 0); font-style: normal; font-family: serif; font-weight: 400; font-size: 16px;\"><BR/></text>");
}
_45=_46[j].nodeName;
}
if(_40.pagebreak=="last"){
if(pc[_40.target]!=null){
pc[_40.target].push("<pagebreak />");
}
}
if(_40.linebreak=="last"){
if(pc[_40.target]!=null){
pc[_40.target].push("<text style=\"color: rgb(0, 0, 0); font-style: normal; font-family: serif; font-weight: 400; font-size: 16px;\"><BR/></text>");
}
}
}
}
var _47=0;
var _48=new String("");
for(var key in pc){
_48+="<subcontent content_id=\""+key+"\" mode=\""+(typeof _44[key]=="undefined"?"normal":_44[key])+"\"><paragraph>";
for(var i=0;i<pc[key].length;i++){
_48+=pc[key][i];
_47++;
}
_48+="</paragraph></subcontent>";
}
if(_47==0){
return null;
}else{
if(this.clt.getFDDebug()){
alert("ContentCount : ["+_47+"]");
}
}
return "<content>"+_48+"</content>";
};
this.getXPathNodes=function(_4a){
var _4b=document;
var _4c=document;
if(typeof this.contextXpath!="undefined"){
if(this.browserDetect.browser=="Explorer"){
_4b=document;
_4c=frames["contextFrame"].document;
}else{
_4b=this.contextXpath;
_4c=_4b.documentElement;
}
}
var rv=new Array();
try{
var _4e=_4b.evaluate(_4a.query,_4c,null,XPathResult.UNORDERED_NODE_ITERATOR_TYPE,null);
var _4f=_4e.iterateNext();
if(_4a.occurrence=="once"){
if(_4f){
if(_4a.include=="outer"){
rv.push(_4f);
}else{
if(_4a.include=="inner"){
var _50=_4f.childNodes;
var _51="";
for(var j=0;j<_50.length;j++){
rv.push(_50[j]);
}
}
}
}else{
}
}else{
if(_4a.occurrence=="all"){
while(_4f){
if(_4a.include=="outer"){
rv.push(_4f);
}else{
if(_4a.include=="inner"){
var _50=_4f.childNodes;
var _51="";
for(var j=0;j<_50.length;j++){
rv.push(_50[j]);
}
}
}
_4f=_4e.iterateNext();
}
}
}
}
catch(e){
return null;
}
if(rv.length<_4a.required){
if(this.clt.getFDDebug()){
alert("No content found for required xpath: "+_4a.query);
}
return null;
}
return rv;
};
this.sortXPathDefs=function(_53){
var _54=new Array();
var _55=new Array();
var _56=new Array();
var _57=new Array();
for(var i=0;i<_53.length;i++){
var _59=_53[i];
if(_59.selection=="exclude"){
_54.push(_59);
}else{
if(_59.location=="front"){
_55.push(_59);
}else{
if(_59.location=="domOrder"){
_56.push(_59);
}else{
if(_59.location=="back"){
_57.push(_59);
}
}
}
}
}
return _54.concat(_55.concat(_56.concat(_57)));
};
this.replacePrintLinks=function(){
this.xpathDefs=FDCPLoader.cpDef.xpathDefs;
var _5a=new Array();
var _5b=false;
for(var i=0;i<this.xpathDefs.length;i++){
var _5d=this.xpathDefs[i];
if(typeof _5d.context!="undefined"&&_5d.context!="self"){
_5b=true;
}
if(_5d.selection=="printlink"){
var _5e=this.getXPathNodes(_5d);
if(_5e==null){
return null;
}
for(var j=0;j<_5e.length;j++){
_5a.push(_5e[j]);
}
}
}
if(!_5b&&FDCPLoader.FDCPClient.cpc.preloadPF){
FDCPLoader.FDCPClient.cpc.preloadPF=false;
}
var _60=typeof FDCPLoader.FDCPClient.getIframeUrls=="undefined"||typeof FDCPLoader.FDCPClient.getIframeUrls()=="undefined"?[]:FDCPLoader.FDCPClient.getIframeUrls();
if(_5b&&_60.length==1&&_60[0]==window.location.href){
for(var i=0;i<this.xpathDefs.length;i++){
var _5d=this.xpathDefs[i];
_5b.context="self";
}
}else{
if(_5b&&_60.length==1&&FDCPLoader.FDCPClient.cpc.preloadPF){
this.createContextFrame(_60[0]);
}
}
for(var i=0;i<_5a.length;i++){
var _61=_5a[i];
if(_61.nodeName=="A"){
_61.href="#";
_61.onclick=function(){
FDCPUrl();
return false;
};
}else{
if(_61.nodeName=="BUTTON"){
_61.onclick=function(){
FDCPUrl();
return false;
};
}
}
}
};
this.contextFrameLoaded=false;
this.contextFrame;
this.contextXpath;
this.createContextFrame=function(url){
this.contextFrame=document.createElement("iframe");
this.contextFrame.setAttribute("src",url);
this.contextFrame.setAttribute("id","contextFrame");
this.contextFrame.setAttribute("NAME","contextFrame");
if(this.browserDetect.browser=="Explorer"){
this.contextFrame.onreadystatechange=function(){
if(fdcp.contextFrame.readyState=="complete"){
fdcp.contextFrameLoaded=true;
fdcp.contextXpath=frames[fdcp.contextFrame.name].document;
}
};
}else{
this.contextFrame.onload=function(){
fdcp.contextFrameLoaded=true;
if(fdcp.browserDetect.browser=="Firefox"&&fdcp.browserDetect.version==3){
fdcp.contextXpath=fdcp.contextFrame.contentDocument;
}else{
fdcp.contextXpath=frames[fdcp.contextFrame.name].document;
}
};
}
this.contextFrame.style.width="1px";
this.contextFrame.style.height="1px";
this.contextFrame.style.position="absolute";
this.contextFrame.style.top="-3000px";
this.contextFrame.style.border="0px";
document.body.appendChild(this.contextFrame);
};
this.printerFriendlyViewerTemplateLoadStart=0;
this.printerFriendlyViewerTemplatePolledOnce=false;
this.printerFriendlyViewerTemplateLoadTimeout=3*1000;
this.printerFriendlyVieweriFrameTag="<ifra"+"me id='pfContent' src='xxx' width='100%' height='100%'></ifra"+"me>";
this.loadPrinterFriendlyViewer=function(){
if(typeof _fdCpOutput=="undefined"||_fdCpOutput==""){
if(this.printerFriendlyViewerTemplatePolledOnce==false){
this.printerFriendlyViewerTemplatePolledOnce=true;
setTimeout("fdcp.loadPrinterFriendlyViewer()",1);
return;
}
if((new Date()).getTime()>this.printerFriendlyViewerTemplateLoadStart+this.printerFriendlyViewerTemplateLoadTimeout){
this.CPFailover(false);
}else{
setTimeout("fdcp.loadPrinterFriendlyViewer()",100);
return;
}
}else{
this.printerFriendlyViewerTemplatePolledOnce=false;
var _63=(new Date()).getTime()+""+Math.floor((Math.random()*1000000));
_fdCpOutput=_fdCpOutput.replace("\"0\";/*fdUniqueIdReplace*/","\""+_63+"\";/*replaced*/");
try{
FDCPLoader.printPreviewWindow.document.body.innerHTML="";
}
catch(err){
}
if(typeof this.outputDocument=="undefined"||this.outputDocument==""){
FDCPLoader.printPreviewWindow.document.write(_fdCpOutput.replace("<!--Print Content-->",this.printerFriendlyVieweriFrameTag.replace("xxx",this.pfLink)));
}else{
var _64=this.outputDocument;
while(_64.indexOf("$pageId$")!=-1){
_64=_64.replace("$pageId$",_63);
}
FDCPLoader.printPreviewWindow.document.write(_fdCpOutput.replace("<!--Print Content-->",_64));
}
FDCPLoader.printPreviewWindow.document.close();
}
};
this.loadPrinterFriendlyViewerTemplateScript=function(){
var _65=this.clt.getVR();
var _66="";
if(typeof _65!="undefined"&&_65!=null){
for(var ki in _65){
_66+="&"+ki+"="+_65[ki];
}
}
this.printerFriendlyViewerTemplateLoadStart=(new Date()).getTime();
if(typeof _fdCpOutput=="undefined"){
var _68=document.createElement("script");
if(_66!=""){
_68.src="http://"+this.clt.cpHost+"/cpv/viewer?divId="+this.clt.divid+_66;
}else{
_68.src="http://"+this.clt.cpHost+"/cpv/viewer?divId="+this.clt.divid;
}
_68.type="text/javascript";
document.getElementsByTagName("head")[0].appendChild(_68);
}
};
this.getImages=function(){
var _69=new Array();
var _6a="<images>";
if(typeof fdImages!="undefined"){
for(var n=0;n<fdImages.length;n++){
var img=document.getElementById(fdImages[n]);
if(img!=null){
this.fdser.serializeNode(img,_69,false);
}
}
for(var i=0;i<_69.length;i++){
_6a+=_69[i];
}
}
_6a+="</images>";
return _6a;
};
this.enPt=function(_6e){
if(typeof formatDynamicsPT!="undefined"){
for(i=0;i<document.styleSheets.length;i++){
try{
var _6f=document.styleSheets[i];
if(navigator.appName.indexOf("Microsoft")==-1&&formatDynamicsPT.isPtCss(_6f.cssRules[0].style.content)){
_6f.disabled=!_6e;
break;
}
}
catch(e){
}
}
}
};
this.CPFailover=function(_70){
this.linkClicked=false;
if(_70==false){
if(this.pfLink!=null){
var _71=this.clt.getCfg("pfType",null);
if(_71==null||_71.toLowerCase()=="replace"){
window.open(this.pfLink,"_self");
return false;
}else{
window.open(this.pfLink);
return false;
}
}
FDCPLoader.fdPrintWrapper();
}
this.clt.onAfterCleanPrint();
};
this.browserDetect={init:function(){
this.browser=this.searchString(this.dataBrowser)||"An unknown browser";
this.version=this.searchVersion(navigator.userAgent)||this.searchVersion(navigator.appVersion)||"an unknown version";
this.OS=this.searchString(this.dataOS)||"an unknown OS";
},searchString:function(_72){
for(var i=0;i<_72.length;i++){
var _74=_72[i].string;
var _75=_72[i].prop;
this.versionSearchString=_72[i].versionSearch||_72[i].identity;
if(_74){
if(_74.indexOf(_72[i].subString)!=-1){
return _72[i].identity;
}
}else{
if(_75){
return _72[i].identity;
}
}
}
},searchVersion:function(_76){
var _77=_76.indexOf(this.versionSearchString);
if(_77==-1){
return;
}
return parseFloat(_76.substring(_77+this.versionSearchString.length+1));
},dataBrowser:[{string:navigator.userAgent,subString:"OmniWeb",versionSearch:"OmniWeb/",identity:"OmniWeb"},{string:navigator.vendor,subString:"Apple",identity:"Safari"},{prop:window.opera,identity:"Opera"},{string:navigator.vendor,subString:"iCab",identity:"iCab"},{string:navigator.vendor,subString:"KDE",identity:"Konqueror"},{string:navigator.userAgent,subString:"Firefox",identity:"Firefox"},{string:navigator.vendor,subString:"Camino",identity:"Camino"},{string:navigator.userAgent,subString:"Netscape",identity:"Netscape"},{string:navigator.userAgent,subString:"MSIE",identity:"Explorer",versionSearch:"MSIE"},{string:navigator.userAgent,subString:"Gecko",identity:"Mozilla",versionSearch:"rv"},{string:navigator.userAgent,subString:"Mozilla",identity:"Netscape",versionSearch:"Mozilla"}],dataOS:[{string:navigator.platform,subString:"Win",identity:"Windows"},{string:navigator.platform,subString:"Mac",identity:"Mac"},{string:navigator.platform,subString:"Linux",identity:"Linux"}]};
this.loadHandler=function(){
var _78=this.browserDetect.browser=="Explorer"&&this.browserDetect.OS=="Windows";
if(!this.cpEn()){
formatDynamicsPT.initIE();
}else{
fdcp.bridge.loadHandler(this);
}
};
this.browserDetect.init();
}
var fdcp=new FDCP();
if(typeof FDCPLoader!="undefined"){
fdcp.loadHandler();
}else{
if(window.addEventListener){
window.addEventListener("load",function(){
fdcp.loadHandler();
},false);
}else{
if(window.attachEvent){
window.attachEvent("onload",function(){
fdcp.loadHandler();
});
}
}
}
FDCPLoader.registerModuleLoaded("cp.js");
if(typeof FDCPLoader.FDCPClient.onCpLoad=="function"){
FDCPLoader.FDCPClient.onCpLoad();
}
function FDSerializer(_79){
this.fdclient=_79;
this._bxs="border-style";
this._bbs="border-bottom-style";
this._bts="border-top-style";
this._bls="border-left-style";
this._brs="border-right-style";
this._bxw="border-width";
this._bbw="border-bottom-width";
this._btw="border-top-width";
this._blw="border-left-width";
this._brw="border-right-width";
this._bxc="border-color";
this._bbc="border-bottom-color";
this._btc="border-top-color";
this._blc="border-left-color";
this._brc="border-right-color";
this._ffam="font-family";
this._fsiz="font-size";
this._fwei="font-weight";
this._fsty="font-style";
this._fcol="color";
this._tdec="text-decoration";
this._bgc="background-color";
this._bgi="background-image";
this._bgr="background-repeat";
this._mta="text-align";
this._brcl="border-collapse";
this._brsp="border-spacing";
this._px="padding";
this._pb="padding-bottom";
this._pt="padding-top";
this._pl="padding-left";
this._pr="padding-right";
this._clear="clear";
this._float="float";
this._mb="margin-bottom";
this._mt="margin-top";
this.sm=new Array();
this.sm[this._bxs]="borderStyle";
this.sm[this._bbs]="borderBottomStyle";
this.sm[this._bts]="borderTopStyle";
this.sm[this._bls]="borderLeftStyle";
this.sm[this._brs]="borderRightStyle";
this.sm[this._bxw]="borderWidth";
this.sm[this._bbw]="borderBottomWidth";
this.sm[this._btw]="borderTopWidth";
this.sm[this._blw]="borderLeftWidth";
this.sm[this._brw]="borderRightWidth";
this.sm[this._bxc]="borderColor";
this.sm[this._bbc]="borderBottomColor";
this.sm[this._btc]="borderTopColor";
this.sm[this._blc]="borderLeftColor";
this.sm[this._brc]="borderRightColor";
this.sm[this._ffam]="fontFamily";
this.sm[this._fsiz]="fontSize";
this.sm[this._fwei]="fontWeight";
this.sm[this._fsty]="fontStyle";
this.sm[this._fcol]="color";
this.sm[this._tdec]="textDecoration";
this.sm[this._clear]="clear";
this.sm[this._float]="float";
this.sm[this._bgc]="backgroundColor";
this.sm[this._bgi]="backgroundImage";
this.sm[this._bgr]="backgroundRepeat";
this.sm[this._mta]="textAlign";
this.sm[this._brcl]="borderCollapse";
this.sm[this._brsp]="borderSpacing";
this.sm[this._px]="padding";
this.sm[this._pb]="paddingBottom";
this.sm[this._pt]="paddingTop";
this.sm[this._pl]="paddingLeft";
this.sm[this._pr]="paddingRight";
this.sm[this._mb]="marginBottom";
this.sm[this._mt]="marginTop";
this.sz=new Array();
this.sz["xx-small"]="8pt";
this.sz["x-small"]="10pt";
this.sz["small"]="12pt";
this.sz["medium"]="14pt";
this.sz["large"]="18pt";
this.sz["x-large"]="24pt";
this.sz["xx-large"]="35pt";
this.sz["auto"]="10pt";
this.ftsz=new Array();
this.ftsz[1]="10px";
this.ftsz[2]="12px";
this.ftsz[3]="14px";
this.ftsz[4]="18px";
this.ftsz[5]="24px";
this.ftsz[6]="30px";
this.ftsz[7]="48px";
this._widestblkwidth=0;
this.excludesXpath=new Array();
this.text_only_state={off:0,on:1,once:2};
this.getHeadingLevel=function(_7a){
if(_7a=="H1"){
return "24pt";
}else{
if(_7a=="H2"){
return "18pt";
}else{
if(_7a=="H3"){
return "14pt";
}else{
if(_7a=="H4"){
return "12pt";
}else{
if(_7a=="H5"){
return "10pt";
}else{
if(_7a=="H6"){
return "8pt";
}else{
return "12pt";
}
}
}
}
}
}
};
this.translateStyle=function(_7b){
if(_7b=="float"){
if(fdcp.browserDetect.browser=="Explorer"){
return "styleFloat";
}else{
return "cssFloat";
}
}
var v=this.sm[_7b];
if(v){
return v;
}
return _7b;
};
this.isMT=function(val){
return val==null||typeof val=="undefined"||val=="";
};
this.isRelFont=function(sz){
return sz.indexOf("%")>0||sz.indexOf("em")>0||sz.indexOf("ex")>0;
};
this.getStyleValue=function(_7f,_80,_81){
var _82=this.translateStyle(_80);
if(typeof _81!="undefined"&&_81==true){
if(_7f.style[_82].length>0){
return _7f.style[_82];
}else{
return null;
}
}
if(_80=="width"&&_7f.offsetWidth){
var _83=this.getStyleValue(_7f,this._pl);
var _84=this.getStyleValue(_7f,this._pr);
var _85=_7f.offsetWidth;
if(_83.indexOf("px")!=-1){
_85-=_83.substring(0,_83.length-2);
}
if(_84.indexOf("px")!=-1){
_85-=_84.substring(0,_84.length-2);
}
return _85;
}
if(_80=="height"&&(typeof _7f.offsetHeight!="undefined"&&_7f.offsetHeight!=null)){
if(fdcp.browserDetect.browser=="Firefox"&&fdcp.browserDetect.version==2&&_7f.nodeName=="SPAN"){
var _86=typeof _7f.offsetHeight!="undefined"&&_7f.offsetHeight!=null?_7f.offsetHeight:0;
for(var i=0;i<_7f.childNodes.length;i++){
if(_7f.childNodes[i].nodeType!=3){
_86+=this.getStyleValue(_7f.childNodes[i],"height");
}
}
return _86;
}else{
if(_7f.offsetHeight==0){
if(_7f.childNodes.length==1){
if(typeof this.getStyleValue(_7f.childNodes[0],"float")!="undefined"&&this.getStyleValue(_7f.childNodes[0],"float")!=null){
var _88=this.getStyleValue(_7f.childNodes[0],"float");
var _89=0;
if(_88=="left"){
_89=this.getStyleValue(_7f.childNodes[0],"height");
return _89;
}
}
}
return _7f.offsetHeight;
}else{
var _8a=_7f.offsetHeight;
if(_7f.nodeName=="DIV"||_7f.nodeName=="TD"||_7f.nodeName=="TH"||_7f.nodeName.match(/^H\d$/)!=null){
var _8b=this.getStyleValue(_7f,this._pt);
var _8c=this.getStyleValue(_7f,this._pb);
if(_8b.indexOf("px")!=-1){
_8a-=_8b.substring(0,_8b.length-2);
}
if(_8c.indexOf("px")!=-1){
_8a-=_8c.substring(0,_8c.length-2);
}
}
return _8a;
}
}
return _7f.offsetHeight;
}
if(_7f.currentStyle&&fdcp.browserDetect.browser=="Explorer"){
var _8d=_7f.currentStyle[_82];
if(_80==this._fsiz&&_8d.match(/^\d+$/)!=null){
if(_8d<1){
_8d=1;
}else{
if(_8d>7){
_8d=7;
}
}
_8d=this.ftsz[_8d];
}
return _8d;
}else{
try{
var _8e=document.defaultView.getComputedStyle(_7f,"");
var ret=_8e[_82];
return ret;
}
catch(e){
if(_80!=this._float){
try{
var _8e=document.defaultView.getComputedStyle(_7f.parentNode,"");
var ret=_8e[_82];
return ret;
}
catch(e2){
var _90=_7f.parentNode.currentStyle[_82];
if(fdcp.browserDetect.browser=="Explorer"&&_80==this._fsiz&&_90.match(/^\d+$/)!=null){
_90=this.getIeFtSz(_90);
}
return _90;
}
}else{
return null;
}
}
}
};
this.getIeFtSz=function(_91){
if(_91<1){
_91=1;
}else{
if(_91>7){
_91=7;
}
}
return this.ftsz[_91];
};
this.getBorderStyles=function(_92){
var bxs,bbs,bts,bls,brs;
var bxw,bbw,btw,blw,brw;
var bxc,bbc,btc,blc,brc;
bxs=this.getStyleValue(_92,this._bxs);
bbs=this.getStyleValue(_92,this._bbs);
bts=this.getStyleValue(_92,this._bts);
bls=this.getStyleValue(_92,this._bls);
brs=this.getStyleValue(_92,this._brs);
var _a2=bbs||bts||bls||brs;
if(!bxs&&!_a2){
return "";
}
var _a3="";
if(_a2&&!(bbs==bts&&bts==bls&&bls==brs)){
if(bbs&&bbs!=null&&bbs.length>0){
_a3+=this._bbs+":"+bbs+";";
}
if(bts&&bts!=null&&bts.length>0){
_a3+=this._bts+":"+bts+";";
}
if(bls&&bls!=null&&bls.length>0){
_a3+=this._bls+":"+bls+";";
}
if(brs&&brs!=null&&brs.length>0){
_a3+=this._brs+":"+brs+";";
}
}else{
if(_a2=="none"){
return "";
}else{
if(_a2&&(bbs==bts&&bts==bls&&bls==brs)){
_a3+=this._bxs+":"+bbs+";";
}else{
if(bxs&&bxs!=null&&bxs.length>0){
_a3+=this._bxs+":"+bxs+";";
}
}
}
}
bxw=this.getStyleValue(_92,this._bxw);
bbw=this.getStyleValue(_92,this._bbw);
btw=this.getStyleValue(_92,this._btw);
blw=this.getStyleValue(_92,this._blw);
brw=this.getStyleValue(_92,this._brw);
var _a4=bbw||btw||blw||brw;
bxc=this.getStyleValue(_92,this._bxc);
bbc=this.getStyleValue(_92,this._bbc);
btc=this.getStyleValue(_92,this._btc);
blc=this.getStyleValue(_92,this._blc);
brc=this.getStyleValue(_92,this._brc);
var _a5=bbc||btc||blc||brc;
if(_a4&&!(bbw==btw&&btw==blw&&blw==brw)){
if(bbw&&bbw!=null&&bbw.length>0){
_a3+=this._bbw+":"+bbw+";";
}
if(btw&&btw!=null&&btw.length>0){
_a3+=this._btw+":"+btw+";";
}
if(blw&&blw!=null&&blw.length>0){
_a3+=this._blw+":"+blw+";";
}
if(brw&&brw!=null&&brw.length>0){
_a3+=this._brw+":"+brw+";";
}
}else{
if(_a4&&(bbw==btw&&btw==blw&&blw==brw)){
_a3+=this._bxw+":"+bbw+";";
}else{
if(bxw&&bxw!=null&&bxw.length>0){
_a3+=this._bxw+":"+bxw+";";
}
}
}
if(_a5&&!(bbc==btc&&btc==blc&&blc==brc)){
if(bbc&&bbc!=null&&bbc.length>0){
_a3+=this._bbc+":"+bbc+";";
}
if(btc&&btc!=null&&btc.length>0){
_a3+=this._btc+":"+btc+";";
}
if(blc&&blc!=null&&blc.length>0){
_a3+=this._blc+":"+blc+";";
}
if(brc&&brc!=null&&brc.length>0){
_a3+=this._brc+":"+brc+";";
}
}else{
if(_a5&&(bbc==btc&&btc==blc&&blc==brc)){
_a3+=this._bxc+":"+bbc+";";
}else{
if(bxc&&bxc!=null&&bxc.length>0){
_a3+=this._bxc+":"+bxc+";";
}
}
}
return _a3;
};
this.getPaddingStyle=function(_a6){
var px,pb,pt,pl,pr;
px=this.getStyleValue(_a6,this._px);
pb=this.getStyleValue(_a6,this._pb);
pt=this.getStyleValue(_a6,this._pt);
pl=this.getStyleValue(_a6,this._pl);
pr=this.getStyleValue(_a6,this._pr);
var _ac=pb||pt||pl||pr;
if(!px&&!_ac){
return "";
}
var _ad="";
if(_ac&&!(pb==pt&&pt==pl&&pl==pr)){
if(pb&&pb!=null&&pb.length>0){
_ad+=this._pb+":"+pb+";";
}
if(pt&&pt!=null&&pt.length>0){
_ad+=this._pt+":"+pt+";";
}
if(pl&&pl!=null&&pl.length>0){
_ad+=this._pl+":"+pl+";";
}
if(pr&&pr!=null&&pr.length>0){
_ad+=this._pr+":"+pr+";";
}
}else{
if(_ac=="none"){
return "";
}else{
if(_ac&&(pb==pt&&pt==pl&&pl==pr)){
_ad+=this._px+":"+pb+";";
}else{
if(px&&px!=null&&px.length>0){
_ad+=this._px+":"+px+";";
}
}
}
}
return _ad;
};
this.getMultiplier=function(str){
if(str.indexOf("%")>0){
var num=str.substring(0,str.indexOf("%"));
return num/100;
}
if(str.indexOf("em")>0){
var num=str.substring(0,str.indexOf("em"));
return num;
}
if(str.indexOf("ex")>0){
var num=str.substring(0,str.indexOf("ex"));
return num*0.4;
}
};
this.calculateFontSize=function(_b0){
var _b1=new Array();
var _b2;
var _b3;
_b1.push(this.getStyleValue(_b0,"font-size"));
_b0=_b0.parentNode;
while(_b0!=null){
if(_b0.nodeType==3){
_b0=_b0.parentNode;
continue;
}
if((_b3=this.getStyleValue(_b0,"font-size",true))==null){
_b3=this.getStyleValue(_b0,"font-size");
}
if(_b0.nodeName=="BODY"){
if(_b3==null){
_b3="12pt";
}else{
if(_b3.indexOf("%")!=-1){
var _b4=_b3.substring(0,_b3.length-1);
_b3=12*(_b4/100);
_b3=_b3+"pt";
}
}
break;
}else{
if(_b3!=null){
if(this.isRelFont(_b3)){
if(_b3!=_b1[_b1.length-1]){
_b1.push(_b3);
}
}else{
break;
}
}
}
_b0=_b0.parentNode;
}
if(this.sz[_b3]!=null){
_b3=this.sz[_b3];
}
_b2=_b3.substring(_b3.length-2);
_b3=_b3.substring(0,_b3.length-2);
for(var i=0;i<_b1.length;i++){
_b3=_b3*this.getMultiplier(_b1[i]);
}
return Math.round(_b3)+_b2;
};
this.getImageStyle=function(_b6,_b7){
var _b8=_b6.width;
var _b9=_b6.height;
if(!_b8){
_b8=this.getStyleValue(_b6,"width");
}
if(!_b9){
_b9=this.getStyleValue(_b6,"height");
}
var _ba="style=\""+"width:"+_b8+";height:"+_b9+";";
if(_b7==false){
var _bb=this.getBorderStyles(_b6);
if(typeof this.getStyleValue(_b6,"float")!="undefined"&&this.getStyleValue(_b6,"float")!=null){
_ba+="float:"+this.getStyleValue(_b6,"float")+";";
}
if(_bb){
_ba+=_bb;
}
}
_ba+="\"";
return _ba;
};
this.getNodeStyle=function(_bc,blk,_be){
var _bf="style=\"";
var _c0=this.getStyleValue(_bc,this._ffam);
var _c1=this.getStyleValue(_bc,this._fsiz);
var _c2=this.getStyleValue(_bc,this._fwei);
var _c3=this.getStyleValue(_bc,this._tdec);
if(fdcp.browserDetect.browser=="Firefox"){
var _c4=parseInt(_c2);
if(typeof _c4!="undefined"&&!isNaN(_c4)&&_c4==401){
_c2=700;
}
}
var _c5=this.getStyleValue(_bc,this._fsty);
var _c6=this.getStyleValue(_bc,this._fcol);
var reg=new RegExp("MS Sans Serif","i");
_c0=_c0.replace(reg,"sans-serif");
if(_c0.indexOf("\"")>=0){
_c0=_c0.replace(/\"/g,"");
}
if(_c0.indexOf("'")>=0){
_c0=_c0.replace(/\'/g,"");
}
if(this.isRelFont(_c1)){
_c1=this.calculateFontSize(_bc);
}
_bf+=this._ffam+":"+_c0+";"+this._fsiz+":"+_c1+";"+this._fwei+":"+_c2+";"+this._fsty+":"+_c5+";"+this._fcol+":"+_c6+";"+(_c3=="none"?"":this._tdec+":"+_c3+";");
if(blk){
var _c8=false;
if(_bc.nodeName=="SPAN"){
var f=this.getStyleValue(_bc,"float");
if(typeof f=="undefined"||f==null&&(f!="right"&&f!="left")){
_c8=true;
}
}
var _ca=this.getStyleValue(_bc,"width",_c8);
var _cb=this.getStyleValue(_bc,"height",_c8);
var _cc=this.getBorderStyles(_bc);
var _cd=this.getPaddingStyle(_bc);
var _ce=this.getStyleValue(_bc,this._mta);
var _cf=this.getStyleValue(_bc,this._bgc);
var _d0=this.getStyleValue(_bc,this._bgi).replace(/\"/g,"'");
var _d1=this.getStyleValue(_bc,this._bgr);
var _d2=this.getStyleValue(_bc,this._clear);
var _d3=this.getStyleValue(_bc,this._float);
var _d4=this.getStyleValue(_bc,this._bbw);
var _d5=this.getStyleValue(_bc,this._btw);
var _d6=this.getStyleValue(_bc,this._blw);
var _d7=this.getStyleValue(_bc,this._brw);
var cf=_c1.substring(0,_c1.length-2);
if(this.isRelFont(_d4)){
_d4=_d4.substring(0,_d4.length-2);
_d4=_d4*cf;
_d4=_d4+"px";
}
if(this.isRelFont(_d5)){
_d5=_d5.substring(0,_d5.length-2);
_d5=_d5*cf;
_d5=_d5+"px";
}
if(this.isRelFont(_d6)){
_d6=_d6.substring(0,_d6.length-2);
_d6=_d6*cf;
_d6=_d6+"px";
}
if(this.isRelFont(_d7)){
_d7=_d7.substring(0,_d7.length-2);
_d7=_d7*cf;
_d7=_d7+"px";
}
if(_d4!=null){
_bf+=this._bbw+":"+_d4+";";
}
if(_d5!=null){
_bf+=this._btw+":"+_d5+";";
}
if(_d6!=null){
_bf+=this._blw+":"+_d6+";";
}
if(_d7!=null){
_bf+=this._brw+":"+_d7+";";
}
_bf+=this._clear+":"+_d2+";"+(_d3=="left"||_d3=="right"?(this._float+":"+_d3+";"):"");
_bf+=_cc+_cd;
if(_ca!=null&&_ca!="auto"&&_ca!="0auto"){
_bf+="width: "+_ca+";";
}
if(_cb!=null&&_cb!="auto"&&_cb!="0auto"){
if(_be&&_be>0&&(_bc.nodeName=="TD"||_bc.nodeName=="TH")){
_cb-=_be;
}
_bf+="height: "+_cb+";";
}
var mt=this.getStyleValue(_bc,this._mt);
var mb=this.getStyleValue(_bc,this._mb);
if(mt!="auto"){
if((_bc.nodeName=="LI"&&mt.charAt(0)!="0")||(_bc.nodeName!="LI"&&(mt.charAt(0)=="0"||mt.charAt(0)=="-"||_bc.nodeName=="P"||_bc.nodeName=="UL"||_bc.nodeName=="OL"))){
_bf+=this._mt+":"+mt+";";
}
}
if(mb!="auto"){
if((_bc.nodeName=="LI"&&mb.charAt(0)!="0")||(_bc.nodeName!="LI"&&(mb.charAt(0)=="0"||mb.charAt(0)=="-"||_bc.nodeName=="UL"||_bc.nodeName=="OL"))){
_bf+=this._mb+":"+mb+";";
}
}
if(_bc.nodeName=="UL"||_bc.nodeName=="OL"||_bc.nodeName=="LI"){
var _db=this.getStyleValue(_bc,"lineHeight");
if(_db!="auto"){
_bf+="line-height:"+_db+";";
}else{
_bf+="line-height: 1.2;";
}
if(_bc.nodeName=="UL"||_bc.nodeName=="OL"||_bc.nodeName=="LI"){
var _dc="";
if(_bc.currentStyle){
_dc=_bc.currentStyle["listStyleType"];
_bf+="list-style-type:"+_dc+";";
}else{
if(window.getComputedStyle){
_dc=document.defaultView.getComputedStyle(_bc,null).getPropertyValue("list-style-type");
_bf+="list-style-type:"+_dc+";";
}
}
}
}else{
var _db=this.getStyleValue(_bc,"lineHeight");
if(_db!="auto"){
_bf+="line-height:"+_db+";";
}
}
if(_cf!="transparent"){
_bf+=this._bgc+":"+_cf+";";
}
if(_d0!="none"){
if(fdcp.browserDetect.browser=="Firefox"){
var _dd=_d0.replace("url(","url('");
var _de=_dd.replace(")","')");
_d0=_de;
_bf+=this._bgi+":"+_d0+";";
}else{
_bf+=this._bgi+":"+_d0+";";
}
}
if(_d1!="repeat"){
_bf+=this._bgr+":"+_d1+";";
}
_bf+=this._mta+":"+_ce+";";
if(_bc.nodeName=="TABLE"){
var v=this.getStyleValue(_bc,this._brcl);
if(!this.isMT(v)){
_bf+=this._brcl+":"+v+";";
}
v=this.getStyleValue(_bc,this._brsp);
if(!this.isMT(v)){
_bf+=this._brsp+":"+v+";";
}
}
}
return _bf+"\"";
};
this.serializeText=function(_e0,_e1){
var st=_e0.nodeValue;
if(st&&st.replace(/[\r\n]/g,"").match(/^\t*$/)==null){
st="";
if(_e1!="data"){
var st=" "+this.getNodeStyle(_e0,false);
if(_e0.nodeValue=="<"){
_e0.nodeValue="&lt;";
}
if(_e0.nodeValue==">"){
_e0.nodeValue="&gt;";
}
}
return "<text"+st+">"+C2E(_e0.nodeValue)+"</text>";
}
return "";
};
function C2E(str){
var acc="";
for(var i=0;i<str.length;i++){
if(str.charCodeAt(i)>31&&str.charCodeAt(i)<127){
acc+=str.charAt(i);
}else{
acc+="&#"+str.charCodeAt(i)+";";
}
}
acc=acc.replace(/&/g,"&#38;");
acc=acc.replace(/'/g,"&#39;");
acc=acc.replace(/"/g,"&#34;");
acc=acc.replace(/\\/g,"&#92;");
acc=acc.replace(/\+/g,"&#43;");
acc=acc.replace(/</g,"&#60;");
acc=acc.replace(/>/g,"&#62;");
return acc;
}
this.serializeCDATA=function(_e6){
return "<![CDATA["+_e6.nodeValue+"]]>";
};
this.serializeBR=function(_e7,_e8){
return "<text"+(_e8=="data"?"":" "+this.getNodeStyle(_e7,false))+"><"+_e7.nodeName+" /></text>";
};
this.serializeImage=function(_e9,_ea){
var _eb;
var st="";
st=this.getImageStyle(_e9,_ea=="data");
var src=_e9.getAttribute("src");
var alt=_e9.getAttribute("alt");
var _ef=_e9.getAttribute("align");
var _f0=_e9.ownerDocument;
if(src.indexOf("http")==0){
}else{
if(src.charAt(0)=="/"){
var url=_f0.URL;
var _f2=new RegExp("^http(?:s)?://[^/]*");
var res=_f2.exec(url);
var _f4=res[0];
src=_f4+src;
}else{
var url=_f0.URL;
var _f2=new RegExp("^http(?:s)?://[^?]*");
var res=_f2.exec(url);
var _f4=res[0];
_f4=_f4.substring(0,_f4.lastIndexOf("/"));
src=_f4+"/"+src;
}
}
_eb="<image ";
if(_e9.id){
_eb+="id='"+_e9.id+"' ";
}
if(typeof _ef!="undefined"&&_ef!=null){
_eb+="align='"+_ef+"' ";
}
_eb+=st+" src='"+C2E(src)+"' ";
if(typeof alt!="undefined"&&alt!=null&&alt.length>0){
_eb+="alt='"+C2E(alt)+"' ";
}
_eb+="/>";
return _eb;
};
this.serializeParagraph=function(_f5){
return this.serializeBR(_f5);
};
this.serializeGoogleImage=function(_f6){
var _f7;
_f7="<image ";
if(_f6.id){
_f7+="id='"+_f6.id+"' ";
}
var i=new Image();
i.src=_f6.getAttribute("src");
var st=_f6.style.cssText;
var _fa="";
if(fdcp.browserDetect.browser=="Explorer"){
_fa=_f6.currentStyle["top"];
}else{
_fa=_f6.style.top;
}
if(_fa!="auto"&&_fa!=null){
return _f7+" style=' "+"top:"+_fa+";"+st+" ' "+" src=' "+C2E(i.src)+" ' />";
}else{
return _f7+" style=' "+st+" ' "+" src=' "+C2E(i.src)+" ' />";
}
};
this.serializeGoogleMapElement=function(_fb,_fc){
var _fd="";
if(_fb.nodeName=="SCRIPT"){
return _fd;
}
var to=_fc;
if(_fc==this.text_only_state.once){
to=this.text_only_state.off;
}
if(_fb.nodeName.charAt(0)=="/"){
return _fd;
}
if(_fc==this.text_only_state.off&&_fb.nodeName!=""){
_fd="<"+_fb.nodeName+" ";
if(_fb.id){
_fd+="id=\""+_fb.id+"\" ";
}
if(_fb.className){
_fd+="class=\""+_fb.className+"\" ";
}
if(_fb.nodeName=="TABLE"){
if(!this.isMT(_fb.border)){
_fd+="border=\""+_fb.border+"\" ";
}
if(!this.isMT(_fb.cellPadding)){
_fd+="cellpadding=\""+_fb.cellPadding+"\" ";
}
if(!this.isMT(_fb.cellSpacing)){
_fd+="cellspacing=\""+_fb.cellSpacing+"\" ";
}
}else{
if(_fb.nodeName=="TD"){
if(!this.isMT(_fb.colSpan)){
_fd+="colspan=\""+_fb.colSpan+"\" ";
}
if(!this.isMT(_fb.rowSpan)){
_fd+="rowspan=\""+_fb.rowSpan+"\" ";
}
if(!this.isMT(_fb.noWrap)){
_fd+="nowrap=\""+_fb.noWrap+"\" ";
}
if(!this.isMT(_fb.vAlign)){
_fd+="valign=\""+_fb.vAlign+"\" ";
}
}
}
var _ff=this.getStyleValue(_fb,"width");
var _100=this.getStyleValue(_fb,"height");
var _101="";
if(_ff!=null&&_ff!="auto"&&_ff!="0auto"){
_101+="width: "+_ff+";";
}
if(_100!=null&&_100!="auto"&&_100!="0auto"){
_101+="height: "+_100+";";
}
if(_fb.style.cssText!=null){
if(_fb.nodeName=="SPAN"){
if(_fb.className=="gmnoprint"){
_fd+="style=\""+"position:absolute;height:30px;width:62px;-moz-user-select: none; position: absolute; left: 2px; bottom: 2px;"+"\" >";
}else{
_fd+=this.getNodeStyle(_fb,true)+">";
}
}else{
if(_fb.id=="mapcontainer"){
_fd+="style=\""+"position:relative;"+_101;
var f=this.getStyleValue(_fb,"float");
if(f=="left"||f=="right"){
_fd+="float:"+f+";\">";
}
}else{
if(fdcp.browserDetect.browser=="Explorer"){
var _ff=_fb.currentStyle["width"];
if(_ff=="100%"){
var _103=_fb.parentNode.currentStyle["width"];
_fb.style.width=_103;
}
var _100=_fb.currentStyle["height"];
if(_100=="100%"){
var _104=_fb.parentNode.currentStyle["height"];
_fb.style.height=_104;
}
var _105="";
if(_fb.currentStyle["top"]!="auto"){
_fb.style.top=_fb.currentStyle["top"];
}
if(_fb.currentStyle["left"]!="auto"){
_fb.style.left=_fb.currentStyle["left"];
}
if(_fb.currentStyle["position"]!="auto"){
_fb.style.position=_fb.currentStyle["position"];
}
if(_fb.currentStyle["z-index"]!="auto"){
_fb.style.zindex=_fb.currentStyle["zindex"];
}
_fd+="style=\""+_101+_fb.style.cssText+"; "+"\" >";
}else{
if(document.defaultView.getComputedStyle(_fb,null).getPropertyValue("z-index")!="auto"){
_fb.style.zindex=document.defaultView.getComputedStyle(_fb,null).getPropertyValue("z-index");
}
if(document.defaultView.getComputedStyle(_fb,null).getPropertyValue("position")!="auto"){
_fb.style.position=document.defaultView.getComputedStyle(_fb,null).getPropertyValue("position");
}
if(document.defaultView.getComputedStyle(_fb,null).getPropertyValue("top")!="auto"){
_fb.style.top=document.defaultView.getComputedStyle(_fb,null).getPropertyValue("top");
}
if(document.defaultView.getComputedStyle(_fb,null).getPropertyValue("left")!="auto"){
_fb.style.left=document.defaultView.getComputedStyle(_fb,null).getPropertyValue("left");
}
if(_fb.getAttribute("style")!=null){
_fd+="style=\""+_fb.getAttribute("style")+_101+_fb.style.cssText+"; "+"\" >";
}else{
_fd+="style=\""+_101+_fb.style.cssText+"; "+"\" >";
}
}
}
}
}else{
_fd+=this.getNodeStyle(_fb,true)+">";
}
}
for(var i=0;i<_fb.childNodes.length;i++){
var _107=_fb.childNodes[i];
if(this.isExcluded(_107)){
continue;
}
if(_107.nodeType==3){
_fd+=this.serializeText(_107);
}else{
if(_107.nodeType==4){
_fd+=this.serializeCDATA(_107);
}else{
if(_107.nodeType==1){
if(_107.nodeName=="BR"){
_fd+=this.serializeBR(_107);
}else{
if(_107.nodeName=="P"){
_fd+=this.serializeInlineElement(_107,this.text_only_state.off);
}else{
if(_107.nodeName=="IMG"||_fb.nodeName=="IMAGE"){
_fd+=this.serializeGoogleImage(_107);
}else{
_fd+=this.serializeGoogleMapElement(_107,this.text_only_state.off);
}
}
}
}
}
}
}
if(_fc==this.text_only_state.off&&_fb.nodeName!=""){
_fd+="</"+_fb.nodeName+">";
}
return _fd;
};
this.serializeInlineElement=function(node,_109,_10a,mode){
if(typeof _10a=="undefined"){
_10a=null;
}
var _10c="";
if(node.nodeName=="SCRIPT"){
return _10c;
}
var _10d=this.getStyleValue(node,"height");
var to=_109;
if(_109==this.text_only_state.once){
to=this.text_only_state.off;
}
if(node.nodeName.charAt(0)=="/"){
return _10c;
}
if(parseInt(this.getStyleValue(node,"width"))>=500){
var _10f=this.getStyleValue(node,"width");
if(parseInt(_10f)>this.getWidestBlkWidth()){
this.setWidestBlkWidth(_10f);
}
}
if(_109==this.text_only_state.off&&node.nodeName!=""){
if(node.nodeName=="LI"){
if(node.parentNode!=null&&node.parentNode.nodeName!="UL"&&node.parentNode.nodeName!="OL"){
_10c+="<UL style=\"margin-top:0px;margin-bottom:0px;\">";
}
}
_10c+="<"+node.nodeName;
if(node.id){
_10c+=" id=\""+node.id+"\"";
}
if(node.type){
_10c+=" type=\""+node.type+"\"";
}
if(node.className){
_10c+=" class=\""+node.className+"\"";
}
if(node.checked){
_10c+=" checked=\""+node.checked+"\"";
}
if(mode!="data"){
if(node.nodeName=="TABLE"){
if(!this.isMT(node.border)){
_10c+=" border=\""+node.border+"\"";
}
if(!this.isMT(node.cellPadding)){
_10c+=" cellpadding=\""+node.cellPadding+"\"";
_10a=node.cellPadding;
}
if(!this.isMT(node.cellSpacing)){
_10c+=" cellspacing=\""+node.cellSpacing+"\"";
}
}else{
if(node.nodeName=="TD"){
if(!this.isMT(node.colSpan)){
_10c+=" colspan=\""+node.colSpan+"\"";
}
if(!this.isMT(node.rowSpan)){
_10c+=" rowspan=\""+node.rowSpan+"\"";
}
if(!this.isMT(node.noWrap)){
_10c+=" nowrap=\""+node.noWrap+"\"";
}
if(!this.isMT(node.vAlign)){
_10c+=" valign=\""+node.vAlign+"\"";
}
}
}
_10c+=" "+this.getNodeStyle(node,true,_10a);
}
_10c+=">";
}
for(var i=0;i<node.childNodes.length;i++){
var _111=node.childNodes[i];
if(this.isExcluded(_111)){
continue;
}
if(_111.nodeName=="DIV"&&(_111.id=="mapcontainer"||_111.id=="nearby_map")){
_10c+=this.serializeGoogleMapElement(_111,to);
}else{
if(this.getStyleValue(_111,"display")=="none"){
continue;
}
if(_111.nodeType==3){
_10c+=this.serializeText(_111,mode);
}else{
if(_111.nodeType==4){
_10c+=this.serializeCDATA(_111);
}else{
if(_111.nodeType==1){
if(_111.nodeName=="BR"){
_10c+=this.serializeBR(_111,mode);
}else{
if(_111.nodeName=="P"){
_10c+=this.serializeInlineElement(_111,to,undefined,mode);
}else{
if(_111.nodeName.match(/^H\d$/)!=null){
_10c+=this.serializeInlineElement(_111,to,undefined,mode);
}else{
if(_111.nodeName=="IMG"||node.nodeName=="IMAGE"||(_111.nodeName=="INPUT"&&_111.type=="image")){
_10c+=this.serializeImage(_111,mode);
}else{
_10c+=this.serializeInlineElement(_111,to,_10a,mode);
}
}
}
}
}
}
}
}
}
if(_109==this.text_only_state.off&&node.nodeName!=""){
_10c+="</"+node.nodeName+">";
if(node.nodeName=="LI"){
if(node.parentNode!=null&&node.parentNode.nodeName!="UL"&&node.parentNode.nodeName!="OL"){
_10c+="</UL>";
}
}
}
return _10c;
};
this.newpg=function(_112){
if(_112.length>0&&_112[_112.length-1]!="</paragraph><paragraph>"){
_112.push("</paragraph><paragraph>");
}
};
this._serNode=function(node,_114,_115,mode){
var v;
var is_h=false;
if(this.isExcluded(node)){
return;
}
if(this.getStyleValue(node,"display")=="none"){
return;
}
var _119=this.getStyleValue(node,"height");
if((typeof _119=="undefined"||_119==null||_119==0)&&!(node.nodeName=="BR"||node.nodeName=="OL"||node.nodeName=="UL")){
return;
}
if(typeof _115=="undefined"||_115==null){
_115=this.text_only_state.off;
}
if(node.nodeType==3){
v=this.serializeText(node,mode);
if(v!=null&&v.length>0){
_114.push(v);
}
}else{
if(node.nodeType==4){
_114.push(this.serializeCDATA(node));
}else{
if(node.nodeType==1){
if(node.nodeName=="SCRIPT"){
return;
}
if(node.nodeName=="BR"){
_114.push(this.serializeBR(node,mode));
}else{
if(node.nodeName=="IMG"||node.nodeName=="IMAGE"||(node.nodeName=="INPUT"&&node.type=="image")){
_114.push(this.serializeImage(node,mode));
}else{
if(node.nodeName=="P"){
if(_114.length>0){
this.newpg(_114);
}
}else{
if(node.nodeName=="TR"){
this.newpg(_114);
}else{
if(node.nodeName.match(/^H\d$/)!=null){
is_h=true;
this.newpg(_114);
}
}
}
var _11a=node.offsetWidth;
var _11b=new Boolean(true);
var _11c=this.fdclient.getBlockThreshold();
if((typeof _11a!="undefined"&&_11a!=null&&_11a>_11c)||_115>0){
_11b=false;
}
if(((node.nodeName=="DIV"&&_11b)||node.nodeName=="TABLE"&&_115!=this.text_only_state.on)||node.nodeName=="UL"||node.nodeName=="OL"||node.nodeName=="LI"||node.nodeName=="BLOCKQUOTE"){
if(node.nodeName=="UL"||node.nodeName=="LI"||node.nodeName=="OL"){
_115=0;
}
if(node.nodeName=="DIV"&&(node.id=="mapcontainer"||node.id=="nearby_map")){
_114.push(this.serializeGoogleMapElement(node,_115));
}else{
_114.push(this.serializeInlineElement(node,_115,undefined,mode));
}
}else{
try{
if(node.nodeName=="SPAN"){
if(node.getAttribute("inlineDiv")=="true"){
var _11d=node.firstChild;
_114.push(this.serializeInlineElement(_11d,_115,undefined,mode));
}else{
if(node.getAttribute("inlineDiv")=="false"){
this.newpg(_114);
this._serNode(node.nextSibling,_114,this.text_only_state.on,mode);
}else{
if(node.getAttribute("formatdynamics")=="content"){
for(var m=node.firstChild;m!=null;m=m.nextSibling){
this._serNode(m,_114,this.text_only_state.off,mode);
}
}else{
for(var m=node.firstChild;m!=null;m=m.nextSibling){
this._serNode(m,_114,this.text_only_state.off,mode);
}
}
}
}
}else{
if(node.nodeName=="DIV"){
if(_114.length>0){
this.newpg(_114);
}
}
for(var m=node.firstChild;m!=null;m=m.nextSibling){
this._serNode(m,_114,_115,mode);
}
if(node.nodeName=="P"){
this.newpg(_114);
}
}
}
catch(e){
for(var m=node.firstChild;m!=null;m=m.nextSibling){
this._serNode(m,_114,this.text_only_state.once,mode);
}
}
}
if(is_h){
this.newpg(_114);
}
}
}
}
}
}
};
this.serializeNode=function(node,_120,_121,_122,mode){
var _124=this.text_only_state.off;
if(_122=="true"){
_124=this.text_only_state.on;
}
this._serNode(node,_120,_124,mode);
};
this.isExcluded=function(node){
for(var i=0;i<this.excludesXpath.length;i++){
if(node==this.excludesXpath[i]){
return true;
}
}
var _127=this.fdclient.getCfg("excludes");
if(typeof _127=="undefined"||_127==null){
return false;
}
var _128="";
var _129="";
var id="";
if(typeof node.nodeName!="undefined"&&node.nodeName!=null){
_128=node.nodeName.toLowerCase();
}
if(typeof node.className!="undefined"&&node.className!=null){
_129=node.className.toLowerCase();
}
if(typeof node.id!="undefined"&&node.id!=null){
id=node.id.toLowerCase();
}
for(var i=0;i<_127.length;i++){
var e=_127[i].toLowerCase();
var _12c=_129.split(/\s+/);
for(var cl in _12c){
if(_12c[cl]==e||("."+_12c[cl])==e){
return true;
}
if((_128+"."+_12c[cl])==e){
return true;
}
if(id==e||("#"+id)==e){
return true;
}
if((_128+"."+id)==e||(_128+"#"+id)==e){
return true;
}
}
}
return false;
};
this.setExcludes=function(_12e){
this.excludesXpath=_12e;
};
this.getWidestBlkWidth=function(){
return this._widestblkwidth;
};
this.setWidestBlkWidth=function(_12f){
this._widestblkwidth=_12f;
};
this.fullClientSerialize=function(_130,_131){
_131=typeof _131=="undefined"?new Array():_131;
var _132=new Array();
for(var i=0;i<_130.length;i++){
var _134=_130[i].cloneNode(false);
_132.push(this.recurseMap(_130[i],_134,_131));
}
var rv="";
for(var i=0;i<_132.length;i++){
rv+=_132[i].innerHTML;
}
for(var x in this.serializedVmlReplacements){
rv=rv.replace(x,this.serializedVmlReplacements[x]);
}
return rv;
};
this.recurseMap=function(_137,_138,_139){
if(typeof _137.childNodes!="undefined"&&_137.childNodes.length>0){
for(var i=0;i<_137.childNodes.length;i++){
var _13b=false;
var _13c=[];
if(_137.childNodes[i].nodeName!="svg"&&_137.childNodes[i].nodeName!="path"){
_13c=typeof _137.childNodes[i].className=="undefined"?[]:_137.childNodes[i].className.split(" ");
}
for(var j=0;j<_13c.length;j++){
for(var k=0;k<_139.length;k++){
_13b=_13b||_139[k]==_13c[j];
}
}
if((_137.childNodes[i].nodeType==1||_137.childNodes[i].nodeType==3)&&!_13b){
var _13f;
var _140=this.arrayContains(_137.childNodes[i].nodeName,this.serializeableVmlElements);
if(typeof _137.childNodes[i].namespaceURI!="undefined"&&_137.childNodes[i].namespaceURI!=null&&_137.childNodes[i].namespaceURI.indexOf("svg")!=-1){
_13f=this.cloneSvg(_137.childNodes[i]);
}else{
if(_140){
_13f=this.cloneVml(_137.childNodes[i]);
}else{
_13f=_137.childNodes[i].cloneNode(false);
}
}
if(typeof _13f.className!="undefined"){
try{
_13f.className="";
}
catch(e){
}
}
_138.appendChild(_13f);
if(_137.childNodes[i].nodeType==1&&!_140){
this.copyAppliedStyle(_137.childNodes[i],_13f);
}
if(!_140){
this.recurseMap(_137.childNodes[i],_13f,_139);
}
}
}
}
return _138;
};
this.serializeableVmlElements=["shape","stroke"];
this.serializedVmlReplacements={};
this.cloneVml=function(_141){
var _142=(new Date()).getTime()+""+Math.floor(Math.random()*10000);
this.serializedVmlReplacements[_142]=_141.outerHTML;
var rv=document.createTextNode(_142);
return rv;
};
this.cloneSvg=function(_144){
var _145=document.createElementNS("http://www.w3.org/2000/svg",_144.nodeName);
for(var i=0;i<_144.attributes.length;i++){
_145.setAttributeNS(null,_144.attributes[i].nodeName,_144.attributes[i].nodeValue);
}
return _145;
};
this.arrayContains=function(_147,_148){
for(var i=0;i<_148.length;i++){
if(_148[i]==_147){
return true;
}
}
return false;
};
this.fullSerializeDefaultStyles={"background-attachment":"scroll","background-color":"transparent","background-image":"none","background-position":"0% 0%","background-repeat":"repeat","border-left-color":"rgb(0, 0, 0)","border-top-color":"rgb(0, 0, 0)","border-right-color":"rgb(0, 0, 0)","border-bottom-color":"rgb(0, 0, 0)","border-left-style":"none","border-top-style":"none","border-right-style":"none","border-bottom-style":"none","border-left-width":"0px","border-top-width":"0px","border-right-width":"0px","border-bottom-width":"0px","background":"transparent none repeat scroll 0% 0%","overflow":"visible","overflow-x":"visible","overflow-y":"visible","-moz-background-clip":"-moz-initial","-moz-background-origin":"-moz-initial","-moz-background-inline-policy":"-moz-initial","display":"block","visibility":"visible","opacity":"1","border-collapse":"separate","border-spacing":"0px 0px","clip":"auto","font-size-adjust":"none","font-weight":"400","list-style-image":"none","list-style-position":"outside","list-style-type":"disc","text-align":"left","text-indent":"0px","text-decoration":"none","z-index":"auto","vertical-align":"baseline","color":"rgb(0, 0, 0)","padding-top":"0px","padding-left":"0px","padding-right":"0px","padding-bottom":"0px","font-style":"normal","font-variant":"normal"};
this.fullSerializeIgnoreStyles=["captionSide","clear","content","counterIncrement","counterReset","cursor","direction","emptyCells","letterSpacing","markerOffset","maxHeight","maxWidth","minHeight","minWidth","outlineColor","outlineStyle","outlineWidth","pageBreakAfter","pageBreakBefore","quotes","tableLayout","textTransform","unicodeBidi","whiteSpace","wordSpacing","outlineOffset","imeMode","zoom","scrollbarDarkShadowColor","scrollbar3dLightColor","msBlockProgression","widows","orphans","styleFloat","clipTop","clipBottom","clipLeft","clipRight","blockDirection","outlineStyle","outlineColor","hasLayout"];
this.copyAppliedStyle=function(src,dest){
var sss="";
var _14d=this.fullSerializeCacheCheck(src);
if(_14d!=""){
sss=this.cacheReplaceStyle(src,_14d);
}else{
var _14e;
if(fdcp.browserDetect.browser=="Explorer"){
_14e=dest.currentStyle;
}else{
_14e=document.defaultView.getComputedStyle(dest,"");
}
for(var _14f in _14e){
if(_14f.indexOf("Moz")!=0&&!this.arrayContains(_14f,this.fullSerializeIgnoreStyles)){
var _150;
var _151="";
for(var j=0,len=_14f.length;j<len;++j){
if(_14f.charAt(j)==_14f.charAt(j).toUpperCase()){
_151=_151+"-"+_14f.charAt(j).toLowerCase();
}else{
_151=_151+_14f.charAt(j);
}
}
var stc;
if(fdcp.browserDetect.browser=="Explorer"){
stc=src.currentStyle[_151];
}else{
stc=document.defaultView.getComputedStyle(src,null).getPropertyValue(_151);
}
var _155=_14e[_14f];
var _156=_151 in this.fullSerializeDefaultStyles;
if(typeof _155!="undefined"&&typeof _155!="function"&&_155!=""&&(!(_156)||(_156&&stc!=this.fullSerializeDefaultStyles[_151]))){
sss+=_151+":"+stc+";";
}
}
}
if(src.nodeName=="IMG"&&src.parentNode.nodeName=="A"){
sss+="border:none;";
}
this.fullSerializeCache.push({parent:src.parentNode,className:src.className,name:src.nodeName,value:sss});
}
if(fdcp.browserDetect.browser=="Explorer"){
dest.style.cssText=sss;
}else{
dest.setAttribute("style",sss);
}
};
this.fullSerializeCache=new Array();
this.fullSerializeCacheCheck=function(_157){
if(typeof _157.id!="undefined"&&_157.id!=""){
return "";
}
var _158=_157.className;
var _159=_157.parentNode;
var _15a=_157.nodeName;
for(var i=0;i<this.fullSerializeCache.length;i++){
var _15c=this.fullSerializeCache[i];
if(_159==_15c.parent&&_158==_15c.className&&_15a==_15c.name){
return _15c.value;
}
}
return "";
};
this.cacheReplaceStyle=function(src,_15e){
var _15f=src.style.cssText;
var _160=_15f.split(";");
var _161=_160.length;
if(_15f.charAt(_15f.length-1)==";"){
_161--;
}
for(var i=0;i<_161;i++){
var _163=_160[i].indexOf(":");
var _164=_160[i].substr(0,_163).replace(/^\s+|\s+$/g,"");
var _165=_160[i].substr(_163+1);
var _166=new RegExp("(^|;)\\s*"+_164+"\\s*:[^;]*(;|$)","i");
var _167=_15e;
_15e=_15e.replace(_166,"$1"+_164+":"+_165+";");
if(_167==_15e){
_15e+=_164+":"+_165+";";
}
}
_15e=this.cacheYankMissingStyleAttributes(["display","z-index"],_15e,_15f);
if(src.nodeName=="IMG"){
var _166=new RegExp("(^|;)\\s*width\\s*:[^;]*(;|$)","i");
if(_15e.match(_166)){
_15e=_15e.replace(_166,"$1width:"+src.width+"px;");
}else{
_15e+=";width:"+src.width+"px;";
}
_166=new RegExp("(^|;)\\s*height\\s*:[^;]*(;|$)","i");
if(_15e.match(_166)){
_15e=_15e.replace(_166,"$1height:"+src.height+"px;");
}else{
_15e+=";height:"+src.height+"px;";
}
}
return _15e;
};
this.cacheYankMissingStyleAttributes=function(_168,_169,_16a){
for(var i=0;i<_168.length;i++){
var _16c=new RegExp("(^|;)\\s*"+_168[i]+"\\s*:[^;]*(;|$)","i");
if(_169.match(_16c)&&!_16a.match(_16c)){
_169=_169.replace(_16c,"$1");
}
}
return _169;
};
this.arrayRemove=function(_16d,from,to){
var rest=_16d.slice((to||from)+1||_16d.length);
_16d.length=from<0?_16d.length+from:from;
return _16d.push.apply(_16d,rest);
};
}


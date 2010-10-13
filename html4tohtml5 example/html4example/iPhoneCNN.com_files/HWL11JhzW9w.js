/*
HTTP Host: static.ak.fbcdn.net
Generated: September 25th 2010 9:09:25 AM PDT
Machine: 10.30.146.195
*/

if (window.CavalryLogger) { CavalryLogger.start_js(["js\/detect_broken_proxy_cache.js"]); }

function detect_broken_proxy_cache(d,a){var b=getCookie(a);if((b!=d)&&(b!=null)&&(d!='0')){var c={c:'si_detect_broken_proxy_cache',m:a+' '+d+' '+b};var e=new URI('/common/scribe_endpoint.php').getQualifiedURI().toString();new AsyncSignal(e,c).send();}}

if (window.Bootloader) { Bootloader.done(["js\/detect_broken_proxy_cache.js"]); }
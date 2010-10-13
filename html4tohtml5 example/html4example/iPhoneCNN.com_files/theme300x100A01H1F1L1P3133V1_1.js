// theme300x100A01H1F1L1P3133V1_1.js
function theme300x100A01H1F1L1P3133V1_1_hideArticleByPosition()
{
    var articleRow = document.getElementById('theme300x100A01H1F1L1P3133V1_1_articleRow_'+theme300x100A01H1F1L1P3133V1_1_getQuerystring('pid','0'))
    if(articleRow!=null)
    {
        articleRow.style.display='block';
    }
    else
    {
        document.getElementById('theme300x100A01H1F1L1P3133V1_1_articleRow_0').style.display='block';
    }
}
function theme300x100A01H1F1L1P3133V1_1_getQuerystring(key, defaultValue)
{
  if (defaultValue==null) defaultValue="";
  key = key.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
  var regex = new RegExp("[\\?&]"+key+"=([^&#]*)");
  var qs = regex.exec(window.location.href);
  if(qs == null)
  {
    return defaultValue;
  }
  else
  {
    return qs[1];
  }
}
setTimeout("theme300x100A01H1F1L1P3133V1_1_hideArticleByPosition()",500);
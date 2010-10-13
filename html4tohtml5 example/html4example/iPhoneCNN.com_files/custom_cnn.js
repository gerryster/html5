DISQUS.blocks["comment"] = function block_comment ($globals, $locals) {

var $html = new DISQUS.strings.Builder();
var $render = DISQUS.renderBlock;

for (var $global in $globals) {
    if ($globals.hasOwnProperty($global)) {
        eval("var " + $global + " = $globals['" + $global + "']");
    }
}

for (var $local in $locals) {
    if ($locals.hasOwnProperty($local)) {
        eval("var " + $local + " = $locals['" + $local + "']");
    }
}

$html.put("\x3Cdiv id\x3D\x22comment\x2D");
$html.put(comment.id);
$html.put("\x22\x3E\x3C/div\x3E\x3Cli id\x3D\x22dsq\x2Dcomment\x2D");
$html.put(comment.id);
$html.put("\x22    style\x3D\x22margin\x2Dleft:");
$html.put(comment.depth * 30);
$html.put("px\x3B\x22    class\x3D\x22dsq\x2Dcomment ");
if (request.page > 1) { 
$html.put("dsq\x2Dappend");
}
$html.put(" ");
if (comment.depth) { 
$html.put("dsq\x2Dcomment child dsq\x2Ddepth\x2D");
$html.put(comment.depth);
$html.put(" dsq\x2Dparent\x2Dis\x2D");
$html.put(comment.parent_post_id);
}
$html.put(" ");
if (comment.author_is_creator) { 
$html.put("special dsq\x2Dspecial");
}
$html.put(" ");
if (comment.author_is_moderator) { 
$html.put("dsq\x2Dmoderator");
}
$html.put(" ");
if (comment.even) { 
$html.put("dsq\x2Deven");
} else {
$html.put("dsq\x2Dodd");
}
$html.put(" ");
if (comment.num_replies > 0) { 
$html.put("dsq\x2Dcomment\x2Dis\x2Dparent");
}
$html.put("\x22\x3E  \x3Cdiv id\x3D\x22dsq\x2Dcomment\x2Dheader\x2D");
$html.put(comment.id);
$html.put("\x22 class\x3D\x22dsq\x2Dcomment\x2Dheader\x22\x3E    \x3Cimg src\x3D\x22http://avatar.cnn.com/people/");
$html.put(comment.author.display_name);
$html.put("/avatar/48.png\x22 alt\x3D\x22\x22\x3E  \x3C/div\x3E  \x3Cdiv id\x3D\x22dsq\x2Dcomment\x2Dbody\x2D");
$html.put(comment.id);
$html.put("\x22 class\x3D\x22dsq\x2Dcomment\x2Dbody\x22\x3E    \x3Ccite\x3E");
$html.put(comment.author.display_name);
$html.put("\x3C/cite\x3E    ");
(function () {
var $l = {};
lang.extend($l, $locals);
lang.extend($l, {});
$html.put($render("commentMessage", $l));
}());
$html.put("  \x3C/div\x3E  \x3Cdiv id\x3D\x22dsq\x2Dcomment\x2Dfooter\x2D");
$html.put(comment.id);
$html.put("\x22 class\x3D\x22dsq\x2Dcomment\x2Dfooter\x22\x3E    \x3Cdiv id\x3D\x22dsq\x2Dlike\x2Dpts\x2D");
$html.put(comment.id);
$html.put("\x22 class\x3D\x22dsq\x2Dlike\x2Dpts\x22\x3E\x3C/div\x3E    \x3Cspan class\x3D\x22dsq\x2Dfooter\x2Dtime\x22\x3E");
$html.put(comment.date);
$html.put("\x3C/span\x3E    ");
if (!comment.depth && context.show_reply && request.is_authenticated) { 
$html.put("      | \x3Ca href\x3D\x22#\x22 id\x3D\x22dsq\x2Dcomment\x2Dfooter\x2Dreply\x2D");
$html.put(comment.id);
$html.put("\x22 onclick\x3D\x22return DISQUS.dtpl.actions.fire(\x27comments.reply\x27, ");
$html.put(comment.id);
$html.put(", this)\x3B\x22\x3EReply\x3C/a\x3E    ");
}
$html.put("    ");
if (comment.votable) { 
$html.put("      ");
if (comment.up_voted) { 
$html.put("      | You liked this ");
if (comment.points) { 
$html.put("(");
$html.put(comment.points);
$html.put(")");
}
$html.put("      ");
} else {
$html.put("      | \x3Ca id\x3D\x22dsq\x2Dlike\x2D");
$html.put(comment.id);
$html.put("\x22 href\x3D\x22#\x22 onclick\x3D\x22return DISQUS.dtpl.actions.fire(\x27comments.like\x27, this, ");
$html.put(comment.id);
$html.put(")\x3B\x22\x3E        Like ");
if (comment.points) { 
$html.put("(");
$html.put(comment.points);
$html.put(")");
}
$html.put("      \x3C/a\x3E      ");
}
$html.put("    ");
} else {
$html.put("      ");
if (comment.points) { 
$html.put("      | ");
$html.put(comment.points);
$html.put(" ");
$html.put(lang.pluralize(comment.points, 'person', 'people'));
$html.put(" liked this      ");
}
$html.put("    ");
}
$html.put("    | \x3Cspan id\x3D\x22dsq\x2Dreport\x2Dlink\x2D");
$html.put(comment.id);
$html.put("\x22\x3E        \x3Ca href\x3D\x22#\x22 onclick\x3D\x22return DISQUS.dtpl.actions.fire(\x27comments.report\x27, ");
$html.put(comment.id);
$html.put(", false)\x3B\x22\x3EReport abuse\x3C/a\x3E    \x3C/span\x3E    ");
if (request.is_moderator) { 
$html.put("    | \x3Ca href\x3D\x22#\x22 onclick\x3D\x22return DISQUS.dtpl.actions.fire(\x27comments.highlight\x27, ");
$html.put(comment.id);
$html.put(", this)\x3B\x22\x3EHighlight\x3C/a\x3E    | \x3Ca href\x3D\x22#\x22 onclick\x3D\x22return DISQUS.dtpl.actions.fire(\x27comments.moderate.options\x27, ");
$html.put(comment.id);
$html.put(")\x3B\x22\x3EModerate\x3C/a\x3E    ");
}
$html.put("  \x3C/div\x3E\x3C/li\x3E\x3Cdiv id\x3D\x22dsq\x2Dappend\x2Dpost\x2D");
$html.put(comment.id);
$html.put("\x22 style\x3D\x22border\x2Dbottom:0\x3B\x22\x3E\x3C/div\x3E");
if (comment.has_replies || comment.is_last_child) { 
$html.put("\x3Cdiv class\x3D\x22dsq\x2Ddivline\x22\x3E\x3C/div\x3E");
}
return $html.compile();
};
DISQUS.blocks["postSharingOptions"] = function block_postSharingOptions ($globals, $locals) {

var $html = new DISQUS.strings.Builder();
var $render = DISQUS.renderBlock;

for (var $global in $globals) {
    if ($globals.hasOwnProperty($global)) {
        eval("var " + $global + " = $globals['" + $global + "']");
    }
}

for (var $local in $locals) {
    if ($locals.hasOwnProperty($local)) {
        eval("var " + $local + " = $locals['" + $local + "']");
    }
}

if (request.is_authenticated) { 
$html.put("\x3Cdiv class\x3D\x22dsq\x2Dsharing\x2Doptions dsq\x2Dtt\x22");
if (!request.display_sharing_options) { 
$html.put("style\x3D\x22display:none\x3B\x22");
}
$html.put("title\x3D\x22");
$html.put(trans("Toggle to share your comment"));
$html.put("\x22\x3E");
if (request.sharing.twitter.enabled || request.sharing.facebook.enabled) { 
$html.put("\x3Cspan class\x3D\x22dsq\x2Dsharing\x2Doptions\x2Dlabel\x22\x3E");
$html.put(trans("Share on"));
$html.put("\x3C/span\x3E");
if (request.sharing.twitter.enabled) { 
$html.put("\x3Cbutton class\x3D\x22dsq\x2Dshare\x2Dtoggle\x22 id\x3D\x22dsq\x2Dshare\x2Dtwitter\x22 onclick\x3D\x22DISQUS.dtpl.actions.fire(\x27share.toggle\x27, this, \x27twitter\x27");
if (comment) { 
$html.put(",");
$html.put(comment.id);
}
$html.put(")\x3B\x22\x3E\x3Cspan class\x3D\x22icon\x22\x3E\x3C/span\x3E\x3Cspan class\x3D\x22status\x22\x3E\x3C/span\x3E\x3C/button\x3E");
}
if (request.sharing.facebook.enabled) { 
$html.put("\x3Cbutton class\x3D\x22dsq\x2Dshare\x2Dtoggle\x22 id\x3D\x22dsq\x2Dshare\x2Dfacebook\x22onclick\x3D\x22DISQUS.dtpl.actions.fire(\x27share.toggle\x27, this, \x27facebook\x27");
if (comment) { 
$html.put(",");
$html.put(comment.id);
}
$html.put(")\x3B\x22\x3E\x3Cspan class\x3D\x22icon\x22\x3E\x3C/span\x3E\x3Cspan class\x3D\x22status\x22\x3E\x3C/span\x3E\x3C/button\x3E");
}
$html.put("\x3Cinput style\x3D\x22display: none\x22 type\x3D\x22checkbox\x22 id\x3D\x22dsq\x2Dsharing\x2Dtwitter");
if (comment) { 
$html.put("\x2D");
$html.put(comment.id);
}
$html.put("\x22 /\x3E  \x3Cinput style\x3D\x22display: none\x22 type\x3D\x22checkbox\x22 id\x3D\x22dsq\x2Dsharing\x2Dfacebook");
if (comment) { 
$html.put("\x2D");
$html.put(comment.id);
}
$html.put("\x22 /\x3E");
}
$html.put("\x3C/div\x3E");
}
return $html.compile();
};
DISQUS.blocks["moderateOptionsPopup"] = function block_moderateOptionsPopup ($globals, $locals) {

var $html = new DISQUS.strings.Builder();
var $render = DISQUS.renderBlock;

for (var $global in $globals) {
    if ($globals.hasOwnProperty($global)) {
        eval("var " + $global + " = $globals['" + $global + "']");
    }
}

for (var $local in $locals) {
    if ($locals.hasOwnProperty($local)) {
        eval("var " + $local + " = $locals['" + $local + "']");
    }
}

$html.put("\x3Cdiv class\x3D\x22dsq\x2Dmoderate\x2Doptions\x22\x3E  \x3Ctable\x3E    ");
if (comment.email) { 
$html.put("    \x3Ctr\x3E      \x3Ctd\x3EEmail\x3C/td\x3E      \x3Ctd\x3E");
$html.put(comment.email);
$html.put("\x3C/td\x3E    \x3C/tr\x3E    ");
}
$html.put("    ");
if (comment.ip) { 
$html.put("    \x3Ctr\x3E      \x3Ctd\x3EIP address\x3C/td\x3E      \x3Ctd\x3E");
$html.put(comment.ip);
$html.put("\x3C/td\x3E    \x3C/tr\x3E    ");
}
$html.put("    \x3Ctr\x3E      \x3Ctd\x3EActions\x3C/td\x3E      \x3Ctd\x3E        \x3Cul\x3E          ");
if (request.moderator_can_edit) { 
$html.put("          \x3Cli\x3E            \x3Ca href\x3D\x22#\x22 onclick\x3D\x22return DISQUS.dtpl.actions.fire(\x27comments.edit.show\x27, ");
$html.put(comment.id);
$html.put(")\x3B\x22\x3E");
$html.put(trans("Edit Comment"));
$html.put("\x3C/a\x3E          \x3C/li\x3E          ");
}
$html.put("          \x3Cli\x3E            \x3Ca href\x3D\x22#\x22 onclick\x3D\x22return DISQUS.dtpl.actions.fire(\x27comments.delete\x27, ");
$html.put(comment.id);
$html.put(")\x3B\x22\x3E");
$html.put(trans("Delete Comment"));
$html.put("\x3C/a\x3E          \x3C/li\x3E          \x3Cli\x3E            \x3Ca href\x3D\x22#\x22 onclick\x3D\x22return DISQUS.dtpl.actions.fire(\x27comments.spam\x27, ");
$html.put(comment.id);
$html.put(")\x3B\x22\x3E");
$html.put(trans("Mark Spam"));
$html.put("\x3C/a\x3E          \x3C/li\x3E          \x3Cli\x3E            \x3Ca href\x3D\x22#\x22 onclick\x3D\x22return DISQUS.dtpl.actions.fire(\x27comments.blacklist\x27, ");
$html.put(comment.id);
$html.put(")\x3B\x22\x3E");
$html.put(trans("Block User"));
$html.put("\x3C/a\x3E          \x3C/li\x3E        \x3C/ul\x3E      \x3C/td\x3E    \x3C/tr\x3E  \x3C/table\x3E\x3C/div\x3E\x3Cp\x3EGo to the full \x3Ca href\x3D\x22");
$html.put(settings.disqus_url);
$html.put("/comments/moderate/");
$html.put(forum.url);
$html.put("\x22 target\x3D\x22_blank\x22\x3Emoderate panel\x3C/a\x3E for more options.\x3C/p\x3E");
return $html.compile();
};
DISQUS.blocks["header"] = function block_header ($globals, $locals) {

var $html = new DISQUS.strings.Builder();
var $render = DISQUS.renderBlock;

for (var $global in $globals) {
    if ($globals.hasOwnProperty($global)) {
        eval("var " + $global + " = $globals['" + $global + "']");
    }
}

for (var $local in $locals) {
    if ($locals.hasOwnProperty($local)) {
        eval("var " + $local + " = $locals['" + $local + "']");
    }
}

$html.put("\x3Cdiv class\x3D\x22cnn_strycmtsprl\x22\x3E  \x3Cdiv class\x3D\x22cnn_strycmtsprl1\x22\x3E    ");
(function () {
var $l = {};
lang.extend($l, $locals);
lang.extend($l, {"cls": "dsq-post-avatar"});
$html.put($render("avatar", $l));
}());
$html.put("  \x3C/div\x3E  \x3Cdiv class\x3D\x22cnn_strycmtsprl2\x22\x3E    ");
if (request.is_authenticated) { 
$html.put("    \x3Ch6\x3EHi, ");
$html.put(request.display_username);
$html.put("\x3C/h6\x3E    \x3Ca href\x3D\x22/profile\x22\x3EProfile\x3C/a\x3E | \x3Ca href\x3D\x22#\x22 onclick\x3D\x22ms_doLogout()\x3B return false\x3B\x22\x3ELog out\x3C/a\x3E    ");
} else {
$html.put("    \x3Cp\x3E      \x3Ca href\x3D\x22#\x22 onclick\x3D\x22showOverlay(\x27profile_signin_overlay\x27)\x3B return false\x3B\x22\x3ELog in\x3C/a\x3E or       \x3Ca href\x3D\x22#\x22 onclick\x3D\x22showOverlay(\x27profile_signup_overlay\x27)\x3B return false\x3B\x22\x3Esign up\x3C/a\x3E to comment    \x3C/p\x3E    ");
}
$html.put("  \x3C/div\x3E  \x3Cdiv class\x3D\x22cnn_clear\x22\x3E\x3C/div\x3E\x3C/div\x3E\x3Cdiv class\x3D\x22cnn_strycmtsndff\x22\x3E  \x3Ch6\x3Esound\x3Cb\x3Eoff\x3C/b\x3E \x3Cspan\x3E(");
$html.put(thread.total_posts);
$html.put(" ");
$html.put(lang.pluralize(thread.total_posts, 'Comment', 'Comments'));
$html.put(")\x3C/span\x3E\x3C/h6\x3E  \x3Cdiv class\x3D\x22cnn_strycmtsndff1\x22\x3E    Show:    \x3Ca href\x3D\x22#\x22 onclick\x3D\x22return DISQUS.dtpl.actions.fire(\x27thread.sort\x27, \x27newest\x27)\x3B\x22\x3ENewest\x3C/a\x3E |    \x3Ca href\x3D\x22#\x22 onclick\x3D\x22return DISQUS.dtpl.actions.fire(\x27thread.sort\x27, \x27oldest\x27)\x3B\x22\x3EOldest\x3C/a\x3E |    \x3Ca href\x3D\x22#\x22 onclick\x3D\x22return DISQUS.dtpl.actions.fire(\x27thread.sort\x27, \x27best\x27)\x3B\x22\x3EMost liked\x3C/a\x3E  \x3C/div\x3E\x3C/div\x3E");
if (!thread.closed) { 
(function () {
var $l = {};
lang.extend($l, $locals);
lang.extend($l, {});
$html.put($render("postbox", $l));
}());
}
(function () {
var $l = {};
lang.extend($l, $locals);
lang.extend($l, {});
$html.put($render("moderatorOptions", $l));
}());
if (comments.length == 0) { 
$html.put("\x3Cp class\x3D\x22dsq\x2Dcnn\x2Dno\x2Dcomments\x22\x3EThere are no comments on this story. Be the first!\x3C/p\x3E");
}
return $html.compile();
};
DISQUS.blocks["reportConfirmation"] = function block_reportConfirmation ($globals, $locals) {

var $html = new DISQUS.strings.Builder();
var $render = DISQUS.renderBlock;

for (var $global in $globals) {
    if ($globals.hasOwnProperty($global)) {
        eval("var " + $global + " = $globals['" + $global + "']");
    }
}

for (var $local in $locals) {
    if ($locals.hasOwnProperty($local)) {
        eval("var " + $local + " = $locals['" + $local + "']");
    }
}

$html.put("\x3Cbr/\x3E\x3Cbutton type\x3D\x22button\x22 onclick\x3D\x22DISQUS.popup.close(null, true)\x3B\x22\x3E  \x3Cstrong\x3E");
$html.put(trans("No"));
$html.put("\x3C/strong\x3E, ");
$html.put(trans("Never mind"));
$html.put("\x3C/button\x3E\x26nbsp\x3B\x26nbsp\x3B\x26nbsp\x3B\x3Cbutton type\x3D\x22button\x22 onclick\x3D\x22DISQUS.dtpl.actions.fire(\x27comments.report\x27, ");
$html.put(id);
$html.put(", true)\x3B\x22\x3E  \x3Cstrong\x3E");
$html.put(trans("Yes"));
$html.put("\x3C/strong\x3E, ");
$html.put(trans("Flag inappropriate comment"));
$html.put("\x3C/button\x3E\x3Cbr/\x3E\x3Cbr/\x3E");
$html.put(trans("This will flag comments for moderators to take action."));
return $html.compile();
};
DISQUS.blocks["postbox"] = function block_postbox ($globals, $locals) {

var $html = new DISQUS.strings.Builder();
var $render = DISQUS.renderBlock;

for (var $global in $globals) {
    if ($globals.hasOwnProperty($global)) {
        eval("var " + $global + " = $globals['" + $global + "']");
    }
}

for (var $local in $locals) {
    if ($locals.hasOwnProperty($local)) {
        eval("var " + $local + " = $locals['" + $local + "']");
    }
}

$html.put("\x3Cdiv id\x3D\x22");
if (comment) { 
$html.put("dsq\x2Dreply\x2Dpost\x2D");
$html.put(comment.id);
} else {
$html.put("dsq\x2Dnew\x2Dpost");
}
$html.put("\x22 class\x3D\x22dsq\x2Dpost\x2Darea\x22\x3E  ");
if (!request.is_authenticated) { 
$html.put("  \x3Ch3\x3EPost a comment\x3C/h3\x3E  \x3Ca href\x3D\x22#\x22 onclick\x3D\x22showOverlay(\x27profile_signin_overlay\x27)\x3B return false\x3B\x22\x3ELog in\x3C/a\x3E or  \x3Ca href\x3D\x22#\x22 onclick\x3D\x22showOverlay(\x27profile_signup_overlay\x27)\x3B return false\x3B\x22\x3Esign up\x3C/a\x3E to comment  ");
} else {
$html.put("    ");
if (comment) { 
$html.put("    \x3Ch3\x3EReplying to ");
$html.put(comment.author.display_name);
$html.put("\x3C/h3\x3E    \x3Cdiv class\x3D\x22dsq\x2Dpost\x2Dcancel\x22\x3E      \x3Ca href\x3D\x22#\x22 onclick\x3D\x22return DISQUS.dtpl.actions.fire(\x27comments.reply\x27, ");
$html.put(comment.id);
$html.put(")\x3B\x22\x3E        Cancel \x3Cimg src\x3D\x22");
$html.put(settings.media_url);
$html.put("/images/themes/cnn/close_btn.jpg\x22/\x3E      \x3C/a\x3E    \x3C/div\x3E    ");
} else {
$html.put("    \x3Ch3\x3EPost a comment\x3C/h3\x3E    ");
}
$html.put("  ");
}
$html.put("  ");
if (request.is_authenticated) { 
$html.put("  \x3Ctable\x3E    \x3Ctr\x3E      \x3Ctd class\x3D\x22dsq\x2Dpost\x2Davatar\x22\x3E        \x3Cdiv class\x3D\x22dsq\x2Dpost\x2Davatar\x22\x3E          ");
(function () {
var $l = {};
lang.extend($l, $locals);
lang.extend($l, {});
$html.put($render("avatar", $l));
}());
$html.put("        \x3C/div\x3E      \x3C/td\x3E      \x3Ctd\x3E        \x3Cdiv id\x3D\x22dsq\x2Dform\x2Darea");
if (comment) { 
$html.put("\x2D");
$html.put(comment.id);
}
$html.put("\x22 class\x3D\x22dsq\x2Dform\x2Darea\x22\x3E          \x3Cdiv class\x3D\x22dsq\x2Dtextarea\x22\x3E            \x3Cdiv class\x3D\x22dsq\x2Dtextarea\x2Dwrapper\x22 id\x3D\x22dsq\x2Dtextarea\x2Dwrapper");
if (comment) { 
$html.put("\x2D");
$html.put(comment.id);
}
$html.put("\x22\x3E\x3C/div\x3E          \x3C/div\x3E          \x3Cdiv class\x3D\x22dsq\x2Dpost\x2Dfooter\x22\x3E            \x3Ctable class\x3D\x22dsq\x2Dcnn\x2Dpost\x2Dmessage\x22\x3E              \x3Ctr\x3E                \x3Ctd\x3E                  \x3Cp class\x3D\x22dsq\x2Dcnn\x2Dmoderated\x22\x3E                    CNN welcomes a lively and courteous discussion as long as you follow the Rules of Conduct                    set forth in our \x3Ca href\x3D\x22/interactive_legal.html\x22\x3ETerms of Service\x3C/a\x3E. Comments are not                    pre\x2Dscreened before they post. You agree that anything you post may be used, along with                    your name and profile picture, in accordance with our \x3Ca href\x3D\x22/privacy.html\x22\x3EPrivacy Policy\x3C/a\x3E                    and the license you have granted pursuant to our \x3Ca href\x3D\x22/interactive_legal.html\x22\x3ETerms of Service\x3C/a\x3E.                  \x3C/p\x3E                \x3C/td\x3E                \x3Ctd\x3E                  \x3Cbutton class\x3D\x22dsq\x2Dbutton\x22 id\x3D\x22dsq\x2Dpost\x2Dbutton");
if (comment) { 
$html.put("\x2D");
$html.put(comment.id);
}
$html.put("\x22                          onclick\x3D\x22DISQUS.dtpl.actions.fire(\x27comments.send\x27, ");
if (comment) { 
$html.put(comment.id);
} else {
$html.put("null");
}
$html.put(")\x3B\x22\x3E                \x3C/td\x3E              \x3C/tr\x3E            \x3C/table\x3E          \x3C/div\x3E        \x3C/div\x3E      \x3C/td\x3E    \x3C/tr\x3E  \x3C/table\x3E  ");
}
$html.put("\x3C/div\x3E");
return $html.compile();
};
DISQUS.blocks["moderatorActionsPopup"] = function block_moderatorActionsPopup ($globals, $locals) {

var $html = new DISQUS.strings.Builder();
var $render = DISQUS.renderBlock;

for (var $global in $globals) {
    if ($globals.hasOwnProperty($global)) {
        eval("var " + $global + " = $globals['" + $global + "']");
    }
}

for (var $local in $locals) {
    if ($locals.hasOwnProperty($local)) {
        eval("var " + $local + " = $locals['" + $local + "']");
    }
}

$html.put("\x3Cdiv class\x3D\x22dsq\x2Dmoderate\x2Doptions\x22\x3E  \x3Ctable\x3E    \x3Ctr\x3E      \x3Ctd\x3E");
$html.put(trans("Actions"));
$html.put("\x3C/td\x3E      \x3Ctd\x3E        \x3Cul\x3E          \x3Cli\x3E            \x3Ca href\x3D\x22#\x22 onclick\x3D\x22return DISQUS.dtpl.actions.fire(\x27thread.toggleClosed\x27)\x3B\x22\x3E");
if (thread.closed) { 
$html.put(trans("Open thread"));
} else {
$html.put(trans("Close thread"));
}
$html.put("\x3C/a\x3E          \x3C/li\x3E        \x3C/ul\x3E      \x3C/td\x3E    \x3C/tr\x3E  \x3C/table\x3E\x3C/div\x3E\x3Cp\x3EGo to the full \x3Ca href\x3D\x22");
$html.put(settings.disqus_url);
$html.put("/comments/moderate\x2Dthreads/");
$html.put(forum.url);
$html.put("\x22 target\x3D\x22_blank\x22\x3Emoderate panel\x3C/a\x3E for more options.\x3C/p\x3E");
return $html.compile();
};
DISQUS.blocks["comments"] = function block_comments ($globals, $locals) {

var $html = new DISQUS.strings.Builder();
var $render = DISQUS.renderBlock;

for (var $global in $globals) {
    if ($globals.hasOwnProperty($global)) {
        eval("var " + $global + " = $globals['" + $global + "']");
    }
}

for (var $local in $locals) {
    if ($locals.hasOwnProperty($local)) {
        eval("var " + $local + " = $locals['" + $local + "']");
    }
}

$html.put("    ");
lang.forEach(comments, function (comment, $index, $collection) {
var $locals = { "comment": comment, "index": $index };
$html.put("        ");
(function () {
var $l = {};
lang.extend($l, $locals);
lang.extend($l, {});
$html.put($render("comment", $l));
}());
$html.put("    ");
});
return $html.compile();
};
DISQUS.blocks["openidForm"] = function block_openidForm ($globals, $locals) {

var $html = new DISQUS.strings.Builder();
var $render = DISQUS.renderBlock;

for (var $global in $globals) {
    if ($globals.hasOwnProperty($global)) {
        eval("var " + $global + " = $globals['" + $global + "']");
    }
}

for (var $local in $locals) {
    if ($locals.hasOwnProperty($local)) {
        eval("var " + $local + " = $locals['" + $local + "']");
    }
}

$html.put("  \x3Cp\x3E    \x3Clabel for\x3D\x22dsq\x2Dopenid\x2Durl\x22\x3E");
$html.put(trans("OpenID URL"));
$html.put(":\x3C/label\x3E    \x3Cspan class\x3D\x22dsq\x2Dlogin\x2Dinput\x2Dwrapper\x22\x3E\x3Cinput type\x3D\x22text\x22 id\x3D\x22dsq\x2Dopenid\x2Durl\x22 value\x3D\x22http://\x22/\x3E\x3C/span\x3E  \x3C/p\x3E  \x3Cp\x3E    \x3Clabel for\x3D\x22dsq\x2Dopenid\x2Durl\x22\x3E");
$html.put(trans("Display name"));
$html.put(":\x3C/label\x3E    \x3Cspan class\x3D\x22dsq\x2Dlogin\x2Dinput\x2Dwrapper\x22\x3E\x3Cinput type\x3D\x22text\x22 id\x3D\x22dsq\x2Dopenid\x2Dusername\x22 value\x3D\x22");
$html.put(trans("Your Name"));
$html.put("\x22/\x3E\x3C/span\x3E  \x3C/p\x3E  \x3Cp\x3E\x3Cbutton class\x3D\x22dsq\x2Dbutton\x22 id\x3D\x22dsq\x2Dopenid\x2Dsubmit\x2Dbutton\x22\x3E");
$html.put(trans("Sign in"));
$html.put("\x3C/button\x3E\x3C/p\x3E");
return $html.compile();
};
DISQUS.blocks["loginPopup"] = function block_loginPopup ($globals, $locals) {

var $html = new DISQUS.strings.Builder();
var $render = DISQUS.renderBlock;

for (var $global in $globals) {
    if ($globals.hasOwnProperty($global)) {
        eval("var " + $global + " = $globals['" + $global + "']");
    }
}

for (var $local in $locals) {
    if ($locals.hasOwnProperty($local)) {
        eval("var " + $local + " = $locals['" + $local + "']");
    }
}

$html.put("  \x3Cdiv class\x3D\x22dsq\x2Dtabbed\x2Dmodal\x22\x3E    \x3Cul class\x3D\x22dsq\x2Dmodal\x2Dtabs\x22\x3E      \x3Cli id\x3D\x22dsq\x2Dlogin\x2Dtab\x2Dguest\x22\x3E\x3Ca href\x3D\x22#dsq\x2Dlogin\x2Dguest\x22 ");
if (!forum.allow_anon_post) { 
$html.put(" style\x3D\x22display: none\x22");
}
$html.put("\x3E\x3Cspan\x3E\x3C/span\x3EGuest\x3C/a\x3E\x3C/li\x3E      ");
if (!forum.disqus_auth_disabled) { 
$html.put("      \x3Cli id\x3D\x22dsq\x2Dlogin\x2Dtab\x2Ddisqus\x22\x3E\x3Ca href\x3D\x22#dsq\x2Dlogin\x2Ddisqus\x22\x3E\x3Cspan\x3E\x3C/span\x3EDisqus\x3C/a\x3E\x3C/li\x3E      ");
}
$html.put("      ");
if (context.forum_facebook_key) { 
$html.put("      \x3Cli id\x3D\x22dsq\x2Dlogin\x2Dtab\x2Dfacebook\x22\x3E\x3Ca href\x3D\x22#dsq\x2Dlogin\x2Dfacebook\x22\x3E\x3Cspan\x3E\x3C/span\x3EFacebook\x3C/a\x3E\x3C/li\x3E      ");
}
$html.put("      \x3Cli id\x3D\x22dsq\x2Dlogin\x2Dtab\x2Dtwitter\x22\x3E\x3Ca href\x3D\x22#dsq\x2Dlogin\x2Dtwitter\x22\x3E\x3Cspan\x3E\x3C/span\x3ETwitter\x3C/a\x3E\x3C/li\x3E      \x3Cli id\x3D\x22dsq\x2Dlogin\x2Dtab\x2Dyahoo\x22\x3E\x3Ca href\x3D\x22#dsq\x2Dlogin\x2Dyahoo\x22\x3E\x3Cspan\x3E\x3C/span\x3EYahoo\x3C/a\x3E\x3C/li\x3E      \x3Cli id\x3D\x22dsq\x2Dlogin\x2Dtab\x2Dopenid\x22\x3E\x3Ca href\x3D\x22#dsq\x2Dlogin\x2Dopenid\x22\x3E\x3Cspan\x3E\x3C/span\x3EOpenId\x3C/a\x3E\x3C/li\x3E    \x3C/ul\x3E    \x3Cdiv class\x3D\x22dsq\x2Dtab\x2Dcontainer\x22\x3E      \x3Cdiv id\x3D\x22dsq\x2Dlogin\x2Dguest\x22 class\x3D\x22dsq\x2Dtab\x2Dcontent\x22 style\x3D\x22display: none\x22\x3E        \x3Cp\x3E          \x3Clabel for\x3D\x22dsq\x2Dfield\x2Demail\x22 id\x3D\x22dsq\x2Dfield\x2Demail\x2Dlabel\x22\x3E");
$html.put(trans("Your email"));
$html.put("\x3C/label\x3E          \x3Cspan class\x3D\x22dsq\x2Dlogin\x2Dinput\x2Dwrapper\x22\x3E            \x3Cinput type\x3D\x22text\x22              value\x3D\x22");
if (config.def_email) { 
$html.put(config.def_email);
} else if (session.email) {
$html.put(session.email);
}
$html.put("\x22 id\x3D\x22dsq\x2Dfield\x2Demail\x22/\x3E            \x3C/span\x3E        \x3C/p\x3E        \x3Cp\x3E          \x3Clabel for\x3D\x22dsq\x2Dfield\x2Dname\x22 id\x3D\x22dsq\x2Dfield\x2Dname\x2Dlabel\x22\x3E");
$html.put(trans("Your name"));
$html.put("\x3C/label\x3E          \x3Cspan class\x3D\x22dsq\x2Dlogin\x2Dinput\x2Dwrapper\x22\x3E            \x3Cinput type\x3D\x22text\x22              value\x3D\x22");
if (config.def_name) { 
$html.put(config.def_name);
} else if (session.name) {
$html.put(session.name);
} else {
$html.put(trans("Guest"));
}
$html.put("\x22 id\x3D\x22dsq\x2Dfield\x2Dname\x22 /\x3E          \x3C/span\x3E        \x3C/p\x3E        \x3Cp\x3E          \x3Cspan class\x3D\x22dsq\x2Dlogin\x2Dadd\x2Durl\x22\x3E");
$html.put(trans("Optional"));
$html.put(": \x3Ca href\x3D\x22#\x22\x3E");
$html.put(trans("Link to your website"));
$html.put("\x3C/a\x3E\x3C/span\x3E        \x3C/p\x3E        \x3Cp style\x3D\x22display:none\x22 id\x3D\x22dsq\x2Doptional\x2Dfield\x2Dwebsite\x22\x3E          \x3Clabel for\x3D\x22dsq\x2Dfield\x2Dwebsite\x22 id\x3D\x22dsq\x2Dfield\x2Dwebsite\x2Dlabel\x22\x3E");
$html.put(trans("Your website"));
$html.put("\x3C/label\x3E          \x3Cspan class\x3D\x22dsq\x2Dlogin\x2Dinput\x2Dwrapper\x22\x3E\x3Cinput type\x3D\x22text\x22 value\x3D\x22");
if (session.url) { 
$html.put(session.url);
}
$html.put("\x22 id\x3D\x22dsq\x2Dfield\x2Dwebsite\x22 /\x3E\x3C/span\x3E        \x3C/p\x3E        \x3Cp class\x3D\x22dsq\x2Dlogin\x2Dsubscribe\x22\x3E          \x3Cspan\x3E            \x3Cinput id\x3D\x22dsq\x2Dsubscribe\x2Don\x2Dpost");
if (comment) { 
$html.put("\x2D");
$html.put(comment.id);
}
$html.put("\x22 type\x3D\x22checkbox\x22              ");
if (request.subscribe_on_post) { 
$html.put("checked\x3D\x22true\x22");
}
$html.put("/\x3E          \x3C/span\x3E          \x3Clabel for\x3D\x22dsq\x2Dsubscribe\x2Don\x2Dpost");
if (comment) { 
$html.put("\x2D");
$html.put(comment.id);
}
$html.put("\x22\x3E");
$html.put(trans("Subscribe to all comments by email"));
$html.put("\x3C/label\x3E        \x3C/p\x3E        \x3Cp\x3E          \x3Cbutton type\x3D\x22button\x22 class\x3D\x22dsq\x2Dbutton\x22\x3E");
$html.put(trans("Post comment"));
$html.put("\x3C/button\x3E        \x3C/p\x3E      \x3C/div\x3E        ");
if (typeof useLoginWindow !== 'undefined' && !useLoginWindow) { 
$html.put("            \x3Cdiv id\x3D\x22dsq\x2Dlogin\x2Ddisqus\x22 class\x3D\x22dsq\x2Dtab\x2Dcontent\x22 style\x3D\x22display: none\x22\x3E              \x3C!\x2D\x2D disqus iframe gets inserted here dynamically \x2D\x2D\x3E            \x3C/div\x3E        ");
} else {
$html.put("        \x3Cdiv id\x3D\x22dsq\x2Dlogin\x2Ddisqus\x22 class\x3D\x22dsq\x2Dtab\x2Dcontent\x22 style\x3D\x22display: none\x22\x3E              \x3Cdiv class\x3D\x22dsq\x2Dconnect\x2Dmsg\x22\x3E                \x3Ch3\x3E");
$html.put(trans("Post using your Disqus account"));
$html.put("\x3C/h3\x3E                \x3Cp\x3E");
$html.put(trans("Click the button below to continue."));
$html.put("\x3C/p\x3E                \x3Cp\x3E\x3Cspan class\x3D\x22dsq\x2Ddisqus\x2Dconnect dsq\x2Dexternal\x2Dlauncher\x22\x3E");
$html.put(trans("Connect to Disqus"));
$html.put("\x3C/span\x3E\x3C/p\x3E              \x3C/div\x3E            \x3Cdiv class\x3D\x22dsq\x2Dremote\x2Dauthentication\x22 style\x3D\x22display:none\x22\x3E              \x3Cimg src\x3D\x22");
$html.put(settings.media_url);
$html.put("/images/dsq\x2Dloader.gif\x22 /\x3E              \x3Cp\x3E");
$html.put(trans("Connecting to Disqus"));
$html.put("\x3C/p\x3E            \x3C/div\x3E            \x3Cp\x3E\x3Csmall\x3E");
$html.put(trans("You might need to disable your popup blocker to sign in."));
$html.put("\x3C/small\x3E\x3C/p\x3E        \x3C/div\x3E        ");
}
$html.put("        ");
if (context.forum_facebook_key) { 
$html.put("        \x3Cdiv id\x3D\x22dsq\x2Dlogin\x2Dfacebook\x22 class\x3D\x22dsq\x2Dtab\x2Dcontent\x22 style\x3D\x22display:none\x22\x3E            \x3Cdiv class\x3D\x22dsq\x2Dconnect\x2Dmsg\x22\x3E              \x3Ch3\x3E");
$html.put(trans("Post using your Facebook account"));
$html.put("\x3C/h3\x3E              \x3Cp\x3E");
$html.put(trans("Click the button below to continue."));
$html.put("\x3C/p\x3E              \x3Cp\x3E\x3Cspan class\x3D\x22dsq\x2Dfacebook\x2Dconnect dsq\x2Dexternal\x2Dlauncher\x22\x3E");
$html.put(trans("Connect to Facebook"));
$html.put("\x3C/span\x3E\x3C/p\x3E            \x3C/div\x3E          \x3Cdiv class\x3D\x22dsq\x2Dremote\x2Dauthentication\x22 style\x3D\x22display:none\x22\x3E            \x3Cimg src\x3D\x22");
$html.put(settings.media_url);
$html.put("/images/dsq\x2Dloader.gif\x22 /\x3E            \x3Cp\x3E");
$html.put(trans("Connecting to Facebook"));
$html.put("\x3C/p\x3E          \x3C/div\x3E          \x3Cp\x3E\x3Csmall\x3E");
$html.put(trans("You might need to disable your popup blocker to sign in."));
$html.put("\x3C/small\x3E\x3C/p\x3E        \x3C/div\x3E        ");
}
$html.put("        \x3Cdiv id\x3D\x22dsq\x2Dlogin\x2Dtwitter\x22 class\x3D\x22dsq\x2Dtab\x2Dcontent\x22 style\x3D\x22display:none\x22\x3E          \x3Cdiv class\x3D\x22dsq\x2Dconnect\x2Dmsg\x22\x3E            \x3Ch3\x3E");
$html.put(trans("Post using your Twitter account"));
$html.put("\x3C/h3\x3E            \x3Cp\x3E");
$html.put(trans("Click the button below to continue."));
$html.put("\x3C/p\x3E            \x3Cp\x3E\x3Cspan class\x3D\x22dsq\x2Dtwitter\x2Dconnect dsq\x2Dexternal\x2Dlauncher\x22\x3E");
$html.put(trans("Connect to Twitter"));
$html.put("\x3C/span\x3E\x3C/p\x3E          \x3C/div\x3E          \x3Cdiv class\x3D\x22dsq\x2Dremote\x2Dauthentication\x22 style\x3D\x22display:none\x22\x3E            \x3Cimg src\x3D\x22");
$html.put(settings.media_url);
$html.put("/images/dsq\x2Dloader.gif\x22 /\x3E            \x3Cp\x3E");
$html.put(trans("Connecting to Twitter"));
$html.put("\x3C/p\x3E          \x3C/div\x3E          \x3Cp\x3E\x3Csmall\x3E");
$html.put(trans("You might need to disable your popup blocker to sign in."));
$html.put("\x3C/small\x3E\x3C/p\x3E        \x3C/div\x3E        \x3Cdiv id\x3D\x22dsq\x2Dlogin\x2Dopenid\x22 class\x3D\x22dsq\x2Dtab\x2Dcontent\x22 style\x3D\x22display:none\x22\x3E          ");
(function () {
var $l = {};
lang.extend($l, $locals);
lang.extend($l, {});
$html.put($render("openidForm", $l));
}());
$html.put("        \x3C/div\x3E        \x3Cdiv id\x3D\x22dsq\x2Dlogin\x2Dyahoo\x22 class\x3D\x22dsq\x2Dtab\x2Dcontent\x22 style\x3D\x22display:none\x22\x3E          \x3Cdiv class\x3D\x22dsq\x2Dconnect\x2Dmsg\x22\x3E            \x3Ch3\x3E");
$html.put(trans("Post using your Yahoo account"));
$html.put("\x3C/h3\x3E            \x3Cp\x3E");
$html.put(trans("Click the button below to continue."));
$html.put("\x3C/p\x3E            \x3Cp\x3E\x3Cspan class\x3D\x22dsq\x2Dyahoo\x2Dconnect dsq\x2Dexternal\x2Dlauncher\x22\x3E");
$html.put(trans("Connect to Yahoo"));
$html.put("\x3C/span\x3E\x3C/p\x3E          \x3C/div\x3E          \x3Cdiv class\x3D\x22dsq\x2Dremote\x2Dauthentication\x22 style\x3D\x22display:none\x22\x3E            \x3Cimg src\x3D\x22");
$html.put(settings.media_url);
$html.put("/images/dsq\x2Dloader.gif\x22 /\x3E            \x3Cp\x3E");
$html.put(trans("Connecting to Yahoo"));
$html.put("\x3C/p\x3E          \x3C/div\x3E          \x3Cp\x3E\x3Csmall\x3E");
$html.put(trans("You might need to disable your popup blocker to sign in."));
$html.put("\x3C/small\x3E\x3C/p\x3E        \x3C/div\x3E    \x3C/div\x3E  \x3C/div\x3E");
return $html.compile();
};
DISQUS.blocks["profileEdit"] = function block_profileEdit ($globals, $locals) {

var $html = new DISQUS.strings.Builder();
var $render = DISQUS.renderBlock;

for (var $global in $globals) {
    if ($globals.hasOwnProperty($global)) {
        eval("var " + $global + " = $globals['" + $global + "']");
    }
}

for (var $local in $locals) {
    if ($locals.hasOwnProperty($local)) {
        eval("var " + $local + " = $locals['" + $local + "']");
    }
}

$html.put("\x3Cdiv class\x3D\x22dsq\x2Dtabbed\x2Dmodal\x22 id\x3D\x22dsq\x2Dprofile\x2Dmodal\x22\x3E  \x3Cul class\x3D\x22dsq\x2Dmodal\x2Dtabs\x22\x3E    \x3Cli id\x3D\x22dsq\x2Dtab\x2Dprofile\x2Dedit\x22\x3E\x3Ca href\x3D\x22#dsq\x2Dprofile\x2Dedit\x22\x3E\x3Cspan\x3E\x3C/span\x3EProfile\x3C/a\x3E\x3C/li\x3E    \x3Cli id\x3D\x22dsq\x2Dtab\x2Dprofile\x2Davatar\x22\x3E\x3Ca href\x3D\x22#dsq\x2Dprofile\x2Davatar\x22\x3E\x3Cspan\x3E\x3C/span\x3EAvatar\x3C/a\x3E\x3C/li\x3E    \x3Cli id\x3D\x22dsq\x2Dtab\x2Dprofile\x2Dservices\x22\x3E\x3Ca href\x3D\x22#dsq\x2Dprofile\x2Dservices\x22\x3E\x3Cspan\x3E\x3C/span\x3EServices\x3C/a\x3E\x3C/li\x3E    \x3Cli id\x3D\x22dsq\x2Dtab\x2Dprofile\x2Dnotifications\x22\x3E\x3Ca href\x3D\x22#dsq\x2Dprofile\x2Dnotifications\x22\x3E\x3Cspan\x3E\x3C/span\x3ENotifications\x3C/a\x3E\x3C/li\x3E    \x3Cli id\x3D\x22dsq\x2Dtab\x2Dprofile\x2Daccount\x22\x3E\x3Ca href\x3D\x22#dsq\x2Dprofile\x2Daccount\x22\x3E\x3Cspan\x3E\x3C/span\x3EAccount\x3C/a\x3E\x3C/li\x3E  \x3C/ul\x3E  \x3Cdiv class\x3D\x22dsq\x2Dtab\x2Dcontainer\x22 style\x3D\x22height:90%\x22\x3E      \x3Cdiv id\x3D\x22dsq\x2Dprofile\x2Dedit\x22 class\x3D\x22dsq\x2Dtab\x2Dcontent\x22\x3E\x3C/div\x3E      \x3Cdiv id\x3D\x22dsq\x2Dprofile\x2Davatar\x22 class\x3D\x22dsq\x2Dtab\x2Dcontent\x22\x3E\x3C/div\x3E      \x3Cdiv id\x3D\x22dsq\x2Dprofile\x2Dservices\x22 class\x3D\x22dsq\x2Dtab\x2Dcontent\x22\x3E\x3C/div\x3E      \x3Cdiv id\x3D\x22dsq\x2Dprofile\x2Dnotifications\x22 class\x3D\x22dsq\x2Dtab\x2Dcontent\x22\x3E\x3C/div\x3E      \x3Cdiv id\x3D\x22dsq\x2Dprofile\x2Daccount\x22 class\x3D\x22dsq\x2Dtab\x2Dcontent\x22\x3E\x3C/div\x3E  \x3C/div\x3E\x3C/div\x3E");
return $html.compile();
};
DISQUS.blocks["commentMessage"] = function block_commentMessage ($globals, $locals) {

var $html = new DISQUS.strings.Builder();
var $render = DISQUS.renderBlock;

for (var $global in $globals) {
    if ($globals.hasOwnProperty($global)) {
        eval("var " + $global + " = $globals['" + $global + "']");
    }
}

for (var $local in $locals) {
    if ($locals.hasOwnProperty($local)) {
        eval("var " + $local + " = $locals['" + $local + "']");
    }
}

$html.put("\x3Cdiv id\x3D\x22dsq\x2Dcomment\x2Dmessage\x2D");
$html.put(comment.id);
$html.put("\x22 class\x3D\x22dsq\x2Dcomment\x2Dmessage\x22\x3E  ");
if (comment.stripped(300)) { 
$html.put("  \x3Cdiv id\x3D\x22dsq\x2Dcomment\x2Dstripped\x2D");
$html.put(comment.id);
$html.put("\x22\x3E    ");
$html.put(comment.stripped(300));
$html.put("... \x3Ca href\x3D\x22#\x22 onclick\x3D\x22return DISQUS.dtpl.actions.fire(\x27comments.readMore\x27, ");
$html.put(comment.id);
$html.put(")\x3B\x22\x3Emore\x3C/a\x3E  \x3C/div\x3E  \x3Cdiv id\x3D\x22dsq\x2Dcomment\x2Doriginal\x2D");
$html.put(comment.id);
$html.put("\x22 style\x3D\x22display: none\x3B\x22\x3E    ");
$html.put(comment.message);
$html.put(" \x3Ca href\x3D\x22#\x22 onclick\x3D\x22return DISQUS.dtpl.actions.fire(\x27comments.readLess\x27, ");
$html.put(comment.id);
$html.put(")\x3B\x22\x3Eless\x3C/a\x3E  \x3C/div\x3E  ");
} else {
$html.put("    ");
$html.put(comment.message);
$html.put("  ");
}
$html.put("\x3C/div\x3E");
return $html.compile();
};
DISQUS.blocks["popup"] = function block_popup ($globals, $locals) {

var $html = new DISQUS.strings.Builder();
var $render = DISQUS.renderBlock;

for (var $global in $globals) {
    if ($globals.hasOwnProperty($global)) {
        eval("var " + $global + " = $globals['" + $global + "']");
    }
}

for (var $local in $locals) {
    if ($locals.hasOwnProperty($local)) {
        eval("var " + $local + " = $locals['" + $local + "']");
    }
}

$html.put("\x3Cdiv class\x3D\x22dsq\x2Dpopup\x2Dcontainer\x22\x3E  \x3Ctable\x3E    \x3Ctbody\x3E      \x3Ctr\x3E        \x3Ctd class\x3D\x22dsq\x2Dpopup\x2Dtl\x22\x3E\x3C/td\x3E        \x3Ctd class\x3D\x22dsq\x2Dpopup\x2Db\x22\x3E\x3C/td\x3E        \x3Ctd class\x3D\x22dsq\x2Dpopup\x2Dtr\x22\x3E\x3C/td\x3E      \x3C/tr\x3E      \x3Ctr\x3E        \x3Ctd class\x3D\x22dsq\x2Dpopup\x2Db\x22\x3E\x3C/td\x3E        \x3Ctd class\x3D\x22dsq\x2Dpopup\x2Dbody\x22\x3E          \x3Cdiv class\x3D\x22dsq\x2Dpopup\x2Dcontent\x22\x3E            \x3Cdiv class\x3D\x22dsq\x2Dpopup\x2Dtitle\x22\x3E              \x3Cbutton type\x3D\x22button\x22 class\x3D\x22dsq\x2Dbutton\x2Dsmall\x22 style\x3D\x22float:right\x3B\x22                      onclick\x3D\x22DISQUS.popup.close(null, true)\x3B\x22\x3E");
$html.put(trans("Close"));
$html.put("\x3C/button\x3E              \x3Ch3\x3E");
$html.put(popupHeader);
$html.put("\x3C/h3\x3E            \x3C/div\x3E            ");
$html.put(popupBody);
$html.put("          \x3C/div\x3E          \x3Cdiv class\x3D\x22powered\x2Dby\x22\x3E            \x3Ca href\x3D\x22");
$html.put(settings.disqus_url);
$html.put("/comments/\x22\x3E              \x3Cimg src\x3D\x22");
$html.put(settings.media_url);
$html.put("/images/embed/disqus\x2Dlogo.png\x22 alt\x3D\x22Disqus Comments\x22 style\x3D\x22margin\x2Dbottom:\x2D5px\x3B\x22/\x3E            \x3C/a\x3E          \x3C/div\x3E        \x3C/td\x3E        \x3Ctd class\x3D\x22dsq\x2Dpopup\x2Db\x22\x3E\x3C/td\x3E      \x3C/tr\x3E      \x3Ctr\x3E        \x3Ctd class\x3D\x22dsq\x2Dpopup\x2Dbl\x22\x3E\x3C/td\x3E        \x3Ctd class\x3D\x22dsq\x2Dpopup\x2Db\x22\x3E\x3C/td\x3E        \x3Ctd class\x3D\x22dsq\x2Dpopup\x2Dbr\x22\x3E\x3C/td\x3E      \x3C/tr\x3E    \x3C/tbody\x3E  \x3C/table\x3E\x3C/div\x3E");
return $html.compile();
};
DISQUS.blocks["threadSettingsPopup"] = function block_threadSettingsPopup ($globals, $locals) {

var $html = new DISQUS.strings.Builder();
var $render = DISQUS.renderBlock;

for (var $global in $globals) {
    if ($globals.hasOwnProperty($global)) {
        eval("var " + $global + " = $globals['" + $global + "']");
    }
}

for (var $local in $locals) {
    if ($locals.hasOwnProperty($local)) {
        eval("var " + $local + " = $locals['" + $local + "']");
    }
}

$html.put("\x3Cdiv class\x3D\x22dsq\x2Dmoderate\x2Doptions\x22\x3E  \x3Cspan id\x3D\x22dsq\x2Dthread\x2Dsettings\x2Dstatus\x22 class\x3D\x22dsq\x2Doptions\x2Dstatus\x22\x3E\x3C/span\x3E  \x3Ctable class\x3D\x22dsq\x2Dmoderator\x2Dsettings\x22\x3E    \x3Ctr\x3E      \x3Ctd\x3E\x3Cstrong\x3E");
$html.put(trans("Automatic Closing"));
$html.put("\x3C/strong\x3E\x3C/td\x3E      \x3Ctd\x3EDo not allow comments after        \x3Cinput size\x3D\x223\x22 id\x3D\x22dsq\x2Dthread\x2Ddays\x2Dalive\x22 value\x3D\x22");
$html.put(thread.days_alive);
$html.put("\x22               type\x3D\x22text\x22 /\x3E days.         Using 0 days will disable this feature.\x3Cbr /\x3E\x3Cbr /\x3E        \x3Cp class\x3D\x22dsq\x2Dform\x2Dactions\x22\x3E          \x3Cbutton type\x3D\x22button\x22 onclick\x3D\x22DISQUS.dtpl.actions.fire(\x27thread.updateDaysAlive\x27)\x3B\x22 class\x3D\x22dsq\x2Dbutton\x2Dsmall\x22\x3E            \x3Cspan\x3ESave\x3C/span\x3E          \x3C/button\x3E        \x3C/p\x3E      \x3C/td\x3E    \x3C/tr\x3E    \x3Ctr\x3E      \x3Ctd class\x3D\x22last\x22\x3E\x3Cstrong\x3E");
$html.put(trans("Moderate all comments"));
$html.put("\x3C/strong\x3E\x3C/td\x3E      \x3Ctd class\x3D\x22last\x22\x3E        \x3Cinput type\x3D\x22radio\x22 id\x3D\x22dsq\x2Dthread\x2Dmoderate\x2Dall\x22               name\x3D\x22moderate_all_comments\x22 value\x3D\x221\x22");
if (thread.moderate_all) { 
$html.put("checked\x3D\x22true\x22");
}
$html.put("/\x3E        \x3Clabel\x3E\x3Cstrong\x3EYes\x3C/strong\x3E, moderators must approve all comments before they are published.\x3C/label\x3E        \x3Cbr/\x3E\x3Cbr/\x3E        \x3Cinput type\x3D\x22radio\x22 name\x3D\x22moderate_all_comments\x22 value\x3D\x220\x22");
if (!thread.moderate_all) { 
$html.put("checked\x3D\x22true\x22");
}
$html.put("/\x3E        \x3Clabel\x3E\x3Cstrong\x3ENo\x3C/strong\x3E, comments don\x27t need to be approved before they are published.\x3C/label\x3E        \x3Cp class\x3D\x22dsq\x2Dform\x2Dactions\x22\x3E          \x3Cbutton type\x3D\x22button\x22 onclick\x3D\x22DISQUS.dtpl.actions.fire(\x27thread.updateModerateAll\x27)\x3B\x22 class\x3D\x22dsq\x2Dbutton\x2Dsmall\x22\x3E            \x3Cspan\x3ESave\x3C/span\x3E          \x3C/button\x3E        \x3C/p\x3E      \x3C/td\x3E    \x3C/tr\x3E  \x3C/table\x3E\x3C/div\x3EGo to the main \x3Ca href\x3D\x22");
$html.put(settings.disqus_url);
$html.put("/comments/settings/");
$html.put(forum.url);
$html.put("\x22                  target\x3D\x22_blank\x22\x3Esettings page\x3C/a\x3E for more options.");
return $html.compile();
};
DISQUS.blocks["moderatorOptions"] = function block_moderatorOptions ($globals, $locals) {

var $html = new DISQUS.strings.Builder();
var $render = DISQUS.renderBlock;

for (var $global in $globals) {
    if ($globals.hasOwnProperty($global)) {
        eval("var " + $global + " = $globals['" + $global + "']");
    }
}

for (var $local in $locals) {
    if ($locals.hasOwnProperty($local)) {
        eval("var " + $local + " = $locals['" + $local + "']");
    }
}

$html.put("  ");
if (request.is_moderator) { 
$html.put("  \x3Cdiv id\x3D\x22dsq\x2Dthread\x2Dsettings\x22 class\x3D\x22dsq\x2Dthread\x2Dsettings\x22\x3E");
$html.put(trans("Moderator options"));
$html.put(":    \x3Ca href\x3D\x22#\x22 onclick\x3D\x22return DISQUS.dtpl.actions.fire(\x27thread.settings\x27)\x3B\x22\x3E");
$html.put(trans("Settings"));
$html.put("\x3C/a\x3E    \x3Ca href\x3D\x22#\x22 onclick\x3D\x22return DISQUS.dtpl.actions.fire(\x27thread.moderatorActions\x27)\x3B\x22\x3E");
$html.put(trans("Moderate"));
$html.put("\x3C/a\x3E    \x3Ca href\x3D\x22#\x22 onclick\x3D\x22return DISQUS.dtpl.actions.fire(\x27thread.help\x27)\x3B\x22\x3E");
$html.put(trans("Help"));
$html.put("\x3C/a\x3E  \x3C/div\x3E  ");
}
return $html.compile();
};
DISQUS.blocks["subscribeForm"] = function block_subscribeForm ($globals, $locals) {

var $html = new DISQUS.strings.Builder();
var $render = DISQUS.renderBlock;

for (var $global in $globals) {
    if ($globals.hasOwnProperty($global)) {
        eval("var " + $global + " = $globals['" + $global + "']");
    }
}

for (var $local in $locals) {
    if ($locals.hasOwnProperty($local)) {
        eval("var " + $local + " = $locals['" + $local + "']");
    }
}

$html.put("\x3Cdiv class\x3D\x22dsq\x2Dsubscribe\x2Dsubmit\x22\x3E  \x3Cp\x3E\x3Cstrong\x3E");
$html.put(trans("Enter your email address below:"));
$html.put("\x3C/strong\x3E\x3C/p\x3E  \x3Cinput type\x3D\x22text\x22 id\x3D\x22dsq\x2Dsubscribe\x2Demail\x22/\x3E  \x3Cbutton type\x3D\x22button\x22          onclick\x3D\x22DISQUS.dtpl.actions.fire(\x27thread.subscribe\x27, DISQUS.nodes.get(\x27#dsq\x2Dsubscribe\x2Demail\x27).value)\x3B\x22\x3E    ");
$html.put(trans("Subscribe"));
$html.put("  \x3C/button\x3E\x3C/div\x3E");
return $html.compile();
};
DISQUS.blocks["pageInfo"] = function block_pageInfo ($globals, $locals) {

var $html = new DISQUS.strings.Builder();
var $render = DISQUS.renderBlock;

for (var $global in $globals) {
    if ($globals.hasOwnProperty($global)) {
        eval("var " + $global + " = $globals['" + $global + "']");
    }
}

for (var $local in $locals) {
    if ($locals.hasOwnProperty($local)) {
        eval("var " + $local + " = $locals['" + $local + "']");
    }
}

if (request.is_global_moderator) { 
$html.put("  \x3Cdiv class\x3D\x22dsq\x2Dglobal\x2Dmoderator\x2Dextras\x22       style\x3D\x22display: block\x3B margin\x2Dtop: 10px\x3B\x22\x3E    \x3Cstrong\x3EShortname:\x3C/strong\x3E ");
$html.put(forum.url);
$html.put("    \x3Cstrong\x3EThread ID:\x3C/strong\x3E ");
$html.put(thread.id);
$html.put("    \x3Cstrong\x3EThread slug:\x3C/strong\x3E ");
$html.put(thread.slug);
$html.put("  \x3C/div\x3E");
}
return $html.compile();
};
DISQUS.blocks["editArea"] = function block_editArea ($globals, $locals) {

var $html = new DISQUS.strings.Builder();
var $render = DISQUS.renderBlock;

for (var $global in $globals) {
    if ($globals.hasOwnProperty($global)) {
        eval("var " + $global + " = $globals['" + $global + "']");
    }
}

for (var $local in $locals) {
    if ($locals.hasOwnProperty($local)) {
        eval("var " + $local + " = $locals['" + $local + "']");
    }
}

$html.put("\x3Cdiv class\x3D\x22dsq\x2Dtextarea\x2Dwrapper\x22\x3E    \x3Ctextarea class\x3D\x22dsq\x2Dedit\x2Dtextarea\x22 id\x3D\x22dsq\x2Dedit\x2Dtextarea\x2D");
$html.put(comment.id);
$html.put("\x22\x3E");
$html.put(comment.message);
$html.put("\x3C/textarea\x3E\x3C/div\x3E\x3Cdiv class\x3D\x22dsq\x2Dsave\x2Dedit\x22\x3E    \x3Cbutton type\x3D\x22button\x22            onclick\x3D\x22DISQUS.dtpl.actions.fire(\x27comments.edit.send\x27, ");
$html.put(comment.id);
$html.put(", this)\x3B\x22\x3E");
$html.put(trans("Save edit"));
$html.put("\x3C/button\x3E\x3C/div\x3E\x3Cdiv id\x3D\x22dsq\x2Dedit\x2Diframe\x2D");
$html.put(comment.id);
$html.put("\x22 style\x3D\x22display: none\x3B\x22\x3E\x3C/div\x3E");
return $html.compile();
};
DISQUS.blocks["pagination"] = function block_pagination ($globals, $locals) {

var $html = new DISQUS.strings.Builder();
var $render = DISQUS.renderBlock;

for (var $global in $globals) {
    if ($globals.hasOwnProperty($global)) {
        eval("var " + $global + " = $globals['" + $global + "']");
    }
}

for (var $local in $locals) {
    if ($locals.hasOwnProperty($local)) {
        eval("var " + $local + " = $locals['" + $local + "']");
    }
}

$html.put("\x3Cdiv id\x3D\x22dsq\x2Dpagination\x22 class\x3D\x22dsq\x2Dpagination\x22\x3E  ");
if (thread.num_pages > 1 && request.page < thread.num_pages) { 
$html.put("  \x3Ca class\x3D\x22dsq\x2Dpaginate\x2Dappend\x2Dtext\x22 href\x3D\x22#\x22 onclick\x3D\x22return DISQUS.dtpl.actions.fire(\x27thread.paginate\x27, ");
$html.put(request.page + 1);
$html.put(", this)\x3B\x22\x3ELoad next 25\x3C/a\x3E  ");
if (thread.total_posts < 1000) { 
$html.put("  | \x3Ca class\x3D\x22dsq\x2Dpaginate\x2Dview\x2Dall\x22 href\x3D\x22#\x22 onclick\x3D\x22return DISQUS.dtpl.actions.fire(\x27thread.paginate\x27, ");
$html.put(request.page + 1);
$html.put(", this, 0)\x3B\x22\x3EView all comments\x3C/a\x3E  ");
}
$html.put("  ");
}
$html.put("\x3C/div\x3E");
return $html.compile();
};
DISQUS.blocks["thread"] = function block_thread ($globals, $locals) {

var $html = new DISQUS.strings.Builder();
var $render = DISQUS.renderBlock;

for (var $global in $globals) {
    if ($globals.hasOwnProperty($global)) {
        eval("var " + $global + " = $globals['" + $global + "']");
    }
}

for (var $local in $locals) {
    if ($locals.hasOwnProperty($local)) {
        eval("var " + $local + " = $locals['" + $local + "']");
    }
}

$html.put("  ");
(function () {
var $l = {};
lang.extend($l, $locals);
lang.extend($l, {});
$html.put($render("header", $l));
}());
$html.put("  \x3Cul id\x3D\x22dsq\x2Dcomments\x22\x3E    ");
(function () {
var $l = {};
lang.extend($l, $locals);
lang.extend($l, {});
$html.put($render("comments", $l));
}());
$html.put("  \x3C/ul\x3E  ");
(function () {
var $l = {};
lang.extend($l, $locals);
lang.extend($l, {});
$html.put($render("pagination", $l));
}());
return $html.compile();
};
DISQUS.blocks["popupProfileBody"] = function block_popupProfileBody ($globals, $locals) {

var $html = new DISQUS.strings.Builder();
var $render = DISQUS.renderBlock;

for (var $global in $globals) {
    if ($globals.hasOwnProperty($global)) {
        eval("var " + $global + " = $globals['" + $global + "']");
    }
}

for (var $local in $locals) {
    if ($locals.hasOwnProperty($local)) {
        eval("var " + $local + " = $locals['" + $local + "']");
    }
}

$html.put("\x3Cdiv class\x3D\x22dsq\x2Dpopup\x2Dprofile\x2Dstate\x22\x3E  ");
$html.put(trans("This is a"));
$html.put("  ");
if (user.registered) { 
$html.put("    ");
if (user.verified) { 
$html.put("      \x3Cspan class\x3D\x22dsq\x2Dbadge\x2Dverified\x22\x3E");
$html.put(trans("Verified"));
$html.put("\x3C/span\x3E    ");
} else if (user.is_remote) {
$html.put("      \x3Cspan class\x3D\x22dsq\x2Dbadge\x2D");
$html.put(user.remote_domain_name.toLowerCase());
$html.put("\x22\x3E");
$html.put(user.remote_domain_name);
$html.put("\x3C/span\x3E    ");
} else {
$html.put("      \x3Cspan class\x3D\x22dsq\x2Dbadge\x2Dregistered\x22\x3E");
$html.put(trans("Registered"));
$html.put("\x3C/span\x3E    ");
}
$html.put("  ");
} else {
$html.put("      \x3Cspan class\x3D\x22dsq\x2Dbadge\x2Dguest\x22\x3E");
$html.put(trans("Guest"));
$html.put("\x3C/span\x3E  ");
}
$html.put("  ");
$html.put(trans("commenter profile"));
$html.put(".  \x3Ca class\x3D\x22dsq\x2Dprofile\x2Duserurl\x22 href\x3D\x22");
$html.put(user.url);
$html.put("\x22\x3E    \x3Cstrong\x3E");
$html.put(trans("View more comments"));
$html.put("\x3C/strong\x3E  \x3C/a\x3E  ");
if (!user.points) { 
$html.put("  \x3Cp class\x3D\x22dsq\x2Dpopup\x2Dnotice\x22\x3E    ");
$html.put(lang.interpolate(trans("If this is you, \x3Ca href\x3D\x27%(url)s/profile/\x27 target\x3D\x27_blank\x27\x3Eclaim it now\x3C/a\x3E to manage your comments."), { "url": settings.disqus_url }));
$html.put("  \x3C/p\x3E  ");
}
$html.put("  ");
if (user.registered && !user.verified && (request.username && (request.username == user.username)) && !user.is_remote) { 
$html.put("  \x3Cp class\x3D\x22dsq\x2Dpopup\x2Dnotice\x22\x3E    \x3Cstrong\x3E");
$html.put(trans("Alert"));
$html.put("\x3C/strong\x3E: ");
$html.put(trans("You have not verified this account."));
$html.put("    \x3Ca href\x3D\x22");
$html.put(settings.disqus_url);
$html.put("/verify\x22\x3E");
$html.put(trans("Verify it now."));
$html.put("\x3C/a\x3E  \x3C/p\x3E  ");
}
$html.put("\x3C/div\x3E\x3Cdiv id\x3D\x22dsq\x2Dprofile\x2Dstatus\x2D");
$html.put(userKey);
$html.put("\x22 class\x3D\x22dsq\x2Dpopup\x2Dprofile\x2Dstatus\x22 style\x3D\x22display:none\x3B\x22\x3E\x3C/div\x3E\x3Cdiv class\x3D\x22dsq\x2Dpopup\x2Dprofile\x2Dsnapshot\x22\x3E  \x3Ctable\x3E    \x3Ctr\x3E      \x3Ctd\x3E        \x3Cdiv id\x3D\x22dsq\x2Dpopup\x2Dprofile\x2Dactive\x2Dsites\x2Dwrapper\x2D");
$html.put(userKey);
$html.put("\x22\x3E          \x3Ch4\x3E");
$html.put(trans("Most active sites"));
$html.put("\x3C/h4\x3E          \x3Cul id\x3D\x22dsq\x2Dpopup\x2Dprofile\x2Dactive\x2Dsites\x2D");
$html.put(userKey);
$html.put("\x22\x3E            \x3Cli\x3E");
$html.put(trans("Loading..."));
$html.put("\x3C/li\x3E          \x3C/ul\x3E        \x3C/div\x3E      \x3C/td\x3E      \x3Ctd\x3E        \x3Ch4\x3E");
$html.put(trans("Connections"));
$html.put("\x3C/h4\x3E        \x3Cul\x3E          ");
lang.forEach(services, function (service, $index, $collection) {
var $locals = { "service": service, "index": $index };
$html.put("          \x3Cli\x3E            \x3Cimg src\x3D\x22");
$html.put(settings.media_url);
$html.put("/images/embed/services/");
$html.put(service.name);
$html.put(".png\x22                 title\x3D\x22service.name\x22/\x3E            \x3Ca class\x3D\x22dsq\x2Dservice\x2D");
$html.put(service.name);
$html.put("\x22 href\x3D\x22service.url\x22 target\x3D\x22_blank\x22\x3E              ");
$html.put(service.display_name);
$html.put("            \x3C/a\x3E          \x3C/li\x3E          ");
});
$html.put("        \x3C/ul\x3E        \x3Cdiv id\x3D\x22dsq\x2Dpopup\x2Dprofile\x2Dmoderated\x2Dwrapper\x2D");
$html.put(userKey);
$html.put("\x22\x3E          \x3Ch4\x3E");
$html.put(trans("Moderator of"));
$html.put("\x3C/h4\x3E          \x3Cul id\x3D\x22dsq\x2Dpopup\x2Dprofile\x2Dmoderated\x2D");
$html.put(userKey);
$html.put("\x22\x3E            \x3Cli\x3E");
$html.put(trans("Loading..."));
$html.put("\x3C/li\x3E          \x3C/ul\x3E        \x3C/div\x3E      \x3C/td\x3E    \x3C/tr\x3E  \x3C/table\x3E\x3C/div\x3E");
return $html.compile();
};
DISQUS.blocks["popupProfileHeader"] = function block_popupProfileHeader ($globals, $locals) {

var $html = new DISQUS.strings.Builder();
var $render = DISQUS.renderBlock;

for (var $global in $globals) {
    if ($globals.hasOwnProperty($global)) {
        eval("var " + $global + " = $globals['" + $global + "']");
    }
}

for (var $local in $locals) {
    if ($locals.hasOwnProperty($local)) {
        eval("var " + $local + " = $locals['" + $local + "']");
    }
}

$html.put("\x3Ctable\x3E  \x3Ctr\x3E    \x3Ctd\x3E      \x3Ca class\x3D\x22dsq\x2Dprofile\x2Duserurl\x22 href\x3D\x22");
$html.put(user.url);
$html.put("\x22\x3E        \x3Cimg class\x3D\x22dsq\x2Dpopup\x2Dprofile\x2Davatar\x22 src\x3D\x22");
$html.put(user.avatar);
$html.put("\x22 alt\x3D\x22\x22 /\x3E      \x3C/a\x3E    \x3C/td\x3E    \x3Ctd\x3E      \x3Cdiv class\x3D\x22dsq\x2Dpopup\x2Dprofile\x2Duser\x22\x3E        \x3Ch3\x3E");
$html.put(user.display_name);
$html.put("\x3C/h3\x3E        \x3Cdiv class\x3D\x22dsq\x2Dpopup\x2Dprofile\x2Duser\x2Dstats\x22 id\x3D\x22dsq\x2Dpopup\x2Dprofile\x2Duser\x2Dstats\x2D");
$html.put(userKey);
$html.put("\x22\x3E          Loading...        \x3C/div\x3E    \x3C/td\x3E  \x3C/tr\x3E\x3C/table\x3E");
return $html.compile();
};
DISQUS.blocks["avatar"] = function block_avatar ($globals, $locals) {

var $html = new DISQUS.strings.Builder();
var $render = DISQUS.renderBlock;

for (var $global in $globals) {
    if ($globals.hasOwnProperty($global)) {
        eval("var " + $global + " = $globals['" + $global + "']");
    }
}

for (var $local in $locals) {
    if ($locals.hasOwnProperty($local)) {
        eval("var " + $local + " = $locals['" + $local + "']");
    }
}

if (settings.debug) { 
$html.put("  \x3Cimg ");
if ($locals.cls) { 
$html.put("class\x3D\x22");
$html.put(cls);
$html.put("\x22");
}
$html.put(" src\x3D\x22story_page.8_files/50x50_default_avatar.jpg\x22 alt\x3D\x22\x22\x3E");
} else {
$html.put("  ");
if (request.is_authenticated) { 
$html.put("  \x3Cimg ");
if ($locals.cls) { 
$html.put("class\x3D\x22");
$html.put(cls);
$html.put("\x22");
}
$html.put("       src\x3D\x22http://avatar.cnn.com/people/");
$html.put(request.display_username);
$html.put("/avatar/48.png\x22 alt\x3D\x22\x22\x3E  ");
} else {
$html.put("  \x3Cimg ");
if ($locals.cls) { 
$html.put("class\x3D\x22");
$html.put(cls);
$html.put("\x22");
}
$html.put(" src\x3D\x22http://www.ireport.com/themes/custom/resources/irb/default\x2Davatar.png\x22 alt\x3D\x22\x22\x3E  ");
}
}
return $html.compile();
};
DISQUS.blocks["moderatorHelpPopup"] = function block_moderatorHelpPopup ($globals, $locals) {

var $html = new DISQUS.strings.Builder();
var $render = DISQUS.renderBlock;

for (var $global in $globals) {
    if ($globals.hasOwnProperty($global)) {
        eval("var " + $global + " = $globals['" + $global + "']");
    }
}

for (var $local in $locals) {
    if ($locals.hasOwnProperty($local)) {
        eval("var " + $local + " = $locals['" + $local + "']");
    }
}

$html.put("\x3Cul class\x3D\x22dsq\x2Dthread\x2Dhelp\x22\x3E  ");
if (forum.reactions_enabled) { 
$html.put("  \x3Cli\x3E    \x3Ca href\x3D\x22#\x22 onclick\x3D\x22return DISQUS.dtpl.actions.fire(\x27reactions.reportMissing\x27)\x3B\x22\x3E");
$html.put(trans("Report missing reactions"));
$html.put("\x3C/a\x3E    \x3Cp\x3E");
$html.put(trans("Are you expecting Reactions for this thread, but do not see them? Select this option to tell the system to search again."));
$html.put("\x3C/p\x3E  \x3C/li\x3E  ");
}
$html.put("  \x3Cli\x3E    \x3Ca href\x3D\x22http://help.disqus.com/forums/\x22 target\x3D\x22_blank\x22\x3E");
$html.put(trans("Knowledge Base"));
$html.put("\x3C/a\x3E    \x3Cp\x3E");
$html.put(trans("Our Knowledge Base has the answers to the most common questions."));
$html.put("\x3C/p\x3E  \x3C/li\x3E\x3C/ul\x3E");
return $html.compile();
};
DISQUS.blocks["blacklistPopup"] = function block_blacklistPopup ($globals, $locals) {

var $html = new DISQUS.strings.Builder();
var $render = DISQUS.renderBlock;

for (var $global in $globals) {
    if ($globals.hasOwnProperty($global)) {
        eval("var " + $global + " = $globals['" + $global + "']");
    }
}

for (var $local in $locals) {
    if ($locals.hasOwnProperty($local)) {
        eval("var " + $local + " = $locals['" + $local + "']");
    }
}

$html.put(trans("Adding this person to the blacklist will block him or her from commenting on this site. Check the following types that you would like to add to the blacklist"));
$html.put(":");
if (user.registered) { 
$html.put("\x3Cdiv class\x3D\x22dsq\x2Dblacklist\x2Doption\x22\x3E  \x3Cinput id\x3D\x22dsq\x2Dblacklist\x2Dusername\x22 type\x3D\x22checkbox\x22 checked\x3D\x22true\x22/\x3E  \x3Clabel for\x3D\x22dsq\x2Dblacklist\x2Dusername\x22\x3E\x3Cstrong\x3E");
$html.put(trans("Username"));
$html.put("\x3C/strong\x3E: ");
$html.put(user.username);
$html.put("\x3C/label\x3E\x3C/div\x3E");
}
if (comment.email) { 
$html.put("\x3Cdiv class\x3D\x22dsq\x2Dblacklist\x2Doption\x22\x3E  \x3Cinput id\x3D\x22dsq\x2Dblacklist\x2Demail\x22 type\x3D\x22checkbox\x22 checked\x3D\x22true\x22/\x3E  \x3Clabel for\x3D\x22dsq\x2Dblacklist\x2Demail\x22\x3E\x3Cstrong\x3E");
$html.put(trans("Email address"));
$html.put("\x3C/strong\x3E: ");
$html.put(comment.email);
$html.put("\x3C/label\x3E\x3C/div\x3E");
}
$html.put("\x3Cdiv class\x3D\x22dsq\x2Dblacklist\x2Doption\x22\x3E  \x3Cinput id\x3D\x22dsq\x2Dblacklist\x2Dip\x22 type\x3D\x22checkbox\x22 onclick\x3D\x22DISQUS.nodes.get(\x27#dsq\x2Dblacklist\x2Dip\x2Dwarning\x27).style.display\x3D\x27block\x27\x3B\x22/\x3E  \x3Clabel for\x3D\x22dsq\x2Dblacklist\x2Dip\x22\x3E\x3Cstrong\x3E");
$html.put(trans("IP address"));
$html.put("\x3C/strong\x3E: ");
$html.put(comment.ip);
$html.put("\x3C/label\x3E\x3C/div\x3E\x3Cp id\x3D\x22dsq\x2Dblacklist\x2Dip\x2Dwarning\x22 style\x3D\x22display:none\x22\x3E  ");
$html.put("{ \x22Note: Blocking this person\x27s IP address may also unintentionally  prevent others, who share his/her IP address, from commenting on  this site. This may include people who are sharing the same  computer, living in the same house, or using the same Internet  provider. Only block an IP address as a last resort.\x22 }");
$html.put("\x3C/p\x3E\x3Cp style\x3D\x22text\x2Dalign:center\x22\x3E  \x3Cbutton type\x3D\x22button\x22 onclick\x3D\x22DISQUS.dtpl.actions.fire(\x27comments.blacklist\x27, ");
$html.put(comment.id);
$html.put(", true)\x3B\x22\x3E    ");
$html.put(trans("Add to Blacklist"));
$html.put("  \x3C/button\x3E\x3C/p\x3E");
return $html.compile();
};DISQUS.modules.template = true;
DISQUS.registerActions = function () {
    /**
 * Actions for the CNN theme
 */

var add = DISQUS.dtpl.actions.register;

add('thread.initialize', function () {
    return DISQUS.jsonData.request.is_authenticated;
});

add('comments.highlight', function (id, element) {
    var url = DISQUS.jsonData.urls.embed_highlight;

    DISQUS.request.get(url, { post_id: id }, true);
    DISQUS.nodes.remove(element);
});

add('comments.readMore', function (id) {
    DISQUS.nodes.get('#dsq-comment-stripped-' + id).style.display = 'none';
    DISQUS.nodes.get('#dsq-comment-original-' + id).style.display = 'block';
});

add('comments.readLess', function (id) {
    DISQUS.nodes.get('#dsq-comment-stripped-' + id).style.display = 'block';
    DISQUS.nodes.get('#dsq-comment-original-' + id).style.display = 'none';
});

add('comments.edit.show', function (id) {
    var editArea;
    var comment;
    var frame;
    var body = DISQUS.nodes.get('#dsq-comment-body-' + id);
    var message = DISQUS.nodes.get('#dsq-comment-message-' + id);
    var editedby;

    DISQUS.popup.close(null, true);

    if (!DISQUS.states.edit[id]) {
        message.style.display = 'none';

        editedby = DISQUS.nodes.get('.dsq-editedtxt', body);
        if (editedby.length) {
            DISQUS.nodes.remove(editedby[0]);
        }

        if (DISQUS.nodes.get('#dsq-edit-' + id )) {
            DISQUS.nodes.get('#dsq-edit-' + id).style.display = 'block';
        } else {
            comment = DISQUS.jsonData.posts[id];
            comment.id = id;

            editArea = document.createElement('div');
            editArea.id = 'dsq-edit-' + id;
            editArea.className = 'dsq-edit dsq-textarea';
            editArea.innerHTML =
                DISQUS.renderBlock('editArea', { comment: comment });
            body.insertBefore(editArea, message.nextSibling);

            frame = DISQUS.frames['edit_' + id];
            if (!frame) {
                frame = new DISQUS.ReplyFrame(
                    DISQUS.nodes.get('#dsq-edit-iframe-' + id),
                id);
                frame.init();
                frame.setState(id, comment.depth);

                DISQUS.frames['edit_' + id] = frame;
            }
        }
    } else {
        message.style.display = 'inline';
        DISQUS.nodes.get('#dsq-edit-' + id).style.display = 'none';
    }

    DISQUS.states.edit[id] = !DISQUS.states.edit[id];
});

};

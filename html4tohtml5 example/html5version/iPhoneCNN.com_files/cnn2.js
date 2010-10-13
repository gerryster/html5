// DISQUS Comments - Theme: CNN
// Base template: Narcissus

/**
 * Overrides
 */

var disqus_default_text = 'Leave a comment...';
var disqus_insert_wrt_sort = 1;
var disqus_frame_theme = 'cnn2';
var disqus_iframe_css = 'http://media.disqus.com/themes/cnn2/iframe.css';

/**
 * Theme methods and globals
 */

var DsqCNN = new function() {
	// Deprecated. Unused.
	
	this.is_not_authenticated = function() {
		if(Dsq.jsonData.settings.debug) {
			return !Dsq.jsonData.request.is_authenticated;
		} else {
			return (Dsq.jsonData.request.missing_perm == 'cnn-required');
		}
	};

	this.login = function() {
		if(Dsq.jsonData.settings.debug) {
			Dsq.Popup.login();
		} else {
			showLoginOverlay();
		}
	};
	
	this.showPostBox = function() {
		// Deprecated. Unused.
		
		if(!Dsq.jsonData.request.is_authenticated) {
			DsqCNN.login();
		} else {
			Dsq.$('dsq-post-add').innerHTML = '';
			Dsq.Iframes.showReplyIframeInContainerIfAllowed(Dsq.$('dsq-post-add'));
			Dsq.$('dsq-post-add-wrapper').style.display = 'block';
			location.hash = '#dsq-post-a-comment';			
		}
	};
	
	this.showReplyIframe = function(postId) {
		if(postId) {
			var container = Dsq.$('dsq-reply-' + postId);
		} else {
			var container = Dsq.$('dsq-post-add');
		}

		Dsq.Iframes.showReplyIframeInContainerIfAllowed(container, postId);
		
		/* if(Dsq.Utils.ie) { Dsq.Utils.fixIframesIE(); } */
		container.style.display = 'block';
				
	};
	
	this.rate = function(el, id, vote) {
		Dsq.jsonData.request.is_authenticated = true;
		Dsq.Post.rate(el, id, vote);
	};

	this.avatar_url = function(post_id) {
		var username;
		
		if (Dsq.jsonData.settings.debug) {
			// Return blank avatar for dev environement
			return 'story_page.8_files/50x50_default_avatar.jpg';
		}
		
		if(post_id) {
			var userKey = Dsq.jsonData['posts'][post_id].user_key;
			var userData = Dsq.jsonData['users'][userKey];
			username = userData['display_name'];
		} else {
			username = Dsq.jsonData.request.display_username;
		}
		
		return 'http://avatar.cnn.com/people/' + username + '/avatar/48.png';
	};

	this.readMore = function(post_id) {
		Dsq.$('dsq-comment-original-' + post_id).style.display = 'block';
		Dsq.$('dsq-comment-stripped-' + post_id).style.display = 'none';
	};
	
	this.readLess = function(post_id) {
		Dsq.$('dsq-comment-original-' + post_id).style.display = 'none';
		Dsq.$('dsq-comment-stripped-' + post_id).style.display = 'block';
	};
	
	this.report = function(id, confirmed) {
		if(confirmed) {
			// Will never get here
		} else {
			var title = 'Report inappropriate comment';
			var message = ' \
			Are you sure you would like to report this comment? It will be flagged for CNN moderators to take action.<br /><br /><br /> \
				<a class="dsq-cnn-report-yes" href="#" onclick="Dsq.Post.report(' + id + ', true); Dsq.$(\'dsq-report-link-' + id + '\').innerHTML=\'Reported\'; return false"></a> \
				<a class="dsq-cnn-report-no" href="#" onclick="Dsq.Popup._closePopup(null, true); return false">No, never mind</a> \
			';

			Dsq.Popup.popModal(message, title, id);
		}
	};
};

/**
 * Custom templates and filters
 */

var DsqLocal = {
	'Filters': {
		header: function(html) {
			// Comments count
			var total_posts = Dsq.jsonData.thread.total_posts;
			var num_posts = Dsq.jsonData.thread.num_posts; 
			var comments_count = '<span id="dsq-num-posts">' + num_posts + '</span> '
			+ (total_posts // true if pagination is on
				? 'of <span id="dsq-total-posts">' + total_posts + '</span> ' 
				: ''
			) + Dsq.Utils.pluralize(num_posts, 'comment', 'comments')
			
			var new_html = ' \
			<div class="cnn_strycmtsprl"> \
				<div class="cnn_strycmtsprl1"> \
					<img class="dsq-post-avatar" src="' + (!Dsq.jsonData.request.is_authenticated ? 'http://www.ireport.com/themes/custom/resources/irb/default-avatar.png' : DsqCNN.avatar_url()) + '" alt="" /> \
				</div> \
				<div class="cnn_strycmtsprl2">'
					+ (!Dsq.jsonData.request.is_authenticated 
						? '<p><a href="#" onclick="showOverlay(\'profile_signin_overlay\');return false;">Log in</a> or <a href="#" onclick="showOverlay(\'profile_signup_overlay\');return false;">sign up</a> to comment</p>'
						: '<h6>Hi, ' + Dsq.jsonData.request.display_username + '</h6> \
							<a href="/profile">Profile</a> | <a href="#" onclick="ms_doLogout(); return false">Log out</a>')
				+ '</div> \
				<div class="cnn_clear"></div> \
			</div> \
			<div class="cnn_strycmtsndff"> \
				<h6> \
					sound<b>off</b> \
					<span>(' + total_posts + ' Comments)</span> \
				</h6>'
				+ '<div class="cnn_strycmtsndff1">Show: '
				+ (Dsq.jsonData.request.sort == 2 ? '<span>Newest</span>' : '<a href="#" onclick="Dsq.Thread.sortBy(\'newest\'); return false">Newest</a>') + ' | '
				+ (Dsq.jsonData.request.sort == 1 ? '<span>Oldest</span>' : '<a href="#" onclick="Dsq.Thread.sortBy(\'oldest\'); return false">Oldest</a>') + ' | '
				+ (Dsq.jsonData.request.sort == 3 ? '<span>Most liked</span>' : '<a href="#" onclick="Dsq.Thread.sortBy(\'best\'); return false">Most liked</a>')
				+ '</div>'
			+ '</div> \
			';

			if(!total_posts) {
				// No comments
				html += '<p class="dsq-cnn-no-comments">There are no comments on this story. Be the first!</p>';
			}
			
			// Replace Dsq.Templates.Filters.commentContent
			if(typeof DsqLocal._filterCommentContent != 'function') {
				DsqLocal._filterCommentContent = Dsq.Templates.Filters.commentContent;
				Dsq.Templates.Filters.commentContent = function(post_id, s) {
					var _meta = Dsq.jsonData.posts[post_id];
					var stripped = s.replace(/<.*?>/g, '');
					var max_length = !_meta.depth ? 300 : 300;

					var original = s;
					s = s.replace(/(<br.*?>){3,}/gi, '<br><br>');
					if(stripped.length > max_length) {
						s = '<div id="dsq-comment-stripped-' + post_id + '">' + stripped.substring(0, max_length) + ' <a href="#" onclick="DsqCNN.readMore(' + post_id + '); return false;">...more</a></div>';
						s += '<div id="dsq-comment-original-' + post_id + '" style="display:none">' + original + ' <a href="#" onclick="DsqCNN.readLess(' + post_id + '); return false;">less</a></div>';
					}
					return DsqLocal._filterCommentContent(post_id, s);
				}
			}
			
			
			return new_html + html;
			
		},
		postComment_onSuccess: function(html, response, parent_post_id, post_id) {			
			var anchor =  (Dsq.jsonData.request.sort == 2 ?  '#disqus_thread' : '#comment-' + post_id);
			
			if (!response.message.post_meta.parent_post_id) {
				// Only anchor when it is not a reply comment
				location.hash = anchor;
			}
		}
	}, // Filters
	'Templates': {
		appendPost: function(post_id) {
			var _meta = Dsq.jsonData.posts[post_id];
			var html = '<div id="dsq-append-post-' + post_id + '"' + (_meta.has_replies ? ' style="border-bottom:0"' : '') + '></div>';

			html += (_meta.has_replies
					? '<div class="dsq-divline"></div>'
					: '');

			html += (_meta.is_last_child
					? '<div class="dsq-divline"></div>'
					: '');

			// html += (!_meta.depth
			// 		? '<div id="dsq-comment-reply-' + post_id + '"></div>'
			// 		: '');

			return html;
		},
		postPrependHeader: function(post_id) {
			// Display avatar only
			
			html = ' \
				<img src="' + DsqCNN.avatar_url(post_id) + '" alt="" /> \
			';
			return html;
		},
		postAppendHeader: function(post_id) {
			// Display nothing
			return ' ';
		},
		preBody: function(post_id) {
			var _meta = Dsq.jsonData.posts[post_id];
			var userData = Dsq.jsonData['users'][_meta.user_key];
			var html;
			
			html = ' \
			<cite>' + userData['display_name'] + '</cite> \
			';
			
			return html;
		},
		postFooter: function(post_id) {
			// return '&nbsp;';
		},
		postFooter: function(post_id) {
			var html;
			var _meta = Dsq.jsonData.posts[post_id];
			if(_meta.killed) { return ''; }

			html = ' \
			<div class="dsq-comment-footer" id="dsq-comment-footer-' + post_id + '"> \
				<div id="dsq-like-pts-' + post_id + '" class="dsq-like-pts"></div> \
				<span class="dsq-footer-time">' + _meta.date + '</span>'
				+ (!_meta.depth && Dsq.jsonData.context.show_reply ? ' | <a href="#" id="dsq-comment-footer-reply-' + post_id + '" onclick="Dsq.Post.toggleReply(' + post_id +', this); return false">Reply</a>' : '')
				+ (_meta.votable
					? (!_meta.up_voted
						? ' | <a id="dsq-like-' + post_id + '" href="#" onclick="DsqCNN.rate(this, ' + post_id + ', 1); return false;">Like' 
							+ (_meta.points
								? ' (' + _meta.points + ')'
								: '')
							+'</a>'
						: ' | You liked this'
						+ (_meta.points
							? ' (' + _meta.points + ')'
							: '')
						+'</a>')
					: (_meta.points ? ' | ' + _meta.points + Dsq.Utils.pluralize(_meta.points, ' person', ' people') + ' liked this' : ''))
				+ ' | <span id="dsq-report-link-' + post_id + '"><a href="#" onclick="DsqCNN.report(' + post_id + ', false); return false;" >Report abuse</a></span>'
				+ (Dsq.jsonData.request.is_moderator
					? ' | <a href="#" onclick="Dsq.Post.highlight(this, ' + post_id + '); return false">Highlight</a>'
					+ ' | <a href="#" onclick="Dsq.Templates.moderateOptions(' + post_id+ '); return false">' + Dsq.Strings.get('Moderate') + '</a>'
					: '')
			+ '</div> \
			';

			return html;
		},
		postBox: function(post_id, use_fallback_iframe) {
			// Authentication and posting area.
			// Used for both new comments and reply comments.
			var html = '';

			if (post_id) {
				var _meta = Dsq.jsonData.posts[post_id];
				var userData = Dsq.jsonData['users'][_meta.user_key];				
			}

			var pid = post_id ? '-' + post_id : '';


			html += ' \
			<div id="' + (post_id 
				? 'dsq-reply-post-' + post_id
				: 'dsq-new-post')
			 	+ '" class="dsq-post-area">'
				+ (!Dsq.jsonData.request.is_authenticated
					? '<h3>' + Dsq.Strings.get('Post a comment') + '</h3><a href="#" onclick="showOverlay(\'profile_signin_overlay\');return false;">Log in</a> or <a href="#" onclick="showOverlay(\'profile_signup_overlay\');return false;">sign up</a> to comment'
					: ' '
					+ (post_id 
						? '<h3>' + Dsq.Strings.get('Replying to') + ' ' + userData.display_name + '</h3>'
						: '<h3>' + Dsq.Strings.get('Post a comment') + '</h3>')
					+ (post_id ? '<div class="dsq-post-cancel"><a href="#" onclick="Dsq.Post.toggleReply(' + post_id +', this); return false">Cancel <img src="' + Dsq.jsonData.settings.media_url + '/images/themes/cnn/close_btn.jpg" /></a></div>' : '')
					+ '<table><tr>'
					+ '<td class="dsq-post-avatar"><div class="dsq-post-avatar"><img src="' + DsqCNN.avatar_url() + '" alt="" /></div></td>'
					+ '<td><div id="dsq-form-area' + pid + '" class="dsq-form-area">'
					+ '<div class="dsq-textarea"> \
						<div class="dsq-textarea-wrapper" id="dsq-textarea-wrapper' + pid + '"></div> \
					</div>'
					+ '<div class="dsq-post-footer">'
						+ '<table class="dsq-cnn-post-message"><tr>'
						+ '<td> \
							<p class="dsq-cnn-moderated">CNN welcomes a lively and courteous discussion as long as you follow the Rules of Conduct set forth in our <a href="/interactive_legal.html">Terms of Service</a>. Comments are not pre-screened before they post. You agree that anything you post may be used, along with your name and profile picture, in accordance with our <a href="/privacy.html">Privacy Policy</a> and the license you have granted pursuant to our <a href="/interactive_legal.html">Terms of Service</a>.</p> \
						</td>'
						+ '<td> \
							<button class="dsq-button" id="dsq-post-button' + pid + '" onclick="Dsq.Templates.postComment(' + post_id + ', this, false)"></button> \
						</td>'
						+ '</tr></table>'
					+ '</div>'
					+ '</div>' // end dsq-form-area
					+ '</td></tr></table>'
				)
			+ '</div> \
			';


			return html;
		},
		pagination: function() {
			var html = '';
			var paginationEl = Dsq.$('dsq-pagination');
			
			if (paginationEl) { paginationEl.innerHTML = ''; }

			html = (Dsq.jsonData.thread.num_pages > 1 && Dsq.jsonData.request.page < Dsq.jsonData.thread.num_pages
				? '<a class="dsq-paginate-append-text" href="#" onclick="Dsq.Thread.paginate(Dsq.jsonData.request.page + 1, this); return false">Load next 25</a>'
				+ (Dsq.jsonData.thread.total_posts < 1000 ? ' | <a class="dsq-paginate-view-all" href="#" onclick="Dsq.Thread.paginate(Dsq.jsonData.request.page + 1, this, 0); return false">View all comments</a>' : '')
				: '');
			
			if (Dsq.$('dsq-pagination')) {
				Dsq.$('dsq-pagination').innerHTML = html;
			} else if (html != ''){
				html = '<div id="dsq-pagination" class="dsq-pagination">' + html + '</div>';
			}
			
			if (paginationEl && html == '') { 
				paginationEl.style.borderBottom = 'none';
			}
			
			return html;
		}
	} // Templates
};

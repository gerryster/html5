/*jslint evil:true */
/**
 * Dynamic thread loader
 *
 * 
 * 
 * 
 * 
*/

// 
var DISQUS;
if (!DISQUS || typeof DISQUS == 'function') {
    throw "DISQUS object is not initialized";
}
// 

// json_data and default_json django template variables will close
// and re-open javascript comment tags

(function () {
    var jsonData, cookieMessages, session;

    /* */ jsonData = {"reactions": [], "has_more_reactions": false, "users": {"cnn-5d3e414cc2702b4d101870311b": {"username": "cnn-5d3e414cc2702b4d101870311b", "tumblr": "", "display_name": "seke", "url": "http://disqus.com/cnn-5d3e414cc2702b4d101870311b/", "registered": true, "linkedin": "", "blog": "#", "remote_domain": 3, "points": 410, "facebook": "", "avatar": "http://mediacdn.disqus.com/1286929584/images/noavatar92.png", "delicious": "", "is_remote": true, "verified": true, "flickr": "", "twitter": "", "remote_domain_name": "CNN"}, "cnn-aa65476eea48fe6b37b6a31dba": {"username": "cnn-aa65476eea48fe6b37b6a31dba", "tumblr": "", "display_name": "srk0321", "url": "http://disqus.com/cnn-aa65476eea48fe6b37b6a31dba/", "registered": true, "linkedin": "", "blog": "#", "remote_domain": 3, "points": 245, "facebook": "", "avatar": "http://mediacdn.disqus.com/1286929584/images/noavatar92.png", "delicious": "", "is_remote": true, "verified": true, "flickr": "", "twitter": "", "remote_domain_name": "CNN"}, "cnn-884b8160325c2683ba3c5b724f": {"username": "cnn-884b8160325c2683ba3c5b724f", "tumblr": "", "display_name": "bluejaye57", "url": "http://disqus.com/cnn-884b8160325c2683ba3c5b724f/", "registered": true, "linkedin": "", "blog": "#", "remote_domain": 3, "points": 1, "facebook": "", "avatar": "http://mediacdn.disqus.com/1286929584/images/noavatar92.png", "delicious": "", "is_remote": true, "verified": true, "flickr": "", "twitter": "", "remote_domain_name": "CNN"}}, "forum": {"use_media": false, "avatar_size": 48, "mobile_theme_disabled": true, "is_early_adopter": false, "login_buttons_enabled": false, "streaming_realtime": false, "reply_position": true, "default_avatar_url": "http://mediacdn.disqus.com/1286929584/images/noavatar92.png", "template": {"url": "http://mediacdn.disqus.com/1286929584/uploads/themes/custom_cnn.js?1278534061", "name": "CNN (customized)", "css": "http://mediacdn.disqus.com/1286929584/uploads/themes/custom_cnn.css?1278534061"}, "use_new_iframe": false, "max_depth": 1, "linkbacks_enabled": false, "allow_anon_votes": true, "revert_new_login_flow": false, "show_avatar": true, "reactions_enabled": false, "disqus_auth_disabled": false, "name": "CNN", "language": "en", "url": "cnn", "allow_anon_post": true, "thread_votes_disabled": false, "moderate_all": false}, "realtime_enabled": false, "request": {"sort": 2, "has_unmerged_users": false, "is_authenticated": false, "subscribe_on_post": 0, "missing_perm": "cnn-required", "remote_domain_name": "", "remote_domain": "", "is_verified": false, "email": "", "profile_url": "", "username": "", "is_global_moderator": false, "sharing": {}, "timestamp": "2010-10-13_08:54:00", "is_moderator": false, "forum": "cnn", "is_initial_load": true, "display_username": "", "points": null, "moderator_can_edit": false, "is_remote": false, "userkey": "", "page": 1}, "ordered_posts": [86412960, 86396462, 86409425], "realtime_paused": false, "posts": {"86412960": {"up_voted": false, "ip": "", "last_modified_date": null, "has_replies": false, "is_first_child": false, "vote": false, "message": "All these obssesive news about the iPhone..competition knows this product is light years ahead of them that's why..i know tens of people who use the iPhone 4 including myself. I dropped it on concrete floor at least 5 times already.. No scratches no cracks..did you know that there's a possibility that you might get hit by a car while walking on the sidewalk too?", "is_last_child": false, "can_reply": false, "down_voted": false, "real_date": "2010-10-12_20:21:33", "killed": false, "highlighted": false, "user_key": "cnn-5d3e414cc2702b4d101870311b", "has_been_anonymized": false, "edited": false, "author_is_moderator": false, "from_request_user": false, "user_voted": null, "votable": true, "date": "12 hours ago", "approved": true, "num_replies": 0, "last_modified_by": null, "email": "", "parent_post_id": null, "depth": 0, "points": 0, "author_is_creator": false, "is_realtime": false}, "86409425": {"up_voted": false, "ip": "", "last_modified_date": null, "has_replies": false, "is_first_child": true, "vote": false, "message": "are mathematician from jobs university where same rule applies in different ways to other products and apple even though calculation done in %. iPhone4is only phone who has mandatory accessory to just get it working optimally which was accepted by Apple in news conf. Apple is no great same as any one more volume more grid less consumer focus and quality", "is_last_child": true, "can_reply": false, "down_voted": false, "real_date": "2010-10-12_19:59:06", "killed": false, "highlighted": false, "user_key": "cnn-aa65476eea48fe6b37b6a31dba", "has_been_anonymized": false, "edited": false, "author_is_moderator": false, "from_request_user": false, "user_voted": null, "votable": true, "date": "12 hours ago", "approved": true, "num_replies": 0, "last_modified_by": null, "email": "", "parent_post_id": 86396462, "depth": 1, "points": 0, "author_is_creator": false, "is_realtime": false}, "86396462": {"up_voted": false, "ip": "", "last_modified_date": null, "has_replies": true, "is_first_child": false, "vote": false, "message": "Well, when you outsell any other iPhone model you are bound to have more adopters. (over 3 million iPhone 4 pre orders alone) More adopters=increased possibilities of customers with accidents. Get with it CNN.", "is_last_child": false, "can_reply": false, "down_voted": false, "real_date": "2010-10-12_18:46:46", "killed": false, "highlighted": false, "user_key": "cnn-884b8160325c2683ba3c5b724f", "has_been_anonymized": false, "edited": false, "author_is_moderator": false, "from_request_user": false, "user_voted": null, "votable": true, "date": "14 hours ago", "approved": true, "num_replies": 1, "last_modified_by": null, "email": "", "parent_post_id": null, "depth": 0, "points": 0, "author_is_creator": false, "is_realtime": false}}, "integration": {"receiver_url": "http://www.cnn.com/.element/ssi/misc/3.0/disqus/disqus_xd_receiver.html", "hide_user_votes": false, "reply_position": true, "disqus_logo": false}, "thread": {"voters_count": 0, "offset_posts": 0, "slug": "study_iphone_4_more_fragile_than_previous_models", "paginate": true, "num_pages": 1, "days_alive": 2, "moderate_none": false, "voters": {}, "total_posts": 3, "realtime_paused": false, "queued": false, "pagination_type": "append", "user_vote": null, "likes": 0, "num_posts": 3, "closed": false, "per_page": 25, "id": 155317603, "killed": false, "moderate_all": false}, "reactions_limit": 10, "context": {"show_reply": false, "use_fb_connect": false, "active_switches": ["slim_paginator", "new_importer", "community_icon", "show_captcha_on_links"], "forum_facebook_key": "", "use_yahoo": false, "subscribed": false, "use_twitter_signin": false, "use_openid": false, "realtime_speed": 15000, "switches": {"overview_trending_threads": false, "slim_paginator": true, "show_captcha_on_links": true, "ssl_auth": false, "embed_sdk_loader": false, "new_importer": true, "community_icon": true, "v4_templates": false, "auto_blacklist_spammers": false, "enable_random_recommendations": false}}, "ready": true, "mediaembed": [], "reactions_start": 0, "settings": {"read_only": false, "realtime_url": "http://disqus.com/forums/realtime.js", "minify_js": true, "debug": false, "disqus_url": "http://disqus.com", "uploads_url": "http://media.disqus.com/uploads", "recaptcha_public_key": "6LdKMrwSAAAAAPPLVhQE9LPRW4LUSZb810_iaa8u", "media_url": "http://mediacdn.disqus.com/1286929584"}, "media_url": "http://mediacdn.disqus.com/1286929584"}; /* */
    /* */ cookieMessages = {"user_created": null, "post_has_profile": null, "post_twitter": null, "post_not_approved": null}; session = {"url": null, "name": null, "email": null}; /* */

    DISQUS.jsonData = jsonData;
    DISQUS.jsonData.cookie_messages = cookieMessages;
    DISQUS.jsonData.session = session;

    DISQUS.lang.extend(DISQUS.settings, DISQUS.jsonData.settings);
}());

DISQUS.jsonData.context.csrf_token = '21bc467119200cb06806902fa8e2f5b0';

DISQUS.jsonData.urls = {
    login: 'http://disqus.com/profile/login/',
    logout: 'http://disqus.com/logout/',
    reply: 'http://cnn.disqus.com/study_iphone_4_more_fragile_than_previous_models/reply.html',
    stats: 'http://cnn.disqus.com/stats.html',
    request_user_profile: 'http://disqus.com/AnonymousUser/',
    request_user_avatar: 'http://mediacdn.disqus.com/1286929584/images/noavatar92.png',
    verify_email: 'http://disqus.com/verify/',
    remote_settings: 'http://cnn.disqus.com/_auth/embed/remote_settings/',
    embed_thread: 'http://cnn.disqus.com/thread.js',
    embed_profile: 'http://disqus.com/embed/profile.js',
    embed_vote: 'http://cnn.disqus.com/vote.js',
    embed_thread_vote: 'http://cnn.disqus.com/thread_vote.js',
    embed_thread_share: 'http://cnn.disqus.com/thread_share.js',
    embed_login: 'http://disqus.com/embed/login.html',
    embed_edit: 'http://disqus.com/embed/edit.html',
    embed_report: 'http://cnn.disqus.com/study_iphone_4_more_fragile_than_previous_models/post_report/',
    embed_queueurl: 'http://cnn.disqus.com/queueurl.js',
    embed_hidereaction: 'http://cnn.disqus.com/hidereaction.js',
    embed_more_reactions: 'http://cnn.disqus.com/more_reactions.js',
    embed_subscribe: 'http://cnn.disqus.com/subscribe.js',
    embed_highlight: 'http://cnn.disqus.com/highlight.js',
    embed_kill: 'http://cnn.disqus.com/kill.js',
    embed_block: 'http://cnn.disqus.com/block.js',
    toggle_thread_killed: 'http://cnn.disqus.com/toggle_thread_killed.js',
    toggle_thread_closed: 'http://cnn.disqus.com/toggle_thread_closed.js',
    update_moderate_all: 'http://cnn.disqus.com/update_moderate_all.js',
    update_days_alive: 'http://cnn.disqus.com/update_days_alive.js',
    show_user_votes: 'http://cnn.disqus.com/show_user_votes.js',
    report_spam: 'http://cnn.disqus.com/reportspam.js',
    forum_view: 'http://cnn.disqus.com/study_iphone_4_more_fragile_than_previous_models',
    get_comment_message: 'http://cnn.disqus.com/get_comment_message.js',
    cnn_saml_try: 'http://disqus.com/saml/cnn/try/',
    realtime: DISQUS.jsonData.settings.realtime_url,
    thread_view: 'http://cnn.disqus.com/study_iphone_4_more_fragile_than_previous_models/',
    twitter_connect: DISQUS.jsonData.settings.disqus_url + '/_ax/twitter/begin/',
    yahoo_connect: DISQUS.jsonData.settings.disqus_url + '/_ax/yahoo/begin/',
    openid_connect: DISQUS.jsonData.settings.disqus_url + '/_ax/openid/begin/',
    tweetbox_frame: DISQUS.jsonData.settings.disqus_url + '/forums/integrations/twitter/tweetbox.html',
    community: 'http://cnn.disqus.com/community.html'
};

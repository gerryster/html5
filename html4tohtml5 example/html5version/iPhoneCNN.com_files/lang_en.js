var OB_language_en = {
	
	"id" : "english",
	"name" : "en",
	
    "RATE_DESCRIPTION": [
		"Bad",
		"Boring",
		"OK",
		"Good",
		"Excellent"
    ],
	
	"PERSONAL_RATE_DESC": [
		"disliked ({X.xx}) by {Y} people <em>like you</em>",
		"rated ({X.xx}) by {Y} people <em>like you</em>",
		"RECOMMENDED ({X.xx}) by {Y} people <em>like you</em>"
	],
	
	"THANKS_STR": "Thanks....",
	
	"RATE_POST_RATE": [
		"You hated this post",
		"You didn't like this post",
		"You thought this was OK",
		"You liked this post",
		"You loved this post"
	],
	
	"RATE_POST_RATE_FOR_RECOMMENDATIONS": [
		"You might like:",
		"You hated this post ({starsImage}), you might like:",
		"You didn't like this post ({starsImage}), you might like:",
		"You thought this was OK ({starsImage}), you might like:",
		"You liked this post ({starsImage}), you might also like:",
		"You loved this post ({starsImage}), you might also like:"
	],
	
	"BE_THE_FIRST_STR":					"Be the first to rate this",
	"UNABLE_TO_SUBMIT_STR":				"unable to submit your rate. Please check your internet connection.",
	"RATED_X_BY_Y_PEOPLE":				"rated {X.xx} by {Y} people",
	"RATED_X_BY_1_PERSON":				"rated {X.xx} by 1 person",
	"AVERAGE_RATING_X_BY_Y_PEOPLE":		"average rating {X.xx} by {Y} people",
	"RATED_X_BY_YOU": 					"rated {X.xx} by you",
	"RATED_X_BY_YOU_AND_1_OTHER":		"rated {X.xx} by you and 1 other",
	"RATED_X_BY_YOU_AND_Y_OTHERS":		"rated {X.xx} by you and {Y} others",
	"HOW": 								"How?",
	"BY":								"by",
	"THIS_SITE":						"this site",
	"MOST_POPULAR":						"Most Popular Posts",
	"MIGHT_ALSO_LIKE":					"You might also like",
	"MORE_RECOMMENDED_SINGLE":			"{N} more recommended post",
	"MORE_RECOMMENDED_PLURAL":			"{N} more recommended posts",
	"MORE_RECOMMENDED_CLOSE_SINGLE":	"hide more recommended post",
	"MORE_RECOMMENDED_CLOSE_PLURAL":	"hide more recommended posts",
	"PC_LEGEND_TITLE":					"Selected for you by a sponsor",
	"PI_LEGEND_TITLE":					"Selected for you by a sponsor",
	"WHATS_THIS":	"what's this",
	"IS_RTL": false,
	"COMMENT" : "comment",
	
	THUMBS_SUPPORT:{
		"THUMBS_RATE_POST_RATE_FOR_RECOMMENDATIONS": [
			"You might be interested in:",
			"You recommended this post. You might be interested in:"
		],
		
		"THUMBS_THANKS_STR": 						"Thanks....",
		"THUMBS_RECOMMEND_THIS":					"Recommend this?",
		"THUMBS_PERSONAL_RATE_DESC":				"Recommended by {Y} people <em>like you</em>",
		"THUMBS_RATED_X_BY_Y_PEOPLE":				"Recommended by {Y} people",
		"THUMBS_RATED_X_BY_1_PERSON":				"Recommended by 1 person",
		"THUMBS_AVG_RATE_X_BY_Y_PEOPLE":			"Recommended by {Y} people",
		"THUMBS_RATED_X_BY_YOU": 					"<b>Recommended by you</b>",
		"THUMBS_RATED_X_BY_YOU_AND_1_OTHER":		"<b>Recommended by you</b> and 1 other",
		"THUMBS_RATED_X_BY_YOU_AND_Y_OTHERS":		"<b>Recommended by you</b> and {Y} others", 
		"THUMBS_CANCEL_RECOMMENDATION":				"Cancel Recommendation",
		"THUMBS_AFTER_CANCEL":						"You do not recommend this post",
		"THUMBS_COMMENT" : 							"comment"
	},
	
	OPTIONAL_ADDONS	:	{
		"mostPopular": true,
		"recommendations": true,
		"disqus": true,
		"pc"	: true,
		"thumbs": true
	}
};

OB_lang.initLang(OB_language_en);

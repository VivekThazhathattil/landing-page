jQuery(document).ready(function($) {
	jQuery(document).on('click', '.iconInner', function(e) {
		jQuery(this).parents('.botIcon').addClass('showBotSubject');
		$("[name='msg']").focus();
	});

	jQuery(document).on('click', '.closeBtn, .chat_close_icon', function(e) {
		jQuery(this).parents('.botIcon').removeClass('showBotSubject');
		jQuery(this).parents('.botIcon').removeClass('showMessenger');
	});

	jQuery(document).on('submit', '#botSubject', function(e) {
		e.preventDefault();

		jQuery(this).parents('.botIcon').removeClass('showBotSubject');
		jQuery(this).parents('.botIcon').addClass('showMessenger');
	});
	
	/* Chatbot Code */
	$(document).on("submit", "#messenger", function(e) {
		e.preventDefault();

		var val = $("[name=msg]").val().toLowerCase();
		var mainval = $("[name=msg]").val();
		name = '';
		nowtime = new Date();
		nowhoue = nowtime.getHours();

		function userMsg(msg) {
			$('.Messages_list').append('<div class="msg user"><span class="avtr"><figure style="background-image: url(chatbot-avatar.png)"></figure></span><span class="responsText">' + mainval + '</span></div>');
		};
		function appendMsg(msg) {
			$('.Messages_list').append('<div class="msg"><span class="avtr"><figure style="background-image: url(chatbot-avatar.png)"></figure></span><span class="responsText">' + msg + '</span></div>');
			$("[name='msg']").val("");
		};


		userMsg(mainval);
		if( val.indexOf("hello") > -1 || val.indexOf("hi") > -1 || val.indexOf("good morning") > -1 || val.indexOf("good afternoon") > -1 || val.indexOf("good evening") > -1 || val.indexOf("good night") > -1 ) {
			if(nowhoue >= 12 && nowhoue <= 16) {
				appendMsg('good afternoon');
			} else if(nowhoue >= 10 && nowhoue <= 12) {
				appendMsg('hi');
			} else if(nowhoue >= 0 && nowhoue <= 10) {
				appendMsg('Good Morning');
			} else {
				appendMsg('Good Evening');
			}

			appendMsg("what's you name?");

		}else if( val.indexOf("My name is ") > -1 || val.indexOf("i am ") > -1 || val.indexOf("i'm ") > -1) {/*|| mainval != ""*/
			// var name = "";
			if(val.indexOf("My name is") > -1) {
				name = val.replace("my name is", "");
			}

			else if(val.indexOf("i am") > -1) {
				name = val.replace("i am", "");
			}

			else if(val.indexOf("i'm") > -1) {
				name = val.replace("i'm", "");
			}

			else {
				name = mainval;
			}

			appendMsg("Hi " + name + ", how can we help you?");
		}else {
            async function getReply(){
                res = "";
                var B_ID = "168080";
                var KEY = "XJ0smsPw57NkP1gn";
                var UID = "1";
                axios.defaults.headers.post['Content-Type'] ='application/x-www-form-urlencoded';
                await axios.get('https://api.brainshop.ai/get?bid=' + B_ID + '&key=' + KEY + '&uid=' + UID + '&msg=' + val.split(' ').join('+')).then(data =>{
                    res = JSON.stringify(data.data.response);
                });
                return res;
            }
            getReply().then(data => console.log(data));
			appendMsg("Sorry I'm not able to understand what you want to say");
		}

		function saybye() {
			if (nowhoue <= 10) {
				appendMsg(" Have a nice day! :)");
			} else if (nowhoue >= 11 || nowhoue <= 20) {
				appendMsg(" Bye!");
			} else {
				appendMsg(" Good night!");
			}
		}

		var lastMsg = $('.Messages_list').find('.msg').last().offset().top;
		$('.Messages').animate({scrollTop: lastMsg}, 'slow');
	});
	/* Chatbot Code */
})

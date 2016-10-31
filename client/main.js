if (Meteor.isClient) {
	Meteor.startup(function() {
		$('body').addClass('comicadvisors');
	});

	Template.register.events({
		'submit form': function(event) {
			event.preventDefault();
			var email = event.target.registerEmail.value;
			var username = event.target.username.value;
			var firstName = event.target.firstName.value;
			var lastName = event.target.lastName.value;
			var password = event.target.registerPassword.value;

			Meteor.call('checkUserExists', username, function(error, result) {
				if (result) {
					alert('username already exists');
				} else {
					Accounts.createUser({
						email: email,
						password: password,
						username: username,
						profile: {
							firstname: firstName,
							lastname: lastName
						}
					});
					Router.go('root');
				}
			});
		}
	});

	Template.login.events({
		'submit form': function(event) {
			event.preventDefault();
			var email = event.target.loginEmail.value;
			var password = event.target.loginPassword.value;
			console.log("Form submitted");
			Meteor.loginWithPassword(email, password, function(error) {
				if (error) {
					swal({
						title: "Not Even Good",
						text: "You forgot your username or password dummy.",
						type: "error",
						confirmButtonColor: "#DD6B55",
						confirmButtonText: "Try Again"
					});
				} else {
					Router.go('root');
				}
			});
		}
	});

	Template.logout.events({
		'click .logout': function(event) {
			event.preventDefault();
			Meteor.logout();
		}
	});

	Template.userList.events({
		'click .edit-user': function(event) {
			// event.preventDefault();
			// var user = Meteor.users.findOne({_id: this._id});
			// console.log(user);

		}
	});

	Template.userArticleItem.events({
		'click .article-delete': function(event) {
			event.preventDefault();
			var userId = Meteor.user()._id;
			var articleUserId = this.userId;
			var articleId = this._id;
			if (articleUserId === userId) {
				swal({   
					title: "ARE YOU SURE ABOUT THAT?",   
					text: "This article will be removed completely",
					imageUrl: "http://i.imgur.com/auM1Xmb.gif", 
					showCancelButton: true,   
					confirmButtonColor: "#DD6B55",   
					confirmButtonText: "Yes",
					cancelButtonText: "Cancel",   
					closeOnConfirm: false,   
					closeOnCancel: true 
				}, 
				function(isConfirm) {   
					if (isConfirm) {     
						swal("Deleted!", "Your article has been deleted.", "success"); 
						Articles.remove(articleId);  
					}
				});
			} else {
				swal({
					title: "Access Denied",
					text: "You cannot delete an article you do not own.",
					type: "error",
					confirmButtonColor: "#DD6B55",
					confirmButtonText: "Close"
				});
			}
		}
	});

	// Template.articleUpdate.events({
	// 	'click #updateArticleForm button[type=submit]': function(event) {
	// 		event.preventDefault();
	// 		var userId = Meteor.user()._id;
	// 		var articleUserId = this.userId;
	// 		var articleId = this._id;
	// 		console.log(userId)
	// 		console.log(articleUserId)
	// 		console.log(articleId)
	// 	}
	// });

	// TinyMCE
	function tinymceInit() {
		tinymce.PluginManager.add('caimage', function(editor, url) {
		  editor.addButton('caimage', {
		    text: 'Image',
		    icon: false,
		    onclick: function() {
		      // Open window
		      editor.windowManager.open({
		        title: 'Add Image',
		        body: [
		          {type: 'textbox', name: 'source', label: 'Source'},
		          {type: 'textbox', name: 'caption', label: 'Caption'}
		        ],
		        onsubmit: function(e) {
		          var imageBlock = '<div class="cms-insert"><img src="'+e.data.source+'" alt="Comic Advisors Image"></div>'
		          if (e.data.caption) {
		          	var imageBlock = '<div class="cms-insert"><img src="'+e.data.source+'" alt="Comic Advisors Image"><div class="caption">'+e.data.caption+'</div></div>'
		          }
		          editor.insertContent(imageBlock);
		        }
		      });
		    }
		  });
		  editor.addMenuItem('caimage', {
		    text: 'CA image plugin',
		    context: 'tools',
		    onclick: function() {
		      // Open window with a specific url
		      editor.windowManager.open({
		        title: 'TinyMCE site',
		        url: 'http://www.tinymce.com',
		        width: 800,
		        height: 600,
		        buttons: [{
		          text: 'Close',
		          onclick: 'close'
		        }]
		      });
		    }
		  });
		});
		tinymce.PluginManager.add('cayoutube', function(editor, url) {
		  editor.addButton('cayoutube', {
		    text: 'Youtube Video',
		    icon: false,
		    onclick: function() {
		      // Open window
		      editor.windowManager.open({
		        title: 'Add Youtube Video',
		        body: [
		          {type: 'textbox', name: 'embed', label: 'Embed'},
		        ],
		        onsubmit: function(e) {
		          editor.insertContent('<div class="cms-insert">'+e.data.embed+'</div>');
		        }
		      });
		    }
		  });
		  editor.addMenuItem('cayoutube', {
		    text: 'CA Youtube plugin',
		    context: 'tools',
		    onclick: function() {
		      // Open window with a specific url
		      editor.windowManager.open({
		        title: 'TinyMCE site',
		        url: 'http://www.tinymce.com',
		        width: 800,
		        height: 600,
		        buttons: [{
		          text: 'Close',
		          onclick: 'close'
		        }]
		      });
		    }
		  });
		});
		tinymce.init({
			selector: 'textarea.primary-asset',
			skin_url: '/packages/teamon_tinymce/skins/lightgray',
			content_css : '/article-editor.css',
			plugins: 'caimage cayoutube',
			menubar: '',
			toolbar: 'caimage cayoutube',
			image_dimensions: true,
			image_description: false,
			image_caption: true
		});
		tinymce.init({
			selector: 'textarea.body',
			skin_url: '/packages/teamon_tinymce/skins/lightgray',
			content_css : '/resources/css/article-editor.css',
			body_id: 'caArticleEditor',
			plugins: 'link caimage cayoutube',
			menubar: 'file edit view format insert',
			toolbar: 'undo redo | styleselect | bold italic | link caimage cayoutube | alignleft aligncenter alignright | bullist numlist',
			image_dimensions: false,
			image_description: false,
			image_caption: true
		});
	}

	Template.newArticle.rendered = function() {
		tinymceInit();
	}

	Template.articleUpdate.rendered = function() {
		tinymceInit();
	}
}
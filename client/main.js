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
			Meteor.loginWithPassword(email, password);
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



	function tinymceInit() {
		tinymce.init({
			selector: 'textarea.body',
			skin_url: '/packages/teamon_tinymce/skins/lightgray',
			content_css : '/article-editor.css',
			body_id: 'caArticleEditor',
			plugins: 'link image media',
			menubar: 'file edit view format insert',
			toolbar: 'undo redo | styleselect | bold italic | link image media | alignleft aligncenter alignright | bullist numlist',
			image_dimensions: false,
			image_description: false,
			image_caption: true
		});
		tinymce.init({
			selector: 'textarea.primary-asset',
			skin_url: '/packages/teamon_tinymce/skins/lightgray',
			content_css : '/article-editor.css',
			plugins: 'image media',
			menubar: '',
			toolbar: 'image media',
			image_dimensions: true,
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
if (Meteor.isClient) {
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

	Template.articleUpdate.rendered = function() {
		tinymce.init({
			selector: 'textarea',
			skin_url: '/packages/teamon_tinymce/skins/lightgray',
			content_css : '/article-editor.css',
			plugins: "link image media",
			menubar: "file edit view format insert",
			toolbar: "undo redo | styleselect | bold italic | link image media | alignleft aligncenter alignright | bullist numlist",
			image_dimensions: false,
			image_description: false,
			image_caption: true
		});
	}
}
/**
 * PageController
 *
 * @description :: Server-side logic for managing pages
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

	showHomepage: function (req, res) {

		if (!req.session.me) {
			return res.view('homepage' ,{
				me : {
					title : 'Log In',
					management : '1'
				}
			});
		}


		User.findOne(req.session.me, function (err, user){
			if (err) {
				return res.negotiate(err);
			}

			if (!user) {
				sails.log.verbose('Session refers to a user who no longer exists- did you delete a user, then try to refresh the page with an open tab logged-in as that user?');
				return res.view('homepage');
			}
			if (user.Type_User === 'student'){
				return res.view('homepage', {
					me: {
						title : 'Log Out',
						management : '1',
						title_user : user.Title,
						name : user.FName,
						lname : user.LName,
						id: user.id,
						email: user.email,
						ID_NO : user.ID_NO
					}
				});
			}
			else if (user.Type_User === 'teacher')
			{
				return res.view('homepage', {
					me: {
						title : 'Log Out',
						management : 'Management',
						title_user : user.Title,
						name : user.FName,
						lname : user.LName,
						id: user.id,
						email: user.email,
						ID_NO : user.ID_NO

					}
				});
			}
		});
	},

	showContact_Lec: function (req, res) {

    if (!req.session.me) {
      return res.view('login');
    }


    User.findOne(req.session.me, function (err, user ){
      if (err) {
        return res.negotiate(err);
      }

      if (!user) {
        sails.log.verbose('Session refers to a user who no longer exists- did you delete a user, then try to refresh the page with an open tab logged-in as that user?');
        return res.view('homepage');
      }

      return res.view('contacts_Lec', {
        me2: {
          id: user.id,
          name: user.name,
          email: user.email,
        }

      });

    });
  },

	showSubject: function (req, res) {

    if (!req.session.me) {
      return res.view('login');
    }


    User.findOne(req.session.me, function (err, user){
      if (err) {
        return res.negotiate(err);
      }

      if (!user) {
        sails.log.verbose('Session refers to a user who no longer exists- did you delete a user, then try to refresh the page with an open tab logged-in as that user?');
        return res.view('homepage');
      }

      return res.view('file_manager_S_subject', {
        me: {
          id: user.id,
          name: user.name,
          email: user.email,
        }
      });

    });
  },

	showLogin: function (req, res) {

		if (!req.session.me) {
			return res.view('login');
		}


		User.findOne(req.session.me, function (err, user){
			if (err) {
				return res.negotiate(err);
			}

			if (!user) {
				sails.log.verbose('Session refers to a user who no longer exists- did you delete a user, then try to refresh the page with an open tab logged-in as that user?');
				return res.view('homepage');
			}

			return res.view('homepage', {
				me: {
					id: user.id,
					name: user.name,
					email: user.email,
				}
			});

		});
	},

};

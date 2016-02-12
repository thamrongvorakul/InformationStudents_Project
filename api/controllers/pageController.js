/**
 * PageController
 *
 * @description :: Server-side logic for managing pages
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

	showHomepage: function (req, res) {

		// If not logged in, show the public view.
		if (!req.session.me) {
			return res.view('homepage' ,{
				me : {
					title : 'Log In'
				}
			});
		}

		// Otherwise, look up the logged-in user and show the logged-in view,
		// bootstrapping basic user data in the HTML sent from the server
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
					title : 'Log Out',
					id: user.id,
					name: user.name,
					email: user.email,
				}
			});

		});
	},

	showContact_Lec: function (req, res) {

    // If not logged in, show the public view.
    if (!req.session.me) {
      return res.view('login');
    }

    // Otherwise, look up the logged-in user and show the logged-in view,
    // bootstrapping basic user data in the HTML sent from the server
    User.findOne(req.session.me, function (err, user){
      if (err) {
        return res.negotiate(err);
      }

      if (!user) {
        sails.log.verbose('Session refers to a user who no longer exists- did you delete a user, then try to refresh the page with an open tab logged-in as that user?');
        return res.view('homepage');
      }

      return res.view('contacts_Lec', {
        me: {
          id: user.id,
          name: user.name,
          email: user.email,
        }
      });

    });
  },

	showSubject: function (req, res) {

    // If not logged in, show the public view.
    if (!req.session.me) {
      return res.view('login');
    }

    // Otherwise, look up the logged-in user and show the logged-in view,
    // bootstrapping basic user data in the HTML sent from the server
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

		// If not logged in, show the public view.
		if (!req.session.me) {
			return res.view('login');
		}

		// Otherwise, look up the logged-in user and show the logged-in view,
		// bootstrapping basic user data in the HTML sent from the server
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

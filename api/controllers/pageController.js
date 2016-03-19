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
					management : '1',
					create_sub : '1',
					create_lecturer : '1',
					register_teacher : '1',
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
						create_sub : '1',
						create_lecturer : '1',
						register_teacher : '1',
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
						create_sub : '1',
						create_lecturer : '1',
						register_teacher : '1',
						title_user : user.Title,
						name : user.FName,
						lname : user.LName,
						id: user.id,
						email: user.email,
						ID_NO : user.ID_NO

					}
				});
			}
			else if (user.Type_User === 'admin')
			{
				return res.view('homepage', {
					me: {
						title : 'Log Out',
						management : '1',
						create_sub : 'Create_Subject',
						create_lecturer : 'Create_Lecturer',
						register_teacher : 'Register_Lecturer',
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
	show_select_subject_term: function (req, res) {

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

			return res.view('select_subject_term');

		});
	},
	show_search_results: function (req, res) {

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

			return res.view('search_results');

		});
	},
	show_student_subject: function (req, res) {

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

			return res.view('student_subject');

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

	show_lecturer_add_sub2 :function(req,res){
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
			if (user.Type_User === 'student'){
				return res.view('homepage', {
					me: {
						title : 'Log Out',
						management : '1',
						create_sub : 'Create_Subject',
						create_lecturer : 'Create_Lecturer',
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
				return res.view('file_manager_L_add_sub2');
			}

    });
	},
	show_change_profile_lecturer :function(req,res){
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
			if (user.Type_User === 'student'){
				return res.view('homepage', {
					me: {
						title : 'Log Out',
						management : '1',
						create_sub : 'Create_Subject',
						create_lecturer : 'Create_Lecturer',
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
				return res.view('change_profile_lecturer');
			}

    });
	},
	show_create_lecturer_profile :function(req,res){
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
			if (user.Type_User === 'student'){
				return res.view('homepage', {
					me: {
						title : 'Log Out',
						management : '1',
						create_sub : 'Create_Subject',
						create_lecturer : 'Create_Lecturer',
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
						management : '1',
						create_sub : 'Create_Subject',
						create_lecturer : 'Create_Lecturer',
						title_user : user.Title,
						name : user.FName,
						lname : user.LName,
						id: user.id,
						email: user.email,
						ID_NO : user.ID_NO

					}
				});
			}
			else if (user.Type_User === 'admin'){
				return res.view('create_lecturer_profile')
			}

    });
	},
	show_create_subject_for_admin :function(req,res){
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
			if (user.Type_User === 'student'){
				return res.view('homepage', {
					me: {
						title : 'Log Out',
						management : '1',
						create_sub : 'Create_Subject',
						create_lecturer : 'Create_Lecturer',
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
						management : '1',
						create_sub : 'Create_Subject',
						create_lecturer : 'Create_Lecturer',
						title_user : user.Title,
						name : user.FName,
						lname : user.LName,
						id: user.id,
						email: user.email,
						ID_NO : user.ID_NO

					}
				});
			}
			else if (user.Type_User === 'admin'){
				return res.view('create_subject_for_admin')
			}

    });
	},
	show_register_for_teacher_by_admin :function(req,res){
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
			if (user.Type_User === 'student'){
				return res.view('homepage', {
					me: {
						title : 'Log Out',
						management : '1',
						create_sub : 'Create_Subject',
						create_lecturer : 'Create_Lecturer',
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
						management : '1',
						create_sub : 'Create_Subject',
						create_lecturer : 'Create_Lecturer',
						title_user : user.Title,
						name : user.FName,
						lname : user.LName,
						id: user.id,
						email: user.email,
						ID_NO : user.ID_NO

					}
				});
			}
			else if (user.Type_User === 'admin'){
				return res.view('register_for_teacher')
			}

    });
	},
	show_lecturer_mng_sub :function(req,res){
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
			if (user.Type_User === 'student'){
				return res.view('homepage', {
					me: {
						title : 'Log Out',
						management : '1',
						create_sub : 'Create_Subject',
						create_lecturer : 'Create_Lecturer',
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
				return res.view('file_manager_L_mng_sub');
			}

    });
	},
	show_homework_check :function(req,res){
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
			if (user.Type_User === 'student'){
				return res.view('homepage', {
					me: {
						title : 'Log Out',
						management : '1',
						create_sub : 'Create_Subject',
						create_lecturer : 'Create_Lecturer',
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
				return res.view('homework_send');
			}

		});
	},
	show_change_password_lecturer :function(req,res){
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
			if (user.Type_User === 'student'){
				return res.view('homepage', {
					me: {
						title : 'Log Out',
						management : '1',
						create_sub : 'Create_Subject',
						create_lecturer : 'Create_Lecturer',
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
				return res.view('change_password_lecturer');
			}

		});
	},
	show_subject_doc_dload2 :function(req,res){
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
			if (user.Type_User === 'student'){
				return res.view('homepage', {
					me: {
						title : 'Log Out',
						management : '1',
						create_sub : 'Create_Subject',
						create_lecturer : 'Create_Lecturer',
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
				return res.view('subject_doc_dload2');
			}

    });
	},
	show_subject_hw_dload2 :function(req,res){
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
			if (user.Type_User === 'student'){
				return res.view('homepage', {
					me: {
						title : 'Log Out',
						management : '1',
						create_sub : 'Create_Subject',
						create_lecturer : 'Create_Lecturer',
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
				return res.view('subject_hw_dload2');
			}

		});
	},
	show_subject_news_dload2 :function(req,res){
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
			if (user.Type_User === 'student'){
				return res.view('homepage', {
					me: {
						title : 'Log Out',
						management : '1',
						create_sub : 'Create_Subject',
						create_lecturer : 'Create_Lecturer',
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
				return res.view('subject_news_dload2');
			}

		});
	},
	show_subject_score_dload2 :function(req,res){
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
			if (user.Type_User === 'student'){
				return res.view('homepage', {
					me: {
						title : 'Log Out',
						management : '1',
						create_sub : 'Create_Subject',
						create_lecturer : 'Create_Lecturer',
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
				return res.view('subject_score_dload2');
			}

    });
	},
	show_lecturer_detail :function(req,res){
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
			if (user.Type_User === 'student'){
				return res.view('homepage', {
					me: {
						title : 'Log Out',
						management : '1',
						create_sub : 'Create_Subject',
						create_lecturer : 'Create_Lecturer',
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
				return res.view('lecturer_detail');
			}

		});
	},
	show_mailbox_view : function(req,res){
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
			if (user.Type_User === 'student'){
				return res.view('homepage', {
					me: {
						title : 'Log Out',
						management : '1',
						create_sub : 'Create_Subject',
						create_lecturer : 'Create_Lecturer',
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
				return res.view('mail_detail');
			}

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


module.exports.routes = {
  'GET /register'                                     : {view : 'register'},
  'GET /forgot_password'                              : {view :'forgot_password'},
  'GET /lecturer_add_sub2'                            : 'PageController.show_lecturer_add_sub2',
  'GET /lecturer_mng_sub'                             : 'PageController.show_lecturer_mng_sub',
  'GET /subject_doc_dload2'                           : 'PageController.show_subject_doc_dload2',
  'GET /subject_hw_dload2'                            : 'PageController.show_subject_hw_dload2',
  'GET /subject_news_dload2'                          : 'PageController.show_subject_news_dload2',
  'GET /subject_score_dload2'                         : 'PageController.show_subject_score_dload2',
  'GET /lecturer_detail'                              : 'PageController.show_lecturer_detail',
  'GET /mailbox_view'                                 : 'PageController.show_mailbox_view',
  'GET /select_subject_term'                          : 'PageController.show_select_subject_term',
  'GET /student_subject'                              : 'PageController.show_student_subject',
  'GET /register_for_teacher_by_admin'                : 'PageController.show_register_for_teacher_by_admin',
  'GET /search_results'                               : 'PageController.show_search_results',
  'GET /homework_check'                               : 'PageController.show_homework_check',
  'GET /change_password_lecturer'                     : 'PageController.show_change_password_lecturer',
  'GET /create_lecturer_profile'                      : 'PageController.show_create_lecturer_profile',
  'GET /change_profile_lecturer'                      : 'PageController.show_change_profile_lecturer',
  'GET /create_subject_for_admin'                     : 'PageController.show_create_subject_for_admin',
  'GET /'                                             : 'PageController.showHomepage',
  'GET /contacts_Lec'                                 : 'PageController.showContact_Lec',
  'GET /login'                                        : 'PageController.showLogin',


  'GET /getdata_on_combobox'                          : 'getData_on_combobox_Controller.getdata_on_combobox',
  'GET /getdata_on_term_subject'                      : 'getData_on_combobox_Controller.getdata_on_term_subject',
  'GET /getdata_on_year_subject'                      : 'getData_on_combobox_Controller.getdata_on_year_subject',
  'GET /getdata_homework_times'                       : 'getData_on_combobox_Controller.getdata_homework_times',
  'GET /get_data_title_name'                          : 'getData_on_combobox_Controller.get_data_title_name',
  'GET /get_data_reason'                              : 'getData_on_combobox_Controller.get_data_reason',

  'GET /logout'                                       :  'logoutController.logout',

  //api
  'POST /insert_user_data'                            : 'RegisterController.insert_user_data',
  'POST /search_data'                                 : 'loginController.search_data',
  'POST /change_password'                             : 'loginController.change_password',
  'POST /search_data_password'                        : 'forgotpasswordController.search_data_password',
  'POST /postupload'                                  : 'uploadfileController.upload',
  'POST /postsendhomework'                            : 'uploadfileController.postsendhomework',
  'POST /get_files'                                   : 'uploadfileController.get_files',
  'POST /search_data_teacher'                         : 'profilelecController.search_data_teacher',
  'POST /search_data_teacher_to_show_contacts'        : 'profilelecController.search_data_teacher_to_show_contacts',
  'POST /remove_files'                                : 'uploadfileController.remove_files',
  'POST /get_files_homework'                          : 'getfilesController.get_files_homework',
  'POST /get_files_documents'                         : 'getfilesController.get_files_documents',
  'POST /get_lecturer_name_of_subject'                : 'getfilesController.get_lecturer_name_of_subject',
  'POST /get_files_news'                              : 'getfilesController.get_files_news',
  'POST /get_files_score'                             : 'getfilesController.get_files_score',
  'POST /insert_news_data'                            : 'getfilesController.insert_news_data',
  'POST /insert_data_to_db_teacher'                   : 'lec_sub_addController.insert_data_to_db_teacher',
  'POST /getdata_on_subject_search'                   : 'getData_on_combobox_Controller.getdata_on_subject_search',
  'POST /get_data_on_elasticsearch'                   : 'lec_sub_addController.get_data_on_elasticsearch',
  'POST /delete_subject_on_elasticsearch'             : 'lec_sub_addController.delete_subject_on_elasticsearch',
  'POST /get_term_year'                               : 'uploadfileController.get_term_year',
  'POST /put_mailbox_to_elasticsearch'                : 'mailboxController.put_mailbox_to_elasticsearch',
  'POST /search_mailbox_subject'                      : 'mailboxController.search_mailbox_subject',
  'POST /get_subject_all'                             : 'lec_sub_addController.get_subject_all',
  'POST /remove_news'                                 : 'getfilesController.delete_files_news',
  'POST /register_for_teacher_by_admin'               : 'register_for_teacher_by_adminController.register_for_teacher_by_admin',
  'POST /update_view_subject'                         : 'student_subjectController.update_view_subject',
  'POST /update_score_subject'                        : 'student_subjectController.update_score_subject',
  'POST /insert_data_follower'                        : 'student_subjectController.insert_data_follower',
  'POST /insert_data_score'                           : 'student_subjectController.insert_data_score',
  'POST /insert_type_for_log_follow'                  : 'lec_sub_addController.insert_type_for_log_follow',
  'POST /search_data_for_the_followers'               : 'student_subjectController.search_data_for_the_followers',
  'POST /search_data_for_the_views'                   : 'student_subjectController.search_data_for_the_views',
  'POST /search_indi_data_in_student_subject'         : 'student_subjectController.search_indi_data_in_student_subject',
  'POST /search_indi_data_in_student_subject_score'   : 'student_subjectController.search_indi_data_in_student_subject_score',
  'POST /update_data_follower'                        : 'student_subjectController.update_data_follower',
  'POST /search_data_lecturer_for_dashboard'          : 'lecturer_dashboardController.search_data_lecturer_for_dashboard',
  'POST /search_all_mailbox_subject'                  : 'mailboxController.search_all_mailbox_subject',
  'POST /update_status_read_mailbox'                  : 'mailboxController.update_status_read_mailbox',
  'POST /update_status_room_lecturer'                 : 'lecturer_dashboardController.update_status_room_lecturer',
  'POST /search_data_for_latest_topic'                : 'homepageController.search_data_for_latest_topic',
  'POST /search_data_for_hottest_topic'               : 'homepageController.search_data_for_hottest_topic',
  'POST /search_data_by_keyword_subject'              : 'homepageController.search_data_by_keyword_subject',
  'POST /search_data_homework_send'                   : 'lecturer_dashboardController.search_data_homework_send',
  'POST /lecturer_profile_upload'                     : 'change_profileController.lecturer_profile_upload',
  'POST /lecturer_profile_update'                     : 'change_profileController.lecturer_profile_update',
  'POST /remove_mailbox_from_lecturer_dashboard'      : 'lecturer_dashboardController.remove_mailbox_from_lecturer_dashboard',
  'POST /insert_subject_to_elasticsearch'             : 'create_subject_for_adminController.insert_subject_to_elasticsearch',
  'POST /search_data_subject_all'                     : 'create_subject_for_adminController.search_data_subject_all',
  'POST /search_data_for_subject_id_select'           : 'create_subject_for_adminController.search_data_for_subject_id_select',
  'POST /delete_data_in_subject_all'                  : 'create_subject_for_adminController.delete_data_in_subject_all',
  'POST /delete_value_in_upload_log'                  : 'lec_sub_addController.delete_value_in_upload_log',
  'POST /search_data_for_log_score'                   : 'student_subjectController.search_data_for_log_score',
  'POST /remove_file_homework_send'                   : 'lecturer_dashboardController.remove_file_homework_send',
  'POST /update_data_add_score_for_homework_send'     : 'lecturer_dashboardController.update_data_add_score_for_homework_send',
  'POST /remove_field_score'                          : 'lecturer_dashboardController.remove_field_score'



};

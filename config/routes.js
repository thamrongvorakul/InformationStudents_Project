/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes map URLs to views and controllers.
 *
 * If Sails receives a URL that doesn't match any of the routes below,
 * it will check for matching files (images, scripts, stylesheets, etc.)
 * in your assets directory.  e.g. `http://localhost:1337/images/foo.jpg`
 * might match an image file: `/assets/images/foo.jpg`
 *
 * Finally, if those don't match either, the default 404 handler is triggered.
 * See `api/responses/notFound.js` to adjust your app's 404 logic.
 *
 * Note: Sails doesn't ACTUALLY serve stuff from `assets`-- the default Gruntfile in Sails copies
 * flat files from `assets` to `.tmp/public`.  This allows you to do things like compile LESS or
 * CoffeeScript for the front-end.
 *
 * For more information on configuring custom routes, check out:
 * http://sailsjs.org/#!/documentation/concepts/Routes/RouteTargetSyntax.html
 */

module.exports.routes = {
  'GET /' : {view : 'homepage'},
  'GET /register' : {view : 'register'},
  'GET /login' : {view : 'login'},
  'GET /forgot_password' : {view :'forgot_password'},
  'GET /lecturer_add_sub2' : { view : 'file_manager_L_add_sub2'},
  'GET /lecturer_add_sub' : {view:'file_manager_L_add_sub'},
  'GET /contacts_Lec' : {view : 'contacts_Lec'},
  'GET /privateinfo' : {view:'file_manager_L_mng_privateInfo'},
  'GET /lecturer_mng_sub' : {view:'file_manager_L_mng_sub'},
  'GET /students_sub_doc' : {view:'subject_doc_dload'},
  'GET /students_sub' : {view:'file_manager_S_subject'},
  'GET /students_sub_hw' : {view:'subject_hw_dload'},
  'GET /students_sub_news' : {view:'subject_news_dload'},
  'GET /students_sub_score' : {view:'subject_score_dload'},
  'GET /profile_lec' : {view : 'profile_Lec'},
  'GET /home' : {view : 'home'},
  'GET /subject_doc_dload2' : {view : 'subject_doc_dload2'},
  'GET /subject_hw_dload2' : {view : 'subject_hw_dload2'},
  'GET /subject_news_dload2' : {view : 'subject_news_dload2'},
  'GET /subject_score_dload2' : {view : 'subject_score_dload2'},
  'GET /index' :{view : 'index'},




  // api เรียกข้อมูลมาใส่ combobox
  'GET /getdata_on_combobox' : 'getData_on_combobox_Controller.getdata_on_combobox',







  //api
  'POST /bulkinsert' : 'RegisterController.bulkinsert',
  'POST /search_data' : 'loginController.search_data',
  'POST /search_data_password' : 'forgotpasswordController.search_data_password',
  'POST /postupload' : 'uploadfileController.upload',
  'POST /send_data' : 'send_dataController.send_data',
  'POST /bulkinsert_upload' : 'uploadfileController.bulkinsert',
  'POST /get_files' : 'uploadfileController.get_files'


  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` (or `views/homepage.jade`, *
  * etc. depending on your default view engine) your home page.              *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/



  /***************************************************************************
  *                                                                          *
  * Custom routes here...                                                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the custom routes above, it   *
  * is matched against Sails route blueprints. See `config/blueprints.js`    *
  * for configuration options and examples.                                  *
  *                                                                          *
  ***************************************************************************/

};

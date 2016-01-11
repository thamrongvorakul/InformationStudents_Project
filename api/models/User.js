/**
* User.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {

    ID_NO: {
    type: 'string',
    required: true
    },


    FName: {
    type: 'string',
    required: true
    },

    LName: {
    type: 'string',
    required: true
    },
  // The user's title at their job (or something)
  // e.g. Genius

  // The user's email address
  // e.g. nikola@tesla.com
    email: {
      type: 'email',
      required: true,
      unique: true
    },

  /*  password: {
      type :'string',
      required : true
    },*/

  // The encrypted password for the user
  // e.g. asdgh8a249321e9dhgaslcbqn2913051#T(@GHASDGA
   encryptedPassword: {
    type: 'string',
    required: true
  },

  // The timestamp when the the user last logged in
  // (i.e. sent a username and password to the server)
  lastLoggedIn: {
    type: 'date',
    required: true,
    defaultsTo: new Date(0)
  },

  // url for gravatar
  gravatarUrl: {
    type: 'string'
  }
}

};

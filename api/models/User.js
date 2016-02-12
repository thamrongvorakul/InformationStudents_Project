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

    email: {
      type: 'email',
      required: true,
      unique: true
    },
    password: {
      type: 'string',
      required: true,
    },
   encryptedPassword: {
    type: 'string',
    required: true
    },

    lastLoggedIn: {
      type: 'date',
      required: true,
      defaultsTo: new Date(0)
    },

    gravatarUrl: {
      type: 'string'
    }
}

};

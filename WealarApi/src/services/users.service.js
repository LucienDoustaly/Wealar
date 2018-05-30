"use strict";

const uuidv4 = require('uuid/v4');
const passwordHash = require('password-hash');
const { MoleculerError } 	= require("moleculer").Errors;
const Database = require("../adapters/Database");
const Request = require("../mixins/request.mixin");
const CodeTypes = require("../fixtures/error.codes");

// Filters applied when searching for entities
// Elements correspond to the columns of the table
const Filters_Users = {
	username: ["username"],
	role: ["id", "role"],
	infos: ["id", "username", "role", "phone", "preferences"]
};
const Filters_Tokens = {
	empty: ["id"]
};

const Roles = ["ADMIN", "USER"];

const Default_Preferences = {
	securityMode: 0,
	smsNotification: false,
	weatherNotification: false,
	presenceNotification: false
};



module.exports = {
	name: "users",

	mixins: [ Request ],

	actions: {

		create: {
			params: {
				password: "string"
			},
			handler(ctx) {
				return this.generateHash(ctx.params.password) // Encrypt the password
					.then( (res) => {
						var wealar_id = uuidv4(); // Generates a random string

						return this.DB_Users.insert(ctx, { // Insert the new user in the database
							id: wealar_id,
							username: wealar_id, // First connection: id = username
							password: res.data,
							preferences: Default_Preferences
						});
					})
					.then( () => this.requestSuccess("User Account Created", ctx.params.username) ) // Format the response
					.catch( (err) => this.requestError(CodeTypes.UNKOWN_ERROR));
			}
		},

		getAll: {
			params: {

			},
			handler(ctx) {
				return this.verifyIfAdmin(ctx) // Verify admin priviledge
					.then( () => this.DB_Users.find(ctx, { }) ) // Then search for all users in the database
					.then( (res) => this.requestSuccess("Search Complete", res.data) ) // Format the response
					.catch( (err) => {
						if (err.name === 'Nothing Found')
							return this.requestError(CodeTypes.USERS_NOTHING_FOUND);
						else
							return this.requestError(CodeTypes.UNKOWN_ERROR);
					});
			}
		},

		get: {
			params: {

			},
			handler(ctx) {
				return this.verifyIfLogged(ctx) // Verify if the user is logged
					.then( () => this.DB_Users.findById(ctx, { // Then search his information in the database
						id: ctx.meta.user.id
					}))
					.then( (res) => this.requestSuccess("Search Complete", res.data) ) // Format the response
					.catch( (err) => {
						if (err.name === 'Nothing Found')
							return this.requestError(CodeTypes.USERS_NOTHING_FOUND);
						else
							return this.requestError(CodeTypes.UNKOWN_ERROR);
					});
			}
		},

		count: {
			params: {

			},
			handler(ctx) {
				return this.verifyIfAdmin(ctx) // Verify admin priviledge
					.then( () => this.DB_Users.count(ctx, { }) ) // Then count the number of users in the database
					.then( (res) => this.requestSuccess("Count Complete", res.data) ) // Format the response
					.catch( (err) => {
						if (err instanceof MoleculerError)
							return Promise.reject(err);
						else
							return this.requestError(CodeTypes.UNKOWN_ERROR);
					});
			}
		},

		changeInformation: {
			params: {
				username: "string",
				phone: "string"
			},
			handler(ctx) {
				return this.verifyIfLogged(ctx) // Verify if user is logged
					.then( () => this.DB_Users.updateById(ctx, ctx.meta.user.id, { // Change the information of the user thanks to his id
						username: ctx.params.username,
						phone: ctx.params.phone
					}))
					.then( (res) => this.requestSuccess("Changes Saved", true) ) // Format the response
					.catch( (err) => {
						if (err.name === 'Database Error' && Array.isArray(err.data)){
							if (err.data[0].type === 'unique' && err.data[0].field === 'username') // Username must be unique
								return this.requestError(CodeTypes.USERS_USERNAME_CONSTRAINT);
						}

						return this.requestError(CodeTypes.UNKOWN_ERROR);
					});
			}
		},

		firstCo: {
			params: {
				username: "string",
				phone: "string",
				oldPassword: "string",
				newPassword: "string"
			},
			handler(ctx) {
				return this.verifyUserPassword(ctx, ctx.params.oldPassword) // First verify the password of the user
					.then( () => this.generateHash(ctx.params.newPassword) ) // Encrypt the new password
					.then( (res) => this.DB_Users.updateById(ctx, ctx.meta.user.id, { // Then store new information about the user in the database, thanks to his id
						username: ctx.params.username,
						phone: ctx.params.phone,
						password: res.data
					}))
					.then( (res) => this.requestSuccess("Changes Saved", true) ) // Format the response
					.catch( (err) => {
						if (err.name === 'Database Error' && Array.isArray(err.data)){
							if (err.data[0].type === 'unique' && err.data[0].field === 'username') // Username must be unique
								return this.requestError(CodeTypes.USERS_USERNAME_CONSTRAINT);
						}

						return this.requestError(CodeTypes.UNKOWN_ERROR);
					});
			}
		},

		changePreferences: {
			params: {
				securityMode: "number",
				smsNotification: "boolean",
				weatherNotification: "boolean",
				presenceNotification: "boolean"
			},
			handler(ctx) {
				return this.verifyIfLogged(ctx) // Verify if user is logged
					.then( () => {
						if ((ctx.params.securityMode >= 0) && (ctx.params.securityMode < 3)) // Check if the security mode is valid
							return this.requestSuccess("Security Mode Valid", true);
						else
							return this.requestError(CodeTypes.USERS_MODE_CONSTRAINT);
					})
					.then( () => this.DB_Users.updateById(ctx, ctx.meta.user.id, { // Then updates the new preferences thanks to the user's id
						preferences: {
							securityMode: ctx.params.securityMode,
							smsNotification: ctx.params.smsNotification,
							weatherNotification: ctx.params.weatherNotification,
							presenceNotification: ctx.params.presenceNotification
						}
					}))
					.then( (res) => this.requestSuccess("Changes Saved", true) ) // Format the response
					.catch( (err) => {
						if (err instanceof MoleculerError)
							return Promise.reject(err);
						else
							return this.requestError(CodeTypes.UNKOWN_ERROR);
					});
			}
		},

		changePassword: {
			params: {
				oldPassword: "string",
				newPassword: "string"
			},
			handler(ctx) {
				return this.verifyUserPassword(ctx, ctx.params.oldPassword) // Check that the old password is valid
					.then( () => this.generateHash(ctx.params.newPassword) ) // Encrypt the new password
					.then( (res) => this.DB_Users.updateById(ctx, ctx.meta.user.id, { // Then update it to the database
						password: res.data
					}))
					//.then( () => ctx.call("auth.closeAllSessions")) // For security, we close all opened sessions of the user
					.then( () => this.requestSuccess("Changes Saved", true) ) // Format the response
					.catch( (err) => {
						if (err instanceof MoleculerError)
							return Promise.reject(err);
						else
							return this.requestError(CodeTypes.UNKOWN_ERROR);
					});
			}
		},

		changeRole: {
			params: {
				username: "string",
				role: "string"
			},
			handler(ctx) {
				return this.verifyIfAdmin(ctx) // Verify admin priviledge
					.then( () => this.verifyRole(ctx.params.role) ) // Check that the role exists
					.then( () => this.DB_Users.findById(ctx, { // Research information about the user who's role is to change
						id: ctx.meta.user.id,
						filter: Filters_Users.username
					}))
					.then( (res) => {
						if ((res.data === ctx.params.username) && (ctx.params.role !== "ADMIN")) // We don't want to remove admin priviledge to the last admin
							return this.isLastAdmin(ctx)
								.then( (res) => {
									if (res.data === false)
										return Promise.resolve(true);
									else
										return this.requestError(CodeTypes.USERS_FORBIDDEN_REMOVE);
								});
						else
							return Promise.resolve(true);
					})
					.then( () => this.DB_Users.findOne(ctx, {
						query: {
							username: ctx.params.username
						},
						filter: Filters_Users.role
					}))
					.then( (res) => this.DB_Tokens.removeMany(ctx, { // Close all sessions opened by the user
						userId: res.data.id
					}))
					.then( () => this.DB_Users.updateMany(ctx, { // Finally change the user role
						username: ctx.params.username
					}, {
						role: ctx.params.role
					}))
					.then( () => this.requestSuccess("Changes Saved", true) ) // Format the response
					.catch( (err) => {
						if (err instanceof MoleculerError)
							return Promise.reject(err);
						else
							return this.requestError(CodeTypes.UNKOWN_ERROR);
					});
			}
		},

		remove: {
			params: {
				password: "string"
			},
			handler(ctx) {
				return this.verifyIfLogged(ctx) // Verify if user is logged
					.then( () => this.isLastAdmin(ctx) ) // We don't want to remove the last admin
					.then( (res) => {
						if (res.data === false)
							return Promise.resolve(true);
						else
							return this.requestError(CodeTypes.USERS_FORBIDDEN_REMOVE);
					})
					.then( () => this.verifyUserPassword(ctx, ctx.params.password)) // Check that the password is valid
					.then( () => ctx.call("auth.closeAllSessions") ) // Close all the sessions of the user
					.then( () => this.DB_Users.removeById(ctx, ctx.meta.user.id)) // Remove entirely the user from the database
					.then( () => this.requestSuccess("Delete Complete", true) ) // Format the response
					.catch( (err) => {
						if (err instanceof MoleculerError)
							return Promise.reject(err);
						else
							return this.requestError(CodeTypes.UNKOWN_ERROR);
					});
			}
		},

		banish: {
			params: {
				username: "string"
			},
			handler(ctx) {
				return this.verifyIfAdmin(ctx) // Checks admin priviledge
					.then( () => this.DB_Users.findOne(ctx, { // Search information about the user to be banish
						query: {
							username: ctx.params.username
						},
						filter: Filters_Users.role
					}))
					.then( (res) => {
						if (res.data.role !== "ADMIN") // Forbid banishement of an admin
							return this.DB_Tokens.removeMany(ctx, { // Close all user's sessions
									userId: res.data.id
								})
								.then( () => this.DB_Users.removeMany(ctx, { // Remove the user from the database
									username: ctx.params.username
								}));
						else
							return this.requestError(CodeTypes.USERS_FORBIDDEN_REMOVE);
					})
					.then( () => this.requestSuccess("Delete Complete", true) ) // Format the response
					.catch( (err) => {
						if (err instanceof MoleculerError)
							return Promise.reject(err);
						else if (err.name === 'Nothing Found')
							return this.requestError(CodeTypes.USERS_NOTHING_FOUND);
						else
							return this.requestError(CodeTypes.UNKOWN_ERROR);
					});
			}
		},

		removeAll: {
			params: {
				password: "string"
			},
			handler(ctx) {
				return this.verifyIfAdmin(ctx) // Verify admin priviledge
					.then( () => this.verifyUserPassword(ctx, ctx.params.password) ) // Check if the password is correct
					.then( () => this.DB_Tokens.removeAll(ctx) ) // Remove all tokens from all users
					.then( () => this.DB_Users.removeAll(ctx) ) // Remove all users
					.then( () => ctx.call("users.createAdminIfNotExists")) // Create a default admin user
					.then( () => this.requestSuccess("Delete Complete", true) ) // Format the response
					.catch( (err) => {
						if (err instanceof MoleculerError)
							return Promise.reject(err);
						else
							return this.requestError(CodeTypes.UNKOWN_ERROR);
					});
			}
		},

		createAdminIfNotExists: {
			params: {

			},
			handler(ctx) {
				return this.DB_Users.count(ctx, { // Count the number of admin user in the database
						role: "ADMIN"
					})
					.then( (res) => {
						if (res.data === 0) { // if there is no admin, we create one
							var wealar_id = uuidv4();

							return this.generateHash("admin") // Encrypt password
								.then( (res) => this.DB_Users.insert(ctx, { // Insert the admin in the database
									username: "admin",
									password: res.data,
									role: "ADMIN",
									preferences: Default_Preferences
								}));
						}
						else
							return Promise.resolve(true);
					})
					.then( () => this.requestSuccess("Admin Exists", true) ) // Format the response
					.catch( (err) => this.requestError(CodeTypes.UNKOWN_ERROR) );
			}
		}

	},

	methods: {

		generateHash(value){
			return Promise.resolve(passwordHash.generate(value, {algorithm: 'sha256'}))
				.then( (res) => this.requestSuccess("Password Encrypted", res) );
		},

		verifyIfLogged(ctx){
			if (ctx.meta.user !== undefined)
				return this.requestSuccess("User Logged", true);
			else
				return this.requestError(CodeTypes.USERS_NOT_LOGGED_ERROR);
		},

		verifyIfAdmin(ctx){
			return this.verifyIfLogged(ctx)
				.then( () => {
					if (ctx.meta.user.role === "ADMIN")
						return this.requestSuccess("User is ADMIN", true);
					else
						return this.requestError(CodeTypes.AUTH_ADMIN_RESTRICTION);
				});
		},

		verifyRole(role){
			if (Roles.indexOf(role) !== -1)
				return this.requestSuccess("Role Exists", true);
			else
				return this.requestError(CodeTypes.USERS_INVALID_ROLE);
		},

		isLastAdmin(ctx){
			return this.verifyIfAdmin(ctx)
				.then( () => this.DB_Users.count(ctx, {
					role: "ADMIN"
				}))
				.then( (res) => {
					if (res.data === 1)
						return this.requestSuccess("Last Admin", true);
					else
						return this.requestSuccess("Last Admin", false);
				})
				.catch( (err) => {
					if (err.message === CodeTypes.AUTH_ADMIN_RESTRICTION)
						return this.requestSuccess("Last Admin", false);
					else
						return Promise.reject(err);
				});
		},

		verifyUserPassword(ctx, password){
			return this.verifyIfLogged(ctx)
			.then( () => this.DB_Users.findById(ctx, {
				id: ctx.meta.user.id,
				filter: Filters_Users.username
			}))
			.then( (res) => ctx.call("auth.verifyPassword", { username: res.data.username, password: password}))
			.catch( (err) => {
				if (err instanceof MoleculerError)
					return Promise.reject(err);
				else
					return this.requestError(CodeTypes.UNKOWN_ERROR);
			});
		}

	},

	created() {
		this.DB_Users = new Database("User", Filters_Users.infos);
		this.DB_Tokens = new Database("Token", Filters_Tokens.empty);
	}
};

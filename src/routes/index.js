const meetingRoutes = require('./meeting_routes');
module.exports = function(app, db) {
	meetingRoutes(app, db);
	// Other route groups could go here, in the future
};
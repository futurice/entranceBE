const meetingRoutes = require('./meeting_routes');
const healthRoutes = require('./health');
module.exports = function(app, db) {
	meetingRoutes(app, db);
	healthRoutes(app);
};

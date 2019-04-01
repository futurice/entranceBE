import meetingRoutes from './meeting_routes';
import healthRoutes from './health';

export default (app, db) => {
	meetingRoutes(app, db);
	healthRoutes(app);
};

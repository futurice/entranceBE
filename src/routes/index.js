import meetingRoutes from './meetings';
import healthRoutes from './health';

export default (app, system) => {
  meetingRoutes(app, system);
  healthRoutes(app);
};

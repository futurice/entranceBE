import { Router } from 'express';

import meetingRoutes from './meetings';
import healthRoutes from './health';

export default (app, system) => {
  // --- General Routes
  meetingRoutes(app, system); // Remove once no longer needed
  healthRoutes(app);

  // --- Office Routes
  const office = new Router();
  meetingRoutes(office, system);
  app.use('/:office', office);
};

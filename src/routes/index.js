import meetingRoutes from './meetings';
import healthRoutes from './health';

// --- Middlewares
const withContext = (defaults = {}) => (req, _, next) => {
  const { office } = req.params;

  req.systemContext = {
    ...req.systemContext,
    office: office || defaults.office,
  };

  next();
};

const withSystem = system => (req, _, next) => {
  req.system = system;
  next();
};

// --- Routes
export default (app, system) => {
  // Routers
  const meetings = meetingRoutes();
  const health = healthRoutes();

  // Legacy Routes
  app.use(withContext({ office: 'munich' }), withSystem(system), meetings);

  // Routes
  app.use('/:office/*', withContext(), withSystem(system), meetings);
  app.use(health);
};

import { Result } from './Result.jsx';

// @todo if routing for results is implemented
// we need a parent Route to contain this path
// e.g. search/amox/500sdfsdf3
export const ResultRoute = {
  path: '/:name/:code',
  component: Result,
};

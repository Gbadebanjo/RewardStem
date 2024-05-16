import app, { listen } from './app.js';

const port = process.env.PORT;
listen(port, () => {
  /* eslint-disable no-console */
  console.log(`Listening: http://localhost:${port}`);
  /* eslint-enable no-console */
});

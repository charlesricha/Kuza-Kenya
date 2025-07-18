import { genkit, type GenkitErrorCode } from 'genkit';
import { googleAI } from '@genkit-ai/googleai';

export const ai = genkit({
  plugins: [
    googleAI({
      apiVersion: 'v1beta',
    }),
  ],
  // Log errors to the console.
  logSinks: [
    (log) => {
      if (log.severity >= 500) {
        console.error(log);
      }
    },
  ],
  // Treat these errors as not fatal.
  nonFatalErrorCodes: [
    // This may be thrown when we are probing the model for a response
    // and we don't get one.
    'resourceExhausted',
  ] as GenkitErrorCode[],
});

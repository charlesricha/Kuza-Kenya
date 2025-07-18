import { config } from 'dotenv';
config(); // Load environment variables first

// This will discover and register all flows defined in the `flows` folder
// so they can be run with 'genkit flow:run'
import './flows/answer-questions';
import './flows/generate-upload-tips';

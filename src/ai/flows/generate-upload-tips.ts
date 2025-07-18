'use server';
/**
 * @fileOverview A flow for generating tips for users.
 */
import { ai } from '@/ai/genkit';
import { z } from 'zod';

const GenerateTipsInputSchema = z.object({
  topic: z.string().describe('The topic for which a tip is requested.'),
});

const GenerateTipsOutputSchema = z.object({
  tip: z.string().describe('A helpful tip for the user.'),
});

export async function getTip(topic: string) {
    const { tip } = await generateTipsFlow({ topic });
    return { tip };
}

const prompt = ai.definePrompt({
  name: 'generateTipPrompt',
  input: { schema: GenerateTipsInputSchema },
  output: { schema: GenerateTipsOutputSchema },
  prompt: `You are Kiboko, a friendly AI assistant. Generate a single, short, and encouraging tip about the following topic: {{{topic}}}. The tip should be about making a good report on the Kuza Kenya app.`,
});

const generateTipsFlow = ai.defineFlow(
  {
    name: 'generateTipsFlow',
    inputSchema: GenerateTipsInputSchema,
    outputSchema: GenerateTipsOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);

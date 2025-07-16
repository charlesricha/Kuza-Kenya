// This file is machine-generated - changes may be lost.
'use server';

/**
 * @fileOverview An AI agent that generates helpful upload tips.
 *
 * - generateUploadTips - A function that generates helpful upload tips.
 * - GenerateUploadTipsInput - The input type for the generateUploadTips function.
 * - GenerateUploadTipsOutput - The return type for the generateUploadTips function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateUploadTipsInputSchema = z.object({
  topic: z
    .string()
    .describe("The topic the user is about to upload an image of, e.g. 'pothole', 'rubbish'."),
});
export type GenerateUploadTipsInput = z.infer<typeof GenerateUploadTipsInputSchema>;

const GenerateUploadTipsOutputSchema = z.object({
  tip: z.string().describe('A helpful tip for uploading an image of the topic.'),
});
export type GenerateUploadTipsOutput = z.infer<typeof GenerateUploadTipsOutputSchema>;

export async function generateUploadTips(input: GenerateUploadTipsInput): Promise<GenerateUploadTipsOutput> {
  return generateUploadTipsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateUploadTipsPrompt',
  input: {schema: GenerateUploadTipsInputSchema},
  output: {schema: GenerateUploadTipsOutputSchema},
  prompt: `You are Kiboko, an AI assistant on the KuzaKenya website. Your role is to provide helpful tips to users uploading images of community issues.

  Generate a single, concise tip to help the user upload a more effective and informative image, focusing on the specific topic they are uploading.

  Topic: {{{topic}}}

  Tip:`,
});

const generateUploadTipsFlow = ai.defineFlow(
  {
    name: 'generateUploadTipsFlow',
    inputSchema: GenerateUploadTipsInputSchema,
    outputSchema: GenerateUploadTipsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);

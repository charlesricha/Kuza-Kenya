'use server';

/**
 * @fileOverview An AI agent that provides multiple response variations to a given question.
 *
 * - generateResponseVariation - A function that generates multiple response variations.
 * - GenerateResponseVariationInput - The input type for the generateResponseVariation function.
 * - GenerateResponseVariationOutput - The return type for the generateResponseVariation function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateResponseVariationInputSchema = z.object({
  question: z.string().describe('The question to generate response variations for.'),
  context: z.string().describe('Contextual information to help formulate the answer.  This could include information about the website, or previous turns in the conversation.'),
  numVariations: z.number().default(3).describe('The number of response variations to generate.'),
});
export type GenerateResponseVariationInput = z.infer<typeof GenerateResponseVariationInputSchema>;

const GenerateResponseVariationOutputSchema = z.object({
  responses: z.array(z.string()).describe('An array of response variations to the question.'),
});
export type GenerateResponseVariationOutput = z.infer<typeof GenerateResponseVariationOutputSchema>;

export async function generateResponseVariation(input: GenerateResponseVariationInput): Promise<GenerateResponseVariationOutput> {
  return generateResponseVariationFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateResponseVariationPrompt',
  input: {schema: GenerateResponseVariationInputSchema},
  output: {schema: GenerateResponseVariationOutputSchema},
  prompt: `You are an AI assistant for the KuzaKenya website, which allows citizens to upload images of things they need corrected, like potholes or rubbish.

You are given a question and some context. Generate multiple different responses to the question, based on the context.  The goal is to provide varied and unique answers.

Question: {{{question}}}
Context: {{{context}}}

Number of variations to generate: {{{numVariations}}}

Format each response as a single paragraph. Do not include any introductory or concluding remarks. The response should be complete on its own.

{{#each (range numVariations)}}
Response {{this}}:
{{/each}}`,
  // The Handlebars range helper is not built-in, so we define it here.  It's important to create this inside the prompt definition so that it
  // is not visible elsewhere in the codebase.
  handlebarsHelpers: {
    range: function(numVariations: number) {
      const result = [];
      for (let i = 1; i <= numVariations; i++) {
        result.push(i);
      }
      return result;
    },
  },
  config: {
    temperature: 0.9, // Slightly higher temperature for more variation
    maxOutputTokens: 500,
  },
});

const generateResponseVariationFlow = ai.defineFlow(
  {
    name: 'generateResponseVariationFlow',
    inputSchema: GenerateResponseVariationInputSchema,
    outputSchema: GenerateResponseVariationOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);

    // Extract the responses from the generated text
    const responses = output!.responses;

    return {
      responses: responses ?? [],
    };
  }
);

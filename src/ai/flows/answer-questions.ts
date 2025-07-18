'use server';
/**
 * @fileOverview A flow for answering questions about Kuza Kenya.
 */
import { ai } from '@/ai/genkit';
import { z } from 'zod';

const AnswerQuestionsInputSchema = z.object({
  question: z.string().describe('The user\'s question about Kuza Kenya.'),
});

const AnswerQuestionsOutputSchema = z.object({
  answer: z.string().describe('A helpful and friendly answer to the question.'),
});

export async function getAnswer(question: string) {
  const { answer } = await answerQuestionsFlow({ question });
  return { answer };
}

const prompt = ai.definePrompt({
  name: 'answerQuestionsPrompt',
  input: { schema: AnswerQuestionsInputSchema },
  output: { schema: AnswerQuestionsOutputSchema },
  prompt: `You are Kiboko, a friendly and helpful AI hippo assistant for an app called Kuza Kenya.
  Kuza Kenya is a platform that allows citizens to report community issues like potholes and rubbish by uploading images.
  Your personality is cheerful and encouraging.

  A user has asked the following question:
  "{{{question}}}"

  Provide a concise and helpful answer.
  If the question is about how to report an issue, you MUST include a link to the report page like this: "<a href='/report' class='text-primary underline hover:text-primary/80'>Report Page</a>".
  If you don't know the answer or the question is off-topic, politely say you can only answer questions about Kuza Kenya.`,
});

const answerQuestionsFlow = ai.defineFlow(
  {
    name: 'answerQuestionsFlow',
    inputSchema: AnswerQuestionsInputSchema,
    outputSchema: AnswerQuestionsOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);

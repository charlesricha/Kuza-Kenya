'use server';

import { answerQuestion } from '@/ai/flows/answer-questions';
import { generateUploadTips } from '@/ai/flows/generate-upload-tips';

export async function getAnswer(question: string) {
  try {
    const { answer } = await answerQuestion({ question });
    return { answer };
  } catch (error) {
    console.error(error);
    return { error: 'Sorry, I had trouble getting an answer. Please try again.' };
  }
}

export async function getTip(topic: string) {
  try {
    const { tip } = await generateUploadTips({ topic });
    return { tip };
  } catch (error) {
    console.error(error);
    return { error: 'Sorry, I had trouble getting a tip for you.' };
  }
}

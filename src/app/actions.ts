'use server';

import { createClient } from '@supabase/supabase-js';
import { z } from 'zod';
import { getAnswer as getAnswerFromAI } from '@/ai/flows/answer-questions';
import { getTip as getTipFromAI } from '@/ai/flows/generate-upload-tips';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

let supabase: ReturnType<typeof createClient> | null = null;
if (supabaseUrl && supabaseKey) {
  supabase = createClient(supabaseUrl, supabaseKey);
} else {
  console.log("Supabase credentials not found. Report submission will be disabled.");
}

export async function getAnswer(question: string) {
  try {
    const result = await getAnswerFromAI(question);
    return result;
  } catch (error) {
    console.error("Error getting answer from AI:", error);
    return { error: 'Sorry, I had trouble connecting to my brain. Please try again in a moment.' };
  }
}

export async function getTip(topic: string) {
  try {
    const result = await getTipFromAI(topic);
    return result;
  } catch (error) {
    console.error("Error getting tip from AI:", error);
    return { tip: 'For the best results, make sure your photo is clear and taken during the day.' };
  }
}

export async function submitReport(formData: FormData) {
  const ReportSchema = z.object({
    description: z.string().min(1, 'Description is required.'),
    latitude: z.coerce.number(),
    longitude: z.coerce.number(),
    image: z.instanceof(File)
  });

  if (!supabase) {
    return { error: 'Supabase is not configured. Cannot submit report.' };
  }

  try {
    const parsed = ReportSchema.safeParse({
      description: formData.get('description'),
      latitude: formData.get('latitude'),
      longitude: formData.get('longitude'),
      image: formData.get('image'),
    });

    if (!parsed.success) {
      console.error('Form validation failed:', parsed.error);
      return { error: 'Invalid form data.' };
    }

    const { description, latitude, longitude, image } = parsed.data;

    const fileName = `${Date.now()}-${image.name}`;
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('reports')
      .upload(fileName, image);

    if (uploadError) {
      console.error('Supabase upload error:', uploadError);
      throw uploadError;
    }

    const { data: urlData } = supabase.storage
      .from('reports')
      .getPublicUrl(uploadData.path);

    const imageUrl = urlData.publicUrl;

    const { error: insertError } = await supabase
      .from('reports')
      .insert({
        description,
        latitude,
        longitude,
        image_url: imageUrl,
      });

    if (insertError) {
      console.error('Supabase insert error:', insertError);
      throw insertError;
    }

    return { success: true };
  } catch (error) {
    console.error('Submission error:', error);
    return { error: 'An unexpected error occurred. Please try again.' };
  }
}

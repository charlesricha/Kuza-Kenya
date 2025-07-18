'use server';

import { createClient } from '@supabase/supabase-js';
import { z } from 'zod';
import { answerQuestion } from '@/ai/flows/answer-questions';
import { generateUploadTips } from '@/ai/flows/generate-upload-tips';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Supabase URL or Key is missing. Please check your .env file.");
}

const supabase = createClient(supabaseUrl!, supabaseKey!);

export async function getAnswer(question: string) {
  try {
    const { answer } = await answerQuestion({ question });
    return { answer };
  } catch (error) {
    console.error("Error in getAnswer:", error);
    return { error: 'Sorry, I had trouble getting an answer. Please try again.' };
  }
}

export async function getTip(topic: string) {
  try {
    const { tip } = await generateUploadTips({ topic });
    return { tip };
  } catch (error) {
    console.error("Error in getTip:", error);
    return { error: 'Sorry, I had trouble getting a tip for you.' };
  }
}

const ReportSchema = z.object({
  description: z.string().min(1, 'Description is required.'),
  latitude: z.coerce.number(),
  longitude: z.coerce.number(),
  image: z.instanceof(File)
});

export async function submitReport(formData: FormData) {
  if (!supabaseUrl || !supabaseKey) {
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

    // 1. Upload image to Supabase Storage
    const fileName = `${Date.now()}-${image.name}`;
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('reports') // Assuming a bucket named 'reports'
      .upload(fileName, image);

    if (uploadError) {
      console.error('Supabase upload error:', uploadError);
      throw uploadError;
    }

    // 2. Get public URL of the uploaded image
    const { data: urlData } = supabase.storage
      .from('reports')
      .getPublicUrl(uploadData.path);

    const imageUrl = urlData.publicUrl;

    // 3. Insert report into Supabase database
    const { error: insertError } = await supabase
      .from('reports') // Assuming a table named 'reports'
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

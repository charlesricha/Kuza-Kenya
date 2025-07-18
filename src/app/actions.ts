'use server';

import { createClient } from '@supabase/supabase-js';
import { z } from 'zod';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Supabase URL or Key is missing. Please check your .env file.");
}

const supabase = createClient(supabaseUrl!, supabaseKey!);

const localAnswers: { [key: string]: string } = {
  "what's kuza kenya": "Kuza Kenya is a platform that allows citizens to report community issues like potholes and rubbish by uploading images.",
  "what is kuza kenya": "Kuza Kenya is a platform that allows citizens to report community issues like potholes and rubbish by uploading images.",
  "what does it deal with": "It deals with community issues such as potholes, rubbish, street lighting, and other local problems that need attention from authorities.",
  "how do you report": "It's easy! Just go to the <a href='/report' class='text-primary underline hover:text-primary/80'>Report Page</a> and fill out the form with a picture and location.",
  "how to report": "It's easy! Just go to the <a href='/report' class='text-primary underline hover:text-primary/80'>Report Page</a> and fill out the form with a picture and location.",
};


export async function getAnswer(question: string) {
  const lowerCaseQuestion = question.toLowerCase().trim();
  const answer = localAnswers[lowerCaseQuestion] || "I'm sorry, I can only answer questions about what Kuza Kenya is, what it deals with, and how to report an issue. Please try one of those.";
  return { answer };
}

export async function getTip(topic: string) {
  return { tip: 'For the best results, make sure your photo is clear and taken during the day.' };
}

export async function submitReport(formData: FormData) {
  const ReportSchema = z.object({
    description: z.string().min(1, 'Description is required.'),
    latitude: z.coerce.number(),
    longitude: z.coerce.number(),
    image: z.instanceof(File)
  });

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

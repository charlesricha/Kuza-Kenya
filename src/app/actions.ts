'use server';

import { createClient } from '@supabase/supabase-js';
import { z } from 'zod';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

let supabase: ReturnType<typeof createClient> | null = null;
if (supabaseUrl && supabaseKey) {
  supabase = createClient(supabaseUrl, supabaseKey);
} else {
  console.log("Supabase credentials not found. Report submission will be disabled.");
}

const localAnswers: { [key: string]: string } = {
    'hello': "Hello there! I'm Kiboko. How can I assist you with Kuza Kenya today?",
    'hi': "Hi! I'm Kiboko, your friendly assistant. Feel free to ask me about reporting issues.",
    'hey': "Hey! I'm Kiboko. What can I help you with regarding Kuza Kenya?",
    'what is kuza kenya': 'Kuza Kenya is a platform that allows citizens to report community issues like potholes and rubbish by uploading images.',
    'about kuza kenya': 'Kuza Kenya is a platform that allows citizens to report community issues like potholes and rubbish by uploading images.',
    'tell me about': 'Kuza Kenya is a platform that allows citizens to report community issues like potholes and rubbish by uploading images.',
    'how do i report': 'You can report an issue by going to our <a href="/report" class="text-primary underline hover:text-primary/80">Report Page</a>. Just fill out the form with a picture and description!',
    'how to report': 'You can report an issue by going to our <a href="/report" class="text-primary underline hover:text-primary/80">Report Page</a>. Just fill out the form with a picture and description!',
    'report issue': 'You can report an issue by going to our <a href="/report" class="text-primary underline hover:text-primary/80">Report Page</a>. Just fill out the form with a picture and description!',
    'pothole': 'Reporting a pothole is easy! Head over to the <a href="/report" class="text-primary underline hover:text-primary/80">Report Page</a> to get started.',
    'pothol': 'Reporting a pothole is easy! Head over to the <a href="/report" class="text-primary underline hover:text-primary/80">Report Page</a> to get started.',
    'rubbish': 'Spotted some rubbish that needs collecting? You can let us know on the <a href="/report" class="text-primary underline hover:text-primary/80">Report Page</a>.',
    'rubish': 'Spotted some rubbish that needs collecting? You can let us know on the <a href="/report" class="text-primary underline hover:text-primary/80">Report Page</a>.'
};

export async function getAnswer(question: string) {
  const normalizedQuestion = question.toLowerCase().trim();
  let foundAnswer = "I'm sorry, I can only answer questions about Kuza Kenya and how to report issues. Try asking 'What is Kuza Kenya?' or 'How do I report an issue?'.";

  for (const key in localAnswers) {
    if (normalizedQuestion.includes(key)) {
      foundAnswer = localAnswers[key];
      break;
    }
  }
  
  // Simulate a short delay for a more natural feel
  await new Promise(resolve => setTimeout(resolve, 500));

  return { answer: foundAnswer };
}

export async function getTip(topic: string) {
  // Return a static tip since AI is disabled
  return { tip: 'For the best results, make sure your photo is clear and taken during the day.' };
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

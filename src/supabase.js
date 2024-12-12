import { createClient } from '@supabase/supabase-js';

// Hole die Umgebungsvariablen aus .env
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY;

// Initialisiere den Supabase-Client
export const supabase = createClient(supabaseUrl, supabaseKey);
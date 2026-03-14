// src/supabaseClient.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://mfuhkgnxltgbkidizthk.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1mdWhrZ254bHRnYmtpZGl6dGhrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTIwODM5ODMsImV4cCI6MjA2NzY1OTk4M30.5iiEC0Wk4zTu9oyC3TM2Bpb3kN5HdZKz8gQc1kGMX9k';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

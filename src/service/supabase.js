import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://jwzjobfpchmagrrgusrs.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp3empvYmZwY2htYWdycmd1c3JzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA4NTczMjIsImV4cCI6MjA3NjQzMzMyMn0.gjhCcY6mkiwtwRrpXi1pLG8QJ2OUCRV7ZCteUhybCnU';
export const supabase = createClient(supabaseUrl, supabaseKey);
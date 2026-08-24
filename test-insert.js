const { createClient } = require('@supabase/supabase-js');

const supabase = createClient('https://fmoomshbhqfbixjtbcsd.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZtb29tc2hiaHFmYml4anRiY3NkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODcyMzcxMzAsImV4cCI6MjEwMjgxMzEzMH0.7aQLV05hePcOWSmPWRcTzvGXfSWgiQ07Q-lBHw1QRE0');

async function run() {
  const { data, error } = await supabase.from('candidates').upsert([{
    full_name: 'Bhoomika',
    email: 'kpbhoomika30@gmail.com',
    tier: 'student'
  }], { onConflict: 'email' }).select().single();
  
  if (error) {
    console.error('SUPABASE ERROR:', error);
  } else {
    console.log('SUCCESS:', data);
  }
}
run();

const { createClient } = require('@supabase/supabase-js');
const supabase = createClient('https://fmoomshbhqfbixjtbcsd.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZtb29tc2hiaHFmYml4anRiY3NkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODcyMzcxMzAsImV4cCI6MjEwMjgxMzEzMH0.7aQLV05hePcOWSmPWRcTzvGXfSWgiQ07Q-lBHw1QRE0');

async function run() {
  const { data, error } = await supabase
    .from('jobs')
    .select('id, role_title, company_name, location, apply_url, salary_min, salary_max')
    .or('role_title.ilike.%marketing%,role_title.ilike.%content%,role_title.ilike.%writer%,role_title.ilike.%social media%,role_title.ilike.%operations%,role_title.ilike.%strategy%,role_title.ilike.%growth%')
    .limit(10);
    
  if (error) {
    console.error('Error:', error);
  } else {
    console.log('Matches:', data);
  }
}
run();

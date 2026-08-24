const { createClient } = require('@supabase/supabase-js');
const supabase = createClient('https://fmoomshbhqfbixjtbcsd.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZtb29tc2hiaHFmYml4anRiY3NkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODcyMzcxMzAsImV4cCI6MjEwMjgxMzEzMH0.7aQLV05hePcOWSmPWRcTzvGXfSWgiQ07Q-lBHw1QRE0');

async function run() {
  const { data, error } = await supabase.from('candidates').select('*').order('created_at', { ascending: false }).limit(3);
  console.log("Candidates found:", data ? data.length : 0);
  if (data && data.length > 0) {
    console.log("Most recent candidate:");
    console.log("Name:", data[0].full_name);
    console.log("Email:", data[0].email);
    console.log("Tier:", data[0].tier);
    console.log("Target Roles:", data[0].target_roles);
    console.log("Created At:", data[0].created_at);
  }
}
run();

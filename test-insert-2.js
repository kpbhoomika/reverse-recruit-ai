const { createClient } = require('@supabase/supabase-js');
const supabase = createClient('https://fmoomshbhqfbixjtbcsd.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZtb29tc2hiaHFmYml4anRiY3NkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODcyMzcxMzAsImV4cCI6MjEwMjgxMzEzMH0.7aQLV05hePcOWSmPWRcTzvGXfSWgiQ07Q-lBHw1QRE0');

async function run() {
  const { data, error } = await supabase.from('candidates').upsert([{
    full_name: "",
    email: "",
    phone: "",
    linkedin_url: "",
    target_roles: [""],
    target_locations: [""],
    min_salary: null,
    currency: "USD",
    skills: [],
    resume_text: null,
    tier: "student",
    interviews_guaranteed: 3,
    interviews_landed: 0,
    applications_submitted: 0,
    subscription_active: true
  }], { onConflict: "email" }).select().single();
  
  console.log("Error:", error);
  console.log("Data:", data);
}
run();

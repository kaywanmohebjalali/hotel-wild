
import { createClient } from '@supabase/supabase-js'
export const supabaseUrl = 'https://zezroyxqlcqrrcbegqxi.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InplenJveXhxbGNxcnJjYmVncXhpIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTM4Mzc0NDgsImV4cCI6MjAwOTQxMzQ0OH0.iWo_ET7EyRfYSw3g8eKDUgiF_VmFf4EPVmx_vswx7is'
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase
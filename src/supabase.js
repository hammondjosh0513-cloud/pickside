import { createClient } from "@supabase/supabase-js"

const supabaseUrl =
  "https://vqfumfcmkemtykkcyvym.supabase.co"

const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZxZnVtZmNta2VtdHlra2N5dnltIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODUyNDAxODEsImV4cCI6MjEwMDgxNjE4MX0.EU8wlTOVmPdF1QCH128Vz_3Qb94jfzLm4TNA6LI-rWc"

export const supabase = createClient(
  supabaseUrl,
  supabaseKey
)
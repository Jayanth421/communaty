export type DocumentRecord = {
  id?: string
  title: string
  type: "course" | "certificate" | "resource" | "assignment" | "other"
  owner_id?: string
  owner_email?: string | null
  storage_path?: string
  public_url?: string
  status?: "draft" | "published" | "archived" | "review"
  metadata?: Record<string, unknown>
  created_at?: string
}

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
const DOCUMENTS_TABLE = process.env.NEXT_PUBLIC_SUPABASE_DOCUMENTS_TABLE ?? "documents"

function isSupabaseConfigured() {
  return Boolean(SUPABASE_URL && SUPABASE_ANON_KEY)
}

async function supabaseRequest<T>(path: string, init?: RequestInit): Promise<T> {
  if (!isSupabaseConfigured()) {
    throw new Error("Supabase is not configured. Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.")
  }

  const response = await fetch(`${SUPABASE_URL}${path}`, {
    ...init,
    headers: {
      apikey: SUPABASE_ANON_KEY!,
      Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
      "Content-Type": "application/json",
      Prefer: "return=representation",
      ...init?.headers,
    },
  })

  if (!response.ok) {
    const message = await response.text()
    throw new Error(message || "Supabase request failed.")
  }

  return response.json() as Promise<T>
}

export async function listDocuments(limit = 20) {
  if (!isSupabaseConfigured()) return []

  const params = new URLSearchParams({
    select: "*",
    order: "created_at.desc",
    limit: String(limit),
  })

  return supabaseRequest<DocumentRecord[]>(`/rest/v1/${DOCUMENTS_TABLE}?${params}`)
}

export async function createDocument(record: DocumentRecord) {
  return supabaseRequest<DocumentRecord[]>(`/rest/v1/${DOCUMENTS_TABLE}`, {
    method: "POST",
    body: JSON.stringify(record),
  })
}

export function getSupabaseStatus() {
  return {
    configured: isSupabaseConfigured(),
    table: DOCUMENTS_TABLE,
  }
}

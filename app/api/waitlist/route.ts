import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({} as any));
    const email: string | undefined = body?.email;
    if (!email || !/.+@.+\..+/.test(email)) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    const SUPABASE_URL = process.env.SUPABASE_URL;
    const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY;
    console.log("[waitlist] SUPABASE_URL:", SUPABASE_URL);
    console.log("[waitlist] HAS_KEY:", !!SUPABASE_ANON_KEY);
    if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
      return NextResponse.json({ error: "Server not configured (missing SUPABASE_* envs)" }, { status: 500 });
    }

    const ip = (req.headers.get("x-forwarded-for") || "").split(",")[0]?.trim() || null;
    const user_agent = req.headers.get("user-agent") || null;

    const url = `${SUPABASE_URL}/rest/v1/waitlist`;
    const sbRes = await fetch(url, {
      method: "POST",
      headers: {
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        "Content-Type": "application/json",
        Prefer: "return=representation",
      },
      body: JSON.stringify({ email, ip, user_agent }),
    });

    const text = await sbRes.text();
    console.log("[waitlist] Supabase status:", sbRes.status, "body:", text);

    if (!sbRes.ok) {
      let data: any = {};
      try { data = JSON.parse(text); } catch {}
      const msg = data?.message || data?.hint || text || "Supabase error";
      return NextResponse.json({ error: msg }, { status: sbRes.status });
    }

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("[waitlist] API crash:", e);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

 
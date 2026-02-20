import { NextRequest, NextResponse } from "next/server";

const API_KEY = process.env.ELEVENLABS_API_KEY || "";
const VOICE_ID = "pFZP5JQG7iQjIQuC4Bku"; // Lily

export async function GET(req: NextRequest) {
  const text = req.nextUrl.searchParams.get("text");
  if (!text) return NextResponse.json({ error: "text required" }, { status: 400 });
  if (text.length > 200) return NextResponse.json({ error: "too long" }, { status: 400 });

  const res = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}`, {
    method: "POST",
    headers: {
      "xi-api-key": API_KEY,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      text,
      model_id: "eleven_v3",
      voice_settings: { stability: 0.5, similarity_boost: 0.75 },
    }),
  });

  if (!res.ok) {
    return NextResponse.json({ error: "TTS failed" }, { status: 500 });
  }

  const audio = await res.arrayBuffer();
  return new NextResponse(audio, {
    headers: {
      "Content-Type": "audio/mpeg",
      "Cache-Control": "public, max-age=86400",
    },
  });
}

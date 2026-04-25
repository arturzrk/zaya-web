import { NextResponse } from "next/server";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ success: false, error: "Invalid request body" }, { status: 400 });
  }

  if (
    typeof body !== "object" ||
    body === null ||
    Array.isArray(body)
  ) {
    return NextResponse.json({ success: false, error: "Invalid request body" }, { status: 400 });
  }

  const { name, email, subject, message } = body as Record<string, unknown>;

  if (!name || typeof name !== "string" || name.trim() === "") {
    return NextResponse.json({ success: false, error: "Imię i nazwisko jest wymagane" }, { status: 422 });
  }
  if (!email || typeof email !== "string" || !EMAIL_RE.test(email.trim())) {
    return NextResponse.json({ success: false, error: "Podaj prawidłowy adres e-mail" }, { status: 422 });
  }
  if (!subject || typeof subject !== "string" || subject.trim() === "") {
    return NextResponse.json({ success: false, error: "Temat jest wymagany" }, { status: 422 });
  }
  if (!message || typeof message !== "string" || message.trim() === "") {
    return NextResponse.json({ success: false, error: "Wiadomość jest wymagana" }, { status: 422 });
  }

  return NextResponse.json({ success: true });
}

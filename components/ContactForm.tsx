"use client";

import { useState } from "react";

interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const EMPTY: FormState = { name: "", email: "", subject: "", message: "" };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(f: FormState): Partial<FormState> {
  const errors: Partial<FormState> = {};
  if (!f.name.trim()) errors.name = "Imię i nazwisko jest wymagane";
  if (!f.email.trim() || !EMAIL_RE.test(f.email)) errors.email = "Podaj prawidłowy adres e-mail";
  if (!f.subject.trim()) errors.subject = "Temat jest wymagany";
  if (!f.message.trim()) errors.message = "Wiadomość jest wymagana";
  return errors;
}

export function ContactForm() {
  const [form, setForm] = useState<FormState>(EMPTY);
  const [errors, setErrors] = useState<Partial<FormState>>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [serverError, setServerError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormState]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const fieldErrors = validate(form);
    if (Object.keys(fieldErrors).length > 0) {
      setErrors(fieldErrors);
      return;
    }

    setStatus("submitting");
    setServerError("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = (await res.json()) as { success: boolean; error?: string };
      if (data.success) {
        setStatus("success");
        setForm(EMPTY);
      } else {
        setStatus("error");
        setServerError(data.error ?? "Wystąpił błąd. Spróbuj ponownie.");
      }
    } catch {
      setStatus("error");
      setServerError("Błąd połączenia. Spróbuj ponownie.");
    }
  };

  if (status === "success") {
    return (
      <div role="status" className="rounded-lg border border-green-200 bg-green-50 px-6 py-8 text-center">
        <p className="text-green-800 font-medium text-lg">Dziękujemy za wiadomość!</p>
        <p className="text-green-700 text-sm mt-1">Odezwiemy się wkrótce.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-stone-700 mb-1">
          Imię i nazwisko
        </label>
        <input
          id="name"
          name="name"
          type="text"
          value={form.name}
          onChange={handleChange}
          aria-describedby={errors.name ? "name-error" : undefined}
          className="w-full rounded border border-stone-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-forest focus:border-forest"
        />
        {errors.name && (
          <p id="name-error" role="alert" className="mt-1 text-xs text-red-600">
            {errors.name}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-stone-700 mb-1">
          Adres e-mail
        </label>
        <input
          id="email"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          aria-describedby={errors.email ? "email-error" : undefined}
          className="w-full rounded border border-stone-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-forest focus:border-forest"
        />
        {errors.email && (
          <p id="email-error" role="alert" className="mt-1 text-xs text-red-600">
            {errors.email}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="subject" className="block text-sm font-medium text-stone-700 mb-1">
          Temat
        </label>
        <input
          id="subject"
          name="subject"
          type="text"
          value={form.subject}
          onChange={handleChange}
          aria-describedby={errors.subject ? "subject-error" : undefined}
          className="w-full rounded border border-stone-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-forest focus:border-forest"
        />
        {errors.subject && (
          <p id="subject-error" role="alert" className="mt-1 text-xs text-red-600">
            {errors.subject}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-stone-700 mb-1">
          Wiadomość
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          value={form.message}
          onChange={handleChange}
          aria-describedby={errors.message ? "message-error" : undefined}
          className="w-full rounded border border-stone-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-forest focus:border-forest resize-none"
        />
        {errors.message && (
          <p id="message-error" role="alert" className="mt-1 text-xs text-red-600">
            {errors.message}
          </p>
        )}
      </div>

      {status === "error" && (
        <p role="alert" className="text-sm text-red-600">
          {serverError}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="w-full rounded bg-forest px-4 py-2 text-sm font-medium text-white hover:bg-forest-light disabled:opacity-50 transition-colors"
      >
        {status === "submitting" ? "Wysyłanie…" : "Wyślij wiadomość"}
      </button>
    </form>
  );
}

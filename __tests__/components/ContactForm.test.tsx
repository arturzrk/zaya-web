import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { ContactForm } from "@/components/ContactForm";

describe("ContactForm", () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("test_contact_form_renders_all_fields", () => {
    render(<ContactForm />);
    expect(screen.getByLabelText(/imię i nazwisko/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/adres e-mail/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/temat/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/wiadomość/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /wyślij/i })).toBeInTheDocument();
  });

  it("test_contact_form_no_captcha", () => {
    render(<ContactForm />);
    expect(screen.queryByText(/captcha/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/recaptcha/i)).not.toBeInTheDocument();
  });

  it("test_contact_form_shows_validation_errors_on_empty_submit", async () => {
    render(<ContactForm />);
    fireEvent.click(screen.getByRole("button", { name: /wyślij/i }));
    expect(await screen.findAllByRole("alert")).toHaveLength(4);
    expect(fetch).not.toHaveBeenCalled();
  });

  it("test_contact_form_shows_email_error_for_invalid_email", async () => {
    render(<ContactForm />);
    fireEvent.change(screen.getByLabelText(/adres e-mail/i), {
      target: { value: "not-an-email" },
    });
    fireEvent.click(screen.getByRole("button", { name: /wyślij/i }));
    expect(await screen.findByText(/prawidłowy adres e-mail/i)).toBeInTheDocument();
  });

  it("test_contact_form_shows_success_on_200", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      json: async () => ({ success: true }),
    });

    render(<ContactForm />);
    fireEvent.change(screen.getByLabelText(/imię i nazwisko/i), { target: { value: "Jan Kowalski" } });
    fireEvent.change(screen.getByLabelText(/adres e-mail/i), { target: { value: "jan@example.com" } });
    fireEvent.change(screen.getByLabelText(/temat/i), { target: { value: "Zapytanie" } });
    fireEvent.change(screen.getByLabelText(/wiadomość/i), { target: { value: "Treść wiadomości" } });
    fireEvent.click(screen.getByRole("button", { name: /wyślij/i }));

    expect(await screen.findByRole("status")).toBeInTheDocument();
    expect(screen.getByText(/dziękujemy/i)).toBeInTheDocument();
  });

  it("test_contact_form_shows_error_and_preserves_input_on_failure", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      json: async () => ({ success: false, error: "Błąd serwera" }),
    });

    render(<ContactForm />);
    fireEvent.change(screen.getByLabelText(/imię i nazwisko/i), { target: { value: "Jan Kowalski" } });
    fireEvent.change(screen.getByLabelText(/adres e-mail/i), { target: { value: "jan@example.com" } });
    fireEvent.change(screen.getByLabelText(/temat/i), { target: { value: "Zapytanie" } });
    fireEvent.change(screen.getByLabelText(/wiadomość/i), { target: { value: "Treść wiadomości" } });
    fireEvent.click(screen.getByRole("button", { name: /wyślij/i }));

    await waitFor(() => expect(screen.getByText("Błąd serwera")).toBeInTheDocument());
    expect(screen.getByLabelText(/imię i nazwisko/i)).toHaveValue("Jan Kowalski");
  });
});

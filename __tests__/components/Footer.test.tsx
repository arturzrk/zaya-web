import { render, screen } from "@testing-library/react";
import { Footer } from "@/components/Footer";

jest.mock("next/link", () => {
  const MockLink = ({ href, children, ...props }: { href: string; children: React.ReactNode; [key: string]: unknown }) => (
    <a href={href} {...props}>
      {children}
    </a>
  );
  MockLink.displayName = "Link";
  return MockLink;
});

describe("Footer", () => {
  it("test_footer_renders_social_links", () => {
    render(<Footer />);
    expect(screen.getByRole("link", { name: /facebook/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /instagram/i })).toBeInTheDocument();
  });

  it("test_footer_renders_policy_links", () => {
    render(<Footer />);
    expect(screen.getByRole("link", { name: /cookie policy/i })).toHaveAttribute("href", "/policy/cookies");
    expect(screen.getByRole("link", { name: /privacy policy/i })).toHaveAttribute("href", "/policy/privacy");
  });

  it("test_footer_renders_contact_details", () => {
    render(<Footer />);
    expect(screen.getByRole("link", { name: /512 722 365/i })).toBeInTheDocument();
    expect(screen.getByText(/Cynamonowa/i)).toBeInTheDocument();
  });
});

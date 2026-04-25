import { render, screen, fireEvent } from "@testing-library/react";
import { Header } from "@/components/Header";

jest.mock("next/navigation", () => ({
  usePathname: () => "/",
}));

jest.mock("next/link", () => {
  const MockLink = ({ href, children, ...props }: { href: string; children: React.ReactNode; [key: string]: unknown }) => (
    <a href={href} {...props}>
      {children}
    </a>
  );
  MockLink.displayName = "Link";
  return MockLink;
});

describe("Header", () => {
  it("test_header_renders_all_nav_links", () => {
    render(<Header />);
    expect(screen.getAllByRole("link", { name: "Home" })).not.toHaveLength(0);
    expect(screen.getAllByRole("link", { name: "Portfolio" })).not.toHaveLength(0);
    expect(screen.getAllByRole("link", { name: "Contact" })).not.toHaveLength(0);
    expect(screen.getAllByRole("link", { name: "About" })).not.toHaveLength(0);
  });

  it("test_header_mobile_menu_toggles_on_click", () => {
    render(<Header />);
    const button = screen.getByRole("button", { name: /toggle navigation menu/i });
    expect(button).toHaveAttribute("aria-expanded", "false");
    fireEvent.click(button);
    expect(button).toHaveAttribute("aria-expanded", "true");
    fireEvent.click(button);
    expect(button).toHaveAttribute("aria-expanded", "false");
  });

  it("test_header_active_link_is_highlighted", () => {
    render(<Header />);
    const homeLinks = screen.getAllByRole("link", { name: "Home" });
    const desktopHomeLink = homeLinks[0];
    expect(desktopHomeLink.className).toContain("font-semibold");
  });
});

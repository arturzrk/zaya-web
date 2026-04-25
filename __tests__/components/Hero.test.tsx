import { render, screen } from "@testing-library/react";
import { Hero } from "@/components/Hero";

jest.mock("next/image", () => {
  const MockImage = ({ src, alt, ...props }: { src: string; alt: string; [key: string]: unknown }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} {...props} />
  );
  MockImage.displayName = "Image";
  return MockImage;
});

jest.mock("next/link", () => {
  const MockLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
    <a href={href}>{children}</a>
  );
  MockLink.displayName = "Link";
  return MockLink;
});

describe("Hero", () => {
  it("test_hero_renders_image_and_cta", () => {
    render(<Hero />);
    expect(screen.getByAltText(/zaya design/i)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /nasze projekty/i })).toBeInTheDocument();
  });

  it("test_hero_cta_links_to_portfolio", () => {
    render(<Hero />);
    expect(screen.getByRole("link", { name: /nasze projekty/i })).toHaveAttribute("href", "/portfolio");
  });
});

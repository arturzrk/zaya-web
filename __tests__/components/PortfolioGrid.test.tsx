import { render, screen } from "@testing-library/react";
import { PortfolioGrid } from "@/components/PortfolioGrid";
import type { Project } from "@/lib/types";

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

const mockProjects: Project[] = [
  {
    slug: "test-project-1",
    title: "Test Project One",
    description: "First test project",
    coverImage: "/images/test1.jpg",
    images: ["/images/test1.jpg"],
  },
  {
    slug: "test-project-2",
    title: "Test Project Two",
    description: "Second test project",
    coverImage: "/images/test2.jpg",
    images: ["/images/test2.jpg"],
  },
];

describe("PortfolioGrid", () => {
  it("test_portfolio_grid_renders_all_projects", () => {
    render(<PortfolioGrid projects={mockProjects} />);
    expect(screen.getByAltText("Test Project One")).toBeInTheDocument();
    expect(screen.getByAltText("Test Project Two")).toBeInTheDocument();
  });

  it("test_portfolio_grid_tile_links_to_detail", () => {
    render(<PortfolioGrid projects={mockProjects} />);
    const links = screen.getAllByRole("link");
    expect(links[0]).toHaveAttribute("href", "/portfolio/test-project-1");
    expect(links[1]).toHaveAttribute("href", "/portfolio/test-project-2");
  });

  it("test_portfolio_grid_shows_project_titles", () => {
    render(<PortfolioGrid projects={mockProjects} />);
    expect(screen.getByText("Test Project One")).toBeInTheDocument();
    expect(screen.getByText("Test Project Two")).toBeInTheDocument();
  });
});

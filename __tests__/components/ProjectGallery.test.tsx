import { render, screen, fireEvent } from "@testing-library/react";
import { ProjectGallery } from "@/components/ProjectGallery";
import type { Project } from "@/lib/types";

jest.mock("next/image", () => {
  const MockImage = ({ src, alt, ...props }: { src: string; alt: string; [key: string]: unknown }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} {...props} />
  );
  MockImage.displayName = "Image";
  return MockImage;
});

const mockProject: Project = {
  slug: "test-project",
  title: "Test Project",
  description: "A test garden project",
  coverImage: "/images/test/t1.jpg",
  images: ["/images/test/t1.jpg", "/images/test/t2.jpg", "/images/test/t3.jpg"],
};

describe("ProjectGallery", () => {
  it("test_gallery_renders_description", () => {
    render(<ProjectGallery project={mockProject} />);
    expect(screen.getByText("A test garden project")).toBeInTheDocument();
  });

  it("test_gallery_renders_all_thumbnails", () => {
    render(<ProjectGallery project={mockProject} />);
    const buttons = screen.getAllByRole("button");
    expect(buttons).toHaveLength(3);
  });

  it("test_gallery_opens_lightbox_on_click", () => {
    render(<ProjectGallery project={mockProject} />);
    const thumbnails = screen.getAllByRole("button");
    fireEvent.click(thumbnails[0]);
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  it("test_gallery_lightbox_shows_counter", () => {
    render(<ProjectGallery project={mockProject} />);
    const thumbnails = screen.getAllByRole("button");
    fireEvent.click(thumbnails[0]);
    expect(screen.getByText("1 / 3")).toBeInTheDocument();
  });

  it("test_gallery_lightbox_closes", () => {
    render(<ProjectGallery project={mockProject} />);
    const thumbnails = screen.getAllByRole("button");
    fireEvent.click(thumbnails[0]);
    const closeButton = screen.getByLabelText("Close lightbox");
    fireEvent.click(closeButton);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });
});

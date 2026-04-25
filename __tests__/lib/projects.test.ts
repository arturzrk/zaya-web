import { projects } from "@/lib/projects";

describe("projects data", () => {
  it("test_projects_data_all_have_required_fields", () => {
    for (const project of projects) {
      expect(project.slug).toBeTruthy();
      expect(project.title).toBeTruthy();
      expect(project.description).toBeTruthy();
      expect(project.coverImage).toBeTruthy();
      expect(project.images.length).toBeGreaterThan(0);
    }
  });

  it("test_projects_data_slugs_are_unique", () => {
    const slugs = projects.map((p) => p.slug);
    const unique = new Set(slugs);
    expect(unique.size).toBe(slugs.length);
  });

  it("test_projects_data_cover_image_in_images", () => {
    for (const project of projects) {
      expect(project.images).toContain(project.coverImage);
    }
  });
});

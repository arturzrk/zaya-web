import { policies } from "@/lib/policies";

describe("policies data", () => {
  it("test_policies_has_cookies_and_privacy", () => {
    const slugs = policies.map((p) => p.slug);
    expect(slugs).toContain("cookies");
    expect(slugs).toContain("privacy");
  });

  it("test_policies_all_have_required_fields", () => {
    for (const policy of policies) {
      expect(policy.slug).toBeTruthy();
      expect(policy.title).toBeTruthy();
      expect(policy.content.length).toBeGreaterThan(50);
    }
  });

  it("test_policies_slugs_are_unique", () => {
    const slugs = policies.map((p) => p.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });
});

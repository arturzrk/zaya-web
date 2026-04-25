# Test Plan — 001-angular-to-nextjs-migration

**Feature**: Migration of Legacy Angular Site to Next.js
**Date**: 2026-04-25

---

## Unit Tests

### WP01 — Shared Layout

| Test | Component | Spec Ref |
|---|---|---|
| test_header_renders_all_nav_links | Header | FR-01 |
| test_header_mobile_menu_toggles_on_click | Header | FR-03 |
| test_header_active_link_is_highlighted | Header | FR-01 |
| test_footer_renders_social_links | Footer | FR-02 |
| test_footer_renders_policy_links | Footer | FR-02 |
| test_footer_renders_contact_details | Footer | FR-02 |

### WP02 — Home Page

| Test | Component | Spec Ref |
|---|---|---|
| test_hero_renders_image_and_cta | Hero | FR-05 |
| test_hero_cta_links_to_portfolio | Hero | FR-05 |
| test_services_renders_three_columns | Services | FR-08 |
| test_services_renders_all_service_titles | Services | FR-08 |
| test_process_steps_renders_six_steps | ProcessSteps | FR-07 |
| test_process_steps_numbered_correctly | ProcessSteps | FR-07 |

### WP03 — Portfolio

| Test | Component | Spec Ref |
|---|---|---|
| test_portfolio_grid_renders_all_projects | PortfolioGrid | FR-09 |
| test_portfolio_grid_tile_links_to_detail | PortfolioGrid | FR-10 |
| test_project_gallery_renders_all_images | ProjectGallery | FR-11 |
| test_project_gallery_displays_description | ProjectGallery | FR-11 |
| test_projects_data_all_have_required_fields | lib/projects | FR-12 |

### WP04 — Contact

| Test | Component | Spec Ref |
|---|---|---|
| test_contact_form_renders_all_fields | ContactForm | FR-13 |
| test_contact_form_shows_error_when_name_empty | ContactForm | FR-14 |
| test_contact_form_shows_error_on_invalid_email | ContactForm | FR-14 |
| test_contact_form_shows_success_on_200_response | ContactForm | FR-15 |
| test_contact_form_shows_error_on_failure_preserves_input | ContactForm | FR-16 |
| test_contact_form_has_no_captcha | ContactForm | FR-17 |
| test_api_contact_returns_success_for_valid_payload | app/api/contact | FR-18 |
| test_api_contact_returns_error_for_missing_fields | app/api/contact | FR-18 |

### WP05 — Static Pages

| Test | Component | Spec Ref |
|---|---|---|
| test_about_page_renders_content | app/about | FR-20 |
| test_policy_page_renders_cookies_content | app/policy/[slug] | FR-21 |
| test_policy_page_renders_privacy_content | app/policy/[slug] | FR-21 |
| test_policy_page_returns_not_found_for_unknown_slug | app/policy/[slug] | FR-21 |
| test_not_found_page_renders_home_link | app/not-found | FR-22 |

### WP06 — SEO & Polish

| Test | File | Spec Ref |
|---|---|---|
| test_home_page_has_title_metadata | app/page | FR-23 |
| test_portfolio_page_has_title_metadata | app/portfolio/page | FR-23 |
| test_contact_page_has_title_metadata | app/contact/page | FR-23 |
| test_about_page_has_title_metadata | app/about/page | FR-23 |

---

## Integration Tests

| Test | Scope | Spec Ref |
|---|---|---|
| test_layout_wraps_every_page_with_header_and_footer | Layout + all pages | FR-01, FR-02 |
| test_portfolio_detail_generates_static_params_from_projects | lib/projects + page | FR-10, SC-01 |
| test_policy_generates_static_params_from_policies | lib/policies + page | FR-21, SC-01 |
| test_contact_form_submits_to_api_route | ContactForm + /api/contact | FR-18 |

---

## Acceptance Tests (E2E — Playwright)

| Test | User Scenario | Spec Ref |
|---|---|---|
| test_home_page_loads_and_all_sections_visible | US-01 | SC-01, FR-05–08 |
| test_home_page_mobile_viewport_no_horizontal_scroll | US-01 | SC-05 |
| test_portfolio_grid_displays_projects | US-02 | SC-01, FR-09 |
| test_portfolio_detail_loads_on_click | US-02 | SC-04, FR-11 |
| test_contact_form_submit_shows_confirmation | US-03 | SC-03, FR-15 |
| test_about_page_loads_with_content | US-04 | SC-01, FR-20 |
| test_404_page_shows_on_unknown_url | US-05 | SC-01, FR-22 |
| test_policy_cookies_page_loads | US-06 | SC-01, FR-21 |
| test_policy_privacy_page_loads | US-06 | SC-01, FR-21 |
| test_header_navigation_links_work | US-01 | FR-01 |

---

## Edge Cases

| Test | Scenario | Spec Ref |
|---|---|---|
| test_portfolio_unknown_slug_returns_not_found | /portfolio/nonexistent | FR-10 |
| test_policy_unknown_slug_returns_not_found | /policy/nonexistent | FR-21 |
| test_contact_form_preserves_input_on_api_failure | network error during submit | FR-16 |
| test_images_all_use_next_image_component | audit all tsx files | FR-24, Constraints |
| test_no_default_exports_in_codebase | constitution rule | Constraints |

# Data Model — 001-angular-to-nextjs-migration

All data is static TypeScript (no database). Types live in `lib/types.ts`.

## Project (portfolio item)

```typescript
interface Project {
  slug: string;           // URL-safe identifier, e.g. "magda-ogrod"
  title: string;          // Display name
  description: string;    // Short project description
  coverImage: string;     // Path to cover image, e.g. "/images/portfolio/magda-ogrod/cover.jpg"
  images: string[];       // Ordered list of gallery image paths
  year?: number;          // Optional completion year
}
```

## Service

```typescript
interface Service {
  id: string;             // "garden-design" | "interior-design" | "execution"
  title: string;
  description: string;
  icon?: string;          // Optional icon identifier
}
```

## ContactSubmission (form payload, not persisted)

```typescript
interface ContactSubmission {
  name: string;
  email: string;
  subject: string;
  message: string;
}
```

## PolicyPage

```typescript
interface PolicyPage {
  slug: string;           // "cookies" | "privacy"
  title: string;
  content: string;        // Markdown or HTML string
}
```

## ProcessStep

```typescript
interface ProcessStep {
  step: number;           // 1–6
  title: string;
  description: string;
}
```

## Static data files

| File | Exports | Content |
|---|---|---|
| `lib/projects.ts` | `projects: Project[]` | All portfolio projects |
| `lib/policies.ts` | `policies: PolicyPage[]` | Cookie and privacy policies |
| `lib/services.ts` | `services: Service[]` | Three service definitions |
| `lib/process.ts` | `processSteps: ProcessStep[]` | Six project process steps |
| `lib/types.ts` | All interfaces above | Type definitions only |

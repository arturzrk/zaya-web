export interface Project {
  slug: string;
  title: string;
  description: string;
  coverImage: string;
  images: string[];
  year?: number;
}

export interface Service {
  id: string;
  title: string;
  description: string;
}

export interface ContactSubmission {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface PolicyPage {
  slug: string;
  title: string;
  content: string;
}

export interface ProcessStep {
  step: number;
  title: string;
  description: string;
}

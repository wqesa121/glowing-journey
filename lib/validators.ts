import { z } from 'zod';

export const articleSchema = z.object({
  title: z.string().min(3, 'Title is required'),
  slug: z.string().min(3, 'Slug is required'),
  metaTitle: z.string().min(10, 'Meta title is required'),
  metaDescription: z.string().min(100, 'Meta description is required').max(160),
  content: z.string().min(20, 'Content is required'),
  excerpt: z.string().max(240).optional().or(z.string().min(30)),
  tags: z.array(z.string().min(1)).optional(),
  featuredImage: z.string().url().optional(),
  additionalImages: z.array(z.string().url()).optional(),
  status: z.enum(['draft', 'published'])
});

export const aiGenerationSchema = z.object({
  topic: z.string().min(5, 'Topic is required'),
  keywords: z.string().optional(),
  length: z.string().min(1),
  tone: z.string().min(3),
  audience: z.string().optional()
});

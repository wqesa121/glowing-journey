import mongoose, { Schema, models, model } from 'mongoose';

export type ArticleDocument = {
  title: string;
  slug: string;
  metaTitle: string;
  metaDescription: string;
  content: string;
  excerpt: string;
  tags: string[];
  featuredImage?: string;
  additionalImages: string[];
  author: {
    id: mongoose.Types.ObjectId;
    name: string;
    email: string;
  };
  status: 'draft' | 'published';
  publishedAt?: Date;
  seoScore?: number;
  createdAt: Date;
  updatedAt: Date;
};

const ArticleSchema = new Schema<ArticleDocument>(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, trim: true, unique: true, index: true },
    metaTitle: { type: String, required: true, trim: true },
    metaDescription: { type: String, required: true, trim: true },
    content: { type: String, required: true },
    excerpt: { type: String, trim: true },
    tags: { type: [String], default: [] },
    featuredImage: { type: String, trim: true },
    additionalImages: { type: [String], default: [] },
    author: {
      id: { type: Schema.Types.ObjectId, required: true, ref: 'users' },
      name: { type: String, required: true },
      email: { type: String, required: true }
    },
    status: {
      type: String,
      required: true,
      enum: ['draft', 'published'],
      default: 'draft'
    },
    publishedAt: { type: Date },
    seoScore: { type: Number, default: 0 }
  },
  {
    timestamps: true
  }
);

ArticleSchema.index({ status: 1, createdAt: -1 });
ArticleSchema.index({ status: 1, updatedAt: -1 });
ArticleSchema.index({ status: 1, tags: 1 });
ArticleSchema.index({ status: 1, 'author.id': 1 });
ArticleSchema.index({ status: 1, publishedAt: -1 });

// Text index for full-text search
ArticleSchema.index({
  title: 'text',
  metaTitle: 'text',
  metaDescription: 'text',
  excerpt: 'text',
  content: 'text',
  tags: 'text'
}, { 
  weights: {
    title: 10,
    metaTitle: 8,
    metaDescription: 6,
    excerpt: 5,
    tags: 4,
    content: 1
  },
  default_language: 'russian'
});

const Article = models.Article || model<ArticleDocument>('Article', ArticleSchema);
export default Article;

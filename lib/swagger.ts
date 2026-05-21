/**
 * OpenAPI/Swagger specification for NeuraCMS API
 */

export const swaggerSpec = {
  openapi: '3.0.0',
  info: {
    title: 'NeuraCMS API Documentation',
    description: 'Modern Headless CMS with AI Support. RESTful API for managing articles, users, and content generation.',
    version: '1.0.0',
    contact: {
      name: 'NeuraCMS Support',
      url: 'https://github.com/yourusername/neuracms'
    },
    license: {
      name: 'MIT'
    }
  },
  servers: [
    {
      url: 'http://localhost:3000',
      description: 'Development server'
    },
    {
      url: 'https://yourdomain.com',
      description: 'Production server'
    }
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT'
      }
    },
    schemas: {
      Article: {
        type: 'object',
        properties: {
          _id: { type: 'string', example: '507f1f77bcf86cd799439011' },
          title: { type: 'string', example: 'How to Build a CMS' },
          slug: { type: 'string', example: 'how-to-build-a-cms' },
          metaTitle: { type: 'string', example: 'Building CMS with Next.js' },
          metaDescription: { type: 'string', example: 'Learn how to build a modern headless CMS using Next.js and MongoDB' },
          content: { type: 'string', example: '# Heading\n\nContent in markdown format...' },
          excerpt: { type: 'string', example: 'A brief summary of the article' },
          tags: { type: 'array', items: { type: 'string' }, example: ['cms', 'nextjs', 'tutorial'] },
          featuredImage: { type: 'string', format: 'uri', example: 'https://example.com/image.jpg' },
          additionalImages: { type: 'array', items: { type: 'string', format: 'uri' } },
          status: { type: 'string', enum: ['draft', 'published'], example: 'published' },
          author: {
            type: 'object',
            properties: {
              id: { type: 'string' },
              name: { type: 'string' },
              email: { type: 'string', format: 'email' }
            }
          },
          createdAt: { type: 'string', format: 'date-time' },
          updatedAt: { type: 'string', format: 'date-time' },
          publishedAt: { type: 'string', format: 'date-time' },
          seoScore: { type: 'number', example: 85 }
        }
      },
      PaginatedResponse: {
        type: 'object',
        properties: {
          data: { type: 'array' },
          meta: {
            type: 'object',
            properties: {
              page: { type: 'number', example: 1 },
              pageSize: { type: 'number', example: 10 },
              total: { type: 'number', example: 42 },
              totalPages: { type: 'number', example: 5 }
            }
          }
        }
      },
      Error: {
        type: 'object',
        properties: {
          error: {
            type: 'object',
            properties: {
              message: { type: 'string' },
              code: { type: 'string' }
            }
          }
        }
      }
    }
  },
  paths: {
    '/api/posts': {
      get: {
        tags: ['Posts'],
        summary: 'Get published articles',
        description: 'Retrieve a paginated list of published articles with optional search and filtering',
        parameters: [
          {
            name: 'page',
            in: 'query',
            schema: { type: 'number', default: 1 },
            description: 'Page number for pagination'
          },
          {
            name: 'pageSize',
            in: 'query',
            schema: { type: 'number', default: 10, maximum: 50 },
            description: 'Number of articles per page (max 50)'
          },
          {
            name: 'search',
            in: 'query',
            schema: { type: 'string' },
            description: 'Search query (full-text search across title, tags, description)'
          },
          {
            name: 'tag',
            in: 'query',
            schema: { type: 'string' },
            description: 'Filter articles by tag'
          }
        ],
        responses: {
          '200': {
            description: 'Successfully retrieved articles',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/PaginatedResponse' }
              }
            }
          },
          '429': {
            description: 'Rate limit exceeded (100 requests per minute)'
          }
        }
      }
    },
    '/api/posts/{slug}': {
      get: {
        tags: ['Posts'],
        summary: 'Get article by slug',
        description: 'Retrieve a single published article by its URL slug',
        parameters: [
          {
            name: 'slug',
            in: 'path',
            required: true,
            schema: { type: 'string' },
            description: 'Article URL slug (e.g., "how-to-build-a-cms")'
          }
        ],
        responses: {
          '200': {
            description: 'Article found',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Article' }
              }
            }
          },
          '404': {
            description: 'Article not found'
          },
          '429': {
            description: 'Rate limit exceeded (200 requests per minute)'
          }
        }
      }
    },
    '/api/search': {
      get: {
        tags: ['Search'],
        summary: 'Search articles',
        description: 'Perform full-text search across all published articles with real-time results',
        parameters: [
          {
            name: 'q',
            in: 'query',
            required: true,
            schema: { type: 'string', minLength: 2 },
            description: 'Search query (minimum 2 characters)'
          }
        ],
        responses: {
          '200': {
            description: 'Search results',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    results: {
                      type: 'array',
                      items: {
                        type: 'object',
                        properties: {
                          slug: { type: 'string' },
                          title: { type: 'string' },
                          excerpt: { type: 'string' },
                          tags: { type: 'array', items: { type: 'string' } },
                          authorName: { type: 'string' }
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          '429': {
            description: 'Rate limit exceeded (30 requests per minute)'
          }
        }
      }
    },
    '/api/admin/ai/generate': {
      post: {
        tags: ['AI Generation'],
        summary: 'Generate article with AI',
        description: 'Generate SEO-optimized article draft using Ollama AI. Requires admin authentication.',
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['topic', 'length', 'tone'],
                properties: {
                  topic: {
                    type: 'string',
                    minLength: 5,
                    example: 'How to optimize database queries',
                    description: 'Article topic/theme'
                  },
                  keywords: {
                    type: 'string',
                    example: 'database, optimization, performance, queries',
                    description: 'Comma-separated keywords (optional)'
                  },
                  length: {
                    type: 'string',
                    enum: ['short', 'medium', 'long'],
                    example: 'medium',
                    description: 'Desired article length'
                  },
                  tone: {
                    type: 'string',
                    enum: ['professional', 'casual', 'academic', 'friendly'],
                    example: 'professional',
                    description: 'Writing tone'
                  },
                  audience: {
                    type: 'string',
                    example: 'Developers',
                    description: 'Target audience (optional)'
                  }
                }
              }
            }
          }
        },
        responses: {
          '200': {
            description: 'Article generated successfully',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    title: { type: 'string' },
                    metaTitle: { type: 'string' },
                    metaDescription: { type: 'string' },
                    slug: { type: 'string' },
                    excerpt: { type: 'string' },
                    content: { type: 'string' },
                    tags: { type: 'array', items: { type: 'string' } },
                    images: { type: 'array', items: { type: 'object' } }
                  }
                }
              }
            }
          },
          '401': {
            description: 'Authentication required'
          },
          '429': {
            description: 'Rate limit exceeded (5 requests per hour)'
          }
        }
      }
    },
    '/api/auth/register': {
      post: {
        tags: ['Authentication'],
        summary: 'Register new user',
        description: 'Create a new user account with email and password',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['email', 'password', 'name'],
                properties: {
                  email: {
                    type: 'string',
                    format: 'email',
                    example: 'user@example.com'
                  },
                  password: {
                    type: 'string',
                    minLength: 6,
                    example: 'securePassword123'
                  },
                  name: {
                    type: 'string',
                    example: 'John Doe'
                  }
                }
              }
            }
          }
        },
        responses: {
          '201': {
            description: 'User registered successfully'
          },
          '400': {
            description: 'Invalid input or user already exists'
          }
        }
      }
    },
    '/api/admin/users': {
      get: {
        tags: ['Admin - Users'],
        summary: 'Get all users',
        description: 'List all users in the system (admin only)',
        security: [{ bearerAuth: [] }],
        responses: {
          '200': {
            description: 'Users list',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      _id: { type: 'string' },
                      email: { type: 'string' },
                      name: { type: 'string' },
                      role: { type: 'string', enum: ['admin', 'user'] },
                      createdAt: { type: 'string', format: 'date-time' }
                    }
                  }
                }
              }
            }
          },
          '403': {
            description: 'Admin access required'
          }
        }
      }
    }
  }
};

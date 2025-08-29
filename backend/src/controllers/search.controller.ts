import { Request, Response } from 'express';
import { catchAsync } from '../utils/catchAsync';
import prisma from '../lib/prisma';
import { ApiError } from '../utils/api-error-class';

export const handleUnifiedSearch = catchAsync(
  async (req: Request, res: Response): Promise<any> => {
    const query = (req.query.q as string) || "";
    
    if (!query.trim()) {
      throw new ApiError(400, "Search query is required");
    }

    const searchTerm = query.trim();

    // Search across multiple resources in parallel
    const [articles, documents, discussions, users] = await Promise.all([
      // Search articles
      prisma.article.findMany({
        where: {
          OR: [
            { title: { contains: searchTerm, mode: 'insensitive' } },
            { description: { contains: searchTerm, mode: 'insensitive' } },
            { category: { contains: searchTerm, mode: 'insensitive' } },
          ],
        },
        take: 5, // Limit results for each category
      }),

      // Search documents
      prisma.document.findMany({
        where: {
          OR: [
            { title: { contains: searchTerm, mode: 'insensitive' } },
            { description: { contains: searchTerm, mode: 'insensitive' } },
            { category: { contains: searchTerm, mode: 'insensitive' } },
          ],
        },
        take: 5,
      }),

      // Search discussions
      prisma.discussion.findMany({
        where: {
          OR: [
            { title: { contains: searchTerm, mode: 'insensitive' } },
            { description: { contains: searchTerm, mode: 'insensitive' } },
            { category: { contains: searchTerm, mode: 'insensitive' } },
          ],
        },
        take: 5,
      }),

      // Search users
      prisma.user.findMany({
        where: {
          OR: [
            { firstName: { contains: searchTerm, mode: 'insensitive' } },
            { lastName: { contains: searchTerm, mode: 'insensitive' } },
            { email: { contains: searchTerm, mode: 'insensitive' } },
          ],
        },
        take: 5,
        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
          role: true,
        },
      }),
    ]);

    // Format the results with type information
    interface FormattedResult {
      id: string;
      type: 'article' | 'document' | 'discussion' | 'user';
      title?: string;
      name?: string;
      [key: string]: any;
    }

    const formattedResults: FormattedResult[] = [
      ...articles.map(article => ({
        ...article,
        type: 'article' as const,
      })),
      ...documents.map(document => ({
        ...document,
        type: 'document' as const,
      })),
      ...discussions.map(discussion => ({
        ...discussion,
        type: 'discussion' as const,
      })),
      ...users.map(user => ({
        ...user,
        type: 'user' as const,
        name: `${user.firstName} ${user.lastName}`,
      })),
    ];

    // Sort by relevance (you could implement more sophisticated ranking here)
    const sortedResults = formattedResults.sort((a, b) => {
      // Simple relevance sorting - could be improved
      const aTitle = (a.title || a.name || '').toLowerCase();
      const bTitle = (b.title || b.name || '').toLowerCase();
      return aTitle.localeCompare(bTitle);
    });

    res.status(200).json({
      totalResults: sortedResults.length,
      results: sortedResults,
      breakdown: {
        articles: articles.length,
        documents: documents.length,
        discussions: discussions.length,
        users: users.length,
      },
    });
  }
);

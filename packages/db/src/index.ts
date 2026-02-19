export { db } from './client';
export * from './schema';

// Re-export commonly used drizzle-orm operators so consuming packages
// don't need to add drizzle-orm as a direct dependency.
export { eq, and, or, ne, gt, gte, lt, lte, desc, asc, isNull, isNotNull, inArray, notInArray, sql } from 'drizzle-orm';

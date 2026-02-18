import { pgTable, text, timestamp, integer, boolean, jsonb } from 'drizzle-orm/pg-core';
import { randomUUID } from 'crypto';

export const users = pgTable('users', {
  id: text('id').$defaultFn(() => randomUUID()).primaryKey(),
  email: text('email').notNull().unique(),
  passwordHash: text('password_hash').notNull(),
  name: text('name'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const subscriptions = pgTable('subscriptions', {
  id: text('id').$defaultFn(() => randomUUID()).primaryKey(),
  userId: text('user_id').references(() => users.id).notNull(),
  tier: text('tier').notNull(), // 'free' | 'pro'
  stripeCustomerId: text('stripe_customer_id'),
  stripeSubscriptionId: text('stripe_subscription_id'),
  status: text('status').notNull(), // 'active' | 'canceled' | 'past_due'
  currentPeriodEnd: timestamp('current_period_end'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const projects = pgTable('projects', {
  id: text('id').$defaultFn(() => randomUUID()).primaryKey(),
  userId: text('user_id').references(() => users.id).notNull(),
  name: text('name').notNull(),
  stitchProjectId: text('stitch_project_id'),
  stitchDesignId: text('stitch_design_id'),
  generatedCode: jsonb('generated_code'), // { files: { path: content } }
  status: text('status').notNull(), // 'generating' | 'complete' | 'failed'
  deviceType: text('device_type'), // 'mobile' | 'desktop' | 'tablet'
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const templates = pgTable('templates', {
  id: text('id').$defaultFn(() => randomUUID()).primaryKey(),
  name: text('name').notNull(),
  description: text('description'),
  category: text('category').notNull(), // 'saas' | 'portfolio' | 'ecommerce' | 'blog'
  stitchProjectId: text('stitch_project_id').notNull(),
  stitchDesignId: text('stitch_design_id').notNull(),
  thumbnail: text('thumbnail'),
  featured: boolean('featured').default(false),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const exports = pgTable('exports', {
  id: text('id').$defaultFn(() => randomUUID()).primaryKey(),
  projectId: text('project_id').references(() => projects.id).notNull(),
  userId: text('user_id').references(() => users.id).notNull(),
  exportType: text('export_type').notNull(), // 'nextjs' | 'html'
  deploymentUrl: text('deployment_url'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

import { z } from 'zod';

// Stitch element style schema
const StitchStyleSchema = z.object({
  layout: z.enum(['flex', 'grid']).optional(),
  flexDirection: z.enum(['row', 'column']).optional(),
  justifyContent: z.enum(['start', 'center', 'end', 'between', 'around', 'evenly']).optional(),
  alignItems: z.enum(['start', 'center', 'end', 'stretch', 'baseline']).optional(),
  gap: z.number().optional(),
  backgroundColor: z.string().optional(),
  textColor: z.string().optional(),
  borderColor: z.string().optional(),
  fontSize: z.string().optional(),
  fontWeight: z.string().optional(),
  fontFamily: z.string().optional(),
  padding: z.string().optional(),
  margin: z.string().optional(),
  width: z.string().optional(),
  height: z.string().optional(),
  borderRadius: z.string().optional(),
});

// Stitch element props schema
const StitchPropsSchema = z.object({
  text: z.string().optional(),
  src: z.string().optional(),
  alt: z.string().optional(),
  href: z.string().optional(),
  variant: z.enum(['primary', 'secondary', 'outline']).optional(),
  id: z.string().optional(),
  className: z.string().optional(),
});

// Stitch element schema (recursive)
export const StitchElementSchema: z.ZodType<StitchElement> = z.lazy(() =>
  z.object({
    id: z.string(),
    type: z.enum([
      'container',
      'section',
      'header',
      'footer',
      'hero',
      'features',
      'text',
      'heading',
      'button',
      'image',
      'div',
    ]),
    children: z.array(StitchElementSchema).optional(),
    props: StitchPropsSchema.optional(),
    style: StitchStyleSchema.optional(),
  })
);

// Stitch theme schema
const StitchThemeSchema = z.object({
  colors: z.object({
    primary: z.string(),
    secondary: z.string(),
    accent: z.string(),
    background: z.string(),
    text: z.string(),
    muted: z.string().optional(),
  }),
  fonts: z.object({
    heading: z.string(),
    body: z.string(),
  }),
});

// Main Stitch design schema
export const StitchDesignSchema = z.object({
  projectId: z.string(),
  screenId: z.string(),
  deviceType: z.enum(['mobile', 'desktop', 'tablet', 'agnostic']),
  elements: z.array(StitchElementSchema),
  theme: StitchThemeSchema,
});

// Export inferred types
export type StitchStyle = z.infer<typeof StitchStyleSchema>;
export type StitchProps = z.infer<typeof StitchPropsSchema>;
export type StitchElement = {
  id: string;
  type: 'container' | 'section' | 'header' | 'footer' | 'hero' | 'features' | 'text' | 'heading' | 'button' | 'image' | 'div';
  children?: StitchElement[];
  props?: StitchProps;
  style?: StitchStyle;
};
export type StitchTheme = z.infer<typeof StitchThemeSchema>;
export type StitchDesign = z.infer<typeof StitchDesignSchema>;

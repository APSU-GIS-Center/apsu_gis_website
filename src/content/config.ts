import { defineCollection, z } from 'astro:content';

const blogCollection = defineCollection({
    type: 'content',
    schema: ({ image }) => z.object({
        title: z.string(),
        pubDate: z.date(),
        author: z.string().default('APSU GIS Center'),
        image: image().optional(),
        tags: z.array(z.string()).optional(),
        description: z.string(),
        draft: z.boolean().default(false),
    }),
});

export const collections = {
    'blog': blogCollection,
};

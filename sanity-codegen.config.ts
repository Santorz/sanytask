import { SanityCodegenConfig } from 'sanity-codegen';

const config: SanityCodegenConfig = {
  schemaPath: './my-next-task-blog/schemas/schema.js',
  outputPath: './sanity/exportedBlogSchema.ts',
};

export default config;

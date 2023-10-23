import { SanityCodegenConfig } from 'sanity-codegen';

const config: SanityCodegenConfig = {
  schemaPath: './sanytask-blog/schemas/schema.js',
  outputPath: './sanity/exportedBlogSchema.ts',
};

export default config;

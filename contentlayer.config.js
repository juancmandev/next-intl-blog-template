import { defineDocumentType, makeSource } from 'contentlayer/source-files';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';

/** @type {import('contentlayer/source-files').ComputedFields} */

const computedFields = {
  slug: {
    type: 'string',
    resolve: (doc) => {
      const parts = doc._raw.sourceFileName.split('/');
      const fileName = parts[parts.length - 1];

      return `${fileName.replace('.mdx', '')}`;
    },
  },
  slugAsParams: {
    type: 'string',
    resolve: (doc) => {
      const parts = doc._raw.sourceFileName.split('/');
      const fileName = parts[parts.length - 1];

      return `${fileName.replace('.mdx', '')}`;
    },
  },
};

export const EnContent = defineDocumentType(() => ({
  name: 'EnContent',
  filePathPattern: 'en/**/*.mdx',
  contentType: 'mdx',
  fields: {
    title: {
      type: 'string',
    },
    description: {
      type: 'string',
    },
    tags: {
      type: 'list',
      of: {
        type: 'string',
      },
    },
    image: {
      type: 'string',
    },
    imageCaption: {
      type: 'string',
    },
    date: {
      type: 'date',
    },
    author: {
      type: 'string',
    },
  },
  computedFields,
}));

export const EsContent = defineDocumentType(() => ({
  name: 'EsContent',
  filePathPattern: 'es/**/*.mdx',
  contentType: 'mdx',
  fields: {
    title: {
      type: 'string',
    },
    description: {
      type: 'string',
    },
    tags: {
      type: 'list',
      of: {
        type: 'string',
      },
    },
    image: {
      type: 'string',
    },
    imageCaption: {
      type: 'string',
    },
    date: {
      type: 'date',
    },
    author: {
      type: 'string',
    },
  },
  computedFields,
}));

export default makeSource({
  contentDirPath: './src/content',
  documentTypes: [EnContent, EsContent],
  mdx: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      rehypeSlug,
      [
        rehypeAutolinkHeadings,
        {
          properties: {
            className: ['subheading-anchor'],
            ariaLabel: 'Link to section',
          },
        },
      ],
      [
        rehypePrettyCode,
        {
          theme: 'github-dark',
          onVisitLine(node) {
            if (node.children.length === 0) {
              node.children = [{ type: 'text', value: ' ' }];
            }
          },
          onVisitHighlightedLine(node) {
            node.properties.className.push('line--highlighted');
          },
          onVisitHighlightedWord(node) {
            node.properties.className = ['word--highlighted'];
          },
        },
      ],
    ],
  },
});

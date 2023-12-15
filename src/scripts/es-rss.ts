import fs from 'fs';
import RSS from 'rss';
import path from 'path';
import { marked } from 'marked';
import matter from 'gray-matter';

type TContent = {
  title: string;
  description: string;
  tags: string[];
  date: string;
  image: string;
  imageCaption: string;
  author: string;
};

const url = 'https://juancman.dev';

const blogs = fs
  .readdirSync(path.resolve(__dirname, '../content/es/blog/'))
  .filter((file) => path.extname(file) === '.mdx')
  .map((file) => {
    const postContent = fs.readFileSync(`src/content/es/blog/${file}`, 'utf8');
    const { data, content }: { data: any; content: string } =
      matter(postContent);
    const slug = file.replace('.mdx', '');

    return { ...(data as TContent), body: content, slug };
  })
  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

const renderer = new marked.Renderer();

renderer.link = (href, _, text) =>
  `<a href="${href}" target="_blank" rel="noopener noreferrer">${text}</a>`;

marked.setOptions({
  gfm: true,
  breaks: true,
  renderer,
});

const renderContent = (md: string) => marked.parse(md);

const main = () => {
  const feed = new RSS({
    title: 'Juan Manzanero en Español',
    site_url: `${url}/es`,
    feed_url: `${url}/es-feed.xml`,
    language: 'es',
    description: 'Blog de Juan Manzanero',
  });

  blogs.forEach((blog) => {
    const link = `${url}/es/blog/${blog.slug}`;

    feed.item({
      title: blog.title,
      description: renderContent(blog.body) as string,
      date: new Date(blog.date),
      author: blog.author,
      url: link,
      guid: link,
      categories: blog.tags,
    });
  });

  const rss = feed.xml({ indent: true });

  fs.writeFileSync(path.join(__dirname, '../../public/es-feed.xml'), rss);
};

main();

import Link from 'next/link';
import type { Articles } from 'contentlayer/generated';
import Button from '../components/Button';
import ArticleCard from './components/ArticleCard.';

function RecommendedArticles({ articles }: { articles: Articles[] }) {
  const topThreeArticles = articles.slice(0, 3);

  return (
    <section className="flex flex-col gap-8 items-center mb-32">
      <h2 className="text-2xl text-center drop-shadow-md">推薦文章</h2>
      <div className="flex flex-col md:flex-row gap-8 w-full mb-4">
        {topThreeArticles.map(({ title, desc, url, _id }) => (
          <ArticleCard desc={desc} key={_id} title={title} url={url} />
        ))}
      </div>
      <Link href="/articles/page/1">
        <Button className="w-40">觀看更多文章</Button>
      </Link>
    </section>
  );
}

export default RecommendedArticles;

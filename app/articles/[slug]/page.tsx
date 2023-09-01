import Link from 'next/link';

import { format, parseISO } from 'date-fns'
import { allArticles } from 'contentlayer/generated'

import { useMDXComponent } from 'next-contentlayer/hooks';

export const generateStaticParams = async () => allArticles.map((article) => ({ slug: article._raw.flattenedPath }))

export const generateMetadata = ({ params }: { params: { slug: string } }) => {
  const article = allArticles.find((article) => article._raw.flattenedPath === params.slug)
  if (!article) throw new Error(`article not found for slug: ${params.slug}`)
  return { title: `${article.title} | ThisWeb` }
}

const articlePage = ({
  params
}: {
  params: { slug: string }
}) => {

  const article = allArticles.find((article) => article._raw.flattenedPath === params.slug)
  if (!article) throw new Error(`article not found for slug: ${params.slug}`)

  const articleIndex = allArticles.findIndex((article) => article._raw.flattenedPath === params.slug);
  const nextArticle = articleIndex + 1 < allArticles.length ? allArticles[articleIndex + 1] : undefined;
  const prevArticle = articleIndex - 1 >= 0 ? allArticles[articleIndex - 1] : undefined;

  const MDXContent = useMDXComponent(article.body.code);

  return (
    <article className="mx-auto max-w-xl py-8 article">
      <div className="mb-8 text-center">
        <time dateTime={article.date} className="mb-1 text-xs text-gray-600">
          {format(parseISO(article.date), 'LLLL d, yyyy')}
        </time>
        <h1 className="text-3xl font-bold">{article.title}</h1>
      </div>
      {/* <div className="[&>*]:mb-3 [&>*:last-child]:mb-0" dangerouslySetInnerHTML={{ __html: article.body.html }} /> */}
      <MDXContent />

      <div className="flex flex-col gap-4 mt-16 md:flex-row md:justify-between xl:gap-8">
        {prevArticle ? (
          <Link
            href={prevArticle.url}
            className="basis-1/2"
          >
            <h2 className="mb-1 text-xs tracking-wide text-secondary transition-colors">
              上一篇
            </h2>
            <span className='hidden md:inline'>←</span> {prevArticle.title}
          </Link>
        ) : (
          <div className="basis-1/2"></div>
        )}
        {nextArticle && (
          <Link
            href={nextArticle.url}
            className="basis-1/2 block md:text-right"
          >
            <h2 className="mb-1 text-left text-xs uppercase tracking-wide text-secondary transition-colors md:text-right">
              下一篇
            </h2>
            {nextArticle.title} <span className='hidden md:inline'>→</span>
          </Link>
        )}
      </div>
    </article >
  )
}

export default articlePage
// Next
import Link from 'next/link';

// Lib
import { format, parseISO } from 'date-fns';
import {
  sortArticleByDate,
  filterActiveArticles,
  composeWithInitialValue,
} from '@/lib/lib';

// ContentLayer
import { allArticles } from 'contentlayer/generated';

// Components
import EmptyPage from './components/EmptyPage';
import PaginatedNav from './components/PaginatedNav';

const ARTICLES_PER_PAGE = 10;

function ArticlesPage({ params }: { params: { page: string } }) {
  // filter article by page
  // start with 1, and there are ten articles per page
  // page = 1, article = 0 ~ 9 ; page = 2, article = 10 ~ 19 ...
  const numPage = parseInt(params.page);

  const startIndex = (numPage - 1) * ARTICLES_PER_PAGE;
  const endIndex = numPage * ARTICLES_PER_PAGE;

  const articles = composeWithInitialValue(
    allArticles,
    filterActiveArticles,
    sortArticleByDate,
  );

  const paginatedPosts = articles.slice(startIndex, endIndex);

  const totalPages = Math.ceil(articles.length / ARTICLES_PER_PAGE);

  return (
    <div className="my-16">
      <h2 className="text-3xl mb-10 pb-2 border-b-2 border-gray-200">
        文章列表
      </h2>
      <ul className="flex flex-col gap-12 mb-20">
        {paginatedPosts.length > 0 ? (
          paginatedPosts.map(({ title, desc, date, url }) => (
            <li
              key={title}
              className="focus-within:scale-[102%] hover:scale-[102%] transition"
            >
              <Link href={url}>
                <h3 className="mb-1 font-bold text-xl">{title}</h3>
                <p className="mb-2 text-xs text-gray-500 italic font-normal">
                  {format(parseISO(date), 'LLLL d, yyyy')}
                </p>
                <p className="text-sm">{`${desc.slice(0, 100)}...`}</p>
              </Link>
            </li>
          ))
        ) : (
          <EmptyPage />
        )}
      </ul>

      {paginatedPosts.length > 0 && (
        <PaginatedNav
          articlesPerPage={ARTICLES_PER_PAGE}
          currentPage={numPage}
          totalPages={totalPages}
        />
      )}
    </div>
  );
}

export default ArticlesPage;

import { Metadata } from 'next';

// Components
import EmptyPage from '../../_components/EmptyPage';
import PaginatedNav from '../../_components/PaginatedNav';
import PostsList from '../../_components/PostsList';

// Sanity
import { LIMITED_POSTS_QUERY, POSTS_NUMBER_QUERY } from '@/lib/sanity/queries';
import { client } from '@/lib/sanity/client';

// Types
import { PostsType } from '@/lib/sanity/type';

export const metadata: Metadata = {
  title: '文章列表 | 請網這邊走 ThisWeb',
};

const POSTS_PER_PAGE = 9;

interface PostsPageProps {
  params: {
    page: string;
  };
}

const PostsPage: React.FC<PostsPageProps> = async ({ params }) => {
  // filter article by page
  // start with 1, and there are ten articles per page
  // page = 1, article = 0 ~ 9 ; page = 2, article = 10 ~ 19 ...
  const numPage = parseInt(params.page);

  const startIndex = numPage * POSTS_PER_PAGE;
  const endIndex = (numPage + 1) * POSTS_PER_PAGE;

  const posts = await client.fetch<PostsType>(
    LIMITED_POSTS_QUERY,
    {
      start: startIndex,
      end: endIndex,
    },
    {
      next: {
        revalidate: 0,
      },
    },
  );

  if (!posts || posts.length === 0) {
    return <EmptyPage />;
  }

  const postsNumber = await client.fetch<number>(
    POSTS_NUMBER_QUERY,
    {},
    {
      next: {
        revalidate: 0,
      },
    },
  );
  const totalPages = Math.ceil(postsNumber / POSTS_PER_PAGE);

  return (
    <>
      <PostsList posts={posts} />
      <PaginatedNav
        articlesPerPage={POSTS_PER_PAGE}
        currentPage={numPage + 1}
        totalPages={totalPages}
      />
    </>
  );
};

export default PostsPage;

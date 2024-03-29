import type { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next'

import { Pages } from '@/components'
import { Domain, UseCase } from '@/features'

type StaticProps = {
  articles: Domain.Article.Entity[]
  totalPageCount: number
  currentPageCount: number
}

export const getStaticProps: GetStaticProps<StaticProps> = async () => {
  const perPage = 3

  const {
    data: { articles, totalCount }
  } = await UseCase.Article.fetchArticles({
    offset: 0,
    limit: perPage,
    sortOrder: 'asc'
  })

  return {
    props: {
      articles,
      currentPageCount: 1,
      totalPageCount: Math.ceil(totalCount / perPage)
    }
  }
}

type PageProps = InferGetStaticPropsType<typeof getStaticProps>

export const HomePage: NextPage<PageProps> = ({
  articles,
  currentPageCount,
  totalPageCount
}: PageProps) => {
  return (
    <Pages.HomePage
      articles={articles}
      currentPageCount={currentPageCount}
      totalPageCount={totalPageCount}
    />
  )
}

export default HomePage

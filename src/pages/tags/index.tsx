import type { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next'

import { Pages } from '@/components'
import { Domain, UseCase } from '@/features'

type StaticProps = {
  tags: Domain.Tag.Entity[]
}

export const getStaticProps: GetStaticProps<StaticProps> = async () => {
  const { data } = await UseCase.Tag.fetchTags()

  return {
    props: {
      tags: data.tags
    }
  }
}

type PageProps = InferGetStaticPropsType<typeof getStaticProps>

const TagCollectionPage: NextPage<PageProps> = ({ tags }: PageProps) => {
  return <Pages.TagCollectionPage tags={tags} />
}

export default TagCollectionPage

import { UserCircleIcon } from '@heroicons/react/24/solid'
import { format } from 'date-fns'
import Image from 'next/image'
import Link from 'next/link'

import { Divider } from '@/components/atoms'

import * as styles from './styles.css'
import { Article } from './types'

type Props = {
  articles: Article[]
}

export const ArticleCollection = ({ articles }: Props) => {
  return (
    <>
      {articles.map((article) => {
        const { id, image, slug, title, category, tags, author, publishedAt } =
          article
        return (
          <article key={id} className={styles.article}>
            <div className={styles.inner}>
              <div>
                {image && (
                  <Link
                    href={`/articles/${slug}`}
                    className={styles.articleImageWrapper}
                  >
                    <Image
                      src={image.url}
                      alt={image.alt}
                      className={styles.articleImage}
                      fill
                    />
                  </Link>
                )}
              </div>
              <div className={styles.articleBody}>
                {category && (
                  <p className={styles.articleCategory}>
                    <Link
                      href={`/categories/${category?.name}`}
                      className={styles.articleCategoryAnker}
                    >
                      {category?.name}
                    </Link>
                  </p>
                )}
                <h1 className={styles.articleTitle}>
                  <Link href="#" className={styles.articleTitleAnker}>
                    {title}
                  </Link>
                </h1>
                <div className={styles.articleMeta}>
                  <p className={styles.articleDate}>
                    <time>{format(new Date(publishedAt), 'yyyy.MM.dd')}</time>
                  </p>
                  {author && (
                    <>
                      <Divider kind="vertical" style={{ margin: 0 }} />
                      <p className={styles.articleUser}>
                        <UserCircleIcon className={styles.articleUserIcon} />
                        <span className={styles.articleUserName}>
                          {author.name}
                        </span>
                      </p>
                    </>
                  )}
                </div>
                {tags && tags.length > 0 && (
                  <div className={styles.articleTagGroup}>
                    {tags.map((tag) => (
                      <p key={tag.id} className={styles.articleTag}>
                        <Link
                          href={`/tags/${tag.slug}`}
                          className={styles.articleTagAnker}
                        >
                          <span>#</span>
                          <span>{tag.name}</span>
                        </Link>
                      </p>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </article>
        )
      })}
    </>
  )
}
import { UserCircleIcon } from '@heroicons/react/24/solid'
import { format } from 'date-fns'
import Image from 'next/image'
import Link from 'next/link'

import { Divider } from '@/components/atoms'
import { NoImage } from '@/components/molecules'
import { Domain } from '@/features'

import * as styles from './styles.css'

type Props = {
  articles: Domain.Article.Entity[]
}

export const ArticleCollection = ({ articles }: Props) => {
  return (
    <>
      {articles.map((article) => {
        const { id, imageUrl, title, category, tags, author, publishedAt } =
          article
        const articleUrl = `/articles/${id}`

        return (
          <article key={id} className={styles.article}>
            <div className={styles.inner}>
              <Link href={articleUrl} className={styles.articleImageAnker}>
                <div className={styles.articleImageWrapper}>
                  {imageUrl ? (
                    <Image
                      src={imageUrl}
                      alt={title}
                      className={styles.articleImage}
                      fill
                    />
                  ) : (
                    <NoImage />
                  )}
                </div>
              </Link>
              <div className={styles.articleBody}>
                {category && (
                  <p className={styles.articleCategory}>
                    <Link
                      href={`/categories/${category?.id}`}
                      className={styles.articleCategoryAnker}
                    >
                      {category?.name}
                    </Link>
                  </p>
                )}
                <h1 className={styles.articleTitle}>
                  <Link href={articleUrl} className={styles.articleTitleAnker}>
                    {title}
                  </Link>
                </h1>
                <div className={styles.articleMeta}>
                  {publishedAt && (
                    <p className={styles.articleDate}>
                      <time>{format(new Date(publishedAt), 'yyyy.MM.dd')}</time>
                    </p>
                  )}
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
                          href={`/tags/${tag.id}`}
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

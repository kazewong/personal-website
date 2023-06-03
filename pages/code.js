import React from 'react'
import { PageSEO } from '@/components/SEO'
import siteMetadata from '@/data/siteMetadata'
import GalleryLayout from '@/layouts/GalleryLayout'
import { getAllFilesFrontMatter } from '@/lib/mdx'

export const POSTS_PER_PAGE = 5

export async function getStaticProps() {
  const posts = await getAllFilesFrontMatter('code')
  const initialDisplayPosts = posts.slice(0, POSTS_PER_PAGE)
  const pagination = {
    currentPage: 1,
    totalPages: Math.ceil(posts.length / POSTS_PER_PAGE),
  }

  return { props: { initialDisplayPosts, posts, pagination } }
}

export default function Code({ posts, initialDisplayPosts, pagination }) {
  return (
    <>
      <PageSEO title={`Code - ${siteMetadata.author}`} description={siteMetadata.description} />
      <GalleryLayout
        posts={posts}
        initialDisplayPosts={initialDisplayPosts}
        pagination={pagination}
        title="Code"
        description="Code, demo, and tutorials"
      />
    </>
  )
}

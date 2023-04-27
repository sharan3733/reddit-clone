//eslint-disable-next-line @next/next/no-html-link-for-pages

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { getPosts } from 'lib/data.js'
import prisma from 'lib/prisma'
import timeago from '@/lib/timeago'
import Link from 'next/link'


const Post = ({ post }) => {
  return (
    <div className='flex flex-col p-10 mx-20 my-10 mb-4 bg-gray-200 border border-black border-3'>
      <div className='flex flex-shrink-0 pb-0 '>
        <div className='flex-shrink-0 block group'>
          <div className='flex items-center text-gray-800'>
            /r/{post.subredditName} Posted by {post.author.username}{' '}
            {timeago.format(new Date(post.createdAt))}

          </div>
      </div>
 </div>
 <div className='mt-5'>
<p className='flex-shrink text-2xl font-bold color-primary width-auto'>
  {post.title}
</p>
<p className='flex-shrink text-base font-normal color-primary width-auto mt-2'>
  {post.content}
</p>
 </div>
    </div>
  )
}

const Posts = ({ posts }) => {
  if (!posts) return null

  return (
    <>
      {posts.map((post, index) => (
        <Post key={index} post={post} />
      ))}
    </>
  )
}

export default function Index({ posts }) {
  const { data: session, status } = useSession()
  const router = useRouter()

  if (status === 'loading') {
    return null
  }
  if(session && !session.user.name){
    router.push('/setup')
  }

  if (session) {
    router.push('/home')
  }

  return (
    <div>
      <header className='flex h-12 px-5 pt-3 pb-2 text-white bg-black'>
       <p>Reddit clone</p>
       <p className='grow'></p>
    
       <Link
        className='px-4 mb-1 font-bold border rounded-full flex-l'
        href='/api/auth/signin'>
        login </Link>
      </header>
      <Posts posts={posts} />
    </div>
  )
}

export async function getServerSideProps() {
  let posts = await getPosts(prisma)
  posts = JSON.parse(JSON.stringify(posts))

  return {
    props: {
      posts: posts,
    },
  }
}
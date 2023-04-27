import timeago from "@/lib/timeago";
import Post from 'component/Post'

export default function Posts ({ posts }) {
    if(!posts) return null
    return(
        <>
        {posts.map((post, index) =>(
            <Post key={index} post={post}/>
        ))}
        </>
    )
}
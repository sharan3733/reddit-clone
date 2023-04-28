import subreddit from "@/pages/r/[subreddit]";
import prisma from "./prisma";
import Link from "next/link";

export const getPosts = async (prisma) => {
    const posts = await prisma.post.findMany({
        where: {},
        orderBy: [
            {
                id: 'desc',
            },
        ],
        include: {
            author: true,
        }
    })
    return posts
}

export const getSubreddit = async(name, prisma) => {
    return await prisma.subreddit.findUnique({
        where: {
            name,
        },
    })
}

export const getPostsFromSubreddit = async (subreddit, prisma) => {
    const posts = await prisma.post.findMany({
        where: {
            subreddit: {
                name: subreddit,
            },
        },
        orderBy: [
            {
                id: 'desc',
            },
        ],
        include:{
            author: true,
        },
    })
    return posts
}

export const getPost = async (id, prisma) => {
    const post = await prisma.post.findUnique({
        where: {
            id,
        },
        include: {
            author: true,
        },
    })
    return post
}
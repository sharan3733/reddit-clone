import prisma from "@/lib/prisma"
import {faker} from '@faker-js/faker'

   export default async function handler (req, res) {
    if(req.method !== 'POST') return res.end()

    if(req.body.task === 'generate_users') {
       let count = 0
       while (count < 10) {
        await prisma.user.create({
            data: {
                name: faker.internet.userName().toLowerCase(),
                email: faker.internet.email().toLowerCase(),
            },
        })
        count++
       }
    }
    if(req.body.task === 'generate_subreddits'){

    }
    if(req.body.task === 'add_fake_content'){

    }
    if(req.body.task === 'clean_database'){
        await prisma.comment.deleteMany({})
        await prisma.post.deleteMany({})
        await prisma.subreddit.deleteMany({})
        await prisma.user.deleteMany({})
    }

    res.end()

    
}
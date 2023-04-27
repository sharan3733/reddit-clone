import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";
import prisma from "@/lib/prisma";


export default async function handler(req, res) {
    const session = await getServerSession(req, res, authOptions)
    if(!session) return res.end()

    if(req.method === 'POST') {
        await prisma.user.update({
            where: {id: session.user.id},
            data: {
                name: req.body.name,
            },
        })
        res.end()
    }
}
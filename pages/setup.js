import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";




export default function Setup() {
    const router = useRouter()
    const {data: session, status } = useSession()
    const loading = status === 'loading'

    const [name, setName] = useState()

    if(loading) return null

    if(!session || !session.user) {
        router.push('/')
        return null
    }
    if (!loading && session && session.user.name) {
        router.push('/')
    }
    return (
        <form
        className="mt-10 ml-20"
        onSubmit={async (e) =>{
            e.preventDefault()
            await fetch('/api/setup', {
                body: JSON.stringify({
                    name,
                }),
                headers: {
                    'Content-Type': 'application/json',
                },
                method:'POST',
            })
            session.user.name = name
            router.push('/')
        }}
        >
            <div className="flex-1 mb-5">
            <div className="flex-1 mb-5">Choose a username</div>
            <input
            type='text'
            name='name'
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-2/3 p-1 border"
            required
            pattern="\w*"
            title="Numbers or letters or_only"
            placeholder="Numbers or letters or _ only"
            minlength='5'
            />
            </div>
             <button className="border px-8 py-2 mt-0 mr-8 font-bold rounded-full color-accent-contrast bg-color-accent hover:bg-color-accent-hover">
                Save
             </button>

        </form>
    )
}
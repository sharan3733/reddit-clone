import Image from 'next/image'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
  
      <div>
         <h1>Home page</h1>
         <a href='/api/auth/signin'>login</a>
         </div>
  )
}

import { Post, PostType } from './components/Post' 
import { Header } from './components/Header'
import { Sidebar } from './components/Sidebar'

import styles from './App.module.css'
import './global.css'

const posts: PostType[] = [
  {
    id: 1,
    author: {
      avatarUrl: 'https://github.com/diego3g.png',
      name: 'Diego Fernandes',
      rule: 'CTO @Rocketseat'
    },
    content: [
      {
        type: 'paragraph',
        content: 'Fala galeraa👋🏻'
      },
      {
        type: 'paragraph',
        content: 'Acabei de subir mais um projeto no meu portifa. É um projeto que fiz no NLW Return, evento da Rocketseat. O nome do projeto é DoctorCare 🚀'
      },
      {
        type: 'link',
        content: '👉🏻 jane.design/doctorcare'
      },
      {
        type: 'link',
        content: '👉🏻 jane.design/doctorcare'
      }
    ],
    publishedAt: new Date('2024-05-01 20:00:00')
  },
  {
    id: 1,
    author: {
      avatarUrl: 'https://github.com/maykbrito.png',
      name: 'Mayk Brito',
      rule: 'Educator @Rocketseat'
    },
    content: [
      {
        type: 'paragraph',
        content: 'Fala galeraa👋🏻'
      },
      {
        type: 'paragraph',
        content: 'Acabei de subir mais um projeto no meu portifa. É um projeto que fiz no NLW Return, evento da Rocketseat. O nome do projeto é DoctorCare 🚀'
      },
      {
        type: 'link',
        content: '👉🏻 jane.design/doctorcare'
      },
      {
        type: 'link',
        content: '👉🏻 jane.design/doctorcare'
      }
    ],
    publishedAt: new Date('2024-05-03 20:00:00')
  }
]

export function App() {
  return (
   <>
    <Header />
    <div className={styles.wrapper}>
      <Sidebar />
      <main>
        {posts.map(post => {
          return (
          <Post 
            key={post.id}
            post={post}
          />
        )
        })}
      </main>
    </div>
   </>
  )
}
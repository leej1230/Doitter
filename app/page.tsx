import Image from 'next/image'
import styles from './page.module.css'

export default function Home() {
  return (
    <main className={styles.main}>
      <div>
        <h1>
          Welcome to DOITTER
        </h1>
        <a href="/api/auth/login">
          <button>Begin Sharing Todo List</button>
        </a>
      </div>
    </main>
  )
}

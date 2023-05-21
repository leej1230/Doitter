import React from 'react'
import Link from 'next/link'
import styles from './page.module.css'

export default function Home() {
  return (
    <main className={styles.main}>
      <h1 className={styles.title}> Welcome to DOITTER</h1>
      <Link href="/api/auth/login" className={styles.link}>
        Begin Sharing
      </Link>
    </main>
  )
}

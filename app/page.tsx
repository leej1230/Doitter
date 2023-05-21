import React from 'react'
import Link from 'next/link'
import styles from './page.module.css'
import Image from 'next/image'

export default function Home() {
  return (
    <main className={styles.main}>
      <Image src="/logo.jpeg" alt={''} width={100} height={100}></Image>
      <h1 className={styles.title}> Welcome to DoItter</h1>
      <Link href="/api/auth/login" className={styles.link}>
        Begin Sharing
      </Link>
    </main>
  )
}

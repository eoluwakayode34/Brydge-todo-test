import Head from 'next/head';

import styles from '@/pages/index.module.css';

export default function Home() {
	return (
		<div className={styles.body}>
			<Head>
				<title>Todo app</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main>
				<div className={styles.todoContainer}>
					<h1 className={styles.title}>Todo List</h1>
				</div>
			</main>
		</div>
	);
}

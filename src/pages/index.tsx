// 'use client';
import styles from '@/pages/index.module.css';

import { Formik } from 'formik';
import moment from 'moment';
import Head from 'next/head';
import { useState } from 'react';
import { BiSolidDownArrow } from 'react-icons/bi';
import { object, string } from 'yup';

let todoValidationSchema = object({
	title: string().min(2).required(),
});

export default function Home() {
	const date = new Date();
	const [todoItems, setTodoItems] = useState([
		{
			title: 'completed',
			date: date,
			completed: true,
		},
		{
			title: 'uncompleted',
			date: date,
			completed: false,
		},
		{
			title: 'completed',
			date: date,
			completed: true,
		},
		{
			title: 'uncompleted',
			date: date,
			completed: false,
		},
	]);

	const completedTodo = todoItems.filter((item) => item.completed === true);
	const uncompletedTodo = todoItems.filter((item) => item.completed === false);

	const handleSubmitTodo = (
		values: any,
		{ setSubmitting, resetForm, setErrors }: any,
	) => {
		const todo = {
			title: values.title,
			date: date,
			completed: false,
		};

		if (
			todoItems.find(
				(item) => item.title.toLowerCase() === todo.title.toLowerCase(),
			)
		) {
			setErrors({ title: 'Todo already exist' });
		} else {
			setTodoItems((prev) => [...prev, todo]);
			resetForm();
		}
		setSubmitting(false);
	};

	return (
		<div className={styles.body}>
			<Head>
				<title>Todo app</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main className="py-10">
				<div className={styles.todoContainer}>
					<h1 className={styles.title}>To Do List</h1>

					<hr className={styles.divider} />
					<div>
						<p className="flex align-middle items-center text-gray-400 ">
							<BiSolidDownArrow className="mr-3" /> {completedTodo.length} Done
						</p>

						{completedTodo.map((item, index) => (
							<div key={index} className="flex mt-4">
								<input
									type={'checkbox'}
									checked={item.completed}
									className="cursor-pointer 
								rounded-xl h-5 w-5 mr-2 mt-2 appearance-none checked:bg-primary-200 hover:bg-primary-100 "
									style={{
										backgroundImage: `url(assets/check.svg)`,
										backgroundRepeat: 'no-repeat',
										backgroundPosition: 'center',
										backgroundSize: '50%',
									}}
									onChange={(e) => {
										setTodoItems((prev) => {
											return prev.map((todoItem) => {
												if (
													todoItem.title.toLowerCase() ===
													item.title.toLowerCase()
												) {
													return { ...todoItem, completed: e.target.checked };
												} else {
													return todoItem;
												}
											});
										});
									}}
								/>

								<div className="text-gray-400">
									<h3 className="text-lg capitalize line-through ">
										{item.title}
									</h3>
									<p className="text-sm">{moment(item.date).format('LL')}</p>
								</div>
							</div>
						))}
					</div>
					<hr className={styles.divider} />
					{uncompletedTodo.map((item, index) => (
						<div key={index} className="flex mt-4">
							<input
								type={'checkbox'}
								checked={item.completed}
								className="cursor-pointer 
								rounded-xl h-5 w-5 mr-2 mt-2 appearance-none border-[1px] border-gray-500 "
								onChange={(e) => {
									setTodoItems((prev) => {
										return prev.map((todoItem) => {
											if (
												todoItem.title.toLowerCase() ===
												item.title.toLowerCase()
											) {
												return { ...todoItem, completed: e.target.checked };
											} else {
												return todoItem;
											}
										});
									});
								}}
							/>
							<div className="text-gray-500">
								<h3 className="text-lg capitalize">{item.title}</h3>
								<p className="text-sm">{moment(item.date).format('LL')}</p>
							</div>
						</div>
					))}
				</div>

				<Formik
					initialValues={{ title: '' }}
					validationSchema={todoValidationSchema}
					onSubmit={handleSubmitTodo}
				>
					{({
						values,
						errors,
						touched,
						handleChange,
						handleBlur,
						handleSubmit,
						isSubmitting,
					}) => (
						<form onSubmit={handleSubmit}>
							<input
								type="text"
								name="title"
								onChange={handleChange}
								onBlur={handleBlur}
								value={values.title}
							/>
							{errors.title && touched.title && errors.title}
							<button type="submit" disabled={isSubmitting}>
								Add Item
							</button>
						</form>
					)}
				</Formik>
			</main>
		</div>
	);
}

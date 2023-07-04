import styles from '@/pages/index.module.css';

import { Formik } from 'formik';
import moment from 'moment';
import Head from 'next/head';
import { useState } from 'react';
import { BiSolidDownArrow, BiSolidRightArrow } from 'react-icons/bi';
import { ITodoList } from 'src/interface/todo';
import { object, string } from 'yup';

let todoValidationSchema = object({
	title: string().min(2).required().label('Item'),
});

export default function Home() {
	const [showCompleted, setShowCompleted] = useState<boolean>(true);
	const [showUnCompleted, setShowUnCompleted] = useState<boolean>(true);
	const [todoItems, setTodoItems] = useState<ITodoList[]>([]);

	const completedTodo = todoItems.filter((item) => item.completed === true);
	const uncompletedTodo = todoItems.filter((item) => item.completed === false);

	const handleSubmitTodo = (
		values: { title: string },
		{ setSubmitting, resetForm, setErrors }: any,
	) => {
		const date = new Date();

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

			<main className={styles.todoContainer}>
				<div className="flex flex-col  h-screen justify-between pb-20">
					<div className="mt-8">
						<h1 className={styles.title}>To Do List</h1>

						<hr className={styles.divider} />
						<div>
							<p
								className={styles.todoHeader}
								onClick={() => setShowCompleted((prev) => !prev)}
							>
								{showCompleted && completedTodo.length > 0 ? (
									<BiSolidDownArrow className={styles.todoHeaderIcon} />
								) : (
									<BiSolidRightArrow className={styles.todoHeaderIcon} />
								)}
								{completedTodo.length} Done
							</p>

							{showCompleted ? (
								<>
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
																return {
																	...todoItem,
																	completed: e.target.checked,
																};
															} else {
																return todoItem;
															}
														});
													});
												}}
											/>

											<div className="text-gray-400">
												<h3 className={styles.todoTitleHeading}>
													{item.title}
												</h3>
												<p className={styles.todoDate}>
													{moment(item.date).format('LL')}
												</p>
											</div>
										</div>
									))}
								</>
							) : null}
						</div>
						<div className="mt-8" />
						<hr className={styles.divider} />
						<div>
							<p
								className={styles.todoHeader}
								onClick={() => setShowUnCompleted((prev) => !prev)}
							>
								{showUnCompleted && uncompletedTodo.length > 0 ? (
									<BiSolidDownArrow className={styles.todoHeaderIcon} />
								) : (
									<BiSolidRightArrow className={styles.todoHeaderIcon} />
								)}
								{uncompletedTodo.length} Undone
							</p>

							{showUnCompleted ? (
								<>
									{uncompletedTodo.map((item, index) => (
										<div key={index} className="flex mt-4">
											<input
												type={'checkbox'}
												checked={item.completed}
												className="cursor-pointer 
								rounded-xl h-5 w-5 mr-2 mt-2 appearance-none border-[1px] border-gray-400 "
												onChange={(e) => {
													setTodoItems((prev) => {
														return prev.map((todoItem) => {
															if (
																todoItem.title.toLowerCase() ===
																item.title.toLowerCase()
															) {
																return {
																	...todoItem,
																	completed: e.target.checked,
																};
															} else {
																return todoItem;
															}
														});
													});
												}}
											/>
											<div className="text-gray-500">
												<h3 className={styles.unCompletedTodoTitleHeading}>
													{item.title}
												</h3>
												<p className={styles.todoDate}>
													{moment(item.date).format('LL')}
												</p>
											</div>
										</div>
									))}
								</>
							) : null}
						</div>
					</div>

					<div className="mt-auto">
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
									<div className="grid gap-5  grid-cols-1 sm:grid-cols-3">
										<div className="  sm:col-span-2 flex flex-col">
											<input
												type="text"
												name="title"
												onChange={handleChange}
												onBlur={handleBlur}
												value={values.title}
												placeholder="A new To Do Item..."
												className="border-[1.5px] rounded-lg text-[15px] placeholder:text-sm placeholder:text-center   p-3 focus:border-primary-200  "
											/>
										</div>
										<button
											className={
												'bg-primary-300 rounded-lg col-span-1 text-white  p-3 '
											}
											type="submit"
											disabled={isSubmitting}
										>
											Add Item
										</button>
									</div>
									<div className="text-red-500 mt-2">
										{errors.title && touched.title && errors.title}
									</div>
								</form>
							)}
						</Formik>
					</div>
				</div>
			</main>
		</div>
	);
}

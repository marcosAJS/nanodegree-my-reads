import React from 'react';
import { Link } from 'react-router-dom';
import Book from './Book';
import BookShelf from './BookShelf';
import { camelCaseToRegularForm } from './Util/Functions';

class MyReads extends React.Component {
	state = {
		books: []
	};

	componentDidMount() {
		this.props.retrieveBooks();
	}

	render() {
		const { onChangeShelfBook, books } = this.props;
		let listBooks = {};

		books.forEach(book => {
			if (!listBooks[book.shelf]) listBooks[book.shelf] = [];
			listBooks[book.shelf].push(book);
		});

		return (
			<div className="list-books">
				<div className="list-books-title">
					<h1>MyReads</h1>
				</div>
				<div className="list-books-content">
					{Object.keys(listBooks).map(key => (
						<BookShelf key={key} title={camelCaseToRegularForm(key)}>
							{listBooks[key].map((book, index) => (
								<Book onChangeShelfBook={onChangeShelfBook} key={index} book={book} />
							))}
						</BookShelf>
					))}
				</div>
				<div className="open-search">
					<Link to="/search">
						Add a book
					</Link>
				</div>
			</div>
		);
	}
}

export default MyReads;

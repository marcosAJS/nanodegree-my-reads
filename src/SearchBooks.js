import React from 'react';
import { Link } from 'react-router-dom';
import { Debounce } from 'react-throttle';
import Book from './Book';
import * as BooksAPI from './BooksAPI';

class SearchBooks extends React.Component {
	state = {
		books: []
	};

	treateResponse = response => {
		if (response && !response.error) {
			this.setState({ books: response });
		} else {
			this.setState({ books: [] });
		}
	};

	browseBooks = query => {
		BooksAPI.search(query.trim()).then(response => {
			this.treateResponse(response);
		});
	};

	mergeShelf = booksOnTheShelf => book => {
		const bookFound = booksOnTheShelf.find(b => b.id === book.id);
		if (bookFound) book['shelf'] = bookFound.shelf;
		return book;
	};

	render() {
		let { onChangeShelfBook, booksOnTheShelf } = this.props;
		let { books } = this.state;

		const mergeByShelf = this.mergeShelf(booksOnTheShelf);
		const booksShowing = books.map(b => mergeByShelf(b));

		return (
			<div className="search-books">
				<div className="search-books-bar">
					<Link className="close-search" to="/">
						Close
					</Link>
					<div className="search-books-input-wrapper">
						<Debounce time="200" handler="onChange">
							<input
								type="text"
								onChange={e => this.browseBooks(e.target.value)}
								placeholder="Search by title or author"
							/>
						</Debounce>
					</div>
				</div>
				<div className="search-books-results">
					<ol className="books-grid">
						{booksShowing.map((book, index) => (
							<Book key={index} book={book} onChangeShelfBook={e => onChangeShelfBook(e, book)} />
						))}
					</ol>
				</div>
			</div>
		);
	}
}

export default SearchBooks;

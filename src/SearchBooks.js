import React from 'react';
import { Link } from 'react-router-dom';
import Book from './Book';
import * as BooksAPI from './BooksAPI';
import { customTrim } from './Util/Functions';

class SearchBooks extends React.Component {
	state = {
		query: '',
		books: []
	};

	treateResponse = response => {
		if (response && !response.error) {
			this.setState({ books: response });
		} else {
			this.setState({ books: [] });
		}
	};

	updateQuery = query => {
		this.setState({ query: customTrim(query) }, () => {
			BooksAPI.search(query.trim()).then(response => {
				console.log(query, response);
				this.treateResponse(response);
			});
		});
	};

	render() {
		let { onChangeShelfBook } = this.props;
		let { query, books } = this.state;
		return (
			<div className="search-books">
				<div className="search-books-bar">
					<Link className="close-search" to="/">
						Close
					</Link>
					<div className="search-books-input-wrapper">
						<input
							type="text"
							value={query}
							onChange={e => this.updateQuery(e.target.value)}
							placeholder="Search by title or author"
						/>
					</div>
				</div>
				<div className="search-books-results">
					<ol className="books-grid">
						{books.map((book, index) => (
							<Book key={index} book={book} onChangeShelfBook={e => onChangeShelfBook(e, book)} />
						))}
					</ol>
				</div>
			</div>
		);
	}
}

export default SearchBooks;

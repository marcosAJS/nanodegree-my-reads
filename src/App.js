import React from 'react';
import { Route } from 'react-router-dom';
import './App.css';
import MyReads from './MyReads';
import SearchBooks from './SearchBooks';
import * as BooksAPI from './BooksAPI';

class BooksApp extends React.Component {
	state = {
		/**
		 * TODO: Instead of using this state variable to keep track of which page
		 * we're on, use the URL in the browser's address bar. This will ensure that
		 * users can use the browser's back and forward buttons to navigate between
		 * pages, as well as provide a good URL they can bookmark and share.
		 */
		showSearchPage: false,
		books: []
	};

	retrieveBooks = () => {
		BooksAPI.getAll().then(response => {
			this.setState({ books: response });
			console.log(this.state.books);
		});
	};

	onChangeShelfBook = (e, book) => {
		BooksAPI.update(book, e.target.value).then(() => this.retrieveBooks());
	};

	render() {
		const { books } = this.state;
		return (
			<div className="app">
				<Route
					exact
					path="/"
					render={() => (
						<MyReads
							books={books}
							onChangeShelfBook={this.onChangeShelfBook}
							retrieveBooks={this.retrieveBooks}
						/>
					)}
				/>
				<Route
					path="/search"
					render={() => <SearchBooks onChangeShelfBook={this.onChangeShelfBook} />}
				/>
			</div>
		);
	}
}

export default BooksApp;

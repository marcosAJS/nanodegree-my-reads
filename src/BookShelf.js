import React from 'react';
class BookShelf extends React.Component {
	render() {
        const {title} = this.props;
		return <div className="bookshelf">
				<h2 className="bookshelf-title">{title}</h2>
				<div className="bookshelf-books">
					<ol className="books-grid">
						{this.props.children}
					</ol>
				</div>
			</div>;
	}
}

export default BookShelf;

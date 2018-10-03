import React from 'react';
import { camelCaseToRegularForm } from './Util/Functions';
import { categories } from './Util/Constants';

const Book = ({ book, onChangeShelfBook }) => (
	<li>
		<div className="book">
			<div className="book-top">
				<div
					className="book-cover"
					style={{
						width: 128,
						height: 193,
						backgroundImage: `url(${
							book.imageLinks
								? book.imageLinks.smallThumbnail
								: 'https://upload.wikimedia.org/wikipedia/commons/a/a0/Book_icoline.svg'
						})`
					}}
				/>
				<div className="book-shelf-changer">
					<select
						value={book.shelf ? book.shelf : 'none'}
						onChange={e => onChangeShelfBook(e, book)}
					>
						<option value="move" disabled>
							Move to...
						</option>
						{categories.map(cat => (
							<option key={cat} value={cat}>
								{camelCaseToRegularForm(cat)}
							</option>
						))}
					</select>
				</div>
			</div>
			<div className="book-title">{book.title}</div>
			<div className="book-authors">{book.authors ? book.authors.join(',') : 'unknown author'}</div>
		</div>
	</li>
);

export default Book;

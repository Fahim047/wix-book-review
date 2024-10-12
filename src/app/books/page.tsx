import client from '@/lib/wix';

const Book = async () => {
	const books = await client.items
		.queryDataItems({
			dataCollectionId: 'Books',
		})
		.find()
		.then((res) => res.items.map((item) => item.data));
	// console.log(books);
	return (
		<div>
			<h2 className="text-2xl font-bold mb-12">All Books</h2>
			<div className="grid md:grid-cols-3 gap-6">
				{books.map((book) => (
					<div key={book?._id}>
						<h3>Title: {book?.title}</h3>
						<p className="text-gray-400">Author: {book?.author}</p>
						<p className="text-gray-400">Genre: {book?.genre}</p>
					</div>
				))}
			</div>
		</div>
	);
};

export default Book;

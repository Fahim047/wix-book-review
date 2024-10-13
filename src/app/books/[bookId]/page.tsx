import client, { convertWixImageToUrl } from '@/lib/wix';
import { BookImageIcon, BookOpen, Clock } from 'lucide-react';
import Image from 'next/image';
const BookDetails = async ({ params }: { params: { bookId: string } }) => {
	const { data: book } = await client.items.getDataItem(params.bookId, {
		dataCollectionId: 'Books',
	});
	console.log(book);
	return (
		<div className="container mx-auto px-4 py-8">
			<div className="grid md:grid-cols-3 gap-8">
				<div className="md:col-span-1">
					{book?.image ? (
						<Image
							width={200}
							height={400}
							src={convertWixImageToUrl(book?.image)}
							alt={`Cover of ${book?.title}`}
							className="w-full rounded-lg shadow-lg"
						/>
					) : (
						<div className="bg-gray-200 flex-shrink-0 w-[150px] h-[250px] flex flex-col justify-center items-center gap-2 text-center">
							<BookImageIcon />
							<p>No Image Available</p>
						</div>
					)}
				</div>
				<div className="md:col-span-2">
					<h1 className="text-3xl font-bold mb-2">{book?.title}</h1>
					<h2 className="text-xl text-muted-foreground mb-4">
						by {book?.author}
					</h2>
					<p className="mb-4">{book?.description}</p>
					<div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
						<div className="flex items-center">
							<BookOpen className="w-4 h-4 mr-1" />
							180 pages
						</div>
						<div className="flex items-center">
							<Clock className="w-4 h-4 mr-1" />
							Published {book?.publicationDate}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default BookDetails;

import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import client, { convertWixImageToUrl } from '@/lib/wix';
import { BookImageIcon, Star } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const BooksPage = async () => {
	const books = await client.items
		.queryDataItems({
			dataCollectionId: 'Books',
		})
		.find()
		.then((res) => res.items.map((item) => item.data))
		.catch((error) => {
			console.error('Error fetching books:', error);
		});
	return (
		<div className="container mx-auto px-4 py-8">
			<h1 className="text-3xl font-bold mb-8">All Books</h1>
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
				{books?.map((book) => (
					<Card key={book?._id} className="flex flex-col">
						<CardHeader className="flex items-center justify-center">
							{book?.image ? (
								<Image
									width={150}
									height={250}
									src={convertWixImageToUrl(book.image)}
									alt={`Cover of ${book?.title}`}
									className="w-[150px] h-[250px] object-cover rounded-lg shadow-lg"
								/>
							) : (
								<div className="bg-gray-200 rounded-lg w-[150px] h-[250px] flex flex-col justify-center items-center gap-2 text-center">
									<BookImageIcon />
									<p>No Image Available</p>
								</div>
							)}
						</CardHeader>
						<CardContent className="flex-grow p-4">
							<CardTitle className="text-lg mb-2">{book?.title}</CardTitle>
							<p className="text-sm text-muted-foreground mb-2">
								{book?.author}
							</p>
							<p className="text-muted-foreground mb-2 line-clamp-3">
								{book?.description}
							</p>
							<p className="text-sm mb-2">{book?.genre}</p>
							<div className="flex items-center">
								{[...Array(5)].map((_, i) => (
									<Star
										key={i}
										className={`w-4 h-4 ${
											i < Math.floor(4.5)
												? 'text-yellow-400 fill-yellow-400'
												: 'text-gray-300'
										}`}
									/>
								))}
								<span className="ml-2 text-sm text-muted-foreground">4.5</span>
							</div>
						</CardContent>
						<CardFooter className="p-4 pt-0">
							<Button asChild>
								<Link href={`/books/${book?._id}`}>View Details</Link>
							</Button>
						</CardFooter>
					</Card>
				))}
			</div>
		</div>
	);
};

export default BooksPage;

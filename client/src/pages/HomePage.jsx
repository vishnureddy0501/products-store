import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useProductStore } from "../store/product";
import ProductCard from "../components/ProductCard";

const HomePage = () => {
	const { fetchProducts, products } = useProductStore();

	useEffect(() => {
		fetchProducts();
	}, [fetchProducts]);

	return (
		<div className="max-w-7xl mx-auto px-4 py-12">
			<div className="flex flex-col items-center space-y-8">
				<h1 className="text-[30px] font-bold text-center bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
					Current Products 🚀
				</h1>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 w-full">
					{products.map((product) => (
						<ProductCard key={product._id} product={product} />
					))}
				</div>

				{products.length === 0 && (
					<p className="text-xl font-bold text-center text-gray-500">
						No products found 😢{" "}
						<Link to="/create" className="text-blue-500 hover:underline">
							Create a product
						</Link>
					</p>
				)}
			</div>
		</div>
	);
};

export default HomePage;

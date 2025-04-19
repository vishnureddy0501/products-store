import { useState } from "react";
import { useProductStore } from "../store/product";
import toast from "react-hot-toast";

const CreatePage = () => {
	const [newProduct, setNewProduct] = useState({
		name: "",
		price: "",
		image: "",
	});

	const { createProduct } = useProductStore();

	const handleAddProduct = async () => {
		const { success, message } = await createProduct(newProduct);
		if (success) {
			toast.success(message);
		} else {
			toast.error(message);
		}
		setNewProduct({ name: "", price: "", image: "" });
	};

	return (
		<div className="max-w-md mx-auto px-4 py-12">
			<div className="flex flex-col items-center space-y-8">
				<h1 className="text-4xl font-bold text-center">Create New Product</h1>

				<div className="w-full bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
					<div className="flex flex-col space-y-4">
						<input
							type="text"
							placeholder="Product Name"
							className="input input-bordered w-full"
							value={newProduct.name}
							onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
						/>
						<input
							type="number"
							placeholder="Price"
							className="input input-bordered w-full"
							value={newProduct.price}
							onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
						/>
						<input
							type="text"
							placeholder="Image URL"
							className="input input-bordered w-full"
							value={newProduct.image}
							onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
						/>
						<button className="btn btn-primary w-full" onClick={handleAddProduct}>
							Add Product
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CreatePage;

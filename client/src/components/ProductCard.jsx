import { useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import { useProductStore } from "../store/product";
import toast from "react-hot-toast";


const ProductCard = ({ product }) => {
	const [updatedProduct, setUpdatedProduct] = useState(product);
	const [showModal, setShowModal] = useState(false);
	const { deleteProduct, updateProduct } = useProductStore();

	const handleDeleteProduct = async (pid) => {
		const { success, message } = await deleteProduct(pid);
		success ? toast.success(message) :  toast.error(message);
	};

	const handleUpdateProduct = async (pid, updatedProduct) => {
		const { success, message } = await updateProduct(pid, updatedProduct);
		success ? toast.success(message) :  toast.error(message);
		setShowModal(false);
	};

	return (
		<div className="bg-base-100 shadow-lg rounded-lg overflow-hidden hover:-translate-y-1 hover:shadow-xl transition-all">
			<img src={product.image} alt={product.name} className="h-48 w-full object-cover" />

			<div className="p-4">
				<h3 className="text-lg font-semibold mb-1">{product.name}</h3>
				<p className="text-xl font-bold text-gray-600 mb-4">${product.price}</p>

				<div className="flex gap-2">
					<button className="btn btn-sm btn-primary" onClick={() => setShowModal(true)}>
						<Pencil size={18} />
					</button>
					<button className="btn btn-sm btn-error" onClick={() => handleDeleteProduct(product._id)}>
						<Trash2 size={18} />
					</button>
				</div>
			</div>

			{/* Modal */}
			{showModal && (
				<div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center">
					<div className="bg-white dark:bg-neutral rounded-lg shadow-lg p-6 w-full max-w-md relative">
						<button className="absolute top-2 right-2 text-xl" onClick={() => setShowModal(false)}>
							✖
						</button>
						<h2 className="text-2xl font-bold mb-4">Update Product</h2>
						<div className="space-y-4">
							<input
								type="text"
								placeholder="Product Name"
								className="input input-bordered w-full"
								value={updatedProduct.name}
								onChange={(e) => setUpdatedProduct({ ...updatedProduct, name: e.target.value })}
							/>
							<input
								type="number"
								placeholder="Price"
								className="input input-bordered w-full"
								value={updatedProduct.price}
								onChange={(e) => setUpdatedProduct({ ...updatedProduct, price: e.target.value })}
							/>
							<input
								type="text"
								placeholder="Image URL"
								className="input input-bordered w-full"
								value={updatedProduct.image}
								onChange={(e) => setUpdatedProduct({ ...updatedProduct, image: e.target.value })}
							/>

							<div className="flex justify-end gap-2 pt-2">
								<button
									className="btn btn-primary"
									onClick={() => handleUpdateProduct(product._id, updatedProduct)}
								>
									Update
								</button>
								<button className="btn btn-outline" onClick={() => setShowModal(false)}>
									Cancel
								</button>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default ProductCard;

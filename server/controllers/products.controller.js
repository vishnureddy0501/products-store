import products from "../schemas/products.schema.js";
import cloudinary from "../lib/Cloudinary.js";

export const createPost = async (req, res) => {
	try {
		const { name, price, image } = req.body;

		let imageUrl = image;
		if (image && image.startsWith("data:")) {
			const uploadResponse = await cloudinary.uploader.upload(image);
			imageUrl = uploadResponse.secure_url;
		}

		const newPost = await products.create({
			name,
			price,
			image: imageUrl,
		});

		res.status(201).json({ success: true, message: "Product created successfully" });
	} catch (error) {
		console.error("Create Post Error:", error);
		res.status(500).json({ success: false, message: "Internal server error" });
	}
};


export const updateProduct = async (req, res) => {
	try {
		const { _id, name, price, image } = req.body;

		let imageUrl = image;
		if (image && image.startsWith("data:")) {
			const uploadResponse = await cloudinary.uploader.upload(image);
			imageUrl = uploadResponse.secure_url;
		}

		const updatedPost = await products.findByIdAndUpdate(
			_id,
			{ name, price, image: imageUrl },
			{ new: true, runValidators: true }
		);

		if (!updatedPost) {
			return res.status(404).json({ success: false, message: "Product not found" });
		}

		res.status(200).json({ success: true, message: "Product updated successfully" });
	} catch (error) {
		console.error(error);
		res.status(500).json({ success: false, message: "Internal server error" });
	}
};


export const deleteProduct = async (req, res) => {
	try {
		const deletedProduct = await products.findByIdAndDelete(req.params.pid);

		if (!deletedProduct) {
			return res.status(404).json({ success: false, message: "Product not found" });
		}

		res.status(200).json({ success: true, message: "Product deleted successfully" });
	} catch (error) {
		console.error(error);
		res.status(500).json({ success: false, message: "Internal server error" });
	}
};

export const getAllproducts = async (req, res) => {
	try {
		const results = await products.find({});
		if (results) {
			return res.status(200).send({ success: true, data: results });
		}
		// Return an empty array but with a 200 status
		return res.status(200).json({ success: true, data: [] });
	} catch (error) {
		console.error(error); // Log the error for debugging purposes
		return res.status(500).json({ success: false, message: error.message || 'An error occurred' });
	}
};

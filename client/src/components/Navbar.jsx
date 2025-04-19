import { Link } from "react-router-dom";
import { Plus, Moon, Sun } from "lucide-react"; // Lucide icons

const Navbar = () => {
	// If you're managing dark mode manually, you can add your logic here
	const toggleColorMode = () => {
		document.documentElement.classList.toggle("dark");
	};

	return (
		<div className="max-w-[1140px] mx-auto px-4 py-4">
			<div className="flex flex-col sm:flex-row justify-between items-center h-16">
				<h1 className="text-2xl sm:text-3xl font-bold uppercase text-center bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
					<Link to="/">Product Store 🛒</Link>
				</h1>

				<div className="flex items-center space-x-2 mt-2 sm:mt-0">
					<Link to="/create">
						<button className="btn btn-primary btn-sm">
							<Plus size={20} />
						</button>
					</Link>
					<button className="btn btn-outline btn-sm" onClick={toggleColorMode}>
						{/* You could also use a state to toggle icon */}
						<Sun size={20} className="hidden dark:inline" />
						<Moon size={20} className="inline dark:hidden" />
					</button>
				</div>
			</div>
		</div>
	);
};

export default Navbar;

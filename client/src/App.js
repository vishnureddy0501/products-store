import React from "react";
import RouterConfig from "./Router.js";
import "./Global.scss";
import { Toaster } from "react-hot-toast";
import Navbar from "./components/Navbar";


function App() {
	return (
		<div className="app-container">
			<Navbar />
			<Toaster />
			<RouterConfig />
		</div>
	);
}

export default App;


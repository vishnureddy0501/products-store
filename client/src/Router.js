import { Routes, Route } from "react-router-dom";
import CreatePage from "./pages/CreatePage";
import HomePage from "./pages/HomePage";

const RouterConfig = () => {
	return (
		<Routes>
            <Route path='/' element={<HomePage />} />
			<Route path='/create' element={<CreatePage />} />
		</Routes>
	);
};

export default RouterConfig;
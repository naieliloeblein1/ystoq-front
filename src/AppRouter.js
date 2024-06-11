import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AppLayout from "./layouts/app-layout";
import Login from "./views/login";

const AppRouter = () => {
	return (
		<Router>
			<Routes>
				<Route path="/*" element={<AppLayout />} />
				<Route path="/login" element={<Login />} />
			</Routes>
		</Router>
	);
};

export default AppRouter;

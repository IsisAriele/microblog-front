import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Publish from "./pages/Publish";
import Comment from "./pages/Comment";

function App() {
	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route
						path="/"
						element={<Home />}
					/>
					<Route
						path="/register"
						element={<Register />}
					/>

					<Route
						path="/login"
						element={<Login />}
					/>
					<Route
						path="/publish"
						element={<Publish />}
					/>
					<Route
						path="/comment/:id"
						element={<Comment />}
					/>
				</Routes>
			</BrowserRouter>
		</>
	);
}

export default App;

import Button from "../Button";
import { useNavigate } from "react-router-dom";
import { IHeaderProps } from "./IHeaderProps";
import { useEffect, useState } from "react";

/** Componente de header */
function Header({ name }: IHeaderProps) {
	const navigate = useNavigate();
	const [isAutheticated, setIsAutheticated] = useState<boolean>();

	function publishHandleClick() {
		navigate("/publish");
	}

	function loginHandleClick() {
		navigate("/login");
	}

	function createAccountHandleClick() {
		navigate("/register");
	}

	useEffect(() => {
		getToken();
	}, []);

	function getToken() {
		const token = localStorage.getItem("access");
		if (token != undefined) {
			setIsAutheticated(true);
		}
		return token;
	}

	function logout() {
		setIsAutheticated(false);
		localStorage.removeItem("access");
		navigate("/login");
	}

	return (
		<>
			<header className="br-header">
				<div className="container-lg">
					<div className="header-top">
						<div className="header-logo">
							<a href="/">
								<img
									src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Gov.br_logo.svg/1200px-Gov.br_logo.svg.png"
									alt="logo gov.br"
								/>
							</a>
						</div>
						<div className="header-actions">
							<div className="header-login">
								{isAutheticated ? (
									<div className="header-sign-in">
										<Button
											label=""
											action={publishHandleClick}
											icon={
												<i
													className="fa fa-paper-plane"
													aria-hidden="true"
												></i>
											}
											className="br-button circle small"
										/>

										{/* <span className="p ml-3 mr-3">
											Olá, {name}!
										</span> */}

										<Button
											label="Sair"
											className="br-sign-in"
											action={logout}
										/>
									</div>
								) : (
									<div className="header-sign-in">
										<Button
											label="Entrar"
											className="br-sign-in mr-3"
											action={loginHandleClick}
										/>

										<Button
											label="Criar Conta"
											className="br-button primary"
											action={createAccountHandleClick}
										/>
									</div>
								)}
							</div>
						</div>
					</div>
					<div className="header-bottom">
						<div className="header-menu">
							<div className="header-menu-trigger">
								<Button
									label=""
									icon={
										<i
											className="fas fa-bars"
											aria-hidden="true"
										></i>
									}
									className="br-button small circle"
								/>
							</div>
							<div className="header-info">
								<div className="header-title">Blogov</div>
							</div>
						</div>
					</div>
				</div>
			</header>
		</>
	);
}

export default Header;

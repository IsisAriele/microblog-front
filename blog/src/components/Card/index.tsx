import { useNavigate, useParams } from "react-router-dom";
import Button from "../Button";
import "../Card/style.css";
import { ICardProps } from "./ICardProps";

/** Componente de card */
function Card({
	title,
	name,
	description,
	image,
	button,
	id,
	elipse,
	label,
}: ICardProps) {
	const navigate = useNavigate();

	function commentHandleClick() {
		const publicacao = {
			title,
			name,
			description,
			image,
		};
		navigate(`/comment/${id}`, { state: { publicacao: publicacao } });
	}

	const pass = () => {
		console.log("pass");
	};

	return (
		<div>
			<div className="container-lg col-sm-6 col-md-4 col-lg-6">
				<div className="br-card h-fixed">
					<div className="card-header">
						<div className="d-flex">
							<div className="ml-1">
								<div className="text-weight-semi-bold text-up-03">
									{title}
								</div>
								<div>{name}</div>
							</div>
							{elipse ? (
								<div className="ml-auto">
									<Button
										label=""
										className="br-button circle"
										icon={
											<i
												className="fas fa-ellipsis-v"
												aria-hidden="true"
											></i>
										}
										action={pass}
									/>
								</div>
							) : null}
						</div>
					</div>

					<div className="card-content">
						{image ? (
							<div tabIndex={0}>
								<div className="mb-4">
									<img
										src={image}
										className="image"
										alt="Avatar"
									/>
								</div>
							</div>
						) : null}
						<p>{description}</p>
					</div>

					{button ? (
						<div className="card-footer">
							<div className="d-flex">
								<div className="ml-auto">
									<Button
										className="br-button tertiary botao-com-alteracao"
										action={commentHandleClick}
										label={label}
									></Button>
								</div>
							</div>
						</div>
					) : null}
				</div>
			</div>
		</div>
	);
}

export default Card;

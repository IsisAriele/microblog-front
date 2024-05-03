import Button from "../Button";
import "../Card/style.css";

interface ICardProps {
	title: string;
	name: string;
	description: string;
	image?: string;
}

function Card({ title, name, description, image }: ICardProps) {
	function oi() {
		console.log("oi");
	}
	return (
		<div>
			<div className="col-sm-6 col-md-4 col-lg-8">
				<div className="br-card h-fixed">
					<div className="card-header">
						<div className="d-flex">
							<span
								className="br-avatar mr-2"
								title={name}
							>
								<span className="content">
									{image ? (
										<img
											src={image}
											className="avatar-img"
											alt="Avatar"
										/>
									) : (
										<i
											className="fas fa-user"
											aria-hidden="true"
										></i>
									)}
								</span>
							</span>
							<div className="ml-3">
								<div className="text-weight-semi-bold text-up-02">
									{title}
								</div>
								<div>{name}</div>
							</div>
							<div className="ml-auto">
								<button
									className="br-button circle"
									type="button"
									aria-label="Ícone ilustrativo"
								>
									<i
										className="fas fa-ellipsis-v"
										aria-hidden="true"
									></i>
								</button>
							</div>
						</div>
					</div>
					<div
						className="card-content"
						tabIndex={0}
					>
						<p>{description}</p>
					</div>
					<div className="card-footer">
						<div className="d-flex">
							<div className="ml-auto">
								<Button
									className="br-button tertiary"
									action={oi}
									label="Comentar"
								></Button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Card;

import { useEffect, useState } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import CommentService from "../../services/CommentService";
import Card from "../../components/Card";
import { useLocation, useParams } from "react-router-dom";

import { format } from "date-fns";
import Button from "../../components/Button";
import { useForm } from "react-hook-form";

const schema = yup.object().shape({
	comentario: yup
		.string()
		.max(400, "O campo deve ter no máximo 400 caracteres!")
		.required("Necessário escrever uma mensagem!"),
});

function Comment() {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(schema),
	});

	const navigate = useNavigate();

	const [comentarios, setComentarios] = useState<any[]>([]);
	const { id } = useParams();
	const { state } = useLocation();
	// console.log("coiso", state);

	useEffect(() => {
		handleData();
	}, []);

	const handleSaveComment = async (data: any) => {
		try {
			console.log("Aqui", data);
			const comentario = {
				publicacao: id,
				mensagem: data.comentario,
			};
			// formData.append("id", data.publicacao);
			console.log("Aqui5", comentario);
			const response = await CommentService.postarComentario(comentario);
			console.log("Aqui2", response);
			// window.location.reload();
			handleData();
			// navigate("/");
		} catch (error) {
			console.error(error);
		}
	};

	function handleData() {
		CommentService.listarComentarios(id)
			.then((res) => {
				const { data } = res;
				console.log(data);
				setComentarios(data.results);
			})
			.catch((err) => {
				console.error(err);
			});
	}

	function formatDate(data: string) {
		const dataComment = new Date(data);

		const formattedDate = format(dataComment, "dd/MM/yyyy 'às' HH:mm");

		return formattedDate;
	}

	return (
		<>
			{localStorage.key != null ? <Header /> : null}
			<div className="mt-4 mb-4">
				<Card
					title={state.publicacao.title}
					name={state.publicacao.name}
					description={state.publicacao.description}
					image={state.publicacao.image}
				/>
			</div>

			<div className="container-lg col-sm-6 col-md-4 col-lg-6">
				<div className="mt-4 mb-4">
					<form onSubmit={handleSubmit(handleSaveComment)}>
						<div
							className={` ${errors.comentario !== undefined ? "danger" : ""}`}
						>
							<div className="br-textarea">
								<label htmlFor="textarea-id1">
									Escreva o que você achou:
								</label>
								<textarea
									id="textarea-id1"
									placeholder="Digite seu comentário..."
									{...register("comentario")}
								></textarea>
							</div>
							{errors.comentario !== undefined && (
								<span
									className="feedback danger"
									role="alert"
									id="danger"
								>
									<i
										className="fas fa-times-circle"
										aria-hidden="true"
									></i>
									{errors.comentario?.message}
								</span>
							)}
						</div>
						<div className="mt-4">
							<Button
								label="Comentar"
								className="br-button block primary"
								type="submit"
							/>
						</div>
					</form>
				</div>

				<p className="h4">Comentários:</p>
			</div>
			{comentarios.map((comentario) => {
				return (
					<div key={comentario.id}>
						<div className="mt-4 mb-4">
							<Card
								title={comentario.autor.nome}
								name={formatDate(comentario.publicado_em)}
								description={comentario.mensagem}
							/>
						</div>
					</div>
				);
			})}
		</>
	);
}

export default Comment;

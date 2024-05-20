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
	comentario: yup.string(),
});

function Comment() {
	const {
		register,
		handleSubmit,
		control,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(schema),
	});

	const navigate = useNavigate();
	const formData = new FormData();
	const handleSaveComment = async (data) => {
		try {
			console.log(data);
			formData.append("comentario", data.titulo);

			const response = await PublishService.criarPublicacao(formData);
			console.log(response);

			navigate("/");
		} catch (error) {
			console.error(error);
		}
	};

	const [comentarios, setComentarios] = useState<any[]>([]);
	const { id } = useParams();
	const { state } = useLocation();
	// console.log("coiso", state);
	useEffect(() => {
		handleData();
	}, []);

	function formatDate(data: string) {
		const dataComment = new Date(data);

		const formattedDate = format(dataComment, "dd/MM/yyyy 'às' HH:mm");

		return formattedDate;
	}

	// const publicacao = {
	// 	titulo: state.publicacao.title,
	// 	descricao: state.publicacao.description,
	// 	nome: state.publicacao.name,
	// 	imagem: state.publicacao.image,
	// };

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
				</div>

				<div className="mt-4">
					<Button
						label="Comentar"
						className="br-button block primary"
						type="submit"
					/>
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

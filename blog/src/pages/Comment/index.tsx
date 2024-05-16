import { useEffect, useState } from "react";
import Header from "../../components/Header";
import CommentService from "../../services/CommentService";
import Card from "../../components/Card";
import { useLocation, useParams } from "react-router-dom";

import { format } from "date-fns";

function Comment() {
	const [comentarios, setComentarios] = useState<any[]>([]);
	const { id } = useParams();
	const { state } = useLocation();
	console.log("coiso", state);
	useEffect(() => {
		handleData();
	}, []);

	function formatDate(data: string) {
		const dataComment = new Date(data);

		const formattedDate = format(dataComment, "dd/MM/yyyy 'às' HH:mm");

		return formattedDate;
	}

	const publicacao = {
		titulo: state.publicacao.title,
		descricao: state.publicacao.description,
		nome: state.publicacao.name,
		imagem: state.publicacao.image,
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

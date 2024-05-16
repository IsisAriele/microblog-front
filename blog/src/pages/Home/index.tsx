import ".";
import Card from "../../components/Card";
import Header from "../../components/Header";

import { useEffect, useState } from "react";

import PublicationService from "../../services/PublicationService";

function Home() {
	const [publicacoes, setPublicacoes] = useState<any[]>([]);

	useEffect(() => {
		handleData();
	}, []);

	function handleData() {
		PublicationService.listarPublicacoes()
			.then((res) => {
				const { data } = res;
				console.log(data);
				setPublicacoes(data.results);
			})
			.catch((err) => {
				console.error(err);
			});
	}

	return (
		<>
			{localStorage.key != null ? <Header /> : null}

			{publicacoes.map((publicacao) => {
				return (
					<div key={publicacao.id}>
						<div className="mt-4 mb-4">
							<Card
								title={publicacao.titulo}
								name={publicacao.autor.username}
								description={publicacao.descricao}
								image={publicacao.imagem}
								button={true}
								id={publicacao.id}
								elipse={true}
							/>
						</div>
					</div>
				);
			})}
		</>
	);
}

export default Home;

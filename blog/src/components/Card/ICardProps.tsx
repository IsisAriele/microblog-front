export interface ICardProps {
	/** Título da publicação*/
	title?: string;
	/** Nome do usuário da publicação */
	name?: string;
	/** Texto da publicação */
	description: string;
	/** Pôster da publicação */
	image?: string;
	button?: boolean;
	id?: number;
	elipse?: boolean;
	label?: string;
}

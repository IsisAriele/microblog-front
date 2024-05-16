export interface IButtonProps {
	/** Função acionada pelo botão quando clicada */
	action?: () => void;
	/** String renderizada no botão */
	label: string;
	/** Estilização do botão */
	className: string;
	/** Icone referente ao botão */
	icon?: JSX.Element;
	type?: "submit" | "reset" | "button" | undefined;
	buttonId?: number;
}

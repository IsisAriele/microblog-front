import { uniqueId } from "lodash";
import { forwardRef, useEffect, useState } from "react";
import { Controller } from "react-hook-form";

interface UploadProps extends React.ComponentPropsWithRef<"input"> {
	control: any;
	label: string;
	name: string;
	onChange?: (e: any) => void;
	error?: any;
}

const UploadWrapper = forwardRef((props: UploadProps, _ref): JSX.Element => {
	const { label, onChange, error } = props;
	const id = uniqueId("single-file-");
	const [files, setFiles] = useState<File[]>([]);
	const [errors, setErrors] = useState(error);

	useEffect(() => {
		setErrors(error);
	}, [error]);

	const handleClick = () => {
		const inputElement = document.getElementById(id) as HTMLInputElement;
		if (inputElement) {
			inputElement.click();
		}
	};

	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		console.log(event.target.files);
		if (event.target.files) {
			const fileArray = Array.from(event.target.files);
			setFiles(fileArray);
			setErrors(undefined);
			setFilesChange(fileArray);
		}
	};

	function convertBytesToKB(bytes: number): string {
		return (bytes / 1024).toFixed(2) + " KB";
	}

	function removeFile(index: number): void {
		setFiles(files.splice(index, index));
		setFilesChange(undefined);
	}

	function setFilesChange(files: any): void {
		if (onChange !== undefined) {
			onChange(files);
		}
	}

	return (
		<>
			<div
				className={`br-upload ${props.className}}`}
				data-danger={errors}
			>
				<label
					className="upload-label"
					htmlFor={id}
				>
					<span>{label}</span>
				</label>
				<input
					{...props}
					className="upload-input"
					id={id}
					type="file"
					aria-hidden={false}
					aria-label="enviar arquivo"
					onChange={handleFileChange}
				/>
				<button
					className="upload-button"
					type="button"
					aria-hidden="true"
					onClick={handleClick}
				>
					<i
						className="fas fa-upload"
						aria-hidden="true"
					/>
					<span>{props.placeholder ?? "Selecione o arquivo"}</span>
				</button>
				<div className="upload-list">
					{files.map((file, index) => (
						<div
							className="br-item d-flex"
							key={index}
						>
							<div className="content text-primary-default mr-auto">
								{file.name}
							</div>
							<div className="name" />
							<div className="support mr-n2">
								<span className="mr-1">
									{convertBytesToKB(file.size)}
								</span>
								<button
									className="br-button circle"
									type="button"
									aria-label={`apagar ${file.name}`}
									onClick={() => {
										removeFile(index);
										setErrors(undefined);
									}}
								>
									<i className="fa fa-trash" />
								</button>
							</div>
						</div>
					))}
				</div>
			</div>
			{errors !== undefined && (
				<span
					className="feedback danger mt-1"
					role="alert"
				>
					<i
						className="fas fa-times-circle"
						aria-hidden="true"
					/>
					{errors.message}
				</span>
			)}
		</>
	);
});

function Upload(props: UploadProps) {
	const { control, name } = props;

	return control !== undefined ? (
		<Controller
			control={control}
			name={name}
			render={({
				field: { onChange, onBlur, ref },
				fieldState: { error },
			}) => (
				<UploadWrapper
					{...props}
					onChange={onChange}
					onBlur={onBlur}
					ref={ref}
					error={error}
				/>
			)}
		/>
	) : (
		<UploadWrapper {...props} />
	);
}

export default Upload;

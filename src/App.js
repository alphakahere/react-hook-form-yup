import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import 'bootstrap/dist/css/bootstrap.min.css'

const App = () => {
	const validationSchema = Yup.object().shape({
		name: Yup.string()
			.required("ce champ est obligatoire")
			.min(5, "trop petit!")
			.max(50, "trop long!"),
		email: Yup.string()
			.email("email invalide")
			.required("l'email est obligatoire"),
		password: Yup.string()
			.required("Mot de passe est obligatoire")
			.matches(/([0-9])/, "Au moins un entier")
			.min(8, "Mot de passe doit être plus grand que 8 caractères")
			.max(
				50,
				"Mot de passe doit être plus petit que 50 caractères"
			),
		confirmPassword: Yup.string().oneOf(
			[Yup.ref("password"), null],
			"Le mot de passe de confirmation ne correspond pas"
		),
		acceptTerms: Yup.bool().oneOf(
			[true],
			"Accepter les conditions est obligatoire"
		),
	});

	const { register, handleSubmit, formState, reset } = useForm({
		mode: "onBlur",
		defaultValues: {
			name: "",
			email: "",
			password: "",
			confirmPassword: "",
			acceptTerms: false,
		},
		resolver: yupResolver(validationSchema),
	});

	const { errors } = formState;

	const onSubmit = (data) => {
		console.log(data);
		reset()
	};

	return (
		<div className="container pt-4">
			<div className="row">
				<div className="col-md-6 offset-md-3">
					<form onSubmit={handleSubmit(onSubmit)}>
						<h1 className="text-center">Inscription</h1>
						<div className="form-group mb-3">
							<label htmlFor="name">
								Nom Complet:
							</label>
							<input
								type="text"
								className="form-control"
								{...register("name")}
								name="name"
								id="name"
							/>
							<small className="text-danger">
								{errors.name?.message}
							</small>
						</div>
						<div className="form-group mb-3">
							<label htmlFor="email">Email:</label>
							<input
								type="email"
								className="form-control"
								{...register("email")}
							/>
							<small className="text-danger">
								{errors.email?.message}
							</small>
						</div>
						<div className="form-group mb-3">
							<label htmlFor="password">
								password:
							</label>
							<input
								type="password"
								className="form-control"
								{...register("password")}
								name="password"
								id="password"
							/>
							<small className="text-danger">
								{errors.password?.message}
							</small>
						</div>
						<div className="form-group mb-3">
							<label htmlFor="confirmPassword">
								confirmPassword:
							</label>
							<input
								type="password"
								className="form-control"
								{...register("confirmPassword")}
								name="confirmPassword"
								id="confirmPassword"
							/>
							<small className="text-danger">
								{
									errors.confirmPassword
										?.message
								}
							</small>
						</div>
						<div className="form-check">
							<label
								htmlFor="acceptTerms"
								className="form-check-label"
							>
								J'ai lu et j'accepte les
								conditions
							</label>
							<input
								type="checkbox"
								className="form-check-input"
								{...register("acceptTerms")}
								name="acceptTerms"
							/>
							<small className="text-danger d-block">
								{errors.acceptTerms?.message}
							</small>
						</div>
						<div className="form-group d-flex justify-content-center mt-4 justify-content-md-end gap-3">
							<button
								type="submit"
								className="btn btn-primary"
							>
								S'inscrire
							</button>
							<button
								type="button"
								className="btn btn-danger"
								onClick={() => reset()}
							>
								Annuler
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default App;

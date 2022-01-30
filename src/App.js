import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from "yup";

const App = () => {
    const validationSchema = Yup.object().shape({
        firstName: Yup.string()
            .min(5, "trop petit")
            .max(50, "trop long!")
            .required("Ce champ est obligatoire"),
        lastName: Yup.string()
            .min(2, "trop petit")
            .max(10, "trop long!")
            .required("Ce champ est obligatoire"),
        email: Yup.string()
            .email("email invalide")
            .required("l'email est obligatoire"),
        password: Yup.string()
            .required("Mot de passe est obligatoire")
            .min(8, "Mot de passe doit être plus grand que 8 caractères")
            .max(50, "Mot de passe doit être plus petit que 50 caractères"),
        confirmPassword: Yup.string()
            .required("Confirmation de mot de passe est obligatoire")
            .oneOf(
                [Yup.ref("password"), null],
                "Le mot de passe de confirmation ne correspond pas"
            ),
        acceptTerms: Yup.bool().oneOf([true], "Accepter les conditions est obligatoire"),
    });
  return (
    <div>
        <h1>Validation des formulaires en react à l'aide de react-hook-form et yup</h1>
    </div>
  );
};

export default App;

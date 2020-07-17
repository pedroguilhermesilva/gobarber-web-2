import { ValidationError } from 'yup';

interface Erros {
  // this way tell that interface can be any of string, don't care about name of key
  [key: string]: string;
}

export default function getValidationErros(err: ValidationError): Erros {
  const validationErrors: Erros = {};

  err.inner.forEach((error) => {
    validationErrors[error.path] = error.message;
  });

  return validationErrors;
}

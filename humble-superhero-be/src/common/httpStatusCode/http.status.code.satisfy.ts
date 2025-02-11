function informational(statusCode: number): boolean {
  return statusCode >= 100 && statusCode < 200;
}

function succesful(statusCode: number): boolean {
  return statusCode >= 200 && statusCode < 300;
}

function redirection(statusCode: number): boolean {
  return statusCode >= 300 && statusCode < 400;
}

function clientError(statusCode: number): boolean {
  return statusCode >= 400 && statusCode < 500;
}

function serverError(statusCode: number): boolean {
  return statusCode >= 500;
}

export const HttpStatusCodeSatisfy = {
  informational,
  succesful,
  redirection,
  clientError,
  serverError,
};

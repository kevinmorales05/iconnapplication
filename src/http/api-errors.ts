export type GeneralApiProblem = { kind: string };

/**
 * Attempts to get a common cause of general problems from an api response.
 *
 * @param response The api response code.
 */
export function getGeneralApiProblem(response: number): GeneralApiProblem {
  switch (response) {
    case 400:
      return { kind: "400 - Lo sentimos :( \nLos datos enviados son incorrectos." };
    case 401:
      return { kind: "401 - Lo sentimos :( \nExiste un problema de autorización." };
    case 403:
      return { kind: "403 - Lo sentimos :( \nExiste un problema, se intenta acceder a recursos prohibidos." };
    case 404:
      return { kind: "404 - Lo sentimos :( \nExiste un problema, no se encontró la información." };
    case 500:
      return { kind: "500 - Lo sentimos :( \nHa ocurrido un error en nuestros servidores." };
    case 502:
      return { kind: "502 - Lo sentimos :( \nHa ocurrido un error en la puerta de entrada a nuestros servidores" };
    case 503:
      return { kind: "503 - Lo sentimos :( \nHa ocurrido un error, servicio no disponible por el momento, inténtalo más tarde." };
    case 504:
      return { kind: "504 - Lo sentimos :( \nHa ocurrido un error y se agoto el tiempo de espera." };
    default:
      return { kind: "Error desconocido" };
  }
}

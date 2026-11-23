// erros.js: um formato único para os erros da API.
// Em qualquer parte do código: throw new ErroApi(404, 'Mensagem')
// O middleware de erros do app.js transforma isso na resposta { erro, detalhes }.
export class ErroApi extends Error {
    constructor(status, mensagem, detalhes) {
      super(mensagem);
      this.status = status;
      this.detalhes = detalhes;
    }
  }
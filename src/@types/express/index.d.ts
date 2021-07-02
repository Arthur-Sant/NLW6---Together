// vai sobrescrever o metodo
declare namespace Express {

  //exporta adicionando a variavel
  export interface Request {
    user_id: string;
  }
}
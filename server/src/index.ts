import { EntradaDTO } from "../../types/dist/types";
import { Teste } from "../../types/dist/Teste";

const entrada: EntradaDTO = {
  name: "Teste"
}

const teste = new Teste("1", entrada.name);

console.log(teste.getName())
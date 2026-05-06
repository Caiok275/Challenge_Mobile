import { Pet } from "../model/Pet";

const URL = "http://localhost:8080";

function montarPet(pet: Pet) {
  return {
    nome: pet.nome,
    especie: pet.especie,
    raca: pet.raca,
    idade: pet.idade,
    peso: pet.peso,
    tutorId: Number(pet.tutorId),
  };
}

export async function cadastrarPet(pet: Pet): Promise<Pet> {
  const resposta = await fetch(`${URL}/pets`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(montarPet(pet)),
  });

  if (!resposta.ok) {
    throw new Error("Erro ao cadastrar pet");
  }

  return resposta.json();
}

export async function buscarPetPorId(id: number): Promise<Pet> {
  const resposta = await fetch(`${URL}/pets/${id}`);

  if (!resposta.ok) {
    throw new Error("Pet não encontrado ou não cadastrado");
  }

  const dados = await resposta.json();

  return {
    ...dados,
  };
}
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Pet, petInicial } from "../model/Pet";
import { cadastrarPet, buscarPetPorId } from "../repository/VetAPI";

export default function usePetControl() {
  const [pet, setPet] = useState<Pet>(petInicial);
  const [loading, setLoading] = useState(false);
  const [mensagem, setMensagem] = useState("");
  const [erro, setErro] = useState("");

  function atualizarCampo(campo: keyof Pet, valor: string) {
    setPet((petAtual) => ({
      ...petAtual,
      [campo]: campo === "tutorId" ? Number(valor) : valor,
    }));
  }

  async function salvarLocalmente() {
    try {
      await AsyncStorage.setItem("@pet", JSON.stringify(pet));

      setMensagem("Pet salvo localmente com sucesso!");
      setErro("");
    } catch {
      setErro("Erro ao salvar pet localmente.");
      setMensagem("");
    }
  }

  async function carregarPetLocal() {
    try {
      const dados = await AsyncStorage.getItem("@pet");

      if (dados) {
        setPet(JSON.parse(dados));
        setMensagem("Pet carregado localmente com sucesso!");
      } else {
        setMensagem("Nenhum pet salvo localmente.");
      }

      setErro("");
    } catch {
      setErro("Erro ao carregar pet salvo.");
      setMensagem("");
    }
  }

  async function enviarParaAPI() {
    try {
      setLoading(true);

      const petCadastrado = await cadastrarPet(pet);

      await AsyncStorage.setItem("@pet", JSON.stringify(petCadastrado));

      if (petCadastrado.id) {
        await AsyncStorage.setItem("@petId", String(petCadastrado.id));
      }

      setPet({
        ...petCadastrado,
      });

      setMensagem("Pet cadastrado na API com sucesso!");
      setErro("");
    } catch {
      setErro("Erro ao enviar pet para a API.");
      setMensagem("");
    }
  }

  async function buscarPetSalvoNaAPI() {
    try {
      setLoading(true);

      const petId = await AsyncStorage.getItem("@petId");

      if (!petId) {
        setErro("Nenhum petId salvo localmente.");
        setMensagem("");
        return;
      }

      const petEncontrado = await buscarPetPorId(Number(petId));

      setPet(petEncontrado);
      setMensagem("Pet carregado da API com sucesso!");
      setErro("");
    } catch {
      setErro("Erro ao buscar pet na API.");
      setMensagem("");
    } finally {
      setLoading(false);
    }
  }

  async function limparFormulario() {
    try {
      setPet(petInicial);
      setMensagem("");
      setErro("");
    } catch {
      setErro("Erro ao limpar formulário.");
    }
  }

  async function apagarPetLocal() {
    try {
      await AsyncStorage.removeItem("@pet");
      await AsyncStorage.removeItem("@petId");

      setPet(petInicial);
      setMensagem("Pet removido do armazenamento local.");
      setErro("");
    } catch {
      setErro("Erro ao apagar pet local.");
      setMensagem("");
    }
  }

  return {
    pet,
    loading,
    mensagem,
    erro,
    atualizarCampo,
    salvarLocalmente,
    carregarPetLocal,
    enviarParaAPI,
    buscarPetSalvoNaAPI,
    limparFormulario,
    apagarPetLocal,
  };
}
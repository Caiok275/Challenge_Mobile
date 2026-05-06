import React from "react";
import { View, Text, StyleSheet, Pressable, ScrollView } from "react-native";
import type { DrawerScreenProps } from "@react-navigation/drawer";
import type { RootDrawerParamList } from "../../App";

type CuidadosProps = DrawerScreenProps<RootDrawerParamList, "Cuidados"> & {
  token: string | null;
};

const cuidadosMock = [
  {
    titulo: "Vacina antirrábica",
    descricao: "Aplicação anual recomendada para proteção do pet.",
    status: "Pendente",
  },
  {
    titulo: "Check-up anual",
    descricao: "Consulta preventiva para avaliar a saúde geral do animal.",
    status: "Recomendado",
  },
  {
    titulo: "Retorno veterinário",
    descricao: "Reconsulta após atendimento, exame ou tratamento.",
    status: "Agendável",
  },
  {
    titulo: "Controle de peso",
    descricao: "Acompanhamento mensal para prevenir obesidade.",
    status: "Em acompanhamento",
  },
];

const CuidadosScreen: React.FC<CuidadosProps> = ({ navigation, token }) => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Jornada de Cuidados</Text>

      <Text style={styles.status}>
        Status: {token ? "Usuário autenticado" : "Usuário não autenticado"}
      </Text>

      <Text style={styles.description}>
        Acompanhe vacinas, retornos, exames e cuidados preventivos importantes
        para manter a saúde do pet em dia.
      </Text>

      {cuidadosMock.map((cuidado, index) => (
        <View style={styles.card} key={index}>
          <Text style={styles.cardTitle}>{cuidado.titulo}</Text>
          <Text style={styles.cardText}>{cuidado.descricao}</Text>
          <Text style={styles.badge}>Status: {cuidado.status}</Text>
        </View>
      ))}

      <Pressable
        style={styles.button}
        onPress={() => navigation.navigate("Triagem")}
      >
        <Text style={styles.buttonText}>Fazer Triagem de Risco</Text>
      </Pressable>
    </ScrollView>
  );
};

export default CuidadosScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "#f8fafc",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#1e293b",
    marginBottom: 8,
  },
  status: {
    fontSize: 13,
    color: "#64748b",
    marginBottom: 16,
  },
  description: {
    fontSize: 15,
    color: "#475569",
    lineHeight: 22,
    marginBottom: 20,
  },
  card: {
    backgroundColor: "#ffffff",
    padding: 18,
    borderRadius: 14,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: "#e2e8f0",
  },
  cardTitle: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#2563eb",
    marginBottom: 8,
  },
  cardText: {
    fontSize: 15,
    color: "#475569",
    lineHeight: 21,
    marginBottom: 10,
  },
  badge: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#0f172a",
  },
  button: {
    backgroundColor: "#2563eb",
    padding: 16,
    borderRadius: 12,
    marginTop: 8,
    marginBottom: 32,
  },
  buttonText: {
    color: "#ffffff",
    fontWeight: "bold",
    textAlign: "center",
  },
});
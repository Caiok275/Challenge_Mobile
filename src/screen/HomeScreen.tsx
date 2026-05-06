import { View, Text, StyleSheet, Pressable } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { AnyActionArg } from "react";

type Props = {
  navigation: NativeStackNavigationProp<any>;
};

export default function HomeScreen({ navigation }: Props ) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Clyvo PetCare</Text>

      <Text style={styles.subtitle}>
        Página inicial do aplicativo, onde o usuário pode acessar as principais funcionalidades.
      </Text>

      <Pressable
        style={styles.button}
        onPress={() => navigation.navigate("CadastroPet")}
      >
        <Text style={styles.buttonText}>Cadastrar Pet</Text>
      </Pressable>

      <Pressable
        style={styles.button}
        onPress={() => navigation.navigate("Vet")}
      >
        <Text style={styles.buttonText}>Perfil Veterinário</Text>
      </Pressable>

      <Pressable
        style={styles.button}
        onPress={() => navigation.navigate("Cuidados")}
      >
        <Text style={styles.buttonText}>Jornada de Cuidados</Text>
      </Pressable>

      <Pressable
        style={styles.button}
        onPress={() => navigation.navigate("Triagem")}
      >
        <Text style={styles.buttonText}>Triagem de Risco</Text>
      </Pressable>

      <Pressable
        style={styles.button}
        onPress={() => navigation.navigate("Historico")}
      >
        <Text style={styles.buttonText}>Histórico</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "#f8fafc",
    justifyContent: "center",
  },
  title: {
    fontSize: 34,
    fontWeight: "bold",
    color: "#1e293b",
    textAlign: "center",
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    color: "#475569",
    textAlign: "center",
    marginBottom: 32,
  },
  button: {
    backgroundColor: "#2563eb",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
  },
});
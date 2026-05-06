import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function HistoricoScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Histórico</Text>
      <Text style={styles.text}>
        Aqui vamos carregar os dados salvos localmente com AsyncStorage
      </Text>
    </View>
  );
}




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
    marginBottom: 12,
  },
  text: {
    fontSize: 16,
    color: "#475569",
  },
});
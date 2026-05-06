import React, { useState } from "react";
import {
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  Switch,
  TextInput,
  View,
} from "react-native";
// import AsyncStorage from "@react-native-async-storage/async-storage";
import type { DrawerScreenProps } from "@react-navigation/drawer";
import type { RootDrawerParamList } from "../../App";

type TriagemProps = DrawerScreenProps<RootDrawerParamList, "Triagem"> & {
  token: string | null;
};

type TriagemLocal = {
  apetiteReduzido: boolean;
  vomito: boolean;
  diarreia: boolean;
  apatia: boolean;
  dificuldadeRespirar: boolean;
  observacoes: string;
};

type ResultadoTriagem = {
  nivel: string;
  mensagem: string;
  observacoes: string;
  data: string;
};




const TriagemScreen: React.FC<TriagemProps> = ({ navigation, token }) => {
  const [triagem, setTriagem] = useState<TriagemLocal>({
    apetiteReduzido: false,
    vomito: false,
    diarreia: false,
    apatia: false,
    dificuldadeRespirar: false,
    observacoes: "",
  });
  const [resultado, setResultado] = useState<ResultadoTriagem | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch("/api/triagem", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(triagem),
      });
      const data = await response.json();
      setResultado(data);
    } catch (err) {
      setError("Erro ao enviar triagem");
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setTriagem({
      apetiteReduzido: false,
      vomito: false,
      diarreia: false,
      apatia: false,
      dificuldadeRespirar: false,
      observacoes: "",
    });
    setResultado(null);
    setError("");
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Triagem</Text>
      <Text style={styles.status}>Preencha os sintomas</Text>
      <View style={styles.card}>
        <Text style={styles.label}>Sintomas</Text>
        <View style={styles.switchRow}>
          <Text style={styles.switchLabel}>Apetite reduzido</Text>
          <Switch
            value={triagem.apetiteReduzido}
            onValueChange={(value) =>
              setTriagem({ ...triagem, apetiteReduzido: value })
            }
          />
        </View>
        <View style={styles.switchRow}>
          <Text style={styles.switchLabel}>Vômito</Text>
          <Switch
            value={triagem.vomito}
            onValueChange={(value) =>
              setTriagem({ ...triagem, vomito: value })
            }
          />
        </View>
        <View style={styles.switchRow}>
          <Text style={styles.switchLabel}>Diarreia</Text>
          <Switch
            value={triagem.diarreia}
            onValueChange={(value) =>
              setTriagem({ ...triagem, diarreia: value })
            }
          />
        </View>
        <View style={styles.switchRow}>
          <Text style={styles.switchLabel}>Apatia</Text>
          <Switch
            value={triagem.apatia}
            onValueChange={(value) =>
              setTriagem({ ...triagem, apatia: value })
            }
          />
        </View>
        <View style={styles.switchRow}>
          <Text style={styles.switchLabel}>Dificuldade para respirar</Text>
          <Switch
            value={triagem.dificuldadeRespirar}
            onValueChange={(value) =>
              setTriagem({ ...triagem, dificuldadeRespirar: value })
            }
          />
        </View>
        <Text style={styles.label}>Observações</Text>
        <TextInput
          style={styles.textArea}
          multiline
          value={triagem.observacoes}
          onChangeText={(text) =>
            setTriagem({ ...triagem, observacoes: text })
          }
        />
      </View>
      <Pressable
        style={styles.button}
        onPress={handleSubmit}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? "Enviando..." : "Enviar Triagem"}
        </Text>
      </Pressable>
      <Pressable style={styles.clearButton} onPress={handleClear}>
        <Text style={styles.buttonText}>Limpar</Text>
      </Pressable>
      {error && <Text style={styles.error}>{error}</Text>}
      {resultado && (
        <View style={styles.resultCard}>
          <Text style={styles.resultTitle}>Resultado</Text>
          <Text style={styles.resultText}>Nível: {resultado.nivel}</Text>
          <Text style={styles.resultText}>Mensagem: {resultado.mensagem}</Text>
          <Text style={styles.resultText}>
            Observações: {resultado.observacoes}
          </Text>
          <Text style={styles.resultText}>Data: {resultado.data}</Text>
        </View>
      )}
    </ScrollView>
  );
};

export default TriagemScreen;

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
    borderRadius: 14,
    padding: 18,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    marginBottom: 18,
  },
  switchRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 8,
  },
  switchLabel: {
    fontSize: 15,
    color: "#334155",
    flex: 1,
  },
  label: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#334155",
    marginBottom: 6,
  },
  textArea: {
    backgroundColor: "#ffffff",
    padding: 14,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#cbd5e1",
    minHeight: 100,
    textAlignVertical: "top",
    marginBottom: 14,
  },
  button: {
    backgroundColor: "#2563eb",
    padding: 16,
    borderRadius: 12,
    marginBottom: 10,
  },
  clearButton: {
    backgroundColor: "#f97316",
    padding: 16,
    borderRadius: 12,
    marginBottom: 14,
  },
  buttonText: {
    color: "#ffffff",
    fontWeight: "bold",
    textAlign: "center",
  },
  resultCard: {
    backgroundColor: "#ffffff",
    padding: 18,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    marginBottom: 14,
  },
  resultTitle: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#16a34a",
    marginBottom: 8,
  },
  resultText: {
    fontSize: 15,
    color: "#334155",
    lineHeight: 22,
    marginBottom: 4,
  },
  success: {
    color: "#16a34a",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 12,
  },
  error: {
    color: "#dc2626",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 12,
  },
  secondaryButton: {
    backgroundColor: "#ffffff",
    padding: 16,
    borderRadius: 12,
    marginBottom: 32,
    borderWidth: 1,
    borderColor: "#2563eb",
  },
  secondaryButtonText: {
    color: "#2563eb",
    fontWeight: "bold",
    textAlign: "center",
  },
});
import "react-native-gesture-handler";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import HomeScreen from "./src/screen/HomeScreen";
import CadastroPetScreen from "./src/screen/CadastroPetScreen";
import VetScreen from "./src/screen/VetScreen";
import CuidadosScreen from "./src/screen/CuidadosScreen";
import TriagemScreen from "./src/screen/TriagemScreen";
import HistoricoScreen from "./src/screen/HistoricoScreen";

export type RootDrawerParamList = {
  Home: undefined;
  CadastroPet: undefined;
  Vet: undefined;
  Cuidados: undefined;
  Triagem: undefined;
  Historico: undefined;
};

const { Navigator, Screen } = createDrawerNavigator<RootDrawerParamList>();

type TelaDrawer = {
  name: keyof RootDrawerParamList;
  title: string;
  drawerLabel: string;
  component: React.ComponentType<any>;
};

const telasDrawer: TelaDrawer[] = [
  {
    name: "Home",
    title: "Início",
    drawerLabel: "Início",
    component: HomeScreen,
  },
  {
    name: "CadastroPet",
    title: "Cadastro do Pet",
    drawerLabel: "Cadastrar Pet",
    component: CadastroPetScreen,
  },
  {
    name: "Vet",
    title: "Veterinário",
    drawerLabel: "Veterinário",
    component: VetScreen,
  },
  {
    name: "Cuidados",
    title: "Jornada de Cuidados",
    drawerLabel: "Cuidados",
    component: CuidadosScreen,
  },
  {
    name: "Triagem",
    title: "Triagem de Risco",
    drawerLabel: "Triagem",
    component: TriagemScreen,
  },
  {
    name: "Historico",
    title: "Histórico do Pet",
    drawerLabel: "Histórico",
    component: HistoricoScreen,
  },
];

export default function App() {
  const token: string | null = null;

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <Navigator
          initialRouteName="Home"
          screenOptions={{
            headerStyle: {
              backgroundColor: "#2563eb",
            },
            headerTintColor: "#ffffff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
            drawerActiveTintColor: "#2563eb",
            drawerLabelStyle: {
              fontSize: 15,
              fontWeight: "600",
            },
          }}
        >
          {telasDrawer.map((tela) => {
            const Component = tela.component;

            return (
              <Screen
                key={tela.name}
                name={tela.name}
                options={{
                  title: tela.title,
                  drawerLabel: tela.drawerLabel,
                }}
              >
                {(navProps) => <Component {...navProps} token={token} />}
              </Screen>
            );
          })}
        </Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
} 
import { useState } from "react";
import firestore from "@react-native-firebase/firestore";
import { useNavigation } from "@react-navigation/native";

import { VStack } from "native-base";
import { Button } from "../components/Button";

import { Header } from "../components/Header";
import { Input } from "../components/Input";
import { Alert } from "react-native";

export function Register() {
  const [isLoading, setIsLoading] = useState(false);
  const [patrimony, setPatrimony] = useState("");
  const [description, setDesciption] = useState("");

  const navigation = useNavigation();

  function handleNewOrder() {
    if (!patrimony || !description) {
      Alert.alert("Registrar", "Preencha todos os campos.");
    }

    setIsLoading(true);
    firestore()
      .collection("orders")
      .add({
        patrimony,
        description,
        status: "open",
        created_at: firestore.FieldValue.serverTimestamp(),
      })
      .then(() => {
        Alert.alert("Solicitação", "Solicitação registrada com sucesso");
        navigation.goBack();
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
        return Alert.alert(
          "Solicitação",
          "Não foi possível registrar novo pedido"
        );
      });
  }

  return (
    <VStack flex={1} bg="gray.600">
      <Header title="Solicitação" />
      <VStack px={6} pb={6} flex={1}>
        <Input
          placeholder="Número do patrimônio"
          mt={4}
          onChangeText={setPatrimony}
        />
        <Input
          placeholder="Descrição do problema"
          flex={1}
          mt={5}
          multiline
          textAlignVertical="top"
          onChangeText={setDesciption}
        />

        <Button
          title="Cadastrar"
          mt={5}
          isLoading={isLoading}
          onPress={handleNewOrder}
        />
      </VStack>
    </VStack>
  );
}

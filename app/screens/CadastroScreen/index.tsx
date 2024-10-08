import React, { useState } from "react";
import { View, Text, ScrollView } from "react-native";
import * as yup from "yup";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigation } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "@/app/routes/app.routes";
import Input from "@/app/components/Input";
import Button from "@/app/components/Button";
import Select from "@/app/components/Select";
import { useAuth } from "@/app/hooks/useAuth";
import styles from "./style";

type FormDataProps = {
  nome: string;
  dataNascimento: string;
  etnia: string;
  curso: string;
  cidade: string;
  email: string;
  contatoEmergencia: string;
};

const CadastroScreenSchema = yup.object({
  nome: yup.string().required("Informe o nome."),
  dataNascimento: yup.string().required("Informe a data de nascimento."),
  etnia: yup.string().required("Selecione a etnia."),
  curso: yup.string().required("Selecione o curso."),
  cidade: yup.string().required("Informe a cidade."),
  email: yup.string().required("Informe o e-mail").email("E-mail inválido."),
  contatoEmergencia: yup.string().required("Informe o contato de emergência."),
});

const CadastroScreen = () => {
  const { navigate } = useNavigation<AppNavigatorRoutesProps>();
  const { createUser } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataProps>({
    resolver: yupResolver(CadastroScreenSchema),
  });

  const storageUser = async (data: FormDataProps) => {
    try {
      setIsLoading(true);
      await createUser(data); // Certifique-se de que createUser retorna uma Promise
      navigate("heartScreen");
    } catch (error) {
      console.error("Erro ao criar usuário:", error); // Logar o erro para depuração
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Cadastro</Text>

      <Controller
        control={control}
        name="nome"
        render={({ field: { onChange, value } }) => (
          <Input
            label="Nome:"
            value={value}
            onChangeText={onChange}
            errorMessage={errors.nome?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="dataNascimento"
        render={({ field: { onChange, value } }) => (
          <Input
            label="Data de Nascimento:"
            value={value}
            onChangeText={onChange}
            errorMessage={errors.dataNascimento?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="etnia"
        render={({ field: { onChange, value } }) => (
          <Select
            label="Etnia"
            selectedValue={value}
            onValueChange={onChange}
            items={[
              { label: "Preto", value: "preto" },
              { label: "Pardo", value: "pardo" },
              { label: "Branco", value: "branco" },
              { label: "Indígena", value: "indigena" },
              { label: "Amarelo", value: "amarelo" },
            ]}
            errorMessage={errors.etnia?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="curso"
        render={({ field: { onChange, value } }) => (
          <Select
            label="Curso"
            selectedValue={value}
            onValueChange={onChange}
            items={[
              { label: "1º Informática", value: "1info" },
              { label: "2º Informática", value: "2info" },
              { label: "3º Informática", value: "3info" },
              { label: "1º Mecânica", value: "1mec" },
              { label: "2º Mecânica", value: "2mec" },
              { label: "3º Mecânica", value: "3mec" },
              { label: "1º Eletroeletrônica", value: "1ele" },
              { label: "2º Eletroeletrônica", value: "2ele" },
              { label: "3º Eletroeletrônica", value: "3ele" },
            ]}
            errorMessage={errors.curso?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="cidade"
        render={({ field: { onChange, value } }) => (
          <Input
            label="Cidade:"
            value={value}
            onChangeText={onChange}
            errorMessage={errors.cidade?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, value } }) => (
          <Input
            label="Email:"
            value={value}
            onChangeText={onChange}
            errorMessage={errors.email?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="contatoEmergencia"
        render={({ field: { onChange, value } }) => (
          <Input
            label="Contato de Emergência:"
            value={value}
            onChangeText={onChange}
            errorMessage={errors.contatoEmergencia?.message}
          />
        )}
      />

      <Button
        title="Cadastrar"
        onPress={handleSubmit(storageUser)}
        isLoading={isLoading}
      />
    </ScrollView>
  );
};

export default CadastroScreen;

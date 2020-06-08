import React, { Component } from "react";
import PropTypes from "prop-types";
import { Text } from "react-native";
import ChatBot from "react-native-chatbot";

class Review extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      gender: "",
      age: "",
    };
  }

  componentWillMount() {
    const { steps } = this.props;
    const { name, gender, age } = steps;

    this.setState({ name, gender, age });
  }

  render() {
    const { name, gender, age } = this.state;
    return (
      <>
        <Text>Resumo</Text>
        <Text> | Nome: {name.value}</Text>
        <Text> | Gênero: {gender.value}</Text>
        <Text> | Idade: {age.value}</Text>
      </>
    );
  }
}

Review.propTypes = {
  steps: PropTypes.object,
};

Review.defaultProps = {
  steps: undefined,
};

class SimpleForm extends Component {
  render() {
    return (
      <ChatBot
        contentStyle={{
          backgroundColor: '#0e0e0e'
        }}
        botBubbleColor="#222222"
        userBubbleColor="#4da1f8"
        userFontColor="#fff"
        submitButtonContent="ENVIAR"
        placeholder="Digite sua mensagem"
        hideUserAvatar={true}
        optionFontColor="#fff"
        optionBubbleColor="#222222"
        steps={[
          {
            id: "1",
            message: "Qual é o seu nome?",
            trigger: "name",
          },
          {
            id: "name",
            user: true,
            trigger: "3",
          },
          {
            id: "3",
            message: "Olá {previousValue}! Qual é seu sexo?",
            trigger: "gender",
          },
          {
            id: "gender",
            options: [
              { value: "Masculino", label: "Masculino", trigger: "5" },
              { value: "Feminino", label: "Feminino", trigger: "5" },
            ],
          },
          {
            id: "5",
            message: "Qual a sua idade?",
            trigger: "age",
          },
          {
            id: "age",
            user: true,
            trigger: "7",
            validator: (value) => {
              if (isNaN(value)) {
                return "O valor deve ser numérico";
              } else if (value < 0) {
                return "O valor deve ser positivo";
              } else if (value > 120) {
                return `${value}? Fala sério!`;
              }

              return true;
            },
          },
          {
            id: "7",
            message: "Ótimo! Segue o resumo",
            trigger: "review",
          },
          {
            id: "review",
            component: <Review />,
            asMessage: true,
            trigger: "update",
          },
          {
            id: "update",
            message: "Gostaria de atualizar algum campo?",
            trigger: "update-question",
          },
          {
            id: "update-question",
            options: [
              { value: "yes", label: "Sim", trigger: "update-yes" },
              { value: "no", label: "Não", trigger: "end-message" },
            ],
          },
          {
            id: "update-yes",
            message: "O que você gostaria de atualizar?",
            trigger: "update-fields",
          },
          {
            id: "update-fields",
            options: [
              { value: "name", label: "Nome", trigger: "update-name" },
              { value: "gender", label: "Sexo", trigger: "update-gender" },
              { value: "age", label: "Idade", trigger: "update-age" },
            ],
          },
          {
            id: "update-name",
            update: "name",
            trigger: "7",
          },
          {
            id: "update-gender",
            update: "gender",
            trigger: "7",
          },
          {
            id: "update-age",
            update: "age",
            trigger: "7",
          },
          {
            id: "end-message",
            message: "Obrigado! Suas informações foram enviadas com sucesso!",
            end: true,
          },
        ]}
      />
    );
  }
}

export default SimpleForm;

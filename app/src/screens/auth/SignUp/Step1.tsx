import React from 'react';
import { Button, KeyboardAvoidingView, StyleSheet, Text, TextInput, View } from 'react-native';
import Svg, { Defs, RadialGradient as SVGRadialGradient, Stop, Rect, RNSVGLinearGradient } from 'react-native-svg';
import WizzardProgress from './WizzardProgress';
import { SafeAreaView } from 'react-native-safe-area-context';
import Container from '../../../components/Container';


export default function Step1() {
  return (
    <SafeAreaView edges={["top"]} style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.title}>Criar Conta</Text>
        <Text style={styles.subtitle}>Crie sua conta e aproveite todos os benefícios.</Text>
      </View>
      <WizzardProgress currentStep={1} totalSteps={3} />
      <Container>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email</Text>
          <TextInput style={styles.input} />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email</Text>
          <TextInput style={styles.input} />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email</Text>
          <TextInput style={styles.input} />
        </View>
      </Container>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },

  headerContainer: {
    width: "100%",
    height: 200,
    top: 0,
    left: 0,
    right: 0,
    justifyContent: "center",
    alignItems: "center",
  },

  title: {
    fontSize: 32,
    marginBottom: 20,
    fontWeight: "bold",
  },

  subtitle: {
    fontSize: 16,
    marginBottom: 20,
    color: "#666",
  },
  
  inputContainer: {
    width: "100%",
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "#fff",
    borderRadius: 8,
    marginBottom: 20,
  },

  label: {
    fontSize: 16,
    marginBottom: 8,
    color: "#333",
  },
  input: {
    fontSize: 16,
    color: "#333",
  },
  buttonContainer: {
    width: "100%",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#007BFF",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonWhite: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#007BFF",
  }
});

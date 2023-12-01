import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as ImagePicker from 'expo-image-picker';

const FormCadastro = () => {
  const [nomeCurso, setNomeCurso] = useState('');
  const [professorResponsavel, setProfessorResponsavel] = useState('');
  const [categoria, setCategoria] = useState('');
  const [descricao, setDescricao] = useState('');
  const [imagem, setImagem] = useState(null);

  useEffect(() => {
    // Solicitar permissão para acessar a galeria de imagens
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Desculpe, precisamos das permissões da câmera para funcionar!');
        }
      }
    })();
  }, []);

  const handlePickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImagem(result.uri);
    }
  };

  const handleCadastro = () => {
    // Implemente a lógica para cadastrar o curso com as informações fornecidas
    console.log('Nome do Curso:', nomeCurso);
    console.log('Professor Responsável:', professorResponsavel);
    console.log('Categoria:', categoria);
    console.log('Descrição:', descricao);
    console.log('Imagem:', imagem);
  };

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <LinearGradient
        colors={['#4c669f', '#3b5998', '#192f6a']}
        style={styles.gradient}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.container}
        >
          <View>
            <Text style={styles.label}>Nome do Curso:</Text>
            <TextInput
              style={styles.input}
              onChangeText={(text) => setNomeCurso(text)}
              placeholder="Digite o nome do curso"
              value={nomeCurso}
            />

            <Text style={styles.label}>Professor Responsável:</Text>
            <TextInput
              style={styles.input}
              onChangeText={(text) => setProfessorResponsavel(text)}
              placeholder="Digite o nome do professor"
              value={professorResponsavel}
            />

            <Text style={styles.label}>Categoria:</Text>
            <TextInput
              style={styles.input}
              onChangeText={(text) => setCategoria(text)}
              placeholder="Digite a categoria do curso"
              value={categoria}
            />

            <Text style={styles.label}>Descrição:</Text>
            <TextInput
              style={styles.input}
              onChangeText={(text) => setDescricao(text)}
              placeholder="Digite a descrição do curso"
              value={descricao}
              multiline={true}
            />

            {imagem && (
              <Image source={{ uri: imagem }} style={styles.imagem} />
            )}

            <TouchableOpacity style={styles.button} onPress={handlePickImage}>
              <Text style={styles.buttonText}>Selecionar Imagem</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={handleCadastro}>
              <Text style={styles.buttonText}>Cadastrar Curso</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </LinearGradient>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: 'white',
  },
  input: {
    height: 40,
    width: 300,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
    backgroundColor: 'white',
  },
  button: {
    backgroundColor: '#61dafb',
    padding: 10,
    borderRadius: 5,
    width: 180,
    marginTop: 16,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  imagem: {
    width: 200,
    height: 200,
    resizeMode: 'cover',
    marginTop: 16,
  },
});

export default FormCadastro;

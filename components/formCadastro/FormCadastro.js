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
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import { createCurso } from '../../shared/service';

const FormCadastro = ({ route }) => {
  const [nomeCurso, setNomeCurso] = useState('');
  const [professorResponsavel, setProfessorResponsavel] = useState('');
  const [categoria, setCategoria] = useState('');
  const [descricao, setDescricao] = useState('');
  const [imagem, setImagem] = useState(null);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Desculpe, precisamos das permissões da câmera para funcionar!');
        }
      }
    })();
  }, []);

  useEffect(() => {
    if (route.params?.cursoId) {
      const cursoId = route.params.cursoId;
      // ...
    }
  }, [route.params?.cursoId]);

  const handlePickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.5,
    });

    if (!result.cancelled) {
      setImagem(result.uri);
    }
  };

  const handleCadastro = async () => {
    try {
      const novoCurso = {
        nomeCurso,
        professorResponsavel,
        categoria,
        descricao,
      };

      const formData = new FormData();
      formData.append('imagem', {
        uri: imagem,
        name: 'imagem.jpg',
        type: 'image/jpg',
      });

      formData.append('nomeCurso', nomeCurso);
      formData.append('professorResponsavel', professorResponsavel);
      formData.append('categoria', categoria);
      formData.append('descricao', descricao);

      if (route.params?.cursoId) {
        const cursoId = route.params.cursoId;
      } else {
        await createCurso(novoCurso);
        await axios.post('http://localhost:4200', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        Alert.alert('Cadastro Realizado', 'O curso foi cadastrado com sucesso!');
      }
    } catch (error) {
      console.error('Erro ao cadastrar curso:', error);
    }
  };

  const dismissKeyboard = () => {
    // Keyboard.dismiss();
  };

  return (
    <LinearGradient
      colors={['#4c669f', '#3b5998', '#192f6a']}
      style={styles.gradient}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <TouchableWithoutFeedback onPress={dismissKeyboard}>
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

          </View>
        </TouchableWithoutFeedback>

        <View>
          <TouchableOpacity style={styles.button} onPress={handlePickImage}>
            <Text style={styles.buttonText}>Selecionar Imagem</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={handleCadastro}>
            <Text style={styles.buttonText}>Cadastrar Curso</Text>
          </TouchableOpacity>
        </View>

      </KeyboardAvoidingView>
    </LinearGradient>
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

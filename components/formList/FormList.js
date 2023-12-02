// FormList.js
import React, { useState, useEffect } from 'react';
import { Platform, View, Text, TouchableOpacity, FlatList, StyleSheet, TextInput, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { getCursos, deleteCurso } from '../../shared/service'; 
const dismissKeyboard = () => {
  // Keyboard.dismiss();
};

const FormList = ({ navigation }) => {
  const [cursos, setCursos] = useState([]);

  useEffect(() => {
    loadCursos();
  }, []);

  const loadCursos = async () => {
    try {
      const cursosData = await getCursos();
      setCursos(cursosData);
      console.log('Cursos retornados:', cursosData);
    } catch (error) {
      console.error('Erro ao carregar cursos:', error);
    }
  };

  const handleAddCurso = async () => {
    navigation.navigate('cadastro');
  };

  const handleEditCurso = async (cursoId) => {
    navigation.navigate('editar', { cursoId });
  };

  const handleDeleteCurso = async (id) => {
    try {
      await deleteCurso(id);
      loadCursos();
    } catch (error) {
      console.error('Erro ao excluir curso:', error);
    }
  };

  return (
    <LinearGradient
      colors={['#4c669f', '#3b5998', '#192f6a']}
      style={styles.gradient}
    >
      <View style={styles.container}>
        <TouchableWithoutFeedback >
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
          >
            <TextInput style={styles.input} placeholder="Procurar Curso" />
          </KeyboardAvoidingView>
        </TouchableWithoutFeedback>

        <Text style={styles.title}>Lista de Cursos</Text>
        <View style={styles.list}>
          <FlatList
            data={cursos}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.cursoItem}>
                <Text style={styles.cursoNome}>{item.nomeCurso}</Text>
                <Text style={styles.professorResponsavel}>{item.id}</Text>
                <Text style={styles.cursoNome}>{item.categoria}</Text>
                <TouchableOpacity onPress={() => handleEditCurso(item.id)}>
                  <Text style={styles.editButton}>Editar</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleDeleteCurso(item.id)}>
                  <Text style={styles.deleteButton}>Excluir</Text>
                </TouchableOpacity>
              </View>
            )}
            extraData={cursos}
          />
        </View>

        <TouchableOpacity style={styles.addButton} onPress={handleAddCurso}>
          <Text style={styles.buttonText}>Adicionar Curso</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'start',
    alignItems: 'center',
    padding: 16,
  },
  list: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 16,
  },
  addButton: {
    backgroundColor: '#61dafb',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  cursoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  cursoNome: {
    flex: 1,
    fontSize: 16,
    color: 'white',
  },
  editButton: {
    color: '#61dafb',
    marginLeft: 8,
  },
  deleteButton: {
    color: 'red',
    marginLeft: 8,
  },
  input: {
    marginTop: 50,
    height: 40,
    width: 300,
    borderColor: 'gray',
    borderRadius: 10,
    borderWidth: 1,
    paddingHorizontal: 8,
    backgroundColor: 'white',
  },
});

export default FormList;

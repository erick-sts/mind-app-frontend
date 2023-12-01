// FormList.js
import React, { useState } from 'react';
import { Platform, View, Text, TouchableOpacity, FlatList, StyleSheet, TextInput, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const dismissKeyboard = () => {
    Keyboard.dismiss();
};

const FormList = ({ navigation }) => {
    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        });
    }, [navigation]);
    const [cursos, setCursos] = useState([]);

    // Função para adicionar um curso à lista
    const handleAddCurso = () => {
        navigation.navigate('cadastro')
        alert('Preencha os todas os campos para realizar o cadastro.');
    };

    // Função para editar um curso
    const handleEditCurso = (cursoId) => {
        // Implemente a lógica para editar o curso com o ID fornecido
        alert(`Editar curso com ID ${cursoId}`);
    };

    // Função para excluir um curso
    const handleDeleteCurso = (cursoId) => {
        // Implemente a lógica para excluir o curso com o ID fornecido
        alert(`Excluir curso com ID ${cursoId}`);
    };

    // Exemplo de dados para a lista de cursos
    const cursosData = [
        { id: '1', nome: 'Curso 1' },
        { id: '2', nome: 'Curso 2' },
        // ... outros cursos
    ];

    return (
        <LinearGradient
            colors={['#4c669f', '#3b5998', '#192f6a']}
            style={styles.gradient}
        >
            <View style={styles.container}>

                <TouchableWithoutFeedback onPress={dismissKeyboard}>
                    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                        style={styles.container}>
                        <TextInput style={styles.input}
                            placeholder="Procurar Curso"
                        ></TextInput>
                    </KeyboardAvoidingView >
                </TouchableWithoutFeedback>

                <Text style={styles.title}>Lista de Cursos</Text>
                <View style={styles.list}>
                    {/* Lista de cursos */}
                    <FlatList
                        data={cursosData}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => (
                            <View style={styles.cursoItem}>
                                <Text style={styles.cursoNome}>{item.nome}</Text>
                                <TouchableOpacity onPress={() => handleEditCurso(item.id)}>
                                    <Text style={styles.editButton}>Editar</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => handleDeleteCurso(item.id)}>
                                    <Text style={styles.deleteButton}>Excluir</Text>
                                </TouchableOpacity>
                            </View>
                        )}
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
        justifyContent: 'center'
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 16, // Adicionado para dar espaço abaixo do título
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

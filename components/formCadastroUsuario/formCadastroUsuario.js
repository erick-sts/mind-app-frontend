import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const FormCadastro = ({ navigation }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    const handleCadastro = async () => {
        try {
            const response = await fetch('http://localhost:4200/cadastro', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const responseData = await response.json();

            if (response.ok) {
                navigation.navigate('login');
            } else {
              
                alert(`Erro de cadastro: ${responseData.message}`);
            }
        } catch (error) {
            console.error('Erro ao realizar cadastro:', error);
            alert('Erro ao realizar cadastro. Por favor, tente novamente.');
        }
    };


    return (
        <LinearGradient
            colors={['#4c669f', '#3b5998', '#192f6a']}
            style={styles.gradient}
        >
            <View style={styles.container}>

                <Text style={styles.label}>E-mail:</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={(text) => setEmail(text)}
                    placeholder="Digite seu e-mail"
                    value={email}
                />

                <Text style={styles.label}>Senha:</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={(text) => setPassword(text)}
                    value={password}
                    placeholder="Digite sua senha"
                    secureTextEntry
                />



                <TouchableOpacity style={styles.button} onPress={handleCadastro}>
                    <Text style={styles.buttonText}>Cadastrar</Text>
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
        justifyContent: 'center',
        alignItems: 'center',
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
        borderRadius: 10,
    },
    button: {
        backgroundColor: '#61dafb',
        padding: 10,
        borderRadius: 5,
        width: 100,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default FormCadastro;

import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const FormLogin = ({navigation }) => {


    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

  
    const handleLogin = async () => {
    try {
        const response = await fetch('http://localhost:4200/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        if (response.ok) {
            navigation.navigate('lista');
        } else {
            const errorData = await response.json();
            if (response.status === 400 && errorData.error === 'E-mail já cadastrado') {
                alert('E-mail já cadastrado. Por favor, use outro e-mail.');
            } else {
                alert(`Erro de login: ${errorData.error}`);
            }
        }
    } catch (error) {
        console.error('Erro ao realizar login:', error);
        alert('Erro ao realizar login. Por favor, tente novamente.');
    }
};


    return (
        <LinearGradient
            colors={['#4c669f', '#3b5998', '#192f6a']}
            style={styles.gradient}
        >
            <View style={styles.container}>
                <Text style={styles.label}>Email:</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={(text) => setEmail(text)}
                    placeholder="Digite seu usuário"
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

                <TouchableOpacity style={styles.button} onPress={handleLogin}>
                    <Text style={styles.buttonText}>Login</Text>
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

export default FormLogin;

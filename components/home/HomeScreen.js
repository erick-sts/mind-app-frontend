import React from 'react';
import { View, Text, StyleSheet, Button, StatusBar, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const HomeScreen = ({ navigation }) => {
    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        });
    }, [navigation]);

    return (
        <LinearGradient
            colors={['#4c669f', '#3b5998', '#192f6a']}
            style={styles.gradient}
        >
            <StatusBar
                translucent
                backgroundColor="transparent"
                barStyle="light-content"
            />
            <View style={styles.container}>
                <Text style={styles.title2}>Bem Vindo Professor!</Text>
                <Text style={styles.title}>Entre com suas credenciais.</Text>
                <TouchableOpacity onPress={() => navigation.navigate('login')} style={styles.button}>
                    <Text style={styles.buttonText} >Continuar</Text>
                </TouchableOpacity>

                <Text style={styles.buttonCadastro} onPress={() => navigation.navigate('cadastro-usuario')}>Clique aqui se ainda não for cadastrado!</Text>
            </View>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    gradient: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 16,
        color: 'white', // Cor do texto
    },
    title2: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 25,
        color: 'white', // Cor do texto
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
    buttonCadastro: {
        marginTop: 20,
        color: 'white',
        fontSize: 14,
        textAlign: 'center',
    }
});

export default HomeScreen;

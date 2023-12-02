import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../components/home/HomeScreen';
import FormLogin from '../components/formLogin/FormLogin';
import FormList from '../components/formList/FormList';
import FormCadastro from '../components/formCadastro/FormCadastro';
import FormCadastroUsuario from '../components/formCadastroUsuario/formCadastroUsuario';
// import EditCursoForm from '../components/formEditProf/FormEditProf';


const Stack = createStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="home">
        <Stack.Screen name="home" component={HomeScreen} />
        <Stack.Screen name="login" component={FormLogin} />
        <Stack.Screen name="cadastro-usuario" component={FormCadastroUsuario} />
        <Stack.Screen name="lista" component={FormList} />
        <Stack.Screen name="cadastro" component={FormCadastro} />
        {/* <Stack.Screen name="editar" component={EditCursoForm} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;

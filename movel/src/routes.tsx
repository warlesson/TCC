import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const { Navigator, Screen} = createStackNavigator();

import TelaInicial from './pages/TelaInicial';
import Ocorrencias from './pages/Ocorrencias';
import Informacao from './pages/Informacao';
import Detalhes from './pages/Detalhes';

import Header from './components/Header';

import SelecionarMap from './pages/CriarOcorrencia/SelecionarMap';
import OcorrenciaData from './pages/CriarOcorrencia/OcorrenciaData'

export default function Routes() {
    return (
        <NavigationContainer>
            <Navigator screenOptions={{headerShown: false}}>
                <Screen
                    name="TelaInicial"
                    component={TelaInicial}
                />

                <Screen
                    name="Ocorrencias"
                    component={Ocorrencias}
                />

                <Screen
                    name="Informacao"
                    component={Informacao}
                    options={{headerShown: true, 
                    header: () => <Header title="Informação do app"/> }}
                />

                <Screen
                    name="Detalhes"
                    component={Detalhes}
                    options={{headerShown: true,
                    header: () => <Header title="DETALHES"/> }}
                />

                <Screen
                    name="SelecionarMap"
                    component={SelecionarMap}
                    options={{headerShown: true, 
                    header: () => <Header title="Selecione no Mapa"/> }}
                />

                <Screen
                    name="OcorrenciaData"
                    component={OcorrenciaData}
                    options={{headerShown: true, 
                    header: () => <Header title="Informe os Dados"/> }}
                />
            </Navigator>
        </NavigationContainer>
    );
}
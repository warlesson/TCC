import React from 'react';
import { Linking ,StyleSheet ,ScrollView, Alert, View, FlatList, Image, Text, TextInput, TouchableOpacity} from 'react-native';
import * as MailComposer from 'expo-mail-composer';

import { RectButton } from 'react-native-gesture-handler';
import { Feather, FontAwesome } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 

export default function Informacao(){
    const mesage = 'Óla Defesa Civil, estou entrando em contado pois gostaria de informar um local de manaus que está em área de risco.';

    function enviarEmail(){
        MailComposer.composeAsync({
            subject: 'Área de risco',
            recipients: ['comadec@comadec.am.gov.br'],
            body: mesage,
        })
    }
    function enviarWhatsapp(){
        Linking.openURL(`whatsapp://send?phone=5592984527448&text=${mesage}`);
    }

    return (
        <ScrollView style={styles.container}> 
            <View style={styles.tudo}>
                <Text style={styles.tudo1}>
                Nosso objetivo é possibilitar um melhor
desempenho em identificar possíveis áreas de risco e uma maior precisão em
encontrar acidentes, alagamentos, deslizamentos de terra, desmoronamento,
para um aproveitamento maior dos recurso da defesa civil, criar uma
ferramenta que permite a interação entre homem e maquina, especificamente
dispositivos moveis, Smartphones e tabletes, que sejam feitas de forma natural
para o usuário sem muitas complicações na usabilidade do App.
E claro que pode haver mais coisa importantes, mas as perguntas que
mais frequente são, de que forma isso vai beneficiar as pessoas, que tipo de
arquitetura o App vai precisar usar, de que forma ele vai alcançar o público
alvo, já que sua resposta pode ser um bom ponto de partida para responder
outras perguntas.
                </Text>
            </View>
        
            <View style={styles.separator} />

                    <Text style={styles.title}>Entrar em contato</Text>
                    <Text style={styles.description}>Emtre em contato direto com a Defesa Civil</Text>

                    <View style={styles.scheduleContainer}>
                        <RectButton style={styles.scheduleItem} onPress={enviarWhatsapp}>
                            <FontAwesome name="whatsapp" size={40} color="#39cc83" />
                            <Text style={styles.scheduleText}>WhatSapp</Text>
                        </RectButton>
                        <RectButton style={styles.scheduleItem} onPress={enviarEmail}>
                            <MaterialCommunityIcons name="email" size={40} color="red" />
                            <Text style={styles.scheduleText}>E-mail</Text>
                        </RectButton>
                    </View> 
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 5,
        backgroundColor: '#fff'
    },

    tudo: {
        fontWeight: 'bold',
        fontSize: 30,
        marginTop: 2,
        backgroundColor: '#EFF2F7',
        borderRadius: 8,
        padding: 24,
    },

    tudo1: {
        textAlign: 'justify',
        fontSize: 14,
        color: '#41414d',
        fontWeight: 'bold'
    },
  
    separator: {
        height: 0.8,
        width: '100%',
        backgroundColor: '#d3e2e6',
        marginVertical: 40,
    },

    title: {
        color: '#4d6f80',
        fontSize: 30,  
    },

    description: {
        color: '#5c8599',
        lineHeight: 24,
        marginTop: 16,
    },

    scheduleContainer: {
        marginTop: 24,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 50,
    },

    scheduleItem: {
        alignItems: 'center',
        width: '48%',
        padding: 28,
        backgroundColor: '#e6f7fb',
        borderWidth: 1.2,
        borderColor: '#000',
        borderRadius: 28,  
    },

    scheduleText: {
        fontSize: 16,
        lineHeight: 24,
        marginTop: 20,
        color: '#5c8599',
    },


})
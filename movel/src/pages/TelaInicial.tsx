import React from 'react';
import {  StyleSheet ,View, Image, Text,  TouchableOpacity } from 'react-native';
import { Foundation } from '@expo/vector-icons'; 

import logoImg from '../images/logo.png';

import { useNavigation } from '@react-navigation/native';

export default function TelaInicial() {
    const navigation = useNavigation();

    function navegarParaOcorrencias(){
        navigation.navigate('Ocorrencias');
    }

    return (
        <View style={styles.container}> 
             
                <Image 
                    style={styles.logoImg} 
                    source={logoImg}
                />
                <Text style={styles.bemVindo}>Bem vindo</Text>

                <Text style={styles.texto}>Aplicativo desenvolvido para a{"\n"} interação e geolocalização de áreas{"\n"}de risco</Text>

            <View style={styles.footer}>
                <Text><Foundation name="arrow-down" size={30} color="black" /></Text>
                <TouchableOpacity
                    style={styles.botao}
                    onPress={navegarParaOcorrencias}
                >
                    <Text style={styles.botaoText}>Ir Para Feeds de Notícias</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
    }
    
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            alignItems: 'center',
            backgroundColor: '#e8ff5c'
            
        },
        logoImg: {
            marginTop: 100,
            justifyContent: 'flex-start',
            width: 150,
            height: 150,
            
        },
        bemVindo: {
            fontSize: 30,
            fontWeight: 'bold',
            color: '#1f2d3d',
            marginTop: 30,
            
        },
        texto: {
            fontSize: 18,
            color: '#1f2d3d',
            marginTop: 70,
            textAlign: 'center'
            
        },
        footer:{
            flex: 6,
            alignItems: 'center',
            justifyContent: 'flex-end',
            marginBottom: 55
        },
        botao: {
            backgroundColor: 'transparent',
            borderBottomWidth: 1,
            borderColor: 'black',
            borderRadius: 4,  
                  
        },
        botaoText: {
            fontSize: 18,
            fontWeight: 'bold',
            color: '#1F2D3D'
        }
    });
    
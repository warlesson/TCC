import React, { useEffect, useState } from 'react';
import { Linking ,Dimensions ,StyleSheet ,ScrollView, Alert, View, FlatList, Image, Text, TextInput, TouchableOpacity, ImageStore} from 'react-native';
import { Feather, FontAwesome } from '@expo/vector-icons';
import MapView, { Marker } from 'react-native-maps';
import { RectButton } from 'react-native-gesture-handler';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import * as MailComposer from 'expo-mail-composer';
import {  useRoute } from '@react-navigation/native';

import fig1 from '../images/fig1.jpg';
import api from '../services/api';

interface OcorrenciaDetalhes {
    id: number;
}

interface Ocorrencia {
    id: number;
    titulo: string;
    descricao: string;
    latitude: number;
    longitude: number;
    images: Array<{
        id: number;
        url: string;
    }>;
}

export default function Detalhes(){
    const route = useRoute();
    const [ocorrencias, setOcorrencia] = useState<Ocorrencia>();

    const params =route.params as OcorrenciaDetalhes;

    useEffect(() => {
        api.get(`ocorrencias/${params.id}`).then(response => {
            setOcorrencia(response.data);
        })
    }, [params.id])

    if(!ocorrencias) {
        return (
            <View style={styles.container}>
                <Text style={styles.description}>Carregando...</Text>
            </View>
        )
    }

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

    function navegarGoogle() {
        Linking.openURL(`https://www.google.com/maps/dir/?api=1&destination=${ocorrencias?.latitude},${ocorrencias?.longitude}`);
    }

    return (
  
        <ScrollView style={styles.container}>
            <View style={styles.imagesContainer}>
                <ScrollView horizontal pagingEnabled>
                    {ocorrencias.images.map(image => {
                        return(
                            <Image 
                            key={image.id}
                            style={styles.images} 
                            source={{ uri: image.url}}/>
                        );
                    })}
                </ScrollView>
            </View>

            <View style={styles.detailsContainer}>
            <Text style={styles.title}>{ocorrencias.titulo}</Text>
            <Text style={styles.description}>{ocorrencias.descricao}</Text>

                <View style={styles.mapContainer}>
                    <MapView
                        initialRegion={{
                            latitude: ocorrencias.latitude,
                            longitude: ocorrencias.longitude,
                            latitudeDelta: 0.008,
                            longitudeDelta: 0.008,
                        }}    
                        zoomEnabled={false}
                        pitchEnabled={false}
                        scrollEnabled={false}
                        rotateEnabled={false}
                        style={styles.mapStyle}
                    >
                        <Marker
                            coordinate={{
                                latitude: ocorrencias.latitude,
                                longitude: ocorrencias.longitude,
                            }}
                        />
                    </MapView>

                    <TouchableOpacity onPress={navegarGoogle} style={styles.routesContainer}>
                        <Text style={styles.routesText}>Ver rotas no Google maps</Text>
                    </TouchableOpacity>

                    </View>
                    <View style={styles.separator} />

                    <Text style={styles.title}>Entrar em contato</Text>
                    <Text style={styles.description}>Entre em contato direto com a Defesa Civil</Text>

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
                
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 5,
        backgroundColor: '#fff',
        
    },

    imagesContainer: {
        height: 248,
    },

    images: {
        width: Dimensions.get('window').width,
        height: 240,
        resizeMode: 'cover',
    },
    detailsContainer: {
        padding: 10,
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

    mapContainer: {
        borderRadius: 28,
        overflow: 'hidden',
        borderWidth: 1.2,
        borderColor: '#B3DAE2',
        marginTop: 48,
        backgroundColor: '#e6f7fb'
    },

    mapStyle: {
        width: '100%',
        height: 150,
    },

    routesContainer: {
        padding: 16,
        alignItems: 'center',
        justifyContent: 'center'
    },

    routesText: {
        color: '#0089a5'
    },

    separator: {
        height: 0.8,
        width: '100%',
        backgroundColor: '#d3e2e6',
        marginVertical: 40,
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
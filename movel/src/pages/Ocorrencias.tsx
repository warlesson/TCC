import React, { useEffect , useState, Component } from 'react';
import { RefreshControl ,Dimensions ,ScrollView ,StyleSheet ,Alert, View, FlatList, Image, Text, TextInput, TouchableOpacity } from 'react-native';
import { Entypo } from '@expo/vector-icons'; 
import { Octicons } from '@expo/vector-icons';
import Constants from 'expo-constants';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons'; 

import logoImg from '../images/logo.png';
import fig1 from '../images/fig1.jpg';
import api from '../services/api';
import SelecionarMap from './CriarOcorrencia/SelecionarMap';

interface Ocorrencia {
    id: number;
    titulo: string;
    descricao: string;
    images: Array<{
        id: number;
        url: string;
    }>;
}

export default function Ocorrencias(){
    const [ocorrencias, setOcorrencias] = useState<Ocorrencia[]>([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
 
    const navigation = useNavigation();

    async function loadOcorrencias(pageNumber = page, shouldRefresh = false) {
        if (loading){
            return;
        }

        if (total > 0 && ocorrencias.length == total){
            return;
        }

        setLoading(true);

        const response = await api.get(`ocorrencias?page=${pageNumber}`);

            setOcorrencias(shouldRefresh ? response.data : [... ocorrencias, ... response.data]);
            setTotal(response.headers['x-total-count']);
            setPage(page + 1);
            setLoading(false);
    }

    useFocusEffect(() => {
        loadOcorrencias();  
    });

    async function refreshList(){
        setRefreshing(true);

        navigation.navigate('Ocorrencias');

        setRefreshing(false);
    }

    function navegarParaInformacao(){
        navigation.navigate('Informacao');
    }
    function navegarParaDetalhes(id: number){
        navigation.navigate('Detalhes', { id });
    }
    function navegarParaMap(){
        navigation.navigate('SelecionarMap');
    }
  
    return (
        <View style={styles.container}> 
            <View style={styles.header}>
                <Image style={styles.logoImg} source={logoImg}/>
                <Text style={styles.headerText}>
                    ZONAR!SKAM
                </Text>
                <TouchableOpacity
                    onPress={navegarParaInformacao}
                    >
                    <Text><Octicons name="info" size={30} color="black" /></Text>  
                </TouchableOpacity>
            </View>
 
            <FlatList
                data={ocorrencias}
                style={styles.feed}
                keyExtractor={ocorrencia => String(ocorrencia.id)}
                showsVerticalScrollIndicator={false}
                onEndReached={() => loadOcorrencias()}
                onEndReachedThreshold={0.1}
                onRefresh={refreshList}
                refreshing={refreshing}
                renderItem={({ item: ocorrencia}) => (
                    <View style={styles.feed1}>
                        <Text style={styles.titulo}>{ocorrencia.titulo}</Text>
                        <View style={styles.imagesContainer}>
                            <ScrollView horizontal pagingEnabled showsHorizontalScrollIndicator={false}>
                                {ocorrencia.images.map(image => {
                                return(
                                <Image 
                                key={image.id}
                                style={styles.images} 
                                source={{ uri: image.url}}/>

                                );
                            })}
                            </ScrollView>
                        </View>
                      
        
                        <Text style={styles.data}>{ocorrencia.descricao}</Text>
                        
                        <TouchableOpacity
                            style={styles.botaoFeed1}
                            onPress={() => navegarParaDetalhes(ocorrencia.id)}
                        >
                            <Text style={styles.botaoTextFeed1}>Saber mais</Text>
                        </TouchableOpacity>

                    </View>
                )}
            />
                <TouchableOpacity
                        style={styles.footer}
                        onPress={navegarParaMap}   
                    >
                        <Text style={styles.footerText}> Criar uma{"\n"}Ocorrência</Text>
                    
                </TouchableOpacity>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 5,
        paddingTop: Constants.statusBarHeight,
        backgroundColor: '#fff'
    },
    header: {
        width: '100%',
        height: 50,
        borderRadius: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#EFF2F7'
    },
    logoImg: {
        width: 50,
        height: 50
    },
    headerText:{
        fontSize: 20,
        fontWeight: 'bold',
        color: '#1f2d3d',
        alignItems: 'stretch'
        
    },
    listas: {
        marginTop: 10,
        backgroundColor: '#EFF2F7',
        borderRadius: 5,

    },
    feedHeader: {
        fontSize: 18,
    },
    noticias: {
        fontWeight: 'bold',
        fontSize: 20,
        color: '#47525E'
    },
    footer: {
        position: 'absolute',
        width: 130,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        right: 5,
        bottom: 55,
        backgroundColor: '#15c3d6',
        borderRadius: 15,
        borderWidth: 1,
        borderColor: '#FFF'


     },
     footerText:{
        fontSize: 16,
        color: '#fff',
        
     },
     feed: {
        paddingHorizontal: 5,
        marginTop: 7,
        width: '100%',
        height: 400,
        backgroundColor: '#EFF2F7',
        
        
    },
    feed1: {
        marginBottom: 10,
        backgroundColor: '#fff',
        borderWidth: 1,
        
    },
    imagesContainer: {
        height: 248,
    },

    images: {
        width: Dimensions.get('window').width,
        height: 240,
        resizeMode: 'cover',
    },
    titulo:{
        fontWeight: 'bold',
        fontSize: 20,
        color: '#47525E',
        marginTop: 5,
        marginBottom: 5,
        marginLeft: 3,

    },
    botaoFeed1:{
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 3,
        borderRadius: 5,
        borderColor: '#ccc',
        width: 135,
        height: 35,
        left: '62%',

        marginTop: 10,
        marginBottom: 10,
        
    },
    botaoTextFeed1:{
        
        fontWeight: 'bold',
        fontSize: 20,
        color: '#47525E',
    },
    data: {
        marginLeft: 10,
        marginRight: 10,
        textAlign: 'justify',
        fontSize: 16,
        color: '#41414d',
        fontWeight: 'bold'
    },
})
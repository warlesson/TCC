import React, {useState} from 'react';
import { StyleSheet ,Image, ScrollView, View, Switch, Text, TextInput, TouchableOpacity  } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { RectButton } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

import { useRoute} from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import api from '../../services/api';


interface OcorrenciaDataRouteParams  {
    position: {
        latitude: number;
        longitude: number;
    }
}

export default function Cad(){
    const [ titulo, setTitulo] = useState('');
    const [ descricao, setDescricao] = useState('');
    const [ date, setDate] = useState('00/00/0000');
    const [images, setImages] = useState<string[]> ([]);

    const navigation = useNavigation();

    const route = useRoute();

    const params = route.params as OcorrenciaDataRouteParams;
    

    async function handleCreateOcorrencia(){
        const { latitude, longitude} = params.position;

        const data = new FormData();

        data.append('titulo', titulo);
        data.append('descricao', descricao);
        data.append('latitude', String(latitude));
        data.append('longitude', String(longitude));
        data.append('data', Date(date));

    
        images.forEach((image, index)=> {
            data.append('images', {
                name: `images_${index}.jpg`,
                type: 'image/jpg',
                uri: image,
            } as any)
        })

        await api.post('ocorrencias', data);

        navigation.navigate('Ocorrencias');
      }
    

    async function handleSelectImages(){
        const { status} = await ImagePicker.requestCameraRollPermissionsAsync();

        if ( status != 'granted') {
            alert('Precisamos de acesso às suas fotos');
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            quality: 1,
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
        });

      if (result.cancelled){
            return;
        }

        const { uri: image } = result;

        setImages([...images, image]); 
    }

    return(
        <ScrollView style={styles.container} contentContainerStyle={{ padding: 24 }}>
            <Text style={styles.title}>Dados</Text>

            <Text style={styles.label}>Título</Text>
            <TextInput
                style={styles.input}
                value={titulo}
                onChangeText={setTitulo}
            />

            <Text style={styles.label}>Descrição</Text>
            <TextInput
                style={[styles.input, {height: 110 }]}
                multiline
                value={descricao}
                onChangeText={setDescricao}
            />
            
            <Text style={styles.label}>Fotos</Text>

            <View style={styles.uploadedImagesContainer}>
                {images.map(image => {
                    return (
                        <Image
                            key={image}
                            source={{ uri: image }}
                            style={styles.uploadedImage}
                        />
                    );
                })}

            </View>

            <TouchableOpacity style={styles.imagesInput} onPress={handleSelectImages}>
                <Feather name="plus" size={24} color="#15b6d6"/>
            </TouchableOpacity>

            <Text style={styles.text}>
                Obs: Após clicar em cadastrar será eviado um formulário 
                dos dados para o email da Defesa Cívil.
            </Text>
        
            <RectButton style={styles.nextButton} onPress={handleCreateOcorrencia}>
                <Text style={styles.nextButtonText}>Cadastrar</Text>
            </RectButton>

        </ScrollView>
    )
}

const styles = StyleSheet.create({ 
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },

    title: {
        color: '#5c8599',
        fontSize: 24,
        marginBottom: 32,
        paddingBottom: 24,
        borderBottomWidth: 0.8,
        borderBottomColor: '#D3E2E6',
    },

    label: {
        color: '#8fa7b3',
        marginBottom: 8,
    },

    comment: {
        fontSize: 11,
        color: '#8fa7b3',
    },

    input: {
        backgroundColor: '#fff',
        borderWidth: 1.4,
        borderColor: '#D3E2E6',
        borderRadius: 20,
        height: 56,
        paddingVertical: 18,
        paddingHorizontal: 24,
        marginBottom: 16,
        textAlignVertical: 'top',    
    },

    uploadedImagesContainer: {
        flexDirection: 'row',
    },

    uploadedImage: {
        width: 64,
        height: 64,
        borderRadius: 20,
        marginBottom: 32,
        marginRight: 8,
    },

    imagesInput: {
        backgroundColor: '#96d2f0',
        borderStyle: 'dashed',
        borderColor: '#96d2f0',
        borderWidth: 1.4,
        borderRadius: 20,
        height: 56,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 32,
    },

    switchContainer:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 16,
    },

    nextButton: {
        backgroundColor: '#15c3d6',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        height: 56,
        marginTop: 32,
    },

    nextButtonText: {
        fontSize: 16,
        color: "#fff",
    },
    text: {
        textAlign: 'justify',
        fontSize: 14,
    
    },
})
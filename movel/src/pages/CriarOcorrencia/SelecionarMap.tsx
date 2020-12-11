import React, {useState, useEffect} from 'react';
import { Dimensions, StyleSheet ,View, Text, Alert, PermissionsAndroid} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import GeoLocation from 'react-native-geolocation-service';
import MapView, { Marker, MapEvent } from 'react-native-maps';
import { RectButton } from 'react-native-gesture-handler';

import { AntDesign } from '@expo/vector-icons'; 

export default function SelecionarMap(){
    const navigation = useNavigation();
    const [position, setPosition] = useState({ latitude: 0, longitude: 0});
    const [hasLocationPermission, setHasLocationPermission ] = useState(false);
    const [userPosition, setUserPosition ] = useState(false);
 

    function handleSelectMapPosition(event: MapEvent)  {
        setPosition(event.nativeEvent.coordinate);
    }

    function navegarParaCadastrar(){
        navigation.navigate('OcorrenciaData', { position });
    }

    async function verifyLocationPermission(){
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCERS_FINE_LOCATION
            );
            if (granted == PermissionsAndroid.RESULTS.GRANTED){
                console.log('permissão concedida');
                setHasLocationPermission(true);
            } else {
                console.error('permissão negada');
                setHasLocationPermission(false);
            }
        } catch (err) {
            console.warn(err);
        }
    }

    useEffect(() => {
        verifyLocationPermission();  

        if (hasLocationPermission) {
            GeoLocation.getCurrentPosition(
                position => {
                    setUserPosition({
                    latitude: position.coords.latitude,
                    longitule: position.coords.longitude,
                });
            },
            error => {
                console.log(error.code, error.message);
            }
            );
        }
    }, [hasLocationPermission]);

    return (
        <View style={styles.container}>
            <MapView
                initialRegion={{
                    latitude: userPosition.latitude,
                    longitude: userPosition.longitude,
                    latitudeDelta: 0.008,
                    longitudeDelta: 0.008,
                }}
                style={styles.mapStyle}
                onPress={handleSelectMapPosition}
            >
                { position.latitude != 0 && (
                    <Marker
                        coordinate={{ latitude: position.latitude, longitude: position.longitude}}
                    />
                )}
                
            </MapView>
            
            { position.latitude != 0 && (
            <RectButton style={styles.nexButton} onPress={navegarParaCadastrar}>
                <Text style={styles.nexButtonText}>Próximo</Text>
            </RectButton>
            )}
            
        </View>
)}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'relative',
    },

    mapStyle: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },

    nexButton: {
        backgroundColor: '#15c3d6',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        height: 56,

        position: 'absolute',
        left: 24,
        right: 24,
        bottom: 48,
    },

    nexButtonText: {
        fontSize: 16,
        color: '#fff',
    }
})
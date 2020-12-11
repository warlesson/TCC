import React from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity} from 'react-native';
import Constants from 'expo-constants';
import { Feather } from '@expo/vector-icons';

import logoImg from '../images/logo.png';
import { BorderlessButton } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';


interface HeaderProps {
    title: string;
}

export default function Header({ title }: HeaderProps) {
    const navigation = useNavigation();
    
    return(
        <View style={styles.container}> 
            <View style={styles.header}> 
                <Image style={styles.logoImg} source={logoImg}/>
                
                <Text style={styles.title}>{title}</Text>

                <BorderlessButton onPress={navigation.goBack}>
                    <Feather name="arrow-left" size={30} color="#15b6d6" />
                </BorderlessButton>
            </View>
                
            
        </View>
    );
} 

const styles = StyleSheet.create({
    container:{  
        flex: 1,
        paddingHorizontal: 5,
        paddingTop: Constants.statusBarHeight,
        backgroundColor: '#fff',
        padding: 55
},

    header: {
        padding: 10,
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

title: {
    fontSize: 20,
        fontWeight: 'bold',
        color: '#1f2d3d',
        alignItems: 'stretch'  
},

})

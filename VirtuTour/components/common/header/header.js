import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import styles from './header.style';

const Header = ({ toggleSidebar }) => {
    return (
        <View style={styles.headerContainer}>
            <TouchableOpacity>
                <Image source={require('../../../assets/logo.png')} style={styles.icon} />
            </TouchableOpacity>
            <Text style={styles.title}>Tour Guide</Text>
            
            <TouchableOpacity onPress={toggleSidebar}>
                <Image source={require('../../../assets/menu.png')} style={styles.icon} />
            </TouchableOpacity>
        </View>
    );
};

export default Header;

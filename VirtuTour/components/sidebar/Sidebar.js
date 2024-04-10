import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, Switch } from 'react-native';
import { useRouter } from 'expo-router';

const Sidebar = ({ isVisible }) => {
    const [settingsVisible, setSettingsVisible] = useState(false);
    const [darkMode, setDarkMode] = useState(false);
    const [audioEnabled, setAudioEnabled] = useState(true);

    const toggleSettings = () => setSettingsVisible(!settingsVisible);

    const router = useRouter(); // Use the useRouter hook

    const navigateToAboutUs = () => {
        router.push('/about-us'); // Use router.push to navigate
    };

    if (!isVisible) return null;

    return (
        <View style={styles.sidebar}>
            <TouchableOpacity onPress={toggleSettings}>
                <Text style={styles.menuItem}>Settings</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {navigateToAboutUs}}>
                <Text style={styles.menuItem}>About Us</Text>
            </TouchableOpacity>

            {/* Settings Modal */}
            <Modal
                visible={settingsVisible}
                animationType="slide"
                transparent={true}
                onRequestClose={toggleSettings}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Settings</Text>

                        {/* Dark Mode Toggle */}
                        <View style={styles.settingItem}>
                            <Text style={styles.settingText}>Dark Mode</Text>
                            <Switch
                                value={darkMode}
                                onValueChange={() => setDarkMode(!darkMode)}
                            />
                        </View>

                        {/* Audio Toggle */}
                        <View style={styles.settingItem}>
                            <Text style={styles.settingText}>Audio</Text>
                            <Switch
                                value={audioEnabled}
                                onValueChange={() => setAudioEnabled(!audioEnabled)}
                            />
                        </View>

                        {/* Close Button */}
                        <TouchableOpacity onPress={toggleSettings} style={styles.closeButton}>
                            <Text style={styles.closeButtonText}>Close</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    sidebar: {
        position: 'absolute',
        right: 0,
        top: 50, // Starts from the top of the content area
        bottom: 0,
        width: 200,
        backgroundColor: '#520000',
        zIndex: 1000, // Ensure it overlays the content
    },
    menuItem: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#ffffff',
        marginLeft: 10,
        marginVertical: 10, // Add vertical margin for spacing
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    settingItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    settingText: {
        fontSize: 16,
    },
    closeButton: {
        marginTop: 20,
        alignSelf: 'flex-end',
    },
    closeButtonText: {
        color: 'blue',
    },
});

export default Sidebar;

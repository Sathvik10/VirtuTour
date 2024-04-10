// _layout.js

import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Stack, Route } from "expo-router";
import Header from '../components/common/header/header.js';
import Sidebar from '../components/sidebar/Sidebar.js';
import Home from './home';
import AboutUs from '../components/about/AboutUs.js';


const Layout = () => {
    const [isSidebarOpen, setSidebarOpen] = useState(false);

    return (
        <View style={styles.container}>
            <Header toggleSidebar={setSidebarOpen} />
            {isSidebarOpen && <Sidebar isVisible={isSidebarOpen} />}
            <Stack initialRouteName="home">
                <Route path="home" element={<Home />} />
                <Route path="about-us" element={<AboutUs />} />
                {/* Define other routes here */}
            </Stack>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default Layout;

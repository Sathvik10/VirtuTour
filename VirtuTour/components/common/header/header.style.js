import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    headerContainer: {
        height: 60, // Adjust as needed
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        backgroundColor: '#520000', 
        zIndex: 1001,
    },
    title: {
        fontSize: 24, // Adjust as needed
        fontWeight: 'bold',
        color: '#ffffff',
        flex: 1,
        marginLeft: 10,
        
    },
    icon: {
        width: 40, // Adjust as needed
        height: 32, // Adjust as needed
    },
});

import React from 'react';
import { connect } from 'react-redux';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';

const PlaceDetail = ({ place }) => {

  if (!place || !place.name || !place.description) {
    console.log("Nothing here :(");
    return null; // or render a fallback UI
  }

  console.log("Welcome to place page");
  
  return (
    <>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.exitButton}>
        <Text style={styles.startButtonText}>Exit</Text>
        </TouchableOpacity>
      </View>
      <Text>{place.name}</Text>
      <Text>{place.description}</Text>
    </>
  )
}

const mapStateToProps = (state) => ({
  place: state.map.placeObj, // Access place data from Redux store
});

const styles = StyleSheet.create({
  buttonsContainer: {
    flexDirection:'row',
    width:'auto',
    justifyContent: 'space-between'
  },
  exitButton: {
    alignSelf: 'flex-start',
    backgroundColor: '#500000',
    borderRadius: 20,
    paddingHorizontal: 30, // Horizontal padding
    paddingVertical: 10,
    alignItems: 'center',
    marginBottom: 10,
    marginLeft: 5
  },
  startButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default connect(mapStateToProps)(PlaceDetail);
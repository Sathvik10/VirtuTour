import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import {connect} from 'react-redux';
import { setContentType } from '../../../context/actions/bottomSheetActions';
import { setPlace } from '../../../context/actions/mapActions';
import {BOTTOM_SHEET_PLACE_DETAIL } from '../../../context/constants';

const TourPreviewContent = ({route, setContentType, setPlace }) => {

  const handleLinkClick = (place:any) => {
      // console.log(`Setting ${place.description}`);
      // setPlace({place});
      // setContentType({
      //     contentType: BOTTOM_SHEET_PLACE_DETAIL
      // });
      
  };

  return (
    <View style={styles.container}>
        <View style={styles.buttonsContainer}>
            <TouchableOpacity style={styles.startButton}>
                <Text style={styles.startButtonText}>Start</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.tourPreviewButton}>
                <Text style={styles.startButtonText}>Tour Preview</Text>
            </TouchableOpacity>
        </View>
      <View style={styles.routeSummary}>
        <Text style={styles.summaryText}>{route.source.name}</Text>
        <Text style={styles.detailsText}>Duration: {'50min'}</Text>
        <Text style={styles.detailsText}>Distance: {'100m'}</Text>
      </View>
      <ScrollView style={styles.routeSteps}>
        {route.route.map((place, index) => (
          <TouchableOpacity key={place.name} style={styles.step} onPress={() => handleLinkClick(place)}>
            <Text style={styles.stepText}>{index + 1}. {place.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const mapStateToProps = (state)=>{
    return {
        route: state.map.routeObj
    }   
  }

const mapDispatchToProps = {
    setContentType,
    setPlace,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    width: '100%'
  },
  buttonsContainer: {
    flexDirection:'row',
    width:'auto',
    justifyContent: 'space-between'
  },
  startButton: {
    alignSelf: 'flex-start',
    backgroundColor: '#1B6EF3',
    borderRadius: 20,
    paddingHorizontal: 30, // Horizontal padding
    paddingVertical: 10,
    alignItems: 'center',
    marginBottom: 10,
    marginLeft: 5
  },
  tourPreviewButton: {
    alignSelf: 'flex-end',
    backgroundColor: '#CBCCCE',
    paddingHorizontal: 25, // Horizontal padding
    paddingVertical: 10,
    borderRadius: 20,
    alignItems: 'center',
    marginBottom: 10,
    marginRight: 5
  },
  startButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  routeSummary: {
    marginBottom: 10,
  },
  summaryText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  detailsText: {
    fontSize: 14,
  },
  routeSteps: {
    flex: 1,
  },
  step: {
    marginBottom: 5,
  },
  stepText: {
    fontSize: 14,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(TourPreviewContent);

import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import {connect} from 'react-redux';
import { setContentType } from '../../../context/actions/bottomSheetActions';
import { setPlace } from '../../../context/actions/mapActions';
import {BOTTOM_SHEET_PLACE_DETAIL } from '../../../context/constants';
import {SterlingCEvansLibrary,
  BrightBuilding,
  CenturyTree,
  RudderComplex,
  AggiePark,
  KyleField,
  MemorialStudentCenter,
  SimpsonDrillField,
  ZachryBuilding,
  HaynesEngineeringBuilding
} from '../../../constants/map/places.js'

const TourPreviewContent = ({route, setContentType, place, setPlace, currentLocation }) => {

  const [startButtonClicked, setStartButtonClicked] = useState(false);

  // const current_location1: { lat: number; lon: number } = { lat: 30.613412596419227, lon: -96.33994268357311 };
  const current_location1: { lat: number; lon: number } = {
    lat: currentLocation.latitude,
    lon: currentLocation.longitude
  };
  console.log("Calculating...", current_location1);

  const places = {
    SterlingCEvansLibrary,
    BrightBuilding,
    CenturyTree,
    RudderComplex,
    AggiePark,
    KyleField,
    MemorialStudentCenter,
    SimpsonDrillField,
    ZachryBuilding,
    HaynesEngineeringBuilding
  };

  // Function to calculate distance between two points
  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371; // Radius of the earth in km
    const dLat = deg2rad(lat2 - lat1); // deg2rad below
    const dLon = deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c; // Distance in km
    return d;
  };

  const deg2rad = (deg: number) => {
    return deg * (Math.PI / 180);
  };

  // Function to find the closest place within 50 meters
  const findClosestPlace = () => {
    console.log("Calculating closest place...");
    let closestPlace = null;
    let minDistance = Infinity;

    Object.keys(places).forEach((key) => {
      const place1 = places[key];
      const distance = calculateDistance(current_location1.lat, current_location1.lon, place1.latitude, place1.longitude);
      if (distance < minDistance && distance <= 5) { // 0.005 km = 5 meters
        closestPlace = place1;
        minDistance = distance;
      }
    });
    // console.log("... distance from closest place is ", minDistance);
    // console.log("...closest place is ", closestPlace.name);
    return closestPlace;
  };
  
  place = findClosestPlace();

  useEffect(() => {
    if (startButtonClicked && route) {
      console.log("Closest place:", place.name);
      setPlace({place});
      console.log("Place set to:", place.name);
    }
  }, [startButtonClicked, route, place, setPlace, setContentType]);

  const handleStartButtonClick = () => {
    setContentType({ contentType: BOTTOM_SHEET_PLACE_DETAIL });
    setStartButtonClicked(true);
  };

  return (
    <View style={styles.container}>
        <View style={styles.buttonsContainer}>
            <TouchableOpacity style={styles.startButton}  onPress={handleStartButtonClick}>
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
          <Text style={styles.stepText}>{index + 1}. {place.name}</Text>
        ))}
      </ScrollView>
    </View>
  );
};

const mapStateToProps = (state)=>{
    return {
        route: state.map.routeObj,
        currentLocation: state.map.currentLocation
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

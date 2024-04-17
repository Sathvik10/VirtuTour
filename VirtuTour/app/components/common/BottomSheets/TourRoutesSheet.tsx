import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import { View, Text, StyleSheet, useWindowDimensions, SafeAreaView } from 'react-native';
import BottomSheet, { BottomSheetView, BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import { setTourType } from '../../../context/actions/buttonActions';
import { setRoute, setPlace } from '../../../context/actions/mapActions';
import {connect} from 'react-redux';
import {BOTTOM_SHEET_TOUR_LIST, BOTTOM_SHEET_TOUR_PREVIEW, BOTTOM_SHEET_PLACE_DETAIL, GUIDE_TOUR_TYPE } from '../../../context/constants';
import TourPreviewContent from './TourPreviewContent';
import RoutesAndToggle from './RoutesAndToggle';
import PlaceDetail from './PlaceDetail';
import { setContentType } from '../../../context/actions/bottomSheetActions';
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

const TourRoutesSheet = ({setTourType, mapRef, wayPoints, setRoute, route, setPlace, place, setContentType, content}) => {

  const { width } = useWindowDimensions();
  const bottomSheetRef = useRef(null);
  const snapPoints = useMemo(() => ['25%','50%','70%'], []);

  const current_location1: { lat: number; lon: number } = { lat: 30.613412596419227, lon: -96.33994268357311 };
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
    let closestPlace = null;
    let minDistance = Infinity;

    Object.keys(places).forEach((key) => {
      const place1 = places[key];
      const distance = calculateDistance(current_location1.lat, current_location1.lon, place1.latitude, place1.longitude);
      if (distance < minDistance && distance <= 0.005) { // 0.005 km = 5 meters
        closestPlace = place1;
        minDistance = distance;
      }
    });

    return closestPlace;
  };

  place = findClosestPlace();

  useEffect(() => {
    if (route && content === BOTTOM_SHEET_TOUR_PREVIEW) {
      console.log("Closest place:", place.name);
      setPlace({place});
      console.log("Place set to:", place.name);
      setContentType({
        contentType: BOTTOM_SHEET_PLACE_DETAIL
      });
    }
  }, [route, content]);
  
  const handleSheetChanges = useCallback((index: number) => {
    const focused = index !== -1;
    if(index === -1){
      switch(content){
        case BOTTOM_SHEET_TOUR_PREVIEW: 
            setContentType({
              contentType: 0
            });
            bottomSheetRef.current?.snapToIndex(1)
            setRoute({route: null});
            break;
        case BOTTOM_SHEET_TOUR_LIST: 
            setContentType({
              contentType: null
            });
            setTourType({tourOption: null});
            setRoute({route: null});
            break;
        case BOTTOM_SHEET_PLACE_DETAIL:
            setContentType({
              contentType: 2
            });
            setTourType({tourOption: null});
            setRoute({route: null});
            setPlace({place: null});
            break;
        default:
          setRoute({route: null});
          setPlace({place: null});
          setTourType({tourOption: null});
      }
    }

    if(index > 0 && content == BOTTOM_SHEET_TOUR_PREVIEW){
      console.log("Changing Zoom...")
      console.log(wayPoints)
      mapRef.current?.fitToCoordinates(wayPoints, {
        edgePadding: { top: 100, right: 100, bottom: 100, left: 100 }, // Adjust padding as needed
        animated: true, // Set to false if you do not want the map to animate zooming
      });
    }
    if(index == 0 && content ==  BOTTOM_SHEET_TOUR_PREVIEW){
        const region = {
            latitude: route.source.latitude,
            longitude: route.source.longitude,
            latitudeDelta: 0.004, 
            longitudeDelta: 0.004
        }
        mapRef.current?.animateToRegion(region, 1000)
    }
    console.log('handleSheetChanges', index);
  }, [content]);

  // const renderBackdropComponent = useCallback(
  //   (props : any) => (
  //     <BottomSheetBackdrop appearsOnIndex={1} disappearsOnIndex={0} {...props}/>
  //   ),
  //   []
  // );


  return (
        <BottomSheet
          enablePanDownToClose = {true}
          ref={bottomSheetRef}
          index = {1}
          snapPoints={snapPoints}
          onChange={handleSheetChanges}
        >
          <BottomSheetView style={styles.contentContainer}>
              {content == BOTTOM_SHEET_TOUR_PREVIEW && route && (
                <TourPreviewContent/>
              )}
              {content == BOTTOM_SHEET_TOUR_LIST &&(
                <RoutesAndToggle bottomSheetRef = {bottomSheetRef}/>
              )}
              {content == BOTTOM_SHEET_PLACE_DETAIL && place && (
                <PlaceDetail/>
              )}
          </BottomSheetView>
        </BottomSheet>
  );
};


const mapDispatchToProps = {
  setTourType,
  setRoute,
  setPlace,
  setContentType
};

const mapStateToProps = (state)=>({
  content: state.bottomSheet.contentType,
  route: state.map.routeObj,
  place: state.map.placeObj,
  mapRef: state.map.mapRef,
  wayPoints: state.map.wayPoints,
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: -30
  },
  contentContainer: {
    flex: 1,
    alignItems: 'flex-start',
  },
  footerContainer: {
    padding: 12,
    marginBottom: 12,
    borderRadius: 12,
    backgroundColor: '#80f',
  },
  footerText: {
    textAlign: 'center',
    color: 'white',
    fontWeight: '800',
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(TourRoutesSheet);

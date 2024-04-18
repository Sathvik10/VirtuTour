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

const TourRoutesSheet = ({setTourType, mapRef, wayPoints, setRoute, route, setPlace, place, setContentType, content}) => {

  const { width } = useWindowDimensions();
  const bottomSheetRef = useRef(null);
  const snapPoints = useMemo(() => ['25%','50%','70%'], []);
  
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
                <TourPreviewContent place={undefined}/>
              )}
              {content == BOTTOM_SHEET_TOUR_LIST &&(
                <RoutesAndToggle bottomSheetRef = {bottomSheetRef}/>
              )}
              {content == BOTTOM_SHEET_PLACE_DETAIL && place && (
                <PlaceDetail />
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

import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Text, View, TouchableOpacity, Image } from 'react-native';
import { BOTTOM_SHEET_PLACE_DETAIL, BOTTOM_SHEET_TOUR_PREVIEW } from '../../../context/constants';
import { setContentType } from '../../../context/actions/bottomSheetActions';
import { placeDetailStyles } from './PlaceDetail.style';

const PlaceDetail = ({ place, setContentType }) => {

  console.log("Welcome to place page");

  const [exitButtonClicked, setExitButtonClicked] = useState(false);

  useEffect(() => {
    if (exitButtonClicked) {
      console.log("Exiting details sheet");
      setContentType({ contentType: BOTTOM_SHEET_TOUR_PREVIEW });
    }
  }, [exitButtonClicked, setContentType]);

  const handleExitButtonClick = () => {
    setExitButtonClicked(true);
  };
  
  return (
    <>
      <View style={placeDetailStyles.buttonsContainer}>
        <TouchableOpacity style={placeDetailStyles.exitButton} onPress={handleExitButtonClick}>
          <Text style={placeDetailStyles.startButtonText}>Exit</Text>
        </TouchableOpacity>
      </View>
      <View style={placeDetailStyles.contentContainer}>
        <Text style={placeDetailStyles.headerText}>{place.name}</Text>        
        {/* <Image style={placeDetailStyles.image} source={require('./sterlingCEvansLibrary.jpg')} /> */}
        <Image style={placeDetailStyles.image} source={place.image} />
        <Text style={placeDetailStyles.descriptionText}>{place.description}</Text>
      </View>
    </>
  )
}

const mapStateToProps = (state) => ({
  place: state.map.placeObj, // Access place data from Redux store
});

const mapDispatchToProps = {
  setContentType
};

export default connect(mapStateToProps, mapDispatchToProps)(PlaceDetail);
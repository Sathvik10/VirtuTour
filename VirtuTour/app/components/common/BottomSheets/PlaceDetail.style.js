import { StyleSheet } from 'react-native';

export const placeDetailStyles = StyleSheet.create({
  buttonsContainer: {
    flexDirection: 'row',
    width: 'auto',
    justifyContent: 'space-between'
  },
  exitButton: {
    alignSelf: 'flex-end', // Align to the right
    backgroundColor: '#500000',
    paddingHorizontal: 25, // Horizontal padding
    paddingVertical: 10,
    borderRadius: 20,
    alignItems: 'center',
    marginBottom: 10,
    marginLeft: 420
  },
  startButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10
  },
  descriptionText: {
    fontSize: 16,
  },
  contentContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 120,
    marginRight: 130
  },
  image: {
    width: 300,
    height: 300,
  },
});
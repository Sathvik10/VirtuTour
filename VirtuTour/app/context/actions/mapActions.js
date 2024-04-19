export const initMapRef = ({mapRef}) =>({
    type: 'INIT_MAP_REF',
    mapRef
});

export const setRoute = ({route}) =>({
    type: 'SET_ROUTE',
    routeObj: route
});

export const setWayPoints = (wayPoints) =>({
    type: 'SET_WAYPOINTS',
    wayPoints
});

export const setCurrentLocation = ({currentLocation}) => ({
    type: "SET_CURRENT_LOCATION",
    currentLocation
});

export const setCurrentPlace = ({currentPlace}) => ({
    type : "SET_CURRENT_PLACE",
    currentPlace});

export const startNavigation = (navigation) => ({
    type: "START_NAVIGATION",
    navigation
});
import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, ActivityIndicator, Image } from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker, Callout } from 'react-native-maps';
import { COLORS, FONTS, icons, SIZES, GOOGLE_API_KEY } from "../constants"
import * as Location from 'expo-location';
import MapViewDirections from 'react-native-maps-directions';
import { LocationObject } from 'expo-location';
import Search from '../components/Search';
import { GooglePlaceData, GooglePlaceDetail } from 'react-native-google-places-autocomplete';


const styles = StyleSheet.create({
    container: {  
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    map: {
      width: SIZES.width,
      height: SIZES.height,
    },
  });

interface iLocation {
    latitude: number;
    longitude: number;
    latitudeDelta: number,
    longitudeDelta: number,
}


const OrderDelivery: React.FC = () => {

  const ASPECT_RATIO = SIZES.width / SIZES.height;
  const LATITUDE_DELTA = 0.0622;
  const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
  const [errorMsg, setErrorMsg] = useState('');
  const [location, setLocation] = useState<LocationObject>();
  const [angle, setAngle] = useState(0)
const [loading, setLoading] = useState(false);
 
    const [coordinates, setCoordinates] = useState<iLocation>({
    latitude: location?.coords.latitude || 52.249649,
    longitude: location?.coords.longitude || -7.104489,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
}); 
const [coordinatesDeliverman, setCoordinatesDeliverman] = useState<iLocation>({
    latitude: location?.coords.latitude || 52.249649,
    longitude: location?.coords.longitude || -7.104489,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
});

useEffect(() => {
  (async () => {
    let { status } = await Location.requestPermissionsAsync();
    if (status !== 'granted') {
      setErrorMsg('Permission to access location was denied');
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    setLocation(location);
  })();
}, []);
//console.log(location);

const origin = {latitude: coordinates.latitude, longitude: coordinates.longitude};
const destination = {latitude: coordinatesDeliverman.latitude, longitude: coordinatesDeliverman.longitude};
const GOOGLE_MAPS_APIKEY = GOOGLE_API_KEY;

const recordEvent = (x: iLocation) => {setCoordinates(x)};
console.log(coordinates)

const handleLocationSelected = (data: GooglePlaceData, details: GooglePlaceDetail) => {
    const {location} = details.geometry;

    setCoordinates({
        latitude: location.lat,
        longitude: location.lng,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
    })
}
     
    return (
        <View style={styles.container}>
            {loading? (<ActivityIndicator size="large" />)
            :(
        <MapView 
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        initialRegion={{
            latitude: coordinates.latitude,
            longitude: coordinates.longitude,
            latitudeDelta: coordinates.latitudeDelta,
            longitudeDelta: coordinates.longitudeDelta,
        }}
        onRegionChangeComplete={(x) => recordEvent(x)}
         >
           <Marker
                coordinate={coordinates}
               
            >
                <View
                    style={{
                        height: 40,
                        width: 40,
                        borderRadius: 20,
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: COLORS.white
                    }}
                >
                    <View
                        style={{
                            height: 30,
                            width: 30,
                            borderRadius: 15,
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: COLORS.primary
                        }}
                    >
                        <Image
                            source={icons.pin}
                            style={{
                                width: 25,
                                height: 25,
                                tintColor: COLORS.white
                            }}
                        />
                    </View>
                </View>
                <Callout>
                    <Text>Quero Água</Text>
                </Callout>
            </Marker>
            <Marker
                coordinate={coordinatesDeliverman}
                anchor={{ x: 0.5, y: 0.5 }}
                flat={true}
                rotation={angle}
            >
                <Image
                    source={icons.car}
                    style={{
                        width: 40,
                        height: 40
                    }}
                />
            </Marker>
            <MapViewDirections
    origin={origin}
    destination={destination}
    apikey={GOOGLE_MAPS_APIKEY}
  />
         </MapView>
         )}
         <Search onLocatioonSelected={handleLocationSelected} />
      </View>
    )
}
export default OrderDelivery;

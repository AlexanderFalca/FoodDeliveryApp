import React                                 from 'react';
import { GooglePlaceData, GooglePlaceDetail, GooglePlacesAutocomplete, GooglePlacesAutocompleteProps} from 'react-native-google-places-autocomplete';
import {Platform} from 'react-native';

interface SearchProps {
    onLocatioonSelected(data: GooglePlaceData, detail: GooglePlaceDetail | null):void;
}

const Search: React.FC<SearchProps> = ({onLocatioonSelected}) => {

    return (
      <GooglePlacesAutocomplete
        placeholder="Local de Entrega"
        onPress={onLocatioonSelected}
        query={{
          key: 'AIzaSyDBvfeG6eSN1asACADLuQbBTiCFC-ik6R8',
          language: 'en',
        }}
        textInputProps={{
          autoCapitalize: 'none',
          autoCorrect: false,
        }}
        fetchDetails
        enablePoweredByContainer={false}
        styles={{
          container: {
            position: 'absolute',
            top: Platform.select({ios: 60, android: 40}),
            width: '100%',
          },
          textInputContainer: {
            flex: 1,
            backgroundColor: 'transparent',
            height: 54,
            marginHorizontal: 20,
            borderTopWidth: 1,
            borderBottomWidth: 0,
          },
          textInput: {
            height: 54,
            margin: 0,
            borderRadius: 0,
            paddingTop: 0,
            paddingBottom: 0,
            paddingLeft: 10,
            paddingRight: 10,
            marginTop: 0,
            marginLeft: 0,
            marginRight: 0,
            elevation: 5,
            shadowColor: '#000',
            shadowOpacity: 0.1,
            shadowRadius: 15,
            borderWidth: 1,
            borderColor: '#DDD',
            fontSize: 18,
          },
          description: {
            fontSize: 16,
          },
          row: {
            padding: 20,
            height: 58,
          },
        }}
      />
    );

}
export default Search;
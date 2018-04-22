import {StyleSheet} from 'react-native';
export default function style() {
    return {...StyleSheet.flatten([...arguments])};
}
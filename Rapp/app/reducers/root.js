import {combineReducers} from 'redux';
import classes from './classes';
import roster from "./roster";
import analysis from "./analysis";
import orientation from './orientation';

export default combineReducers({
    classes,
    roster,
    analysis,
    orientation
});
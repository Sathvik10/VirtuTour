import {getScreenSize, SCREEN_WIDTH, SCREEN_HEIGHT} from '../../utility/helper';

const MAX_TRANSLATE_Y = getScreenSize(80);
const HALF_SCREEN_TRANSLATE_Y = getScreenSize(60);
const QUARTER_SCREEN_STRANLATE_Y = getScreenSize(25);
const MIN_TRANSLATE_Y = getScreenSize(-100);

const PLAY_POSITION_TOP = SCREEN_HEIGHT * (10/100) 

export {MAX_TRANSLATE_Y, HALF_SCREEN_TRANSLATE_Y, QUARTER_SCREEN_STRANLATE_Y, PLAY_POSITION_TOP, MIN_TRANSLATE_Y};


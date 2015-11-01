/* @flow */

import colors from 'colors';

class StringHelper {
    pad(length:number, paddingCharacter:string, str:string, padLeft:boolean):string {
        if(!paddingCharacter) {
            paddingCharacter = ' ';
        }
        let pad = Array(length+1).join(paddingCharacter);
        if (typeof str === 'undefined') {
            return pad;
        }
        if (padLeft) {
            return (pad + str).slice(-pad.length);
        } else {
            return (str + pad).substring(0, pad.length);
        }
    }
    contains(containingString: string, stringToFind: string): boolean {
        return containingString.toLowerCase().indexOf(stringToFind.toLowerCase()) != -1;
    }
    color(text:string, color:string):string {
        if(!color) {
            color = 'white';
        }
        return colors[color](text);
    }
}

export default new StringHelper();
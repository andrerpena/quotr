import stringHelper from './stringHelper';
import colors from 'colors';

class Column {
    constructor(title: string, size:number, color:string, paddingCharacter:string, padLeft:boolean) {
        this.title = title;
        this.size = size;
        this.color = color;
        this.paddingCharacter = paddingCharacter;
        this.padLeft = padLeft;
    }
    size: number;
    title: string;
    paddingCharacter: string;
    padLeft: boolean;
    color: string
}

class TableHelper {
    createTable(columns:Array<Column>, data: Array<Array<string>>): string {
        //print header
        let result:string = '';
        let tableGutter = 3;

        // header
        for(let i =0; i<columns.length;i++) {
            result += colors.blue(stringHelper.pad(columns[i].size, columns[i].paddingCharacter, columns[i].title, columns[i].padLeft));
            result += Array(tableGutter + 1).join(' ');
        }

        // header bottom bar
        result += '\n';
        for(let i =0; i<columns.length;i++) {
            result += Array(columns[i].size + 1).join('-');
            result += Array(tableGutter + 1).join(' ');
        }
        result += '\n';

        // content
        for(let i =0; i<data.length;i++) {
            for(let j=0; j<data[i].length; j++) {
                result += stringHelper.color(stringHelper.pad(columns[j].size, columns[j].paddingCharacter, data[i][j], columns[j].padLeft), columns[j].color);
                result += Array(tableGutter + 1).join(' ');
            }
            result += '\n';
        }
        return result;
    }
}

let tableHelper = new TableHelper();

export default {
    Column,
    tableHelper
}
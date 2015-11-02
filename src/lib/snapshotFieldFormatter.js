import moment from 'moment';
import formato from 'formato';

/**
 * Formatter for snapshot field values
 */
class SnapshotFieldFormatter {
    constructor() {
        this.formatters = new Object();
    }

    formatters:Object;

    /**
     * Registers a formatter function for the given fieldName
     * @param fieldName
     * @param formatter
     */
    registerFormatter(fieldName:string, formatter:(val:any) => string):void {
        this.formatters[fieldName] = formatter;
    }

    /**
     * Formats the value for the given fieldName
     * @param fieldName
     * @param value
     * @returns {*}
     */
    formatValue(fieldName:string, value:any) {
        if (this.formatters.hasOwnProperty(fieldName)) {
            return this.formatters[fieldName](value);
        }
        return value;
    }
}

let snapshotFieldFormatter = new SnapshotFieldFormatter();

// registers the default formatters
snapshotFieldFormatter.registerFormatter('lastTradeDate', (val) => {
    if (!val) {
        return val;
    }
    return moment(val).format('YYYY-MM-DD');
});
snapshotFieldFormatter.registerFormatter('volume', (val) => {
    return formato.format(val, {precision: 0});
});

export default snapshotFieldFormatter;


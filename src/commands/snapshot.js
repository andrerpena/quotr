/* @flow */

import colors from 'colors';
import Command from './Command';
import yahooFinance from 'yahoo-finance';
import stringHelper from '../lib/stringHelper';
import th from '../lib/tableHelper';

let Column = th.Column;
let tableHelper = th.tableHelper;

class SnapshotCommand extends Command {
    setup(vorpal: Vorpal): void {
        vorpal
            .command('snapshot <symbol>', 'Displays the current snapshot of the given symbols')
            .option('-f, --fields <fields>', 'Fields that should be displayed')
            .alias('s')
            .action(function(args, callback) {

                let _this = this;
                let fields = ['s', 'n', 'd1', 't1', 'l1'];
                if(args.options.fields) {
                    fields = args.options.fields.split(',');
                }
                let symbols = args.symbol.split(',');

                try {
                    yahooFinance.snapshot({
                        symbols: symbols,
                        fields: fields
                    }, function(err, snapshot) {
                        if (err) {
                            _this.log(colors.red(`error: ${err}`));
                            callback();
                        }
                        else {

                            // Columns
                            let columns = [new Column('field', 30, 'white',' ', false)];
                            for(let i = 0; i < snapshot.length; i++) {
                                columns.push(new Column(symbols[i], 40, 'green'));
                            }

                            // Data
                            let data = [];
                            let defaultSnapshot = snapshot[0];
                            let snapshotFields = Object.keys(defaultSnapshot);

                            snapshotFields.forEach( f=> {
                                let rowData = [f];
                                for(let i = 0; i < snapshot.length; i++) {
                                    rowData.push(snapshot[i][f]);
                                }
                                data.push(rowData);
                            });

                            _this.log(tableHelper.createTable(columns, data));

                            callback();
                        }
                    });
                }
                catch(ex) {
                    _this.log(colors.red(`error: ${ex}`));
                }

            });
    }
}

export default new SnapshotCommand();


/* @flow */

import colors from 'colors';
import Command from './Command';
import yahooFinance from 'yahoo-finance';
import stringHelper from '../lib/stringHelper';
import th from '../lib/tableHelper';
import babar from 'babar';
import moment from 'moment';

let Column = th.Column;
let tableHelper = th.tableHelper;

class SnapshotCommand extends Command {
    setup(vorpal: Vorpal): void {
        vorpal
            .command('history <symbol>', 'Displays the current snapshot of the given symbols')
            .option('-f, --from <from>', 'Start date')
            .option('-t, --to <to>', 'Start date')
            .alias('h')
            .action(function(args, callback) {
                let _this = this;
                try {
                    yahooFinance.historical({
                        symbol: args.symbol,
                        from: args.options.from,
                        to: args.options.to
                    }, function(err, snapshot) {
                        if (err) {
                            _this.log(colors.red(`error: ${err}`));
                            callback();
                        }
                        else {

                            // Columns
                            let columns = [
                                new Column('index', 4, 'blue',' ', false),
                                new Column('date', 12, 'white',' ', false),
                                new Column('open', 6, 'green'),
                                new Column('high', 6, 'green'),
                                new Column('low', 6, 'green'),
                                new Column('close', 6, 'green'),
                                new Column('volume', 14, 'green'),
                                new Column('adjClose', 6, 'green'),
                                new Column('symbol', 10, 'green')
                            ];
                            let data = [];
                            let closeValues = [];
                            for(let i = 0; i < snapshot.length; i++) {
                                let item = snapshot[i];
                                let rowData = [
                                    i,
                                    moment(item.date).format('YYYY-MM-DD'),
                                    item.open,
                                    item.high,
                                    item.low,
                                    item.close,
                                    item.volume,
                                    item.adjClose,
                                    item.symbol
                                ];
                                data.push(rowData);
                                closeValues.push([i, item.close]);
                            }

                            _this.log(tableHelper.createTable(columns, data));

                            _this.log(babar(closeValues, { width: 100 }));

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


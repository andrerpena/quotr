/* @flow */

import colors from 'colors';
import Command from './Command';
import yahooFinance from 'yahoo-finance';
import stringHelper from '../lib/stringHelper';
import th from '../lib/tableHelper';
import jsonFile from 'jsonfile';
import moment from 'moment';

let Column = th.Column;
let tableHelper = th.tableHelper;


class SnapshotCommand extends Command {
    setup(vorpal: Vorpal): void {
        vorpal
            .command('symbol-search <symbol>', 'Displays the current snapshot of the given symbols')
            .alias('sss')
            .action(function(args, callback) {
                let _this = this;
                jsonFile.readFile('./data/Stock.json', function(error, symbols) {
                    if(error) {
                        _this.log(colors.red(`error: ${error}`));
                        callback();
                    }
                    else {
                        // Columns
                        let columns = [
                            new Column('symbol', 10, 'blue',' ', false),
                            new Column('name', 40, 'white',' ', false),
                            new Column('stockexchange', 6, 'green'),
                            new Column('market', 40, 'green')
                        ];

                        let data = [];
                        for(let i = 0; i < symbols.length; i++) {
                            let item = symbols[i];
                            if(stringHelper.contains(item.symbol, args.symbol) || stringHelper.contains(item.name, args.symbol)) {
                                let rowData = [
                                    item.symbol,
                                    item.name,
                                    item.stockexchange,
                                    item.market
                                ];
                                data.push(rowData);
                            }
                        }

                        _this.log(tableHelper.createTable(columns, data));
                        callback();
                    }
                });
            });
    }
}

export default new SnapshotCommand();


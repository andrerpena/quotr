/* @flow */

import colors from 'colors';
import Command from './Command';
import yahooFinance from 'yahoo-finance';
import stringHelper from '../lib/stringHelper';
import th from '../lib/tableHelper';
import jsonFile from 'jsonfile';
import moment from 'moment';
import symbols from '../../data/Stock.json';

let Column = th.Column;
let tableHelper = th.tableHelper;


class SnapshotCommand extends Command {
    setup(vorpal: Vorpal): void {
        vorpal
            .command('symbol-search <symbol>', 'Searchs for ticker symbols')
            .alias('ss')
            .action(function(args, callback) {
                let _this = this;
                let columns = [
                    new Column('symbol', 10, 'yellow',' ', false),
                    new Column('name', 35, 'white',' ', false),
                    new Column('stockexchange', 6, 'green'),
                    new Column('market', 30, 'green')
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
            });
    }
}

export default new SnapshotCommand();


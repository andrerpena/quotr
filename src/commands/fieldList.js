/* @flow */

import colors from 'colors';
import Command from './Command';
import yahooFinance from 'yahoo-finance';
import fields from 'yahoo-finance/lib/fields.js';
import stringHelper from '../lib/stringHelper';
import th from '../lib/tableHelper';
import babar from 'babar';

let Column = th.Column;
let tableHelper = th.tableHelper;

class SnapshotCommand extends Command {
    setup(vorpal: Vorpal): void {
        vorpal
            .command('field-list', 'Displays all possible fields for a snapshot')
            .option('-s, --search <search>', 'Searchs for fields that match the given string')
            .alias('f')
            .action(function(args, callback) {

                let columns = [new Column('field', 5, 'white', ' ', true), new Column('description', 60, 'green', ' ', false)];
                let data = [];

                for(let f in fields) {
                    if(args.options.search) {
                        if(!stringHelper.contains(f, args.options.search) && !stringHelper.contains(fields[f], args.options.search) ) {
                            continue;
                        }
                    }
                    data.push([f, colors.green(fields[f])]);
                }


                let table = tableHelper.createTable(columns, data);
                this.log(table);

                callback();
            });
    }
}

export default new SnapshotCommand();


/* @flow */

import colors from 'colors';
import Command from './Command';
import yahooFinance from 'yahoo-finance';
import stringHelper from '../lib/stringHelper';
import th from '../lib/tableHelper';
import babar from 'babar';
import moment from 'moment';
import _ from 'underscore';
import formato from 'formato';

let Column = th.Column;
let tableHelper = th.tableHelper;

class SnapshotCommand extends Command {
    setup(vorpal:Vorpal):void {
        vorpal
            .command('variation <symbol>', 'Displays the current snapshot of the given symbols')
            .option('-f, --from <from>', 'Start date')
            .option('-t, --to <to>', 'Start date')
            .option('-l, --lastDays <lastDays>', 'Start date')
            .alias('v')
            .action(function (args, callback) {
                let _this = this;

                try {

                    let from;
                    let to;

                    // setting time window
                    if (args.options.lastDays) {
                        from = moment().subtract(args.options.lastDays, 'day').format("YYYY-MM-DD");
                        to = moment().format("YYYY-MM-DD");
                    }
                    else if (args.options.from && args.options.to) {
                        from = args.options.from;
                        to = args.options.to;
                    }
                    else {
                        from = moment().subtract(10, 'day').format("YYYY-MM-DD");
                        to = moment().format("YYYY-MM-DD");
                    }

                    yahooFinance.historical({
                        symbol: args.symbol,
                        from: from,
                        to: to
                    }, function (err, snapshot) {
                        if (err) {
                            _this.log(colors.red(`error: ${err}`));
                            callback();
                        }
                        else {

                            try {


                                // process values
                                let valueStart = snapshot[0].open;
                                let valueStartDate = moment(snapshot[0].date).format('YYYY-MM-DD')
                                let valueEnd = snapshot[snapshot.length - 1].close;
                                let valueEndDate = moment(snapshot[snapshot.length - 1].date).format('YYYY-MM-DD')

                                let variation = valueEnd - valueStart;
                                let variationPercentual = 100 * variation / valueStart;
                                let lowest = _.min(snapshot, o => o.low).low;
                                let highest = _.max(snapshot, o => o.high).high;
                                let loHiDifference = highest - lowest;

                                // Columns
                                let columns = [
                                    new Column('field', 30, 'yellow', ' ', false),
                                    new Column('description', 30, 'white', ' ', false)
                                ];

                                let data = [];
                                data.push([`open value (${valueStartDate})`, formato.format(valueStart)]);
                                data.push([`close value (${valueEndDate})`, formato.format(valueEnd)]);
                                data.push(['variation', formato.format(variation)]);
                                data.push(['variation (%)', formato.format(variationPercentual) + '%']);
                                data.push(['lowest value', formato.format(lowest)]);
                                data.push(['highest value', formato.format(highest)]);
                                data.push(['lo/hi difference', formato.format(loHiDifference)]);

                                _this.log(tableHelper.createTable(columns, data));

                                callback();

                            }
                            catch (ex) {
                                _this.log(colors.red(`Could not process your request. Please check the parameters. Make sure the symbol you are looking for really exists.`));
                                callback();
                            }
                        }
                    });
                }
                catch (ex) {
                    _this.log(colors.red(`error: ${ex}`));
                    callback();
                }

            });
    }
}

export default new SnapshotCommand();


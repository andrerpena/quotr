#! /usr/bin/env node

import Vorpal from 'vorpal';
import snapshotCommand from './commands/snapshot';
import snapshotFieldList from './commands/snapshotFieldList';
import historyCommand from './commands/history';
import symbolSearch from './commands/symbolSearch';

let vorpal = Vorpal();

snapshotCommand.setup(vorpal);
snapshotFieldList.setup(vorpal);
historyCommand.setup(vorpal);
symbolSearch.setup(vorpal);

vorpal
    .delimiter('quotr$')
    .show();
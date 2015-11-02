#! /usr/bin/env node

import Vorpal from 'vorpal';
import snapshotCommand from './commands/snapshot';
import snapshotFieldList from './commands/fieldList';
import historyCommand from './commands/history';
import symbolSearchCommand from './commands/symbolSearch';
import variationCommand from './commands/variation'

let vorpal = Vorpal();

snapshotCommand.setup(vorpal);
snapshotFieldList.setup(vorpal);
historyCommand.setup(vorpal);
symbolSearchCommand.setup(vorpal);
variationCommand.setup(vorpal);

vorpal
    .delimiter('quotr$')
    .show();
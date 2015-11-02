#Quotr#

Quotr is a [Node.js](https://nodejs.org/en/) [CLI](https://en.wikipedia.org/wiki/Command-line_interface) 
for getting near real-time stock quotes from [Yahoo Finance](http://finance.yahoo.com/).
It works for pretty much every relevant ticker in the world. The delay depends on the Yahoo's data provider. 
Normally it's 15 minutes. You can check the list of exchanges and corresponding delay [here](https://help.yahoo.com/kb/SLN2310.html).



#Installing#

Make sure you have [Node.js installed](https://nodejs.org/en/download/package-manager/), then... (you'll need `sudo` on linux boxes)

    npm install -g quotr
    
#Using#

Open the terminal (or command prompt on Windows) and type:

    quotr
    
Now you've entered the `quotr` shell.
    
For getting all available commands:

    help
    
for getting help for a specific command:

    <command> /?
    
Now you can start entering commands...

##Commands##

###`symbol-search` (short: `ss`)###

Searchs for ticker symbols that match the given criteria. Example:

    ss apple
    
![image](http://i.imgur.com/0IBjBEL.png)

###`snapshot` (short: `s`)###


Displays the latest information about the given symbol. Example:

    s aapl
    
![image](http://i.imgur.com/96wbGGe.png)

Optionally, you can pass fields in using the `-f` parameter. Example:

    s aapl -f v (displays the volume)
    
![image](http://i.imgur.com/35iDFh0.png)

Now it would be helpful to know the available fields for the `s` command...

###`field-list` (short: `f`)###

Displays or searches for the available `snapshot` fields. Examples:

    f (displays all fields)
    f -s average (displays all fields that match `average`)
    
![image](http://i.imgur.com/TIngeBa.png)

###`history` (short: `h`)###

Displays the history for a given symbol. Examples:

    h aapl (displays the last 10 days history of the `aapl` symbol, which is the default in case no interval is specified)
    h aapl -l 60 (displays the last 60 days history for the `aapl` symbol)
    h aapl -f 2015-10-01 -t 2015-10-30 (displays the history from the `aapl` symbol from 2015-10-01 to 2015-10-30)
    
![image](http://i.imgur.com/JpsM2wr.png)
    

    

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
    
Now you can start entering commands

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


    
    

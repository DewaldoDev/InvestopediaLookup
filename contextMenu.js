//Initializer for right-click context menu
var menuItem = chrome.contextMenus.create({
	'title': 'Investopedia Lookup',
	'contexts': ['selection'],
	'onclick': termLookup});

//Callback function which sends the intial get requst to Investopedia
function termLookup(info, tab){
	var term = info.selectionText.replace(/\s+/g, '-').toLowerCase(),
		firstLetter = term.charAt(0);

	var DOMAIN = 'http://www.investopedia.com',
		PATH = /terms/+firstLetter+'/'+term+'.asp',
		URL = DOMAIN+PATH;

	$.get(URL, parseResponse);
}

//Parses response text from Investopedia
function parseResponse(responseText){

	//var definition = '';
	$(responseText).find('.content-box-term').children().each(function(i, element){

		//This condition handles the definition text and needs to be improved
		if($(this).is('p')){
			//$(this).dialog(); <-- This is the method for jQuery UI dialog box but doesn't work yet
			//definition.concat($(this).text()); <-- This is to avoid multiple alert boxes but doesn't work
			alert($(this).text());
		} else if ($(this).is('div#NextUpBox')){
			return false;
		}
	});
}

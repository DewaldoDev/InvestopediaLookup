var menuItem = chrome.contextMenus.create({
	'title': 'Investopedia Lookup',
	'contexts': ['selection'],
	'onclick': termLookup});

function termLookup(info, tab){
	var term = info.selectionText.replace(/\s+/g, '-').toLowerCase(),
		firstLetter = term.charAt(0);

	var DOMAIN = 'http://www.investopedia.com',
		PATH = /terms/+firstLetter+'/'+term+'.asp',
		URL = DOMAIN+PATH;

	$.get(URL, parseResponse);
}

function parseResponse(responseText){
	var definition = 'a';
	$(responseText).find('.content-box-term').children().each(function(i, element){
		if($(this).is('p')){
			//$(this).dialog();
			//definition.concat($(this).text());
			alert($(this).text());
		} else if ($(this).is('div#NextUpBox')){
			return false;
		}
	});
}

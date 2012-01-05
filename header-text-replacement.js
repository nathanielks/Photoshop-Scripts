//Defining Variables
months = new Array('January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December');
year = 2012;
layerName = 'INSERT'; //The name of the layer you want to replace the text

// Open the document
var sampleDocToOpen = File("/Volumes/HU\ RAID/Active/Updated\ Email\ Header/Header\ Template.psd");
open(sampleDocToOpen);

//Date Function
//Modified code now found at http://jsfiddle.net/G4uDj/16/
var getDateInterval = function(index, weekday, month, year) {
    // index what occurence of the weekday we look for (1 and upwards)
    // weekday 0-6 (= Sunday - Monday)
    // month 0-11 (= January - December) optional defaults to current month
    // Having month be 0-11 coincides with the months array defined earlier
    // year (a four digit number) optional defaults to current year
    var day = 1;

    do {
        result = new Date(year,month,day);
        result.getDay() == weekday && index--;
       day++;
    }
    
    while (index > 0) {
        return result;
    }
};

function saveForWeb(saveFile){
    exportOptions = new ExportOptionsSaveForWeb();
    exportOptions.format = SaveDocumentType.PNG;
    exportOptions.PNG8 = false;
    exportOptions.quality = 100;
    activeDocument.exportDocument(saveFile, ExportType.SAVEFORWEB, exportOptions);
}


//get the active document
var doc = app.activeDocument;

//Creates the dates in the MONTH YEAR format
//for(curr=0;curr<12;curr++){
    //var layer = doc.layers.getByName(layerName);
    //if(layer.kind == LayerKind.TEXT) layer.textItem.contents = months[curr]+' '+year;
    //var itemName = months[curr]+'_'+year; 
    //var filePath = app.activeDocument.path; 
    //var saveFile = File(filePath + "/images/" + itemName +".png"); 
    //if(saveFile.exists) saveFile.remove(); 
    //saveForWeb(saveFile); 
    
//}


for(curr=0;curr<12;curr++){
    for(i=0;i<2;i++){
        var layer = doc.layers.getByName(layerName);
        var filePath = app.activeDocument.path; 
        var x = ( i === 0 ) ? 2 : 4;
        var date = getDateInterval(x, 3, curr, year);
        date = months[date.getMonth()] + ' ' + date.getDate() + ', ' + date.getFullYear();
        if(layer.kind == LayerKind.TEXT) layer.textItem.contents = date;
        var itemName = date;
        itemName = itemName.split(' ').join('_').replace(',','').toLowerCase();
        var saveFile = File(filePath + "/images/" + itemName +".png"); 
        if(saveFile.exists) saveFile.remove(); 
        saveForWeb(saveFile); 
    }
}

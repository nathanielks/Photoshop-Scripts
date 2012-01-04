//Defining Variables
months = new Array('January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December');
year = 2012;
layerName = 'INSERT'; //The name of the layer you want to replace the text

// Open the document
var sampleDocToOpen = File("/path/to/file.psd");
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
for(i=0;i<12;i++){
    var layer = doc.layers.getByName(layerName);
    if(layer.kind == LayerKind.TEXT) layer.textItem.contents = months[i]+' '+year;
    var Name = months[i]+'_'+year; 
    var Path = app.activeDocument.path; 
    var saveFile = File(Path + "/images/" + Name +".png"); 
    if(saveFile.exists) saveFile.remove(); 
    saveForWeb(saveFile); 
    
    for(j=0;j<2;j++){
        x = j == 0 ? 2 : 4;
        date = getDateInterval(x, 3, i, year);
        date = months[date.getMonth()] + ' ' + date.getDate() + ', ' + date.getFullYear();
        if(layer.kind == LayerKind.TEXT) layer.textItem.contents = date;
        Name = Name.split(' ').join('_').replace(',','');
        if(saveFile.exists) saveFile.remove(); 
        saveForWeb(saveFile); 
    }
}

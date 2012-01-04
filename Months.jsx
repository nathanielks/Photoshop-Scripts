//Aux Functions
var getDateInterval = function(index, weekday, month, year) {
    // index what occurence of the weekday we look for (1 and upwards)
    // weekday 0-6 (= Sunday - Monday)
    // month 1-12 (= January - December) optional defaults to current month
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


//Doc Attributes
preferences.rulerUnits = Units.PIXELS;
var width = 1280;
var height = 800;
var resolution = 72;
var docName = "Email Dates";

//Color Scheme
normalColor = new SolidColor();
    normalColor.rgb.hexValue = "6b6d67";
 
//Defining Variables
months = new Array('January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December');
year = 2012;
textHeight = 18;
textWidth = 200;

//Create New document
var doc = app.documents.add(width, height, resolution, docName, NewDocumentMode.RGB);

//Create the Dates Month Year
for(i=0;i<12;i++){
    monthName = doc.artLayers.add();
    monthName.kind = LayerKind.TEXT;
    monthName.name = months[i];
    monthName.textItem.color = normalColor;
    monthName.textItem.size = 24;
    monthName.textItem.kind = TextType.PARAGRAPHTEXT;
    monthName.textItem.justification = Justification.LEFT;
    monthName.textItem.font = 'TradeGothicLTStd-BdCn20';
    monthName.textItem.capitalization = TextCase.ALLCAPS;
    monthName.textItem.height = textHeight;
    monthName.textItem.width = textWidth;
    monthName.textItem.contents = months[i]+' '+year;
    monthName.textItem.position = new Array(0, (18*i));
}
var pos = 0;
//Create the Dates Month Day, Year
for(curr=0;curr<12;curr++){
    for(i=0;i<2;i++){
        monthName = doc.artLayers.add();
        monthName.kind = LayerKind.TEXT;
        monthName.textItem.color = normalColor;
        monthName.textItem.size = 24;
        monthName.textItem.kind = TextType.PARAGRAPHTEXT;
        monthName.textItem.justification = Justification.LEFT;
        monthName.textItem.font = 'TradeGothicLTStd-BdCn20';
        monthName.textItem.capitalization = TextCase.ALLCAPS;
        monthName.textItem.height = textHeight;
        monthName.textItem.width = textWidth;
        monthName.textItem.position = new Array(180, pos);
        pos+= 18; 
        x = i == 0 ? 2 : 4;
        date = getDateInterval(x, 3, curr, year);
        date = months[date.getMonth()] + ' ' + date.getDate() + ', ' + date.getFullYear();
        monthName.textItem.contents = monthName.name = date;
    }

}


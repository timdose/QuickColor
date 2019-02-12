function getGlobalColors() {
    return MSPersistentAssetCollection.sharedGlobalAssets().colorAssets()
}


var fillColorFromGlobalColorsForward = function(context) {
    fillColorFormColors(
        context,
        getGlobalColors(),
        true,
        "You don't have any Global Colors Palette set yet"
    );
}

var fillColorFromGlobalColorsBackward = function(context) {
    fillColorFormColors(
        context,
        getGlobalColors(),
        false,
        "You don't have any Global Colors Palette set yet"
    );
}

var fillColorFromDocumentColorsForward = function(context) {
    fillColorFormColors(
        context,
        context.document.documentData().assets().colors(),
        true,
        "You don't have any Document Colors Palette set yet"
    );
}

var fillColorFromDocumentColorsBackward = function(context) {
    fillColorFormColors(
        context,
        context.document.documentData().assets().colors(),
        false,
        "You don't have any Document Colors Palette set yet"
    );
}

var setFillToGlobalColor1 = function(context) {
    setSelectionToGlobalColor(context, 0, "fill");
}

var setFillToGlobalColor2 = function(context) {
    setSelectionToGlobalColor(context, 1, "fill");
}

var setFillToGlobalColor3 = function(context) {
    setSelectionToGlobalColor(context, 2, "fill");
}

var setFillToGlobalColor4 = function(context) {
    setSelectionToGlobalColor(context, 3, "fill");
}

var setFillToGlobalColor5 = function(context) {
    setSelectionToGlobalColor(context, 4, "fill");
}

var setFillToGlobalColor6 = function(context) {
    setSelectionToGlobalColor(context, 5, "fill");
}

var setFillToGlobalColor7 = function(context) {
    setSelectionToGlobalColor(context, 6, "fill");
}

var setFillToGlobalColor8 = function(context) {
    setSelectionToGlobalColor(context, 7, "fill");
}

var setFillToGlobalColor9 = function(context) {
    setSelectionToGlobalColor(context, 8, "fill");
}

var setFillToGlobalColor10 = function(context) {
    setSelectionToGlobalColor(context, 9, "fill");
}


var setBorderToGlobalColor1 = function(context) {
    setSelectionToGlobalColor(context, 0, "border");
}

var setBorderToGlobalColor2 = function(context) {
    setSelectionToGlobalColor(context, 1, "border");
}

var setBorderToGlobalColor3 = function(context) {
    setSelectionToGlobalColor(context, 2, "border");
}

var setBorderToGlobalColor4 = function(context) {
    setSelectionToGlobalColor(context, 3, "border");
}

var setBorderToGlobalColor5 = function(context) {
    setSelectionToGlobalColor(context, 4, "border");
}

var setBorderToGlobalColor6 = function(context) {
    setSelectionToGlobalColor(context, 5, "border");
}

var setBorderToGlobalColor7 = function(context) {
    setSelectionToGlobalColor(context, 6, "border");
}

var setBorderToGlobalColor8 = function(context) {
    setSelectionToGlobalColor(context, 7, "border");
}

var setBorderToGlobalColor9 = function(context) {
    setSelectionToGlobalColor(context, 8, "border");
}

var setBorderToGlobalColor10 = function(context) {
    setSelectionToGlobalColor(context, 9, "border");
}



function setSelectionToGlobalColor(context, index, type ) {
    console.log('\n\nsetSelectionToGlobalColor')
    var colors = getGlobalColors();
    var selection = context.selection;
    var doc = context.document;
    console.log('here')
    console.log(selection)
    
    if (colors.count() == 0) {
        doc.showMessage("You don't have any Global Colors set yet");
        return false;
    }
    
    
    if (selection.count() == 0) {
        doc.showMessage("Please select at least one Shape or Text layer.");
        return false;
    }
    
    var newColor = colors.objectAtIndex(index).color();

    for (var i = 0; i < selection.count(); i++) {
        var layer = selection.objectAtIndex(i);
        if ( type == "fill" ) {
            setFillColor(layer, newColor);
        } else if ( type == "border" ) {
            setBorderColor(layer, newColor);
        }
    }
    doc.reloadInspector();
}



function fillColorFormColors(context, colors, forward, alertMessage) {
    var direction = forward? 'forward':'backward';
    console.log( 'moving color ' +  direction )
    var doc = context.document;

    if (colors.count() == 0) {
        doc.showMessage(alertMessage);
        return false;
    }

    var selection = context.selection;

    if (selection.count() == 0) {
        doc.showMessage("Please select one Shape or Text layer.");
        return false;
    }

    for (var i = 0; i < selection.count(); i++) {
        var layer = selection.objectAtIndex(i);
    if (isShapeLayer(layer.class()) || layer.class() == "MSTextLayer") {
            var index = colors.indexOfObject(getFillColor(layer));

            if (forward) {
                if (index == 9.223372036854776e+18 || index == colors.count() - 1) {
                    index = 0;
                } else {
                    index ++;
                }
            } else {
                if (index == 9.223372036854776e+18 || index == 0) {
                    index = colors.count() - 1;
                } else {
                    index --;
                }
            }

            setFillColor(layer, colors.objectAtIndex(index));
        }
    }

}

function getFillColor(layer) {
if (isShapeLayer(layer)) {
        var fills = layer.style().enabledFills();
        if (fills.count() > 0) {
            if (fills.lastObject().fillType() == 0) {
                return fills.lastObject().color();
            } else {
                return null;
            }
        } else {
            return null;
        }
    }
    if (layer.class() == "MSTextLayer") {
        console.log(layer.textColor());
        return MSColor.alloc().initWithImmutableObject(layer.textColor());
    }
}

function setFillColor(layer, color) {
    console.log('layer class: ' + layer.class() )
    if (isShapeLayer(layer) ) {
        console.log('setFillColor')
        console.log(color)
        var fills = layer.style().enabledFills();
        if (fills.count() > 0 && fills.lastObject().fillType() == 0) {
            fills.lastObject().setColor(color);
        } else {
            var fill = layer.style().addStylePartOfType(0);
            fill.setFillType(0);
            fills.lastObject().setColor(color);
        }
    }
    if (layer.class() == "MSTextLayer") {
        layer.setTextColor(color);
    }
}

function setBorderColor(layer, color) {
    if ( isShapeLayer(layer) ) {
        var borders = layer.style().enabledBorders();
        if (borders.count() > 0 ) {
            borders.lastObject().setColor(color);
        } else {
            var border = layer.style().addStylePartOfType(1);
            // border.setBorderType(1);
            border.setPosition(1)
            console.log(border);
            borders.lastObject().setColor(color);
        }
    }
}


function isShapeLayer( layer ) {
    if ( layer.class() == "MSShapeGroup" ) return true;
    if ( layer.class() == "MSRectangleShape" ) return true;
    if ( layer.class() == "MSOvalShape" ) return true;
    if ( layer.class() == "MSShapePathLayer" ) return true;
    return false;
}
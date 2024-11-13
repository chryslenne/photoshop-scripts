/*
@authored: Nestor
@date: 2024-11-13
*/

// Put this file in Program Files\Adobe\Photoshop\Presets\Scripts\
// In PhotoShop menu File > Automate > Scripts: layersToSprite.js

// Arrange layers into a sprite sheet. 

function automateTask(width, height, columns) {
	// --------------------------
	docRef = activeDocument;

	var numLayers = docRef.artLayers.length;
	var rows = (Math.ceil((numLayers * 1.0) / columns));

	// put things in order
	app.preferences.rulerUnits = Units.PIXELS;

	// resize the canvas
	var canvasWidth = columns * width;
	var canvasHeight = rows * height;

	docRef.resizeCanvas(canvasWidth, canvasHeight, AnchorPosition.TOPLEFT);


	var i = 0;
	// move the layers around
	for (row = 0; row < rows; row++) {
		for (col = 0; col < columns; col++) {
			if (i >= numLayers) break; // Avoid going out of bounds

			var layer = docRef.artLayers[i];
			layer.visible = true;

			// Calculate target top-left position
			var targetX = width * col;
			var targetY = height * row;

			// Get current position of the top-left corner of the layer
			var currentX = layer.bounds[0].as("px");
			var currentY = layer.bounds[1].as("px");

			// Calculate offsets and round to avoid floating-point issues
			var offsetX = Math.round(targetX - currentX);
			var offsetY = Math.round(targetY - currentY);

			// Translate layer by calculated offsets
			layer.translate(offsetX, offsetY);

			i++;
		}
	}
}


if (documents.length > 0) {

	/*
	Code for Import https://scriptui.joonas.me — (Triple click to select): 
	{"activeId":12,"items":{"item-0":{"id":0,"type":"Dialog","parentId":false,"style":{"enabled":true,"varName":null,"windowType":"Dialog","creationProps":{"su1PanelCoordinates":false,"maximizeButton":false,"minimizeButton":false,"independent":false,"closeButton":true,"borderless":false,"resizeable":false},"text":"Dialog","preferredSize":[0,0],"margins":16,"orientation":"column","spacing":10,"alignChildren":["center","top"]}},"item-1":{"id":1,"type":"Panel","parentId":0,"style":{"enabled":true,"varName":null,"creationProps":{"borderStyle":"etched","su1PanelCoordinates":false},"text":"Frame Size","preferredSize":[150,0],"margins":10,"orientation":"column","spacing":10,"alignChildren":["left","top"],"alignment":null}},"item-2":{"id":2,"type":"StaticText","parentId":4,"style":{"enabled":true,"varName":null,"creationProps":{"truncate":"none","multiline":false,"scrolling":false},"softWrap":false,"text":"Width","justify":"left","preferredSize":[50,0],"alignment":null,"helpTip":null}},"item-3":{"id":3,"type":"EditText","parentId":4,"style":{"enabled":true,"varName":null,"creationProps":{"noecho":false,"readonly":false,"multiline":false,"scrollable":false,"borderless":false,"enterKeySignalsOnChange":false},"softWrap":false,"text":"50","justify":"left","preferredSize":[50,0],"alignment":null,"helpTip":null}},"item-4":{"id":4,"type":"Group","parentId":1,"style":{"enabled":true,"varName":null,"preferredSize":[0,0],"margins":0,"orientation":"row","spacing":10,"alignChildren":["left","center"],"alignment":null}},"item-5":{"id":5,"type":"Group","parentId":1,"style":{"enabled":true,"varName":null,"preferredSize":[0,0],"margins":0,"orientation":"row","spacing":10,"alignChildren":["left","center"],"alignment":null}},"item-6":{"id":6,"type":"StaticText","parentId":5,"style":{"enabled":true,"varName":null,"creationProps":{"truncate":"none","multiline":false,"scrolling":false},"softWrap":false,"text":"Height","justify":"left","preferredSize":[50,0],"alignment":null,"helpTip":null}},"item-7":{"id":7,"type":"EditText","parentId":5,"style":{"enabled":true,"varName":null,"creationProps":{"noecho":false,"readonly":false,"multiline":false,"scrollable":false,"borderless":false,"enterKeySignalsOnChange":false},"softWrap":false,"text":"50","justify":"left","preferredSize":[50,0],"alignment":null,"helpTip":null}},"item-8":{"id":8,"type":"Button","parentId":10,"style":{"enabled":true,"varName":null,"text":"Cancel","justify":"center","preferredSize":[0,0],"alignment":null,"helpTip":null}},"item-9":{"id":9,"type":"Button","parentId":10,"style":{"enabled":true,"varName":null,"text":"Start","justify":"center","preferredSize":[0,0],"alignment":null,"helpTip":null}},"item-10":{"id":10,"type":"Group","parentId":0,"style":{"enabled":true,"varName":null,"preferredSize":[0,0],"margins":0,"orientation":"row","spacing":10,"alignChildren":["left","center"],"alignment":null}},"item-12":{"id":12,"type":"Panel","parentId":0,"style":{"enabled":true,"varName":null,"creationProps":{"borderStyle":"etched","su1PanelCoordinates":false},"text":"Limits","preferredSize":[150,0],"margins":10,"orientation":"column","spacing":10,"alignChildren":["left","top"],"alignment":null}},"item-14":{"id":14,"type":"Group","parentId":12,"style":{"enabled":true,"varName":null,"preferredSize":[0,0],"margins":0,"orientation":"row","spacing":10,"alignChildren":["left","center"],"alignment":null}},"item-15":{"id":15,"type":"StaticText","parentId":14,"style":{"enabled":true,"varName":null,"creationProps":{"truncate":"none","multiline":false,"scrolling":false},"softWrap":false,"text":"Column","justify":"left","preferredSize":[50,0],"alignment":null,"helpTip":null}},"item-16":{"id":16,"type":"EditText","parentId":14,"style":{"enabled":true,"varName":null,"creationProps":{"noecho":false,"readonly":false,"multiline":false,"scrollable":false,"borderless":false,"enterKeySignalsOnChange":false},"softWrap":false,"text":"4","justify":"left","preferredSize":[50,0],"alignment":null,"helpTip":null}}},"order":[0,1,4,2,3,5,6,7,12,14,15,16,10,9,8],"settings":{"importJSON":true,"indentSize":false,"cepExport":false,"includeCSSJS":true,"showDialog":true,"functionWrapper":false,"afterEffectsDockable":false,"itemReferenceList":"None"}}
	*/

	// DIALOG
	// ======
	var dialog = new Window("dialog");
	dialog.text = "Dialog";
	dialog.orientation = "column";
	dialog.alignChildren = ["center", "top"];
	dialog.spacing = 10;
	dialog.margins = 16;

	// PANEL1
	// ======
	var panel1 = dialog.add("panel", undefined, undefined, { name: "panel1" });
	panel1.text = "Frame Size";
	panel1.preferredSize.width = 150;
	panel1.orientation = "column";
	panel1.alignChildren = ["left", "top"];
	panel1.spacing = 10;
	panel1.margins = 10;

	// GROUP1
	// ======
	var group1 = panel1.add("group", undefined, { name: "group1" });
	group1.orientation = "row";
	group1.alignChildren = ["left", "center"];
	group1.spacing = 10;
	group1.margins = 0;

	var statictext1 = group1.add("statictext", undefined, undefined, { name: "statictext1" });
	statictext1.text = "Width";
	statictext1.preferredSize.width = 50;

	var edittext1 = group1.add('edittext {properties: {name: "edittext1"}}');
	edittext1.text = "50";
	edittext1.preferredSize.width = 50;

	// GROUP2
	// ======
	var group2 = panel1.add("group", undefined, { name: "group2" });
	group2.orientation = "row";
	group2.alignChildren = ["left", "center"];
	group2.spacing = 10;
	group2.margins = 0;

	var statictext2 = group2.add("statictext", undefined, undefined, { name: "statictext2" });
	statictext2.text = "Height";
	statictext2.preferredSize.width = 50;

	var edittext2 = group2.add('edittext {properties: {name: "edittext2"}}');
	edittext2.text = "50";
	edittext2.preferredSize.width = 50;

	// PANEL2
	// ======
	var panel2 = dialog.add("panel", undefined, undefined, { name: "panel2" });
	panel2.text = "Limits";
	panel2.preferredSize.width = 150;
	panel2.orientation = "column";
	panel2.alignChildren = ["left", "top"];
	panel2.spacing = 10;
	panel2.margins = 10;

	// GROUP3
	// ======
	var group3 = panel2.add("group", undefined, { name: "group3" });
	group3.orientation = "row";
	group3.alignChildren = ["left", "center"];
	group3.spacing = 10;
	group3.margins = 0;

	var statictext3 = group3.add("statictext", undefined, undefined, { name: "statictext3" });
	statictext3.text = "Column";
	statictext3.preferredSize.width = 50;

	var edittext3 = group3.add('edittext {properties: {name: "edittext3"}}');
	edittext3.text = "4";
	edittext3.preferredSize.width = 50;

	// GROUP4
	// ======
	var group4 = dialog.add("group", undefined, { name: "group4" });
	group4.orientation = "row";
	group4.alignChildren = ["left", "center"];
	group4.spacing = 10;
	group4.margins = 0;

	var button1 = group4.add("button", undefined, undefined, { name: "button1" });
	button1.text = "Start";
	button1.onClick = function () {
		// Get values from input fields
		var width = parseInt(edittext1.text);
		var height = parseInt(edittext2.text);
		var columns = parseInt(edittext3.text);

		// Call automation function with input values
		automateTask(width, height, columns);

		// Close dialog after starting the task
		dialog.close();
	};

	var button2 = group4.add("button", undefined, undefined, { name: "button2" });
	button2.text = "Cancel";
	button2.onClick = function () {
		dialog.close();
	};

	dialog.show();
}
//ExampleViewController Object constructor
var CurrentMenuViewController = function(view, model ) {
	view.myButton.click(function(){
		window.alert("sometext");
	});
    view.startButton.click(function(){
        window.alert("start button pressed");
    });
    view.numberOfGuests.change(function(){
        window.alert("input changed: ");
    });
}
var CurrentMenuView = function(container,model){
    window.alert("enter view");

    this.myButton = container.find("#testbutton");
    this.numberOfGuests = container.find("#numberOfGuest");
    this.startButton = container.find("#startButton");


    //Register an observer to the model
    model.addObserver(this);

    //This function gets called when there is a change at the model
    this.update = function(arg){
        this.numberOfGuests.html(model.getNumberOfGuests());
    }

    window.alert("exit view");
}
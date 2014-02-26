/**
 * Created by sandstroh on 2/20/14.
 */

var DinnerOverviewView = function(container, model) {

    // Find the divs.
    this.starterDish = container.find("#starterDish");
    this.mainDish = container.find("#mainDish");
    this.dessertDish = container.find("#dessertDish");

    this.totalCost = container.find("#totalCost2");
    this.printButton = container.find("#printButton");

    // Initialize the variables
    this.starterImage = $("<img>");
    this.starterName = $("<span>");
    this.starterPrice = $("<span>");
    this.starterDish.append(this.starterImage);
    this.starterDish.append(this.starterName);
    this.starterDish.parent().append(this.starterPrice);

    this.mainImage = $("<img>");
    this.mainName = $("<span>");
    this.mainPrice = $("<span>");
    this.mainDish.append(this.mainImage);
    this.mainDish.append(this.mainName);
    this.mainDish.parent().append(this.mainPrice);

    this.dessertImage = $("<img>");
    this.dessertName = $("<span>");
    this.dessertPrice = $("<span>");
    this.dessertDish.append(this.dessertImage);
    this.dessertDish.append(this.dessertName);
    this.dessertDish.parent().append(this.dessertPrice);

    /*****************************************
     Observer implementation
     *****************************************/

    //Register an observer to the model
    model.addObserver(this);

    //This function gets called when there is a change at the model
    this.update = function(arg){

        var numGuests = model.getNumberOfGuests();

        <!-- starter dish -->
        var starter = model.getDish(model.getSelectedDish('starter'));
        if (typeof starter == 'undefined') {
            this.starterDish.toggle(false);
        } else {
            this.starterImage.attr("src", "images/" + starter.image);
            this.starterName.html(starter.name);
            this.starterPrice.html(calculatePrice(starter, numGuests) + " SEK");
            this.starterDish.toggle(true);
        }

        <!-- main dish -->
        var maindish = model.getDish(model.getSelectedDish('main dish'));
        if (typeof maindish == 'undefined') {
            this.mainDish.toggle(false);
        } else {
            this.mainImage.attr("src", "images/" + maindish.image);
            this.mainName.html(maindish.name);
            this.mainPrice.html(calculatePrice(maindish, numGuests) + " SEK");
            this.mainDish.toggle(true);
        }

        <!-- dessert dish -->
        var dessert = model.getDish(model.getSelectedDish('dessert'));
        if (typeof dessert == 'undefined') {
            this.dessertDish.toggle(false);
        } else {
            this.dessertImage.attr("src", "images/" + dessert.image);
            this.dessertName.html(dessert.name);
            this.dessertPrice.html(calculatePrice(dessert, numGuests) + " SEK");
            this.dessertDish.toggle(true);
        }

        this.totalCost.text(model.getTotalMenuPrice() + " SEK");
    }

    // Update the model.
    this.update(model); // Model is not used just used to match parameter signature
}

function calculatePrice(dish, numGuests) {
    var sum = 0;
    $.each(dish.ingredients, function(index, ingredient) {
        sum += parseFloat(ingredient.price);
    });
    return formatCurrency(sum * numGuests);
}
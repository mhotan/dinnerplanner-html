/**
 * Created by sandstroh on 2/20/14.
 */

var DinnerOverviewView = function(container, model) {

    this.starterDish = container.find("#starterDish");
    this.mainDish = container.find("#mainDish");
    this.dessertDish = container.find("#dessertDish");

    this.totalCost = container.find("#totalCost");

    <!-- starter dish -->
    var starter = model.getDish(model.getSelectedDish('starter'));
    if (typeof starter == 'undefined') {
        $(starterDish).hide();
    } else {
        var starterImage = $("<img>");
        starterImage.attr("src", "images/" + starter.image);

        var starterName = $("<span>");
        starterName.html(starter.name);

        var starterPrice = $("<span>");
        starterPrice.html("TODO" + " SEK");

        this.starterDish.append(starterImage);
        this.starterDish.append(starterName);
        this.starterDish.parent().append(starterPrice);
    }

    <!-- main dish -->
    var maindish = model.getDish(model.getSelectedDish('main dish'));
    if (typeof maindish == 'undefined') {
        $(mainDish).hide();
    } else {
        var mainImage = $("<img>");
        mainImage.attr("src", "images/" + maindish.image);

        var mainName = $("<span>")
        mainName.html(maindish.name);

        var mainPrice = $("<span>");
        mainPrice.html("TODO" + " SEK");

        this.mainDish.append(mainImage);
        this.mainDish.append(mainName);
        this.mainDish.parent().append(mainPrice);
    }

    <!-- dessert dish -->
    var dessert = model.getDish(model.getSelectedDish('dessert'));
    if (typeof dessert == 'undefined') {
        $(dessertDish).hide();
    } else {
        var dessertImage = $("<img>");
        dessertImage.attr("src", "images/" + dessert.image);

        var dessertName = $("<span>");
        dessertName.html(dessert.name);

        var dessertPrice = $("<span>");
        dessertPrice.html("TODO" + " SEK");

        this.dessertDish.append(dessertImage);
        this.dessertDish.append(dessertName);
        this.dessertDish.parent().append(dessertPrice);
    }

    <!-- total menu cost -->
    this.totalCost.html(model.getTotalMenuPrice() + " SEK");

    <!-- print button -->
    this.printButton = container.find("#printButton");

}
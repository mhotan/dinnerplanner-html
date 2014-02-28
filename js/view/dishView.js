/**
 * Created by Michael Hotan on 2/24/14.
 */
var DishView = function(container, dish, model) {

    // JQuery object references values
    var name = container.find('#title');
    var numPeopleSpan = container.find('#numPeople');
    var image = container.find('img');
    var details = container.find('#details');
    var tableRows = container.find('tbody');
    var preparation = container.find('#preparation');
    var dishPrice = container.find('#dish-total');

    // Back to select dish button
    this.backButton = container.find('#back-button');
    // Confirm dish button button
    this.confirmButton = container.find('#confirm-dish-button');

    //Register an observer to the model
    model.addObserver(this);

    //This function gets called when there is a change at the model
    this.update = function(arg) {

        // Update the number of guests
        var numGuests = model.getNumberOfGuests();
        numPeopleSpan.text(numGuests);

        // Update the title of the dish.
        name.text(dish.name);

        // Update the image of the dish
        image.attr('src', 'images/' + dish.image);

        tableRows.empty();
        // Update the ingredients with quantity and and cost based off the number of people
        $.each(dish.ingredients, function(index, ingredient) {
            var row = $('<tr>');

            var qtyCell = $('<td>');
            qtyCell.addClass('quantity');
            qtyCell.text(Math.round(ingredient.quantity * numGuests).toFixed(2) + ingredient.unit);
            qtyCell.appendTo(row);

            var nameCell = $('<td>');
            nameCell.addClass('name_ingredient');
            nameCell.text(ingredient.name);
            nameCell.appendTo(row);

            var costCell = $('<td>');
            costCell.addClass('price');
            costCell.text(formatCurrency(ingredient.price * numGuests));
            costCell.appendTo(row);

            row.appendTo(tableRows);
        });

        // Update the preparations block.
        preparation.text(dish.description);

        // Set the total price of the dish.
        dishPrice.text(formatCurrency(model.getDishPrice(dish.id) * numGuests));
    }

    // Update the view
    this.update(dish);
}
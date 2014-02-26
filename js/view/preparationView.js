/**
 * Created by Michael Hotan on 2/26/14.
 */

var DishPreparationView = function(container) {

    var nameHeader = container.find(".dish-name");
    var image = container.find('img');
    var preparationDiv = container.find('.preparation-instruction');

    this.hide = function() {
        container.toggle(false);
    }

    this.show = function() {
        container.toggle(true);
    }

    this.update = function(newDish) {
        nameHeader.text(newDish.name);
        image.attr('src', 'images/' + newDish.image);
        image.attr('alt', newDish.name);
        preparationDiv.text(newDish.description);
    }
}

var PreparationView = function(container, model) {

    //Register an observer to the model
    model.addObserver(this);

    var startPrepView = new DishPreparationView(container.find('#starter-prep-pane'));
    var mainPrepView = new DishPreparationView(container.find('#main-prep-pane'));
    var dessertPrepView = new DishPreparationView(container.find('#dessert-prep-pane'));

    //This function gets called when there is a change at the model
    this.update = function(arg) {
        var menu = model.getFullMenu();
        startPrepView.hide();
        mainPrepView.hide();
        dessertPrepView.hide();
        $.each(menu, function(index, dish) {
            if (dish != null && dish != undefined) {
                if (dish.type == 'starter') {
                    startPrepView.update(dish);
                    startPrepView.show();
                } else if (dish.type == 'main dish') {
                    mainPrepView.update(dish);
                    mainPrepView.show();
                } else if (dish.type == 'dessert') {
                    dessertPrepView.update(dish);
                    dessertPrepView.show();
                }
            }
        });
    }

    this.update(model);
}
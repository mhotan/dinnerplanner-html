/**
 * Created by sandstroh on 2/21/14.
 */

var GoBackTitleView = function(container, model) {

    this.numberOfGuests = container.find("#numberOfGuests");
    this.numberOfGuests.html(model.getNumberOfGuests() + " people");

    this.goBackButton = container.find("#goBackButton");

}
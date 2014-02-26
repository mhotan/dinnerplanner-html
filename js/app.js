
// Short hand for document ready.
$(function() {

    //The global variable so we can access it from other controller and views
    window.stage = "starter";

    // Obtain access
    var mainPane = $('#main-pane');
    var headerPane = $('#header-pane');

    //We instantiate our model
    var model = new DinnerModel();

    var introView = new IntroView($('#intro-pane'), model);
    var introController = new IntroController(introView, model);
    introController.addListener(this);

    var menuOptionsView = new MenuOptionsView($('#menu-options-view'), model);
    var menuOptionsController = new MenuOptionsController(menuOptionsView, model);
    menuOptionsController.addListener(this);

    var SummaryTitleView = new SummaryView($("#summary-header-pane"), model);
    var SummaryTitleController = new SummaryController(SummaryTitleView, model);
    SummaryTitleController.addListener(this);

    var currentMenuView = new CurrentMenuView($("#current-menu-pane"), model);
    var currentMenuController = new CurrentMenuViewController(currentMenuView, model);
    currentMenuController.addListener(this);

    var dinnerOverView = new DinnerOverviewView($('#dinnerOverview'), model);
    var dinnerController = new DinnerOverviewController(dinnerOverView, model);
    dinnerController.addListener(this);

    var preparationView = new PreparationView($('#preparation-pane'), model);

    var dishView;
    var dishController;

    // groups of views.
    var headerGroup = ['#summary-header-pane'];
    var mainGroup = ['#dinnerOverview', '#intro-pane',
        '#preparation-pane', '#split-pane'];
    var leftGroup = ['#current-menu-pane'];
    var rightGroup = ['#dish-pane', '#menu-options-view'];

    // Functions that handle showing views.
    var showFromHeaderGroup = showInGroup(headerGroup);
    var showFromMainGroup = showInGroup(mainGroup);
    var showFromLeftGroup = showInGroup(leftGroup);
    var showFromRightGroup = showInGroup(rightGroup);

    // Show the intro view.
    var showIntro = function() {
        showFromMainGroup('#intro-pane');
        showFromHeaderGroup('');
    }

    // Call this when the user selects to proceed pas the intro screen.
    var proceedAfterIntro = function() {
        // Hide the intro view and proceed to the next screen.
        $('.container').css('background-image', 'none');
        showFromMainGroup('#split-pane');
        showFromRightGroup('#menu-options-view');
        showFromLeftGroup('#current-menu-pane');
        showFromHeaderGroup('');
    }

    //////////////////////////////////////////////////////////////////////////////////////////
    // Call backs from other controllers
    //////////////////////////////////////////////////////////////////////////////////////////

    // Menu Options Controller
    this.dishSelected = function(dish) {
        // Show the view for a specific dish.
        console.log('Dish selected for ' + dish.name);
        showFromRightGroup('#dish-pane');
        dishView = new DishView($('#dish-pane'), dish, model);
        dishController = new DishController(dishView, dish, model);
        dishController.addListener(this);
    }

    // Summary view controller.
    this.printMenu = function() {
        console.log('Print menu requested.');
        showFromMainGroup('#preparation-pane');
    }

    this.proceedPastIntro = function() {
        console.log('Intro page complete.');
        proceedAfterIntro();
    }

    this.onBackPressed = function() {
        showFromMainGroup('#split-pane');
        showFromHeaderGroup('');
        showFromRightGroup('#menu-options-view');
        if (dishController != null && dishController != undefined) {
            dishController.removeListener(this);
        }
    }

    this.dinnerConfirmed = function() {
        showFromHeaderGroup('#summary-header-pane');
        showFromMainGroup('#dinnerOverview');
    }

    this.printMenu = function() {
        showFromMainGroup('#preparation-pane');
    }

   showIntro();
});

// A function that returns a function that will show.
function showInGroup(viewGroup) {
    var group = viewGroup;
    function showOrHide(view) {
        for (var i = 0; i < group.length; i++) {
            // Only show the view if
            // the input view is found
            $(group[i]).toggle(view == group[i]); // Show = toggle(true) Hide = toggle(false)
        }
    }
    return showOrHide;
}
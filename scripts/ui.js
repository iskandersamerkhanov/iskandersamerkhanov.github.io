var ui = {};

ui.restartButtonVisible = false;

ui.currentView = "";

ui.switchViewTo = function(result) {
    if (ui.currentView !== "") {
        $(ui.currentView).css("display", "none");
    }
    ui.currentView = "#" + result;
    $(ui.currentView).css("display", "block");
    $('.restart-button').css("display", "block");
};

ui.switchToStartingMenu = function() {
    if (ui.currentView !== "") {
        $(ui.currentView).css("display", "none");
        ui.currentView = "";
    }
    $('.restart-button').css("display", "none");
    $('.starting-menu').css("display", "block");
    $('.board').css("opacity", 0.15);
};

ui.hideStartingMenu = function() {
    $('.starting-menu').css("display", "none");
    $('.board').css("opacity", 1);
}

ui.insertAt = function(index, symbol) {
    var cells = $('.cell');
    var targetCell = $(cells[index]);

    if(!targetCell.hasClass('filled')) {
        targetCell.html(symbol);
        targetCell.addClass('filled');
    }
}

ui.clearBoard = function() {
    var cells = $('.cell');
    cells.removeClass('filled');
    cells.empty();
}
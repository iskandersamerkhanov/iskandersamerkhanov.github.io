var ui = {};

//view with result of game
ui.lastResultOfGame = "";

ui.switchViewTo = function(currentResult) {
    ui.lastResultOfGame = "#" + currentResult;
    $(ui.lastResultOfGame).css("display", "block");
};

ui.switchToStartingMenu = function() {
    if (ui.lastResultOfGame !== "") {
        $(ui.lastResultOfGame).css("display", "none");
        ui.lastResultOfGame = "";
    }
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
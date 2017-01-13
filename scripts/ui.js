var ui = {};

ui.startingMenuVisible = true;

ui.currentView = "";

ui.switchViewTo = function(turn) {
    function _switch(_turn) {
        ui.currentView = "#" + _turn;
        $(ui.currentView).css("display", "block");
    }

    if(ui.startingMenuVisible) {
        ui.startingMenuVisible = false;

        $('.board').css("opacity", 1);
        $('.starting-menu').css("display", "none");
        _switch(turn);
    }
    else {
        $(ui.currentView).css("display", "none");
        _switch(turn);
    }
};

ui.insertAt = function(index, symbol) {
    var cells = $('.cell');
    var targetCell = $(cells[index]);

    if(!targetCell.hasClass('filled')) {
        targetCell.html(symbol);
        targetCell.addClass('filled');
    }
}
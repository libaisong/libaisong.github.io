window.onload = function(){
    var backtoprevious = document.querySelector('.item_return');
    backtoprevious.onclick = function()
    {
        window.history.back();
    };

};
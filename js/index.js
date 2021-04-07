window.onload = function(){
    var subitems = document.querySelectorAll('.sub_item_list');
    for(var i=0;i<subitems.length;i++)
    {
        var text = subitems[i].querySelector('a').querySelector('h1').innerHTML;
        // console.log(text);
        subitems[i].querySelector('a').querySelector('h1').innerHTML += "<span class='titlecount'>("+(subitems.length-i)+'/'+(subitems.length)+")</span>";
    }

    // document.onscroll = function(){start()};
    // window.onresize = function(){start()};

    // function start()
    // {
    //     // console.log('body'+document.body.clientWidth);
    //     var computedStyle = getComputedStyle(document.body, null);
    //     // console.log('left'+computedStyle.marginRight);

    //     // console.log(window.pageYOffset);
    //     var boot = document.querySelector('.backtoTop');
    //     // console.log(boot);
    //     if(window.pageYOffset < 300)
    //     {boot.style.display = 'none';}
    //     else
    //     {boot.style.display = 'block';
    //     boot.style.right = parseFloat(computedStyle.marginRight)+20+'px';
    //     }

    // };

};
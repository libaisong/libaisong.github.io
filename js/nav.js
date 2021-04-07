window.onload= function(){
    var subitems = document.querySelectorAll('.sub_item_list');
    for(var i=0;i<subitems.length;i++)
    {
        var text = subitems[i].querySelector('a').querySelector('h1').innerHTML;
        // console.log(text);
        subitems[i].querySelector('a').querySelector('h1').innerHTML += "<span class='titlecount'>("+(subitems.length-i)+'/'+(subitems.length)+")</span>";
    }

    var menu = document.querySelector('.icon-menu');
    var back = document.querySelector('.icon-back');
    var forward = document.querySelector('.icon-forward');
    var home = document.querySelector('.icon-home');
    var top = document.querySelector('.icon-top');
    var nav_bar = document.querySelector('.nav_bar');
    var nav_menu = document.querySelector('#nav_menu');
    var bodyStyle = getComputedStyle(document.body, null);

    menu.style.display = "block";
    nav_bar.style.right = parseFloat(bodyStyle.marginRight)+20+'px';

    nav_menu.onmouseenter = function(){menuopen()};
    nav_menu.onclick = function(){menuopen()};
    function menuopen(){
        home.style.display = "block";
        back.style.display = "block";
        forward.style.display = "block";
        menu.style.display = "none";
    }

    nav_menu.onmouseleave = function(){
        home.style.display = "none";
        back.style.display = "none";
        forward.style.display = "none";
        menu.style.display = "block";
    }

    document.onscroll = function(){start()};
    window.onresize = function(){start()};

    function start()
    {
        // console.log('body'+document.body.clientWidth);
        
        // console.log('left'+computedStyle.marginRight);

        // console.log(window.pageYOffset);
        // var boot = document.querySelector('.backtoTop');
        // console.log(boot);
        nav_bar.style.right = parseFloat(bodyStyle.marginRight)+20+'px';
        if(window.pageYOffset < 300)
        {top.style.display = 'none';}
        else
        {top.style.display = 'block';
        }

    };

    home.onclick=function(){
        if(window.location.href.indexOf('items')===-1)//判断是否在items文件夹中
        {
            window.open("index.html","_self");
        }
        else
        {
            window.open("../index.html","_self");
        }
        
    }

    back.onclick=function(){
        history.back();
    }

    forward.onclick=function(){
        history.forward();
    }

    top.onclick=function(){
        window.open("#","_self");
    }
}





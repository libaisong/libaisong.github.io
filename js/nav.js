window.onload= function(){
    var subitems = document.querySelectorAll('.sub_item_list');
    for(var i=0;i<subitems.length;i++)
    {
        var text = subitems[i].querySelector('a').querySelector('h1').innerHTML;
        // console.log(text);
        subitems[i].querySelector('a').querySelector('h1').innerHTML += "<span class='titlecount'>("+(subitems.length-i)+'/'+(subitems.length)+")</span>";
    }

    // var all = document.querySelector('html');
    var menu = document.querySelector('.icon-menu');
    var back = document.querySelector('.icon-back');
    var forward = document.querySelector('.icon-forward');
    var home = document.querySelector('.icon-home');
    var top = document.querySelector('.icon-top');
    var nav_bar = document.querySelector('.nav_bar');
    var nav_menu = document.querySelector('#nav_menu');
    var bodyStyle = getComputedStyle(document.body, null);

    nav_menu.style.display = "inline-block";
    menu.style.display = "inline-block";
    nav_bar.style.right = parseFloat(bodyStyle.marginRight)+20+'px';

    nav_menu.onmouseenter = function(){menuopen()};
    // nav_menu.onclick = function(){menuopen()};
    nav_menu.ontouchstart = function(e){
        e.preventDefault();//可以阻止后面事件的触发，特别是click
        menuopen()
    };
    function menuopen(){
        home.style.display = "inline-block";
        back.style.display = "inline-block";
        forward.style.display = "inline-block";
        menu.style.display = "none";
    }

    // body.ontouchstart =  function(e){
    //     console.log(e.composedPath()[2].ClassList);
    //     menuclose();}
    
    window.ontouchstart =  function(e){
        var tmp = 1;
        e.composedPath().forEach(
            function(element)
            {
                console.log(element.id);
                if(element.id==="nav_menu")//点击nav_menu之外时将其收缩
                {
                    tmp = 0;
                }
            }
        )
        if(tmp===1)
        {
            menuclose();
        }
    }

    nav_menu.onmouseleave = function(){menuclose();}

    function menuclose()
    {
        home.style.display = "none";
        back.style.display = "none";
        forward.style.display = "none";
        menu.style.display = "inline-block";
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
        {top.style.display = 'inline-block';
        }

    };

    home.onclick=function(){tohome()};
    home.ontouchstart=function(e){e.preventDefault();tohome()};

    function tohome()
    {
        if(window.location.href.indexOf('items')===-1)//判断是否在items文件夹中
        {
            window.open("index.html","_self");
        }
        else
        {
            window.open("../index.html","_self");
        }
    }

    back.onclick=function(){toback()};
    back.ontouchstart=function(e){e.preventDefault();toback()};

    function toback(){
        history.back();
    }

    forward.onclick=function(){toforward()};
    forward.ontouchstart=function(e){e.preventDefault();toforward()};

    function toforward(){
        history.forward();
    }

    top.onclick=function(){
        // window.open("#","_self");
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    }
}





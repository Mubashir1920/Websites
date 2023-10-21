// Cursor Setting

new kursor({
    type: 1,
    color : '#FF0000',
})



// Header Scroll

window.addEventListener('scroll' , function(){
    
    const header = document.querySelector('#main-header');
    header.classList.toggle('fixed'  , window.scrollY > 0)
})

// Logos Caraousel

var copy = document.querySelector(".logos-slide").cloneNode(true);
document.querySelector(".logos").appendChild(copy);


//Hamburger Menu

const btn = document.getElementById('menu-btn');
const overlay = document.getElementById('overlay');
const menu = document.getElementById('mobile-menu');

btn.addEventListener('click', navToggle);

function navToggle(){
    btn.classList.toggle('open');
    overlay.classList.toggle('overlay-show');
    document.body.classList.toggle('stop-scrolling');
    menu.classList.toggle('show-menu');
}
//Hide Menu On Selection
document.getElementById('mobile-menu').addEventListener('click' , hidemenu)

function hidemenu(e){

    if(e.target.classList.contains('nav-menuitem')){
    btn.classList.toggle('open');
    overlay.classList.toggle('overlay-show');
    document.body.classList.toggle('stop-scrolling');
    menu.classList.toggle('show-menu');        
    }
    e.preventDefault();
}



// Smooth Scrolling

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click' , function(e){
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior : "smooth"
        })
    })
})




// $(window).on("load",function(){
//     $(".loader-wrapper").fadeOut("slow");
// });


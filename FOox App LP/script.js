


const btn = document.getElementById('menu-btn');

btn.addEventListener('click', navToggle);

function navToggle(){
    btn.classList.toggle('open');
    
}


// Loader


document.addEventListener("DOMContentLoaded", function() {
    setTimeout(function() {
        document.querySelector("body").classList.add("loaded");
    }, 1000)
  });


// Slider Carousel



const SliderContainer = document.querySelector('.secf-cards-container');

const cards = document.querySelectorAll('.card');

let move = 40;

cards.forEach(card => {

    card.addEventListener('click' , (e)=>{

        let count=0;

        // card.classList.add('active')

        if(e.target.classList.contains('card')){
            count= e.target.getAttribute('data');
            console.log(count)
            
        }else if(e.target.parentElement.classList.contains('card')){
            count= e.target.parentElement.getAttribute('data');
            console.log(count)
            
        }

        const activecard = document.querySelector('.active')
        const activeid = activecard.getAttribute('data')
        const diff = count - activeid      ; 
        
        move = move - (25*diff);

        SliderContainer.style.transform = `translateX(${move}%)`;
        card.classList.add('active')


        cards.forEach(c=>{
            if(c!==card){
                c.classList.remove('active')
            }
        })
    })    
});


// Slider Carousel 2

const SliderContainer2 = document.querySelector('.secg-cards-container');

const cards2 = document.querySelectorAll('.sec-g-card');

let move1 = 40;

cards2.forEach(card => {

    card.addEventListener('click' , (e)=>{

        let count=0;

        // card.classList.add('active')

        if(e.target.classList.contains('sec-g-card')){
            count= e.target.getAttribute('data');
            
        }else if(e.target.parentElement.classList.contains('sec-g-card')){
            count= e.target.parentElement.getAttribute('data');
            
        }

        const activecard1 = document.querySelector('.active1')
        const activeid1 = activecard1.getAttribute('data')
        const diff1 = count - activeid1      ; 
        
        move1 = move1 - (25*diff1);

        SliderContainer2.style.transform = `translateX(${move1}%)`;
        card.classList.add('active1')


        cards2.forEach(c=>{
            if(c!==card){
                c.classList.remove('active1')
            }
        })
    })    
});



// Testimonial Slider 

const slick1=document.querySelector('.slick-1');
const slick2=document.querySelector('.slick-2');

const testitem = document.querySelector('.test-wrapper1');

slick2.addEventListener('click' , ()=>{
    slick1.classList.remove('slick-active');
    slick2.classList.add('slick-active');

    testitem.style = 'margin-left:-104%'
})


slick1.addEventListener('click' , ()=>{
    slick2.classList.remove('slick-active');
    slick1.classList.add('slick-active');

    testitem.style = 'margin-left: 2rem'
})


//Our Team Slider


const slickteam1 = document.querySelector('.slick-team-1');
const slickteam2 = document.querySelector('.slick-team-2');
const slickteam3 = document.querySelector('.slick-team-3');

const teamboxslider = document.querySelector('.team-wrapper');

slickteam2.addEventListener('click' , ()=>{
    slickteam1.classList.remove('slick-team-active');
    slickteam3.classList.remove('slick-team-active');
    slickteam2.classList.add('slick-team-active');

    teamboxslider.style.transform = `translateX(-23%)`;

    
})
slickteam3.addEventListener('click' , ()=>{
    slickteam1.classList.remove('slick-team-active');
    slickteam2.classList.remove('slick-team-active');
    slickteam3.classList.add('slick-team-active');

    teamboxslider.style.transform = `translateX(-49%)`;

    
})
slickteam1.addEventListener('click' , ()=>{
    slickteam2.classList.remove('slick-team-active');
    slickteam3.classList.remove('slick-team-active');
    slickteam1.classList.add('slick-team-active');

    teamboxslider.style.transform = `translateX(0)`;    
})


//Counters 

document.addEventListener('scroll' , scrollpage);
const counters = document.querySelectorAll('.counter');
function countup(){
    counters.forEach(counter=>{

        counter.innerText = '0';
        
        const updatecounter =()=>{
            const target = Number.parseInt(counter.getAttribute('data-target'));
            const c = +counter.innerText;
    
            const increment = target / 100;
            if(c<target){
                counter.innerText= `${Math.ceil(c+increment)}`;
                setTimeout(updatecounter,1)
            }else {
                counter.innerText = target;
            }
        }
        updatecounter();
    })
}

let scrollstarted = false;
function scrollpage(){

    const scrollpos= window.scrollY
    if(scrollpos>3800 && !scrollstarted){
        countup();
        scrollstarted = true
    }
}

// For Cards 

document.addEventListener('scroll' , scrollpagecard);
const secBcard1 = document.querySelector('#card1')
const secBcard2 = document.querySelector('#card2')
const secBcard3 = document.querySelector('#card3')

function scrollpagecard(){
    const scrollpos = window.scrollY;
    let scrolled = false ;
    if(scrollpos >350 && !scrolled){
        secBcard1.style.animation = 'fadeInup 0.6s ease-in-out'
        secBcard2.classList.add('upper-card-2')
        secBcard3.classList.add('upper-card-3')
        scrolled = true;
    }
}


// For SecB Boxes

document.addEventListener('scroll' , scrollpagebox);
const secBbox1 = document.querySelector('#secB-box1')
const secBbox2 = document.querySelector('#secB-box2')
const secBbox3 = document.querySelector('#secB-box3')
const secBbox4 = document.querySelector('#secB-box4')
const SecbImg =document.querySelector('#secB-image')

function scrollpagebox(){
    const scrollpos = window.scrollY;
    let scrolled = false ;
    if(scrollpos >950 && !scrolled){
        SecbImg.style.animation = 'slideinLeftSecb 0.8s ease-in'
        secBbox1.style.animation = ' fadein 0.3s ease-in 0.4s';
        secBbox2.classList.add('Secbbox2')
        secBbox3.classList.add('Secbbox3')
        secBbox4.classList.add('Secbbox4')

        scrolled = true;
    }
}


// Section C Animation

document.addEventListener('scroll' , scrollSecC);
const secCbox11 = document.querySelector('#SecCBOx11')
const secCbox12 = document.querySelector('#SecCBOx12')
const secCbox13 = document.querySelector('#SecCBOx13')
const secCbox21 = document.querySelector('#SecCBOx21')
const secCbox22 = document.querySelector('#SecCBOx22')
const secCbox23 = document.querySelector('#SecCBOx23')
const SecCTitle = document.querySelector('.title-secc')

function scrollSecC(){
    const scrollpos = window.scrollY;
    let scrolled = false ;
    if(scrollpos >1900 && !scrolled){
        SecCTitle.style.animation = 'slideuptitle 0.7s ease'


        secCbox11.style.animation = 'slideinLeftSecb 0.6s ease-in'
        secCbox12.classList.add('SecCBOx12')
        secCbox13.classList.add('SecCBOx13')
        
        
        secCbox21.style.animation = 'slidefromleft 0.6s ease-in'
        secCbox22.classList.add('SecCBOx12')
        secCbox23.classList.add('SecCBOx13')




        scrolled = true;
    }
}


//  SLiding CArd animation 

const SecFTitle = document.querySelector('.title-secf');
const SecFcards = document.querySelector('.secf-cards-container');

document.addEventListener('scroll' , scrollSecF);


function scrollSecF(){
    const scrollpos = window.scrollY;
    console.log(scrollpos)
    let scrolled = false ;
    if(scrollpos >2950 && !scrolled){
        SecFTitle.style.animation = 'slideuptitle 0.7s ease'
        SecFcards.style.animation = 'slideuptitle 1s ease '




        scrolled = true;
    }
}
let home ,about,servers, aboutDiv, serversDiv;
document.addEventListener('DOMContentLoaded', () => {
    home = document.getElementById('home');
    about = document.getElementById('about');
    servers = document.getElementById('servers');
    aboutDiv = document.getElementById('aboutDiv');
    serversDiv = document.getElementById('serversDiv');
});


function SwitchActive(id){
    home.classList.remove('active');
    about.classList.remove('active');
    servers.classList.remove('active');

    document.getElementById(id).classList.add('active');
}

window.addEventListener('scroll', () => {
    if(window.scrollY >= serversDiv.offsetTop){
        SwitchActive('servers');
    } 
    else if(window.scrollY >= aboutDiv.offsetTop){
        SwitchActive('about');
    }else {
        SwitchActive('home');
    }
});

function href(link){
    window.location.href = link;
}
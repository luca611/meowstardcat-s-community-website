let home ,about,servers;
document.addEventListener('DOMContentLoaded', () => {
    home = document.getElementById('home');
    about = document.getElementById('about');
    servers = document.getElementById('servers');
});


function SwitchActive(id){
    home.classList.remove('active');
    about.classList.remove('active');
    servers.classList.remove('active');

    document.getElementById(id).classList.add('active');
}

window.addEventListener('scroll', () => {
    if(window.scrollY >= about.offsetTop){
        SwitchActive('about');
    } else if(window.scrollY >= servers.offsetTop){
        SwitchActive('servers');
    } else {
        SwitchActive('home');
    }
});
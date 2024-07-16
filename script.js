// to get the json i used and external CORS proxy to bypass the CORS policy because apparenly normal fetch requests were getting blocked (This was a pain, i don't even know if it's the best way to do it but it works)
const proxyUrl = 'https://corsproxy.io/?'; 
const apiUrl = 'https://status.meowstard.cat/api/status-page/mcgc';

fetch(proxyUrl + encodeURIComponent(apiUrl))
    .then(response => response.json())
    .then(data => {
        const transformedData = transformJson(data);
        console.log(transformedData);

        createCards(transformedData);
    })
    .catch(error => {
        console.error('Error fetching data via proxy:', error);
    });


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

function transformJson(json) {
    const monitors = [];
    json.publicGroupList.forEach(group => {
      group.monitorList.forEach(monitor => {
        const monitorObj = {
          id: monitor.id,
          name: monitor.name,
          tags: []
        };
        monitor.tags.forEach(tag => {
          monitorObj.tags.push({
            name: tag.name,
            value: tag.value,
            color: tag.color
          });
        });
        monitors.push(monitorObj);
      });
    });
    return monitors;
  }

  function createCards(data) {
    const container = document.getElementById('container');
    data.forEach(element => {
      const card = document.createElement('div');
      card.className = 'card';
  
      const title = document.createElement('h2');
      title.className = 'titleCard';
      title.textContent = element.name;
      card.appendChild(title);
  
      element.tags.forEach(tag => {
        const textContainer = document.createElement('div');
        textContainer.className = 'text-container card-margin';
  
        const tagText = document.createElement('div');
        tagText.textContent = tag.value;
        textContainer.appendChild(tagText);
  
        card.appendChild(textContainer);
      });
  
      container.appendChild(card);
    });
  }
  

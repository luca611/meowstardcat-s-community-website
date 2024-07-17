// to get the json i used an external CORS proxy to bypass the CORS policy because apparenly normal fetch requests were getting blocked (This was a pain, i don't even know if it's the best way to do it but it works)
const proxyUrl = 'https://corsproxy.io/?';
const apiUrl = 'https://status.meowstard.cat/api/status-page/mcgc';

fetch(proxyUrl + encodeURIComponent(apiUrl))
  .then(response => response.json())
  .then(data => {
    const transformedData = transformJson(data);
    createCards(transformedData);
  })
  .catch(error => {
    console.error('Error fetching data via proxy:', error);
  });


//just getting the elements for the scroll event or ckick on the nav link
let home, about, servers, aboutDiv, serversDiv, catButton, engButton;
document.addEventListener('DOMContentLoaded', () => {
  home = document.getElementById('home');
  about = document.getElementById('about');
  servers = document.getElementById('servers');
  aboutDiv = document.getElementById('aboutDiv');
  serversDiv = document.getElementById('serversDiv');
  catButton = document.getElementById('catButton');
  engButton = document.getElementById('engButton');
});


function SwitchActive(id) {
  home.classList.remove('active');
  about.classList.remove('active');
  servers.classList.remove('active');

  document.getElementById(id).classList.add('active');
}

//scroll event to change the active class of the nav links
window.addEventListener('scroll', () => {
  try {

    if (window.scrollY >= serversDiv.offsetTop) {
      SwitchActive('servers');
    }
    else if (window.scrollY >= aboutDiv.offsetTop) {
      SwitchActive('about');
    } else {
      SwitchActive('home');
    }
  } catch (e) {
    //the page might not have fully loaded yet and throw an error
  }
});

function href(link) {
  window.location.href = link;
}

// Funtion that filters the json data and returns an array of objects with the id, name and tags (even color but it's never used) of each monitor
function transformJson(json) {
  const monitors = [];
  json.publicGroupList.forEach(group => {
    group.monitorList.forEach(monitor => {
      //monitor infos
      const monitorObj = {
        id: monitor.id,
        name: monitor.name,
        tags: []
      };
      //monitor tags
      monitor.tags.forEach(tag => {
        monitorObj.tags.push({
          //if any other tag will be added in the future, this will be the place to add it 
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

// Function that creates the cards with the data from the json
function createCards(data) {
  const container = document.getElementById('container');
  data.forEach(element => {
    const card = document.createElement('div');
    card.className = 'card';

    const title = document.createElement('h2');
    // Set the title of the card to the name of the monitor
    title.className = 'titleCard';
    title.textContent = element.name;
    card.appendChild(title);

    // Create a div for each tag of the object (monitor)
    element.tags.forEach(tag => {
      const textContainer = document.createElement('div');
      textContainer.className = 'text-container card-margin';

      //filling the div with the tag name and value
      const tagText = document.createElement('div');
      tagText.textContent = tag.name + ': ' + tag.value;

      // Set the background color of the div based on the tag adress -> blue, others -> orange 
      if (tag.name === 'Address') {
        textContainer.className = 'text-container card-margin blue-Gradient';
      } else {
        textContainer.className = 'text-container card-margin gradientBg';
      }

      //append the text to the div and the div to the card
      textContainer.appendChild(tagText);
      card.appendChild(textContainer);
    });

    container.appendChild(card);
  });
}


const translations = {
  "eng": {
    "motivational": "Connect, Play, and Enjoy Your Stay!",
    "homeText": "Home",
    "aboutNavText": "About",
    "serversText": "Servers",
    "aboutTitle": "About us",
    "ourServers": "Our Servers",
    "aboutText": "<b class='color-orange'>MeowstardCat's Gaming Community </b>was established in 2017. <br>We run game server for free no pay to win. ",
    "whyTitle": "Why?",
    "whyText": "We believe in fostering a community that <b class='color-orange'>accepts anyone. </b><br>We like to have a place to <b class='color-orange'>make new friends</b> and <b class='color-orange'>have fun </b>in life and escape from hard times in life. <br>Every day is a struggle no matter what you go thorugh and <b class='color-orange'>having a place to enjoy and make friends is why MCGC was started. </b><br><br>Hope to see you soon. </p>",
    "thanks": "Special thank you to: <b>Aethasilia, Kamisoi, Saiaku, Whos</b> and <b>Nightmare</b><br>for over the years <b>without you this community wouldn't be what it is today.</b>"
  },
  "cat": {
    "motivational": "Connecta't, juga i gaudeix de la teva estada!",
    "homeText": "Inici",
    "aboutNavText": "Sobre nosaltres",
    "serversText": "Servidors",
    "aboutTitle": "Sobre nosaltres",
    "ourServers": "Els nostres servidors",
    "aboutText": "<b class='color-orange'>MeowstardCat's Gaming Community </b>va ser establerta el 2017. <br>Correm servidors de jocs gratuïts sense pagament per guanyar.",
    "whyTitle": "Per què?",
    "whyText": "Creiem en fomentar una comunitat que <b class='color-orange'>accepti a tothom. </b><br>Nosaltres volem tenir un lloc per <b class='color-orange'>fer nous amics</b> i <b class='color-orange'>divertir-nos </b>en la vida i escapar de temps difícils en la vida. <br>Cada dia és una lluita, sense importar el que passis i <b class='color-orange'>tenir un lloc per gaudir i fer amics és per què es va començar MCGC. </b><br><br>Esperem veure't aviat. </p>",
    "thanks": "Un agraïment especial a: <b>Aethasilia, Kamisoi, Saiaku, Whos</b> and <b>Nightmare</b><br>per tots aquests anys <b> sense vosaltres aquesta comunitat no seria el que és avui. </b>"
  }
};


function translateTo(lang) {

  const language = lang === 0 ? 'eng' : 'cat';

  if (lang === 0) {
    catButton.classList.remove('active');
    engButton.classList.add('active');
  }
  else {
    catButton.classList.add('active');
    engButton.classList.remove('active');
  }
  const ids = Object.keys(translations[language]);

  ids.forEach(id => {
    const element = document.getElementById(id);
    if (element) {
      element.innerHTML = translations[language][id];
    }
  });
}

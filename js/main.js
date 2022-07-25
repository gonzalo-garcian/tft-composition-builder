var globalCounter = 0;
var actualSynergies = {};
var actualPieces = [];
var data = {
  "Aatrox": {
    name: "Aatrox",
    synergies: ["Guild", "Astral"]
  }
}

function onDragStart(event) {
    event
      .dataTransfer
      .setData('text/plain', event.target.id);
  }

  function onDragOver(event) {
    event.preventDefault();
  }

  function checkDictionary(synergy){
    
      if(synergy in actualSynergies){
        actualSynergies[synergy] = actualSynergies[synergy] + 1
      }
      else{
        actualSynergies[synergy] = 1
      }
  }

  function onDrop(event) {

      const id = event
      .dataTransfer
      .getData('text');

      const dropzone = event.target;
      if(dropzone.classList[0] == "hex" && !dropzone.hasChildNodes()){
        var draggableElement = document.getElementById(id);
        if(draggableElement.parentElement.id == 'pieces'){

          
          /* TODO: function to control the synergies */
          if(!actualPieces.includes(draggableElement.id)){

            actualPieces.push(draggableElement.id);

            data[draggableElement.id]["synergies"].forEach(synergy => {
              
                checkDictionary(synergy);
                console.log(actualSynergies)
              
            });

            var synergiesList = document.getElementById('synergies-list');
            synergiesList.innerHTML = "";
            Object.keys(actualSynergies).forEach(function(key) {
              var auxListItem = document.createElement('li');
              auxListItem.innerHTML =  key + "=> " + actualSynergies[key];
              synergiesList.appendChild(auxListItem);
            });
          }

          
          
          /*---------------------------------------- */
          draggableElement = document.getElementById(id).cloneNode(true);
          draggableElement.id = "item-cloned" + globalCounter;
          globalCounter++;
        }
        draggableElement.classList.add('item-hex');
        dropzone.appendChild(draggableElement);
      }

      event
      .dataTransfer
      .clearData();
    
  }

  function onContextMenu(event){
    event.preventDefault();
    if(event.target.id != "grid" && event.target.parentElement.id != "grid"){
      event.target.remove();
      actualSynergies.pop();
    }
  }
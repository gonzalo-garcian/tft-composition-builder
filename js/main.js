var globalCounter = 0;
var actualSynergies = {};
var data = {
  "Aatrox": {
    piecesInBoard: 0,
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
        actualSynergies[synergy] += 1
      }
      else{
        actualSynergies[synergy] = 1
      }
  }

  function updateSynergiesList(){
    var synergiesList = document.getElementById('synergies-list');
    synergiesList.innerHTML = "";
    Object.keys(actualSynergies).forEach(function(key) {
      if(actualSynergies[key] > 0) {
        var auxListItem = document.createElement('li');
        auxListItem.innerHTML =  key + "=> " + actualSynergies[key];
        synergiesList.appendChild(auxListItem);
      }
    });
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
          if(data[draggableElement.id]['piecesInBoard'] == 0){

            data[draggableElement.id]["synergies"].forEach(synergy => {
              
                checkDictionary(synergy);
                console.log(actualSynergies)
              
            });

            updateSynergiesList();
          }
          
          data[draggableElement.id]['piecesInBoard'] += 1;
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
      data[event.target.name]['piecesInBoard'] -= 1;
      /* Delete all synergies if pieces in Board equal to 0 */
      if(data[event.target.name]['piecesInBoard'] == 0){
        data[event.target.name]["synergies"].forEach(synergy => {
          actualSynergies[synergy] -= 1;
        })
      }
      updateSynergiesList();
    }
  }
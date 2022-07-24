var globalCounter = 0;
var synergies = [];
var data = {
  "Aatrox": {
    name: "Aatrox",
    synergies: ["Guild, Astral"]
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

  function onDrop(event) {

      const id = event
      .dataTransfer
      .getData('text');

      const dropzone = event.target;
      if(dropzone.classList[0] == "hex" && !dropzone.hasChildNodes()){
        var draggableElement = document.getElementById(id);
        if(draggableElement.parentElement.id == 'pieces'){

          /* TODO: function to control the synergies */
          synergies.push(data[draggableElement.id]["synergies"])
          synergies.forEach(element => {
            const li = document.createElement("li");
            li.innerHTML = "element";
            document.getElementById("synergies").appendChild(li);
          });
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
      synergies.pop()
    }
  }
var globalCounter = 0;
var synergies = ["Astral", "Guild"];

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

      var draggableElement = document.getElementById(id);
      if(draggableElement.parentElement.id == 'pieces'){
        draggableElement = document.getElementById(id).cloneNode(true);
        draggableElement.id = "item-cloned" + globalCounter;
        globalCounter++;
      }
      draggableElement.classList.add('item-hex');

      const dropzone = event.target;
      dropzone.appendChild(draggableElement);

      event
    .dataTransfer
    .clearData();
  }

  /*TODO: Look up if there is a better way to select the father*/
  function onContextMenu(event){
    event.preventDefault();
    const hexagon = event.target.parentElement;
    if(hexagon.id != "grid"){
      hexagon.removeChild(hexagon.firstElementChild)
      console.log("Right click!");
    }
  }
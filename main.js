function onDragStart(event) {
    event
      .dataTransfer
      .setData('text/plain', event.target.id);
  
    event
      .currentTarget
      .style
      .backgroundColor = 'yellow';

    console.log('DRAG WORKS!')
  }

  function onDragOver(event) {
    event.preventDefault();
  }

  function onDrop(event) {

    const id = event
      .dataTransfer
      .getData('text');

      const draggableElement = document.getElementById(id);
      draggableElement.classList.add('item-hex');
      const dropzone = event.target;
      dropzone.appendChild(draggableElement);

      event
    .dataTransfer
    .clearData();
  }

  /* TODO: onDrag shape the image as a hexagon */
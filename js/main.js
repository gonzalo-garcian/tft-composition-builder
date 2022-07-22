function onDragStart(event) {
    event
      .dataTransfer
      .setData('text/plain', event.target.id);
  
    event
      .currentTarget
      .classList.add('item-hex');

      /* TODO: Make transparent on drag. If its not dropped on the 
      grid it turns back to be a visible square. */

      /* TODO: onDrag shape the image as a hexagon. ATENTION: not 
      On DragStart. When you drag the image that kind of ghost copy
      It will be shaped hexagonal. The original image stays as a square.*/

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
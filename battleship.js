$(() => {
  // Select table containing the battleground
  const battleground = $('#battleground');

  // Build 10 x 10 grid for battleground
  for (let row = 0; row < 10; row++) {
    // Create table row
    const tr = $('<tr>');
    for (let column = 0; column < 10; column++) {
      // Create table cell with CSS class `water`. Note that we use
      // HTML data attributes  to store the coordinates of each cell
      // (see https://developer.mozilla.org/en-US/docs/Learn/HTML/Howto/Use_data_attributes). 
      // That makes it much easier to find cells based on coordinates later.
      $('<td>').addClass('water').attr('data-r', row).attr('data-c', column).appendTo(tr);
    }

    // Add table row to battleground table
    tr.appendTo(battleground);
  }

  $('#generate').click(() => {
    // Here you have to add your code for building a random battleground.
    // reset battleground
    for(i = 0; i < 10; i++){
      for(j = 0; j < 10; j++){
        $('td[data-r="' + j + '"][data-c="' + i + '"]').removeClass('ship').addClass('water');
      }
    }
    // generate ships
    // Why not using a `for` loop here
    var i = 5;
    while(i > 0){  // set every ship
      var length = (i === 1)?3:i;  // set length at point 1 to 3
      var x = Math.floor(Math.random() * 10); // get random coordinates
      var y = Math.floor(Math.random() * 10);
      var directionHorizontal = (Math.random() > 0.5);  // get random direction
      // check if there is enough place in x and y direction
      if(directionHorizontal){
        if(x + length - 1 > 9)continue;
      }else{
        if(y + length - 1 > 9)continue;
      }
      // check if there are any ships arround
      var valid = true;
      for(j = 0; j < length && valid; j++){
        var xscan = -1;
        var yscan = -1;
        while(!(xscan === 1 && yscan === 2)){
          if(directionHorizontal){
            var xaddr = ((x + xscan + j < 0 || x + xscan + j > 9)?x + j:x + xscan + j);
            var yaddr = ((y + yscan < 0 || y + yscan > 9)?y:y + yscan);
          }else{
            var xaddr = ((x + xscan < 0 || x + xscan > 9)?x:x + xscan);
            var yaddr = ((y + yscan + j < 0 || y + yscan + j > 9)?y + j:y + yscan + j);
          }
          if($('td[data-r="' + yaddr + '"][data-c="' + xaddr + '"]').hasClass('ship')){
            valid = false;
            break;
          }
          if(xscan === 1){
            yscan++;
            xscan = -2;
          }
          xscan++;
        }
      }
      if(!valid)continue;
      // finally place the ship
      for(j = 0; j < length; j++){
        if(directionHorizontal){
          $('td[data-r="' + y + '"][data-c="' + (x + j) + '"]').removeClass('water').addClass('ship');
        }else{
          $('td[data-r="' + (y + j) + '"][data-c="' + x + '"]').removeClass('water').addClass('ship');
        }
      }
      i--;
    }
    // Tip: The next line of code demonstrates how you can select a table cell
    // using coordinates, remove CSS classes and add CSS classes. 
    //$('td[data-r="1"][data-c="1"]').removeClass('water').addClass('ship');
    //$('td[data-r="2"][data-c="1"]').removeClass('water').addClass('ship');
    //$('td[data-r="3"][data-c="1"]').removeClass('water').addClass('ship');
  });
});

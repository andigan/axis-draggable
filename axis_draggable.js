$(document).ready(function() {

// example element
$('body').append("\
  <div id='whirled'                                                \
       style='background-color: blue; height: 75px; width: 75px;'> \
  </div>");

  $('#whirled').draggable({
//    containment: 'parent',
    scroll: false,
    start: function(event, ui) {
      // store the starting position of the element
      this.starting_position = ui.position;

      // initialize values used within this draggable
      this.commit_axis = 'neither';
      this.previous_drag_position = ui.position;
    },
    drag: function(event, ui) {
      // if commit_axis is defined, stick to the axis
      if (this.commit_axis == 'x') {
        ui.position.top = this.starting_position.top;
      }
      else if (this.commit_axis == 'y') {
        ui.position.left = this.starting_position.left;
      }
      // else attempt to commit to an axis
      else {
        // first, measure the distance between the starting position and the current drag position
        var xdistance = (this.starting_position.left - ui.position.left);
        var ydistance = (this.starting_position.top - ui.position.top);

      // if the distance is greater than 5, commit to an axis
        if ( (xdistance >  5) || (ydistance >  5)
          || (xdistance < -5) || (ydistance < -5)   ) {
          // convert to absolute because since some drags will result in negative distances
          xdistance = Math.abs(xdistance);
          ydistance = Math.abs(ydistance);
          // choose the commit axis based on the greater movement
          if (xdistance >= ydistance) {
            this.commit_axis = 'x';
          } else {
            this.commit_axis = 'y';
          }; // end of commit if
        }; // end of if attempt to commit if
      }; // end of else

      // prepare for next iteration of corner drag
      this.previous_drag_position = ui.position;

    }, // end of drag
    stop: function(event, ui) {
    // stop function
    } // end of stop
  }); // end of draggable
}); // end of document.ready

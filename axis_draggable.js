$(document).ready(function () {

  // create example element
  $('body').append("<div id='sample' style='background-color: limegreen; border: 1px solid black; height: 74px; width: 74px;'> </div>");

  $('#sample').draggable({
    containment: 'document',
    scroll: false,
    start: function (event, ui) {
      // store the starting position of the element
      this.starting_position = ui.position;
      // initialize values used within this draggable
      this.commit_axis = 'neither';
    },
    drag: function (event, ui) {
      // if commit_axis is defined, stick to the axis
      if (this.commit_axis == 'x') {
        ui.position.top = this.starting_position.top;
      } else if (this.commit_axis == 'y') {
        ui.position.left = this.starting_position.left;
      // else when commit_axis is 'neither', attempt to commit to an axis
      } else {
        // first, measure the distance between the starting position and the current drag position
        this.xdistance = (this.starting_position.left - ui.position.left);
        this.ydistance = (this.starting_position.top - ui.position.top);
      // if the distance is greater than 4, commit to an axis
        if ( (this.xdistance >  4) || (this.ydistance >  4)
          || (this.xdistance < -4) || (this.ydistance < -4)   ) {
          // convert to absolute because some drags will result in negative distances
          this.xdistance = Math.abs(this.xdistance);
          this.ydistance = Math.abs(this.ydistance);
          // choose the commit axis based on the greater movement
          if (this.xdistance >= this.ydistance) {
            this.commit_axis = 'x';
            this.style.backgroundColor = 'cornflowerblue';
          } else {
            this.commit_axis = 'y';
            this.style.backgroundColor = 'mediumorchid';
          };
        };
      };
    },
    stop: function () {
      this.style.backgroundColor = 'limegreen';
    }
  });
});

var notes = [];
// Id record count
var notesCounter = 0;
var notesFavCounter = 0;
// Tag List
var tags;

// Add a new note
function addNote() {
  if (noteText.value === "") {
    return;
  } else {
    notesCounter++; // increamenting notes count
    var note = {
      noteId: notesCounter,
      noteText: noteText.value,
      noteHead: noteHead.value,
      colorBg: noteDiv.style.background || "rgb(255, 255, 255)",
      tags: [],
      noteFavorite: false,
      noteFavoritePos: null,
    };
    notes.unshift(note);
    noteDiv.style.background = "#ffffff";
    renderNote(note);
    updateDB();
    clearInputs();
    noteHead.style.display = "none";
    noteBot.style.display = "none";
  }
}

// Clean textarea and input
function clearInputs() {
  noteText.value = "";
  noteHead.value = "";
}

// Header appearance function
function headVisible(div, object) {
  if (div.children.length >= 2) {
    object.style.display = "block";
  } else {
    object.style.display = "none";
  }
}
console.log(notes);


//========================= Storing data in Localstorage ======================================

(function() {
  
    // Grab the textarea
    var title = document.querySelector('.new-note__head');
    var desc = document.querySelector('.new-note__text')
    
    // localStorage feature detect
    function supportsLocalStorage() {
      return typeof(Storage)!== 'undefined';
    }
    
    // Run the detection with inverted expression
    if (!supportsLocalStorage()) {
    
      // Change the value to inform the user of no support
      title.value = 'No HTML5 localStorage support, soz.';
      desc.value = 'No HTML5 localStorage support, soz.';
      
    } else {
    
      // Try this
      try {
      
        // Set the interval and autosave every second
        setInterval(function() {
          localStorage.setItem('autosave_title', title.value);
        }, 1000);
         // Set the interval and autosave every second
         setInterval(function() {
            localStorage.setItem('autosave_desc', desc.value);
          }, 1000);
  
      } catch (e) {
      
        // If any errors, catch and alert the user
        if (e == QUOTA_EXCEEDED_ERR) {
          alert('Quota exceeded!');
        }
      }
      
      // If there is data available
      if (localStorage.getItem('autosave_title')) {
      
        // Retrieve the item
        demo.value = localStorage.getItem('autosave_desc');
      }
      
      // Clear button, onclick handler
      document.querySelector('.clear').onclick = function() {
        demo.value = '';
        localStorage.removeItem('autosave');
      };
      
      // Empty button, onclick handler
      document.querySelector('.empty').onclick = function() {
        demo.value = '';
        localStorage.clear(); 
      };
      
    }
    
  })();
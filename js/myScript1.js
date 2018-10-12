// Array to store notes
var notes = [];
// Id record counter
var notesCounter = 0;
var notesFavCounter = 0;
// Tag List
var tags;

function ready() {
  var notesDB;
  notes.sort(function(a, b) {
    if (a.noteId > b.noteId) {
      return 1;
    }
    if (a.noteId < b.noteId) {
      return -1;
    }
  });
 // Selecting Basic block
  var noteDiv = document.querySelector(".new-note"); 
  // Selecting Text
  var noteText = document.querySelector(".new-note__text"); 
  // Selecting Headline
  var noteHead = document.querySelector(".new-note__head"); // Selecting Headline
  var noteBot = document.querySelector(".new-note__bottom"); // Lower part of the main unit
  var btnSbmt = document.querySelector(".new-note__btn"); // "Write" button
  var btnColor = document.querySelectorAll(".new-note-color__item"); // Color circle in the main unit

  var mainDiv = document.querySelector(".note-list"); // Main unit with notes
  var mainDivItem = document.querySelectorAll(".note-list__item");
  var favoriteList = document.querySelector(".favorite-note-list"); //Block for selected records

  var currentNoteId; // to edit a note
  var notePopUp = document.querySelector(".note-popup"); // Popup editing
  var popUpColor = document.querySelectorAll(".note-popup-color__item"); // Colors in pop-up

  // User window
  var userBtn = document.querySelector(".header-person__photo");
  var userDiv = document.querySelector(".header-person-div")

  // Render notes
  notes.forEach(function(note) {
    renderNote(note);
  });
    
  // Add a new note
  function addNote() {
    if (noteText.value === "") {
      return;
    } else {
      notesCounter++;
      var note = {
        noteId: notesCounter,
        noteText: noteText.value,
        noteHead: noteHead.value,
        colorBg: noteDiv.style.background || "rgb(255, 255, 255)",
        tags: [],
        noteFavorite: false,
        noteFavoritePos: null,
      };
      // Add note to front end array
      notes.unshift(note);
      noteDiv.style.background = "#ffffff";
      renderNote(note);
      clearInputs();
      noteHead.style.display = "none";
      noteBot.style.display = "none";
    }
    console.log(note);
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

  // Creating a new div with data
  function renderNote(newNote) {
  var div = document.createElement("div"),
    remove = document.createElement("span"),
    title = document.createElement("h6"),
    text = document.createElement("p"),
    favorite = document.createElement("span"),
    tags = document.createElement("span");

    div.className = "note-list__item";
    remove.className = "note-list__del";
    favorite.className = "note-list__pin";
    tags.className = "note-list-tags";
    text.className = "note-list__text";
    title.className = "note-list__head";

    
    remove.innerHTML ="<img class='icon-cancel' src='./img/icons8-cancel-50.png' width='25px' height='auto'/>"
    text.innerHTML = newNote.noteText;
    title.innerHTML = newNote.noteHead;

    addRemoveListner(remove, newNote);
    div.setAttribute("data-item-number", (newNote.noteId));
    div.appendChild(remove);
    div.appendChild(title);
    if (noteHead.value.length > 0) {
      title.style.marginBottom = "10px"
    }
    div.appendChild(text);
    div.appendChild(favorite);
    div.appendChild(tags);
    mainDiv.insertBefore(div, mainDiv.firstChild);
    headVisible(mainDiv, document.querySelector(".note-list__main-head"));
    div.style.background = newNote.colorBg; 
    // Knocking down the background of the main unit
    if (text.innerHTML.length < 51) {
      text.style.lineHeight = "30px";
      text.style.fontSize = "27px";
    } else if (text.innerHTML.length < 81) {
      text.style.lineHeight = "25px";
      text.style.fontSize = "20px";
    }
    if (!title.innerHTML) {
      title.style.marginBottom = "0px";
    } else {
      title.style.marginBottom = "10px";
    }

    addTag(); // Tag add function
  }

  // Pop-up call function
  function popUpCall() {
    notes.forEach(function(element, index) { 
      // Paint the edit window in the color of the note
      if (element.noteId === currentNoteId) {
        notePopUp.style.background = element.colorBg;
      }
    });
    notePopUp.style.display = "flex";
    notePopUp.style.top = "200%";
    setInterval(function() {
      notePopUp.style.top = "25%";
    }, 1);
    document.querySelector(".overlay").style.display = "block";
  }

  // Note editing function
  var editHead = document.querySelector(".note-popup__head"),
    editText = document.querySelector(".note-popup__text"),
    editBtn = document.querySelector(".note-popup__btn");

  function editNote(text, head) {
    editText.value = text;
    if (!head) {
      editHead.value = "";
    } else {
      editHead.value = head;
    }
  }

  // The function of saving the edited note
  function saveNoteInPopUp() {
    var currentNote = document.querySelector(".note-list__item[data-item-number='" + currentNoteId + "']");
    notes.forEach(function(element, index) { 
      if (element.noteId === currentNoteId) {
        element.noteText = editText.value;
        currentNote.style.background = element.colorBg;
        if (!editHead) {
          element.noteHead = "";
        } else {
          element.noteHead = editHead.value;
        }
      }
    });
    currentNote.querySelector(".note-list__text").innerHTML = editText.value;
    currentNote.querySelector(".note-list__head").innerHTML = editHead.value;
    if (!currentNote.querySelector(".note-list__head").innerHTML) {
      currentNote.querySelector(".note-list__head").style.marginBottom = "0px";
    } else {
      currentNote.querySelector(".note-list__head").style.marginBottom = "10px";
    }
    notePopUp.style.display = 'none';
    document.querySelector(".overlay").style.display = 'none';
    
  }

  // Saving the edited note when clicking
  editBtn.addEventListener("click", function() {
    saveNoteInPopUp()
  });
  document.querySelector(".overlay").addEventListener("click", function() {
    saveNoteInPopUp()
  });


  // Preservation of color for the edited note
  for (var i = 0; i < popUpColor.length; i++) {
    popUpColor[i].addEventListener("click", function(color) {
      color = event.target.getAttribute("data-note-color");
      notes.forEach(function(element) {
        if (element.noteId === currentNoteId) {
          element.colorBg = color;
        }
      });
      for (var q = 0; q < popUpColor.length; q++) {
        popUpColor[q].style.border = "";
      }
      event.target.style.border = "2px solid #9a9a9a";
      colorPopUpBg(color);
    });
  }

  // Set the color of the pop-up
  function colorPopUpBg(colorPopUp) {
    notePopUp.style.background = colorPopUp;
  }

  // Set the color of the main unit
  function colorBg(colorBg) {
    noteDiv.style.background = colorBg;
  }

  // Button colors
  for (var i = 0; i < btnColor.length; i++) {
    btnColor[i].addEventListener("click", function(color) {
      color = event.target.getAttribute("data-note-color");
      for (var q = 0; q < btnColor.length; q++) {
        btnColor[q].style.border = "";
      }
      event.target.style.border = "2px solid #9a9a9a";
      colorBg(color);
    });
  }

  // Adding a new note by clicking on the "Add" button
  btnSbmt.addEventListener("click", function() {
    addNote();
  });

  // Opening and closing the main window
  noteText.addEventListener("click", function() {
    noteHead.style.display = "block";
    noteBot.style.display = "flex";
  });


  window.addEventListener("click", function(event) {
    if (isDescendant(noteDiv, event.target) || noteHead.value !== "") {
      return;
    }
    noteHead.style.display = "none";
    noteBot.style.display = "none";
  });

  function isDescendant(parent, child) {
    var node = child.parentNode;
    while (node != null) {
      if (node == parent) {
        return true;
      }
      node = node.parentNode;
    }
    return false;
  }


  // Delete event
  function addRemoveListner(remove, newNote) {
    remove.addEventListener("click", function() {
      var thisDiv = remove.parentNode,
        thisNote = newNote.noteId,
        arrayId,
        thisNoteId = +thisDiv.getAttribute("data-item-number");
      notes.forEach(function(element, index) {
        if (element.noteId === thisNoteId) {
          arrayId = index;
        }
      });
      notes.splice(arrayId, 1);
      thisDiv.parentNode.removeChild(thisDiv);
      headVisible(mainDiv, document.querySelector(".note-list__main-head"));
      updateDB();
    });
  }

  // A pop-up window will display when click on the avatar icon
  var userDivIsOpen = false;
  userBtn.addEventListener("click", function(e) {
    if (userDiv.style.display === "flex") {
      userDivIsOpen = false;
      userDiv.style.display = "none";
    } else {
      userDivIsOpen = true;
      userDiv.style.display = "flex";
    }
  });
  document.addEventListener("click", function(e) {
    console.log('1', e.target !== userDiv);
    console.log('2', !userDiv.contains(e.target))
    console.log('3', userDivIsOpen)
    if (e.target !== userDiv && !userDiv.contains(e.target) && e.target !== userBtn && userDivIsOpen) {
      userDivIsOpen = false;
      userDiv.style.display = "none";
    }
  });
}
document.addEventListener("DOMContentLoaded", ready);
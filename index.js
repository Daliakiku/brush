let canvasHistory = [];
let currentStateIndex = -1;
let clear;
let strokeWidth = 5;

function setup() {
    createCanvas(windowWidth, windowHeight);
    background(220);

    strokeWidth = document.getElementById('size-slider').value;

    // Save the initial state of the canvas
    saveCanvasState();
    clear = createButton('Clear');
    clear.position(150, 10);
    clear.mousePressed(() => {
        background(220);
        saveCanvasState(); // Save the state after clearing
    });

    // Create a button to undo the last action
    let undoButton = createButton('Undo');
    undoButton.position(200, 10);
    undoButton.mousePressed(() => {
        undoCanvas();
    });
    
    let redoButton = createButton('Redo');
    redoButton.position(250, 10);
    redoButton.mousePressed(() => {
        redoCanvas();
    });
}

function draw() {
    // Example drawing logic (e.g., drawing with the mouse)
    if (mouseIsPressed) {
        strokeWidth = document.getElementById('size-slider').value;
        strokeWeight(strokeWidth);
        line(pmouseX, pmouseY, mouseX, mouseY);
    }
}

function keyPressed() {
    // Undo when 'z' is pressed
    if (key === 'z' || key === 'Z') {
        undoCanvas();
    }
    // Redo when 'y' is pressed
    if (key === 'y' || key === 'Y') {
        redoCanvas();
    }
}

function saveCanvasState() {
    // Remove future states if a new state is saved after undoing
    if (currentStateIndex < canvasHistory.length - 1) {
        canvasHistory = canvasHistory.slice(0, currentStateIndex + 1);
    }
    canvasHistory.push(get()); // Save the current canvas state
    currentStateIndex++; // Update the current state index
}

function undoCanvas() {
    if (currentStateIndex > 0) {
        currentStateIndex--;
        let previousState = canvasHistory[currentStateIndex];
        image(previousState, 0, 0, width, height);
    }
}

function redoCanvas() {
    // Check if there is a next state to redo
    if (currentStateIndex < canvasHistory.length - 1) {
        currentStateIndex++; // Move to the next state
        let nextState = canvasHistory[currentStateIndex]; // Get the next state
        image(nextState, 0, 0, width, height); // Restore the next state
    }
}

// Save the canvas state whenever the mouse is released
function mouseReleased() {
    saveCanvasState();
}

function undoCanvas() {
    if (currentStateIndex > 0) {
        currentStateIndex--;
        let previousState = canvasHistory[currentStateIndex];
        image(previousState, 0, 0, width, height);
    }
}

// Save the canvas state whenever the mouse is released
function mouseReleased() {
    saveCanvasState();
}
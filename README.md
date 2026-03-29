# JavaScript Concepts Lab

An interactive, no-framework playground to learn, visualize, and experiment with core JavaScript concepts using pure JavaScript, HTML, and CSS.

---

## Live Demo

https://jslab.kaushikdev.com/

---

## Overview

This project transforms abstract JavaScript concepts into interactive experiences. Instead of only reading about topics like debounce or the event loop, users can directly interact with them and understand their behavior in real time.

---

## Features

### Event Loop Explorer

* Drag-and-drop tasks (sync, micro, macro)
* Visualize execution order
* Understand JavaScript scheduling behavior

### Fetch API Explorer

* Perform GET and POST requests
* View response data, status codes, and response time
* Functions as a lightweight API testing tool

### Debounce Explorer

* Compare raw input vs debounced output
* Adjust debounce timing dynamically
* Demonstrates real-world performance optimization

### Throttle Explorer

* Simulate rapid clicks
* Compare actual vs throttled executions
* Understand rate limiting behavior

### Canvas Explorer (Space Shooter Game)

* Playable canvas-based game
* Includes:

  * Player movement (WASD / arrow keys)
  * Shooting mechanics
  * Enemy spawning
  * Collision detection
  * Score and lives system
  * High score persistence via localStorage

---

## Tech Stack

* Vanilla JavaScript (ES Modules)
* HTML5
* CSS3 (modular, component-scoped)

No frameworks or external libraries are used.

---

## Project Structure

```text
/modules
  /canvas
  /debounce
  /eventloop
  /fetch
  /throttle

/utils
  helpers.js

index.html
main.js
style.css
```

Each module contains its own logic and styles. Global layout and shared styles are defined in `style.css`.

---

## Design Principles

* Learn by doing
* Minimal abstraction
* Modular architecture
* Clear separation of concerns
* Framework-independent implementation

---

## What You Can Learn

* Event Loop (synchronous, microtasks, macrotasks)
* Fetch API and asynchronous operations
* Debouncing and throttling techniques
* DOM manipulation
* Canvas rendering and basic game loops
* State handling without frameworks

---

## How to Run

1. Clone the repository

```bash
git clone <your-repo-url>
```

2. Open `index.html` in a browser

No build step or dependencies required.

---

## Future Improvements

* Add animations and transitions
* Improve canvas visuals (sprites, effects)
* Add sound feedback
* Persist state across panels
* Improve mobile responsiveness
* Expand with more JavaScript concept modules

---

## Author

Piyush Kaushik

---

## License

This project is open-source and available for learning and experimentation.

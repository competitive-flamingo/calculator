# Calculator Project

This is a simple, web-based calculator application built using HTML, CSS, and JavaScript.

## Demo

You can view and use the calculator [here](https://competitive-flamingo.github.io/calculator).

## Features

- Perform basic arithmetic operations: addition, subtraction, multiplication, and division.
- Use keyboard shortcuts for all operations.
- Clear the display or delete the last entry.
- Toggle between positive and negative numbers.
- Responsive design that works on both desktop and mobile devices.

### Mouse Controls

- Click the buttons to input numbers and perform operations.

### Keyboard Controls

| Key        | Function          |
|------------|--------------------|
| `Del`      | Clear Display      |
| `Backspace`| Remove Last Digit  |
| `p`        | Toggle Sign        |
| `/`        | Divide             |
| `*`        | Multiply           |
| `-`        | Subtract           |
| `+`        | Add                |
| `.`        | Decimal Point      |
| `Enter`    | Calculate Result   |
| `0-9`      | Enter Numbers      |

## Detailed Code Explanation

### HTML

The `index.html` file provides the structure of the calculator. It includes:

- A display area to show the current operation and result.
- Buttons for digits (0-9), operations (+, -, *, /), and system controls (AC, DEL, +/-).

### CSS

The `style.css` file styles the calculator. Key features include:

- Flexbox layout to ensure the calculator is centered on the page and responsive.
- Custom button styles for digits, operations, and system controls.
- A dark theme with contrasting colors for better visibility.

### JavaScript

The `script.js` file contains the logic for the calculator. Key functions include:

- Basic arithmetic functions (`add`, `subtract`, `multiply`, `divide`).
- A `calculator` object to manage the state of the current operation, including operands and operator.
- Event listeners to handle button clicks and keyboard inputs.
- Functions to update the display, handle digit and operator inputs, clear the display, delete the last digit, and toggle the sign of the current number.

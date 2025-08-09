# Wordle

A React-based Wordle clone where you guess a random 5-letter word in 6 tries.

## Features

- Random 5-letter solution fetched from [random-word-api](https://random-word-api.herokuapp.com/)
- Interactive grid and keypad UI
- Color feedback for correct, present, and absent letters
- Modal popup for win/loss result

## Getting Started

### Install dependencies and run

```sh
npm install
npm run dev
```

### Project Structure
* src/App.jsx — Main app component
* src/components/ — UI components (Grid, Row, Keypad, Modal, Wordle)
* src/hooks/useWordle.js — Game logic hook
* src/App.css — Styles

### How to Play
1. Type your guess using your keyboard.
1. Press Enter to submit.
1. Green = correct letter & position, Yellow = correct letter wrong position, Grey = not in word.
1. You have 6 tries to guess the word.
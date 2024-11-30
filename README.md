# Civitor

A civilization rts game

## Controls

+/- keys on keyboard will zoom in and out.
wasd and arrow keys will scroll the view.
z will toggle the grid.
x will toggle the crosshairs.

## Setup

```sh
nvm use 20
npm install
npm start
```

Open http://localhost:3000

## Develop

```sh
npm run start
```

Changes made under `src` and `client` will auto reload.

TODO: Is hot reloading working?

## Next Steps

 - Keep arrays of numbers for each zone, where the number in the array is an index targetting a object in the objects array
 - WorldObjects are placed into zones
 - Player can give commands to WorldObjects
 - Some WorldObjects have the move command

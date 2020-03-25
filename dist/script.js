const EMPTY = 'EMPTY';
const CIRCLE = 'CIRCLE';
const CROSS = 'CROSS';

function detectWinner(p) {
  if (p[0] == CIRCLE && p[1] == CIRCLE && p[2] == CIRCLE) return CIRCLE;
  if (p[3] == CIRCLE && p[4] == CIRCLE && p[5] == CIRCLE) return CIRCLE;
  if (p[6] == CIRCLE && p[7] == CIRCLE && p[8] == CIRCLE) return CIRCLE;

  if (p[0] == CIRCLE && p[3] == CIRCLE && p[6] == CIRCLE) return CIRCLE;
  if (p[1] == CIRCLE && p[4] == CIRCLE && p[7] == CIRCLE) return CIRCLE;
  if (p[2] == CIRCLE && p[5] == CIRCLE && p[8] == CIRCLE) return CIRCLE;

  if (p[0] == CIRCLE && p[4] == CIRCLE && p[8] == CIRCLE) return CIRCLE;
  if (p[2] == CIRCLE && p[4] == CIRCLE && p[6] == CIRCLE) return CIRCLE;

  if (p[0] == CROSS && p[1] == CROSS && p[2] == CROSS) return CROSS;
  if (p[3] == CROSS && p[4] == CROSS && p[5] == CROSS) return CROSS;
  if (p[6] == CROSS && p[7] == CROSS && p[8] == CROSS) return CROSS;

  if (p[0] == CROSS && p[3] == CROSS && p[6] == CROSS) return CROSS;
  if (p[1] == CROSS && p[4] == CROSS && p[7] == CROSS) return CROSS;
  if (p[2] == CROSS && p[5] == CROSS && p[8] == CROSS) return CROSS;

  if (p[0] == CROSS && p[4] == CROSS && p[8] == CROSS) return CROSS;
  if (p[2] == CROSS && p[4] == CROSS && p[6] == CROSS) return CROSS;

  if (p.every(position => position != EMPTY)) return "It is a tie";
}

function TicTacToe() {
  const [state, setState] = React.useState({
    player: CIRCLE,
    positions: [
    EMPTY, EMPTY, EMPTY,
    EMPTY, EMPTY, EMPTY,
    EMPTY, EMPTY, EMPTY] });



  function takeTurn(position) {
    const positions = [...state.positions];
    positions[position] = state.player;

    setState({
      player: state.player == CIRCLE ? CROSS : CIRCLE,
      positions });

  }

  function reset() {
    setState({
      player: CIRCLE,
      positions: [
      EMPTY, EMPTY, EMPTY,
      EMPTY, EMPTY, EMPTY,
      EMPTY, EMPTY, EMPTY] });


  }

  const winner = detectWinner(state.positions);

  return (
    React.createElement("div", null,
    React.createElement("div", { className: "grid" },
    React.createElement(Square, { position: 0, value: state.positions[0], takeTurn: takeTurn }),
    React.createElement(Square, { position: 1, value: state.positions[1], takeTurn: takeTurn }),
    React.createElement(Square, { position: 2, value: state.positions[2], takeTurn: takeTurn }),
    React.createElement(Square, { position: 3, value: state.positions[3], takeTurn: takeTurn }),
    React.createElement(Square, { position: 4, value: state.positions[4], takeTurn: takeTurn }),
    React.createElement(Square, { position: 5, value: state.positions[5], takeTurn: takeTurn }),
    React.createElement(Square, { position: 6, value: state.positions[6], takeTurn: takeTurn }),
    React.createElement(Square, { position: 7, value: state.positions[7], takeTurn: takeTurn }),
    React.createElement(Square, { position: 8, value: state.positions[8], takeTurn: takeTurn })),

    winner && React.createElement(Result, { winner: winner, reset: reset })));


}

function Square({ position, value, takeTurn }) {
  function handleClick() {
    if (value == EMPTY) takeTurn(position);
  }

  return (
    React.createElement("div", { className: "square", onClick: handleClick },
    value == CIRCLE && React.createElement(Circle, null),
    value == CROSS && React.createElement(Cross, null)));


}

function Circle() {
  return (
    React.createElement("svg", { width: "100", height: "100", viewBox: "-50 -50 100 100", className: "circle" },
    React.createElement("circle", { cx: "0", cy: "0", r: "40" })));


}

function Cross() {
  return (
    React.createElement("svg", { width: "100", height: "100", viewBox: "-50 -50 100 100", className: "cross" },
    React.createElement("line", { x1: "-40", y1: "-40", x2: "40", y2: "40" }),
    React.createElement("line", { x1: "-40", y1: "40", x2: "40", y2: "-40" })));


}

function Result({ winner, reset }) {
  return (
    React.createElement("div", { className: "result" },
    winner == CIRCLE && 'Circle won the game',
    winner == CROSS && 'Cross won the game',
    winner == 'It is a tie' && 'It is a tie',
    React.createElement("button", { onClick: reset }, "Reset")));


}

ReactDOM.render(
React.createElement(TicTacToe, null),
document.getElementById('app'));
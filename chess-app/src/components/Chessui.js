// Chessboard.js
import React, { useState } from 'react';
import Square from './Square';

const initialBoard = [
    ["R", "N", "B", "Q", "K", "B", "N", "R"],
    ["P", "P", "P", "P", "P", "P", "P", "P"],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["p", "p", "p", "p", "p", "p", "p", "p"],
    ["r", "n", "b", "q", "k", "b", "n", "r"]
];

const Chessboard = () => {
    const [board, setBoard] = useState(initialBoard);
    const [selectedPiece, setSelectedPiece] = useState(null);
    const [highlightedMoves, setHighlightedMoves] = useState([]);

    const handleSquareClick = (row, col) => {
        if (selectedPiece) {
            if (highlightedMoves.some(([r, c]) => r === row && c === col)) {
                const newBoard = board.map(row => [...row]);
                newBoard[selectedPiece[0]][selectedPiece[1]] = "";
                newBoard[row][col] = board[selectedPiece[0]][selectedPiece[1]];
                setBoard(newBoard);
                setSelectedPiece(null);
                setHighlightedMoves([]);
            } else {
                setSelectedPiece(null);
                setHighlightedMoves([]);
            }
        } else {
            if (board[row][col]) {
                setSelectedPiece([row, col]);
                setHighlightedMoves([[row + 1, col], [row + 2, col]]);
            }
        }
    };

    return (
        <div className="chessboard">
            {board.map((row, rowIndex) =>
                row.map((piece, colIndex) => (
                    <Square
                        key={`${rowIndex}-${colIndex}`}
                        piece={piece}
                        row={rowIndex}
                        col={colIndex}
                        isHighlighted={highlightedMoves.some(
                            ([r, c]) => r === rowIndex && c === colIndex
                        )}
                        onClick={() => handleSquareClick(rowIndex, colIndex)}
                    />
                ))
            )}
        </div>
    );
};

export default Chessboard;

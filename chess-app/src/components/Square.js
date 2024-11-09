// Square.js
import React from 'react';

const pieceSymbols = {
    "R": "♖", "N": "♘", "B": "♗", "Q": "♕", "K": "♔", "P": "♙",
    "r": "♜", "n": "♞", "b": "♝", "q": "♛", "k": "♚", "p": "♟"
};

const Square = ({ piece, isHighlighted, onClick }) => {
    const className = `square ${isHighlighted ? 'highlight' : ''}`;
    return (
        <div className={className} onClick={onClick}>
            {pieceSymbols[piece] || ""}
        </div>
    );
};

export default Square;

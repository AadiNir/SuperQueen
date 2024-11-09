"use strict";
class Piece {
    constructor(position, color) {
        this.position = position;
        this.color = color;
    }
    move(newPosition) {
        this.position = newPosition;
    }
}
class King extends Piece {
    getAvailableMoves(board) {
        const moves = [
            { x: this.position.x + 1, y: this.position.y },
            { x: this.position.x - 1, y: this.position.y },
            { x: this.position.x, y: this.position.y + 1 },
            { x: this.position.x, y: this.position.y - 1 },
            { x: this.position.x + 1, y: this.position.y + 1 },
            { x: this.position.x - 1, y: this.position.y - 1 },
            { x: this.position.x + 1, y: this.position.y - 1 },
            { x: this.position.x - 1, y: this.position.y + 1 }
        ];
        return moves.filter(move => board.isPositionValid(move) && board.isPositionEmptyOrOpponent(move, this.color));
    }
    getSymbol() {
        return this.color === 'white' ? 'K' : 'k';
    }
}
class QueenKnight extends Piece {
    getAvailableMoves(board) {
        const queenMoves = this.getLinearMoves(board, [
            { x: 1, y: 0 }, { x: -1, y: 0 }, { x: 0, y: 1 }, { x: 0, y: -1 },
            { x: 1, y: 1 }, { x: -1, y: -1 }, { x: 1, y: -1 }, { x: -1, y: 1 }
        ]);
        const knightMoves = [
            { x: this.position.x + 2, y: this.position.y + 1 },
            { x: this.position.x + 2, y: this.position.y - 1 },
            { x: this.position.x - 2, y: this.position.y + 1 },
            { x: this.position.x - 2, y: this.position.y - 1 },
            { x: this.position.x + 1, y: this.position.y + 2 },
            { x: this.position.x + 1, y: this.position.y - 2 },
            { x: this.position.x - 1, y: this.position.y + 2 },
            { x: this.position.x - 1, y: this.position.y - 2 }
        ];
        const validKnightMoves = knightMoves.filter(move => board.isPositionValid(move) && board.isPositionEmptyOrOpponent(move, this.color));
        return [...queenMoves, ...validKnightMoves];
    }
    getLinearMoves(board, directions) {
        const moves = [];
        for (const direction of directions) {
            let currentPos = { x: this.position.x + direction.x, y: this.position.y + direction.y };
            while (board.isPositionValid(currentPos) && board.isPositionEmptyOrOpponent(currentPos, this.color)) {
                moves.push(currentPos);
                if (!board.isPositionEmpty(currentPos))
                    break;
                currentPos = { x: currentPos.x + direction.x, y: currentPos.y + direction.y };
            }
        }
        return moves;
    }
    getSymbol() {
        return this.color === 'white' ? 'QK' : 'qk';
    }
}
class Rook extends Piece {
    getAvailableMoves(board) {
        const rookmoves = [{ x: 1, y: 0 }, { x: 0, y: 1 }, { x: -1, y: 0 }, { x: 0, y: -1 }];
        let position = this.linearmoves(board, rookmoves);
        return position;
    }
    getSymbol() {
        return this.color === 'white' ? 'R' : 'r';
    }
    linearmoves(board, directions) {
        let moves = [];
        for (let dir of directions) {
            let currpos = { x: this.position.x + dir.x, y: this.position.y + dir.y };
            while (board.isPositionValid(currpos) && board.isPositionEmptyOrOpponent(currpos, this.color)) {
                moves.push(currpos);
                if (!board.isPositionEmpty(currpos))
                    break;
                currpos = { x: currpos.x + dir.x, y: currpos.y + dir.y };
            }
        }
        return moves;
    }
}
class Bishop extends Piece {
    getAvailableMoves(board) {
        const moves = [{ x: 1, y: 1 }, { x: 1, y: -1 }, { x: -1, y: 1 }, { x: -1, y: -1 }];
        let bishopmoves = this.linearmoves(board, moves);
        return bishopmoves;
    }
    getSymbol() {
        return this.color === 'white' ? 'B' : 'b';
    }
    linearmoves(board, directions) {
        let moves = [];
        for (let dir of directions) {
            let currpos = { x: this.position.x + dir.x, y: this.position.y + dir.y };
            while (board.isPositionValid(currpos) && board.isPositionEmptyOrOpponent(currpos, this.color)) {
                moves.push(currpos);
                if (!board.isPositionEmpty(currpos))
                    break;
                currpos = { x: currpos.x + dir.x, y: currpos.y + dir.y };
            }
        }
        return moves;
    }
}
class Pawn extends Piece {
    getAvailableMoves(board) {
        let currentPos = { x: this.position.x, y: this.position.y + 1 };
        let attackpos = [{ x: this.position.x + 1, y: this.position.y + 1 }, { x: this.position.x - 1, y: this.position.y + 1 }];
        let moves = [];
        if (board.isPositionValid(currentPos)) {
            moves.push(currentPos);
        }
        for (let dir of attackpos) {
            if (board.isPositionOccupiedByOpponent(dir, this.color)) {
                moves.push(dir);
            }
        }
        return moves;
    }
    getSymbol() {
        return this.color === 'white' ? 'P' : 'p';
    }
}
class Knight extends Piece {
    getAvailableMoves(board) {
        const knightMoves = [
            { x: this.position.x + 2, y: this.position.y + 1 },
            { x: this.position.x + 2, y: this.position.y - 1 },
            { x: this.position.x - 2, y: this.position.y + 1 },
            { x: this.position.x - 2, y: this.position.y - 1 },
            { x: this.position.x + 1, y: this.position.y + 2 },
            { x: this.position.x + 1, y: this.position.y - 2 },
            { x: this.position.x - 1, y: this.position.y + 2 },
            { x: this.position.x - 1, y: this.position.y - 2 }
        ];
        const validKnightMoves = knightMoves.filter(move => board.isPositionValid(move) && board.isPositionEmptyOrOpponent(move, this.color));
        return validKnightMoves;
    }
    getSymbol() {
        return this.color == 'white' ? 'KN' : 'kn';
    }
}
class Board {
    constructor() {
        this.pieces = [];
    }
    addPiece(piece) {
        this.pieces.push(piece);
    }
    isPositionValid(position) {
        return position.x >= 0 && position.x < 8 && position.y >= 0 && position.y < 8;
    }
    isPositionEmpty(position) {
        return !this.pieces.some(piece => piece.position.x === position.x && piece.position.y === position.y);
    }
    isPositionEmptyOrOpponent(position, color) {
        const piece = this.getPieceAtPosition(position);
        return !piece || piece.color !== color;
    }
    getPieceAtPosition(position) {
        return this.pieces.find(piece => piece.position.x === position.x && piece.position.y === position.y) || null;
    }
    isMoveValid(from, to) {
        const piece = this.getPieceAtPosition(from);
        if (!piece)
            return false;
        const availableMoves = piece.getAvailableMoves(this);
        return availableMoves.some(move => move.x === to.x && move.y === to.y);
    }
    isPositionOccupiedByOpponent(position, color) {
        const piece = this.getPieceAtPosition(position);
        if (piece) {
            if (piece.color !== color) {
                return true;
            }
        }
        return false;
    }
    isCheck(color) {
        const king = this.pieces.find(piece => piece instanceof King && piece.color === color);
        if (!king)
            return false;
        // Check if any of the opponent's pieces can attack the king
        const opponentPieces = this.pieces.filter(piece => piece.color !== color);
        for (const piece of opponentPieces) {
            const availableMoves = piece.getAvailableMoves(this);
            if (availableMoves.some(move => move.x === king.position.x && move.y === king.position.y)) {
                return true; // King is under attack
            }
        }
        return false; // King is not under attack
    }
    isCheckmate(color) {
        if (!this.isCheck(color)) {
            return false;
        }
        const king = this.pieces.find(piece => piece instanceof King && piece.color === color);
        if (!king)
            return false;
        const opponentPieces = this.pieces.filter(piece => piece.color !== color);
        const attackingPieces = opponentPieces.filter(piece => {
            const availableMoves = piece.getAvailableMoves(this);
            return availableMoves.some(move => move.x === king.position.x && move.y === king.position.y);
        });
        for (const piece of attackingPieces) {
            const attackPosition = piece.position;
            const availableMoves = this.pieces.filter(p => p.color === color).flatMap(p => p.getAvailableMoves(this));
            if (availableMoves.some(move => move.x === attackPosition.x && move.y === attackPosition.y)) {
                return false;
            }
        }
        // Check if any piece can block the check by moving between the king and the attacker
        for (const piece of this.pieces.filter(p => p.color === color)) {
            const availableMoves = piece.getAvailableMoves(this);
            for (const move of availableMoves) {
                // Try to move a piece to block the line of attack
                const lineOfAttack = this.getLineOfAttack(king.position, move);
                if (lineOfAttack.some(position => this.isPositionEmpty(position) || this.isPositionOccupiedByOpponent(position, color))) {
                    return false; // The attack can be blocked
                }
            }
        }
        return true; // If no move can block or capture the attacking piece, it's checkmate
    }
    // Helper function to get the line of attack between the king and the attacking piece
    getLineOfAttack(kingPosition, attackingPiecePosition) {
        const lineOfAttack = [];
        const dx = Math.sign(attackingPiecePosition.x - kingPosition.x);
        const dy = Math.sign(attackingPiecePosition.y - kingPosition.y);
        let currentX = kingPosition.x + dx;
        let currentY = kingPosition.y + dy;
        while (this.isPositionValid({ x: currentX, y: currentY })) {
            lineOfAttack.push({ x: currentX, y: currentY });
            if (currentX === attackingPiecePosition.x && currentY === attackingPiecePosition.y) {
                break;
            }
            currentX += dx;
            currentY += dy;
        }
        return lineOfAttack;
    }
    movePiece(from, to) {
        if (this.isMoveValid(from, to)) {
            const piece = this.getPieceAtPosition(from);
            if (piece) {
                let xval = this.pieces.find(piecetemp => piecetemp.position.x == to.x && piecetemp.position.y == to.y);
                if (xval) {
                    xval.position.x = -1;
                    xval.position.y = -1;
                }
                piece.move(to);
                return true;
            }
        }
        return false;
    }
    display() {
        const boardArray = Array.from({ length: 8 }, () => Array(8).fill('.'));
        for (const piece of this.pieces) {
            if (piece.position.x == -1 || piece.position.y == -1)
                continue;
            boardArray[7 - piece.position.y][piece.position.x] = piece.getSymbol();
        }
        console.log('  a b c d e f g h');
        boardArray.forEach((row, index) => {
            console.log(`${8 - index} ${row.join(' ')}`);
        });
        console.log();
    }
    initializeBoard() {
        this.addPiece(new King({ x: 4, y: 0 }, 'white'));
        this.addPiece(new QueenKnight({ x: 5, y: 5 }, 'white')); // QueenKnight with additional moves
        this.addPiece(new Rook({ x: 0, y: 0 }, 'white'));
        this.addPiece(new Rook({ x: 7, y: 0 }, 'white'));
        this.addPiece(new Bishop({ x: 2, y: 0 }, 'white'));
        this.addPiece(new Bishop({ x: 5, y: 0 }, 'white'));
        this.addPiece(new Knight({ x: 1, y: 0 }, 'white'));
        this.addPiece(new Knight({ x: 6, y: 0 }, 'white'));
        this.addPiece(new Pawn({ x: 0, y: 1 }, 'white'));
        this.addPiece(new Pawn({ x: 1, y: 1 }, 'white'));
        this.addPiece(new Pawn({ x: 2, y: 1 }, 'white'));
        this.addPiece(new Pawn({ x: 3, y: 1 }, 'white'));
        this.addPiece(new Pawn({ x: 4, y: 1 }, 'white'));
        this.addPiece(new Pawn({ x: 5, y: 1 }, 'white'));
        this.addPiece(new Pawn({ x: 6, y: 1 }, 'white'));
        this.addPiece(new Pawn({ x: 7, y: 1 }, 'white'));
        // Add other pieces as needed
        this.addPiece(new King({ x: 4, y: 7 }, 'black'));
        this.addPiece(new QueenKnight({ x: 3, y: 7 }, 'black'));
        this.addPiece(new Rook({ x: 0, y: 7 }, 'black'));
        this.addPiece(new Rook({ x: 7, y: 7 }, 'black'));
        this.addPiece(new Bishop({ x: 2, y: 7 }, 'black'));
        this.addPiece(new Bishop({ x: 5, y: 7 }, 'black'));
        this.addPiece(new Knight({ x: 1, y: 7 }, 'black'));
        this.addPiece(new Knight({ x: 6, y: 7 }, 'black'));
        this.addPiece(new Pawn({ x: 0, y: 6 }, 'black'));
        this.addPiece(new Pawn({ x: 1, y: 6 }, 'black'));
        this.addPiece(new Pawn({ x: 2, y: 6 }, 'black'));
        this.addPiece(new Pawn({ x: 3, y: 6 }, 'black'));
        this.addPiece(new Pawn({ x: 4, y: 6 }, 'black'));
        this.addPiece(new Pawn({ x: 5, y: 6 }, 'black'));
        this.addPiece(new Pawn({ x: 6, y: 6 }, 'black'));
        this.addPiece(new Pawn({ x: 7, y: 6 }, 'black'));
    }
}

export { Board };

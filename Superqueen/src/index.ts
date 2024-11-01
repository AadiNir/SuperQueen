type Position = { x: number; y: number };

abstract class Piece {
  position: Position;
  color: 'white' | 'black';

  constructor(position: Position, color: 'white' | 'black') {
    this.position = position;
    this.color = color;
  }

  abstract getAvailableMoves(board: Board): Position[];

  move(newPosition: Position) {
    this.position = newPosition;
  }

  abstract getSymbol(): string;
}

class King extends Piece {
  getAvailableMoves(board: Board): Position[] {
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

  getSymbol(): string {
    return this.color === 'white' ? 'K' : 'k';
  }
}

class QueenKnight extends Piece {
  getAvailableMoves(board: Board): Position[] {
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

    const validKnightMoves = knightMoves.filter(move =>
      board.isPositionValid(move) && board.isPositionEmptyOrOpponent(move, this.color)
    );

    return [...queenMoves, ...validKnightMoves];
  }

  protected getLinearMoves(board: Board, directions: Position[]): Position[] {
    const moves: Position[] = [];
    for (const direction of directions) {
      let currentPos = { x: this.position.x + direction.x, y: this.position.y + direction.y };
      while (board.isPositionValid(currentPos) && board.isPositionEmptyOrOpponent(currentPos, this.color)) {
        moves.push(currentPos);
        if (!board.isPositionEmpty(currentPos)) break;
        currentPos = { x: currentPos.x + direction.x, y: currentPos.y + direction.y };
      }
    }
    return moves;
  }

  getSymbol(): string {
    return this.color === 'white' ? 'QK' : 'qk';
  }
}

class Board {
  pieces: Piece[] = [];

  addPiece(piece: Piece): void {
    this.pieces.push(piece);
  }

  isPositionValid(position: Position): boolean {
    return position.x >= 0 && position.x < 8 && position.y >= 0 && position.y < 8;
  }

  isPositionEmpty(position: Position): boolean {
    return !this.pieces.some(piece => piece.position.x === position.x && piece.position.y === position.y);
  }

  isPositionEmptyOrOpponent(position: Position, color: 'white' | 'black'): boolean {
    const piece = this.getPieceAtPosition(position);
    return !piece || piece.color !== color;
  }

  getPieceAtPosition(position: Position): Piece | null {
    return this.pieces.find(piece => piece.position.x === position.x && piece.position.y === position.y) || null;
  }

  isMoveValid(from: Position, to: Position): boolean {
    const piece = this.getPieceAtPosition(from);
    if (!piece) return false;
    const availableMoves = piece.getAvailableMoves(this);
    return availableMoves.some(move => move.x === to.x && move.y === to.y);
  }

  movePiece(from: Position, to: Position): boolean {
    if (this.isMoveValid(from, to)) {
      const piece = this.getPieceAtPosition(from);
      if (piece) {
        piece.move(to);
        return true;
      }
    }
    return false;
  }

  display(): void {
    const boardArray: string[][] = Array.from({ length: 8 }, () => Array(8).fill('.'));
    for (const piece of this.pieces) {
      boardArray[7 - piece.position.y][piece.position.x] = piece.getSymbol();
    }
    console.log('  a b c d e f g h');
    boardArray.forEach((row, index) => {
      console.log(`${8 - index} ${row.join(' ')}`);
    });
    console.log();
  }

  initializeBoard(): void {
    this.addPiece(new King({ x: 4, y: 0 }, 'white'));
    this.addPiece(new QueenKnight({ x: 3, y: 0 }, 'white'));  // QueenKnight with additional moves
    // Add other pieces as needed
    this.addPiece(new King({x:4,y:7},'black'));
    this.addPiece(new QueenKnight({x:3,y:7},'black'));
  }
}

// Usage example
const board = new Board();
board.initializeBoard();
board.display();

const from = { x: 3, y: 0 };
const to = { x: 5, y: 1 }; // Example knight move

if (board.movePiece(from, to)) {
  console.log("Move successful!");
} else {
  console.log("Invalid move.");
}

board.display();
import assert from 'assert';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import getBoard from '../board.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const board = getBoard(0);

assert(Array.isArray(board), 'getBoard should return an array');
assert.strictEqual(board.length, 9, 'Board should have 9 rows');
board.forEach((row, index) => {
  assert.strictEqual(typeof row, 'string', `Row ${index} should be a string`);
  assert.strictEqual(row.length, 9, `Row ${index} should have 9 characters`);
  assert(/^[0-9-]{9}$/.test(row), `Row ${index} should contain only digits and dashes`);
});
assert.strictEqual(board[0], '--74916-5', 'First row of board 0 should match expected value');
assert.strictEqual(getBoard(-1), undefined, 'Invalid board index should return undefined');

const sudokuSource = fs.readFileSync(path.join(__dirname, '../sudoku.js'), 'utf8');
const whichMatch = sudokuSource.match(/const WHICH\s*=\s*(\d+)\s*;/);
assert(whichMatch, 'Could not find WHICH constant in sudoku.js');
const WHICH = Number(whichMatch[1]);

const boardSource = fs.readFileSync(path.join(__dirname, '../board.js'), 'utf8');
const boardCount = (boardSource.match(/^\s{2}\[/gm) || []).length;
assert.strictEqual(
  WHICH + 1,
  boardCount,
  `WHICH should be the last valid board index. Expected WHICH + 1 (${WHICH + 1}) to equal the number of boards in board.js (${boardCount}).`
);

console.log('All board validation tests passed.');

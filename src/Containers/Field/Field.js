import React, { PureComponent } from 'react';
import Row from '../../Components/Row/Row';
import * as cnst from '../../Services/Constants';
import './Field.css';

class Field extends PureComponent {

    constructor(props) {
        super(props);
//nextMovePlayerNum
        this.state = {
            nextMovePlayerNum: 1,
            scheme:
                [
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                ],
            winner: null
        }
    }


    checkFirstDiagonal = (rowIdx, itemIdx, symbol) => {
        let count = 0,
            startItemIdx,
            startRowIdx;

        if (rowIdx === itemIdx) {
            if (rowIdx - 4 > 0) {
                startRowIdx = startItemIdx = rowIdx - 4;
            } else {
                startRowIdx = startItemIdx = 0;
            }
        } else {
            if (rowIdx > 4 && itemIdx > 4) {
                startRowIdx = rowIdx - 4;
                startItemIdx = itemIdx - 4;
            } else if (rowIdx > itemIdx) {
                startRowIdx = rowIdx - itemIdx;
                startItemIdx = 0;
            } else {
                startItemIdx = itemIdx - rowIdx;
                startRowIdx = 0;
            }
        }

        let j = 0;

        for (let i = startRowIdx; j < 10; i++) {
            if (this.state.scheme[i] && this.state.scheme[i][startItemIdx + j] > -1) {
                if (this.state.scheme[i][startItemIdx + j] === symbol) {
                    count++
                } else {
                    count = 0;
                }
                if (count > 4) {
                    return symbol;
                }
                j++

            } else {
                break;
            }
        }
    }

    checkSecondDiagonal = (rowIdx, itemIdx, symbol) => {
        let count = 0,
            startItemIdx,
            startRowIdx;

        if (rowIdx === (18 - itemIdx)) {
            if (rowIdx - 4 > 0) {
                startRowIdx = rowIdx - 4;
                startItemIdx = itemIdx + 4;
            } else {
                startRowIdx = 0;
                startItemIdx = 18;
            }
        } else {
            if (rowIdx > 4 && (18 - itemIdx) > 4) {
                startRowIdx = rowIdx - 4;
                startItemIdx = itemIdx + 4;
            } else if (rowIdx > (18 - itemIdx)) {
                startRowIdx = rowIdx - (18 - itemIdx);
                startItemIdx = 18;
            } else {
                startItemIdx = itemIdx + rowIdx;
                startRowIdx = 0;
            }
        }

        let j = 0;

        for (let i = startRowIdx; j > -10; i++) {
            if (this.state.scheme[i] && this.state.scheme[i][startItemIdx + j] > -1) {
                if (this.state.scheme[i][startItemIdx + j] === symbol) {
                    count++
                } else {
                    count = 0;
                }
                if (count > 4) {
                    return symbol;
                }
                j--
            } else {
                break;
            }
        }
    }

    checkHorizontal = (rowIdx, itemIdx, symbol) => {
        let count = 0;
        const start = itemIdx - 4 > 0 ? itemIdx - 4 : 0,
            end = itemIdx + 4 < this.state.scheme.length - 1 ? itemIdx + 4 : this.state.scheme.length - 1;
        for (let i = start; i <= end; i++) {
            if (this.state.scheme[rowIdx][i] === symbol) {
                count++
            } else {
                count = 0;
            }
            if (count > 4) {
                return symbol;
            }
        }
    }

    checkVertical = (rowIdx, itemIdx, symbol) => {
        let count = 0;
        const start = rowIdx - 4 > 0 ? rowIdx - 4 : 0,
            end = rowIdx + 4 < this.state.scheme.length - 1 ? rowIdx + 4 : this.state.scheme.length - 1;
        for (let i = start; i <= end; i++) {
            if (this.state.scheme[i][itemIdx] === symbol) {
                count++
            } else {
                count = 0;
            }
            if (count > 4) {
                return symbol;
            }
        }
    }

    checkWinner = (rowIdx, itemIdx, symbol) => {
        let winner =
            this.checkHorizontal(rowIdx, itemIdx, symbol) ||
            this.checkVertical(rowIdx, itemIdx, symbol) ||
            this.checkFirstDiagonal(rowIdx, itemIdx, symbol) ||
            this.checkSecondDiagonal(rowIdx, itemIdx, symbol);
        if (winner) {
            this.setState({
                ...this.state,
                winner: winner
            })
        }
    }

    onClick = (rowIdx, itemIdx) => {
        if (this.state.scheme[rowIdx][itemIdx] === 0) {
            let number = 1;
            if (!this.state.nextMove) {
                number = 2;
            }
            const _scheme = [...this.state.scheme];
            _scheme[rowIdx][itemIdx] = number;

            this.setState({
                ...this.state,
                nextMove: !this.state.nextMove,
                scheme: _scheme
            }, () => { this.checkWinner(rowIdx, itemIdx, number) });
        }
    };

    getCaption = () => {
        if (!this.state.winner) {
            return 'Ход ' + cnst.PLAYER_NEXT_MOVE + this.state.nextMove;
        } else {
            return 'Победили ' + cnst.PLAYER + this.state.nextMove;
        }
    };

    render() {

        const rows = this.state.scheme.map((row, rowIdx) => {
            return (
                <Row key={rowIdx + 1} onClick={this.onClick} row={row} rowIdx={rowIdx} />
            )
        });

        return (
            <>
                <span className={'hint-text'}>{getCaption()}</span>
                <div className={'field'}>
                    {rows}
                </div>
            </>
        )
    }
}

export default Field;

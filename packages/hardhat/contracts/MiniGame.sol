pragma solidity >=0.8.0 <0.9.0;

//SPDX-License-Identifier: MIT

// import "@openzeppelin/contracts/access/Ownable.sol";
// https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/access/Ownable.sol

contract MiniGame {
    event GameEvent(
        address sender,
        string userPlayMove,
        string computersPlayMove,
        uint256 progressValue,
        string victory
    );

    string public userPlayMove;
    string public computersPlayMove;
    uint256 public progressValue;
    uint256 private random;
    string public victory;

    mapping(string => uint256) private _results;

    constructor() {
        _results["Rock"] = 1;
        _results["Paper"] = 2;
        _results["Scissors"] = 3;
    }

    function PlayGame(string memory _userPlayMove) public {
        userPlayMove = _userPlayMove;
        _computerMove();
        _upgradeProgressBar(
            _results[userPlayMove],
            _results[computersPlayMove]
        );
        emit GameEvent(
            msg.sender,
            userPlayMove,
            computersPlayMove,
            progressValue,
            victory
        );
    }

    function _computerMove() private returns (string memory) {
        random =
            uint256(
                keccak256(abi.encodePacked(block.timestamp, block.difficulty))
            ) %
            1000;

        if (random >= 666) {
            computersPlayMove = "Rock";
        } else if (random < 666 && random >= 333) {
            computersPlayMove = "Paper";
        } else if (random < 333) {
            computersPlayMove = "Scissors";
        }

        return computersPlayMove;
    }

    function _upgradeProgressBar(uint256 _user, uint256 _computer)
        public
        returns (uint256)
    {
        if (progressValue == 100) {
            victory = "";
            progressValue = 0;
        }
        if (
            (_user == 1 && _computer == 3) ||
            (_user == 2 && _computer == 1) ||
            (_user == 3 && _computer == 2)
        ) {
            if (progressValue < 100) {
                progressValue += 25;
                if (progressValue == 100) {
                    victory = "You win!";
                }
            }
        } else if (
            (_user == 1 && _computer == 2) ||
            (_user == 2 && _computer == 3) ||
            (_user == 3 && _computer == 1)
        ) {
            if (progressValue > 0) {
                progressValue -= 25;
            }
        }

        return progressValue;
    }
}

"use strict";

let nameInput = $("#playerName");
let lives = $("#lives");
let score = $("#score");
let submit = $("#playerSubmitBtn");

const game = {
  title: "RPS extreme",
  isRunning: false,
  musicPlaying: true,

  // switch screens
  switchScreen: (screen = "indexPage") => {
    $(".screen").hide();
    $(`#${screen}`).show();
  },

  toggleGameRunning: () => {
    game.isRunning = !game.isRunning;
  },
  // music mute/unmute
  toggleMusicPlaying: function () {
    this.musicPlaying = !this.musicPlaying;
    if (!this.musicPlaying) {
      $(".muteBtn").attr("src", "images/mute-sound-icon.svg");
      $("#bgMusic").attr("src", "");
    } else {
      $(".muteBtn").attr("src", "images/sound-icon.svg");
      $("#bgMusic").attr("src", "media/happyMusic.mp3");
    }
  },

  getRandomNumber: (min, max) => {
    return Math.round(Math.random() * (max - min) + min);
  },

  // add name

  // addName: () => {
  //   if (!Pname.value) {
  //     alert("please enter name");
  //     return;
  //   }
  //   game.playerName = Pname.value;
  //   game.addName(game.playerName);
  //   console.log(this.playerName);
  // },

  // change difficulty`

  difficultyChange: (lives) => {
    player.lives = lives;

    console.log(player.lives);
  },

  // init
  init: () => {
    $(".muteBtn").on("click", () => {
      game.toggleMusicPlaying();
    });

    $("#startBtn").on("click", () => {
      game.switchScreen("startPage");
      game.toggleGameRunning();
    });
    $("#startGameBtn").on("click", () => {
      // game.addName();
      player.addName(nameInput.val());
      // if (player.lives > 0) {
      //   game.switchScreen("roundPage");
      //   $(".quitBtn").on("click", () => {
      //     game.switchScreen("indexPage");
      //     game.isRunning = false;
      //     player.score = 0;
      //     player.lives = null;
      //     player.name = null;
      //   });
      //   console.log(player.lives);
      //   setTimeout(() => {
      //     $(".spinner-border").hide();
      //     $(".aiThinking").text("Enemy is ready!");
      //     $("#playerSubmitBtn").removeAttr("disabled");
      //   }, 3000);
      // } else {
      //   alert("choose difficulty");
      // }

      $(".nameCaption").text(`${player.pName}! choose your pick!`);
      $("#lives").text(player.lives);
      $("#score").text(player.score);
    });
    // game lives show

    $("input:radio[name='options']").change(() => {
      let difficultyChoice = $("input[name='options']:checked").val();
      game.difficultyChange(difficultyChoice); //Return undefined
    });

    $("#playerSubmitBtn").on("click", () => {
      let rpsChoice = $("input[name='rps']:checked").val();
      $("#playerSubmitBtn").hide();
      $(".spinner-border").show();
      player.playGame();
      let randomNum = game.getRandomNumber(1, 3);

      console.log(randomNum);
      console.log(rpsChoice);

      if (rpsChoice < 1) {
        alert("you need to choose one!");
      } else if (
        (rpsChoice == 1 && randomNum == 2) ||
        (rpsChoice == 2 && randomNum == 3) ||
        (rpsChoice == 3 && randomNum == 1)
      ) {
        player.lives--;
        $("#lives").text(player.lives);
        $(".aiThinking").text("Enemy chose paper!");
      } else if (
        (rpsChoice == 1 && randomNum == 3) ||
        (rpsChoice == 2 && randomNum == 1) ||
        (rpsChoice == 3 && randomNum == 2)
      ) {
        player.score++;

        $("#score").text(player.score);
      }
      if (randomNum == 1) {
        $(".aiThinking").text("Enemy chose rock!");
      } else if (randomNum == 3) {
        $(".aiThinking").text("Enemy chose scissors!");
      } else if (randomNum == 2) {
        $(".aiThinking").text("Enemy chose paper!");
      }

      if (player.lives < 1) {
        game.switchScreen("gameOver");
        $(".scoreCurrent").text(player.score);
      }
      $(".playAgain").on("click", () => {
        game.switchScreen("indexPage");
        player.score = 0;
        player.lives = null;
        player.pName = null;
      });
    });
  },
};

// player

const player = {
  pName: null,
  score: 0,
  lives: null,

  addName: (name) => {
    if (!nameInput.val()) {
      alert("hey add a name");
      return;
    } else {
      player.pName = name;
      if (player.lives > 0) {
        game.switchScreen("roundPage");
        $("#playerSubmitBtn").hide();
        player.playGame();
        $(".quitBtn").on("click", () => {
          game.switchScreen("indexPage");
          game.isRunning = false;
          player.score = 0;
          player.lives = null;
          player.name = null;
        });
        console.log(player.lives);
      } else {
        alert("choose difficulty");
      }
      // player.addName(nameInput.value);
      console.log(player.pName);
    }
  },

  playGame: () => {
    setTimeout(() => {
      $(".spinner-border").hide();
      $(".aiThinking").text("Enemy is ready!");
      $("#playerSubmitBtn").show();
    }, 3000);
  },
};

/*
rng number generator 

*/
$(() => {
  console.log("ready");
  game.init();
});

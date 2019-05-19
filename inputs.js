  function getCommand(){
  inquirer.prompt([
  { type: "list",
    name: "command",
    message: "What API do you want to try?",
    choices: ["Song via Spotify", "Movie via IMDB", "Concert via BandsInTown", "Surprise Me","Exit"]
  }
  ]).then(function (answers) {
   console.log(answers)
    command=answers.choices;
    console.log(command)
    return command
    // if (command === 'Exit') {
    //   console.log("Thanks for playing!");
    //   process.exit();
    // }
  // targetType = split(command,' ');
  });
}

function getNameof(targetType){
  inquirer.prompt([
  {
    name: "target",
    message: "What " + targetType
  }
]).then(function (arg) {
    target = arg.target
    });
};
module.exports = inputs;

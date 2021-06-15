import { fifaData } from "./fifa.js";

// ⚽️ M  V P ⚽️ //

/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 1: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀
Practice accessing data by console.log-ing the following pieces of data note, you may want to filter the data first 😉*/

const finals2014 = fifaData.filter(
  (cur) => cur.Year === 2014 && cur.Stage === "Final"
)[0];
console.log(finals2014);
//(a) Home Team name for 2014 world cup final
console.log(finals2014["Home Team Name"]);
//(b) Away Team name for 2014 world cup final
console.log(finals2014["Away Team Name"]);
//(c) Home Team goals for 2014 world cup final
console.log(finals2014["Home Team Goals"]);
//(d) Away Team goals for 2014 world cup final
console.log(finals2014["Away Team Goals"]);
//(e) Winner of 2014 world cup final */
if (finals2014["Home Team Goals"] > finals2014["Away Team Goals"]) {
  console.log(finals2014["Home Team Name"]);
} else if (finals2014["Home Team Goals"] < finals2014["Away Team Goals"]) {
  console.log(finals2014["Away Team Name"]);
} else {
  console.log("Tie");
}
/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 2: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 
Use getFinals to do the following:
1. Receive data as a parameter
2. Return an array of objects with the data of the teams that made it to the final stage

hint - you should be looking at the stage key inside of the objects
*/

function getFinals(data) {
  return data.filter((cur) => cur.Stage === "Final");
}

/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 3: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀
Use the higher-order function called getYears to do the following: 
1. Receive an array
2. Receive a callback function getFinals from task 2 
3. Return an array called years containing all of the years in the getFinals data set*/

function getYears(arr, callBack) {
  return callBack(arr).map((cur) => cur.Year);
}

/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 4: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀
Use the higher-order function getWinners to do the following:  
1. Receives an array
2. Receives the callback function getFinals from task 2 
3. Determines the winner (home or away) of each `finals` game. 
4. Returns the names of all winning countries in an array called `winners` */

function getWinners(arr, callBack) {
  return callBack(arr).map(function (cur) {
    const homeGoals = cur["Home Team Goals"];
    const awayGoals = cur["Away Team Goals"];
    if (homeGoals > awayGoals) {
      return cur["Home Team Name"];
    } else if (awayGoals > homeGoals) {
      return cur["Away Team Name"];
    } else {
      return "No one";
    }
  });
}

/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 5: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 
Use the higher-order function getWinnersByYear to do the following:
1. Receive an array
2. Receive a callback function getYears from task 3
3. Receive a callback function getWinners from task 4
4. Return an array of strings that say "In {year}, {country} won the world cup!" 

hint: the strings returned need to exactly match the string in step 4.
 */

function getWinnersByYear(arr, callBack1, callBack2) {
  const years = callBack1(arr, getFinals);
  const winners = callBack2(arr, getFinals);
  return winners.map(
    (cur, index) => `In ${years[index]}, ${cur} won the world cup!`
  );
}

/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 6: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀
Use the higher order function getAverageGoals to do the following: 
 1. Receive the callback function getFinals from task 2 ensure you pass in the data as an argument
 2. Return the the average number of the total home team goals and away team goals scored per match and round to the second decimal place. 
 
 (Hint: use .reduce and do this in 2 steps) 
 
 Example of invocation: getAverageGoals(getFinals(fifaData));
*/

function getAverageGoals(callBack) {
  const finals = callBack;
  const goals = finals.flatMap((cur) => [
    cur["Home Team Goals"],
    cur["Away Team Goals"],
  ]);
  const goalsAvg = (
    goals.reduce((acc, cur) => acc + cur, 0) / finals.length
  ).toFixed(2);
  return goalsAvg;
}

/// 🥅 STRETCH 🥅 ///

/* 💪💪💪💪💪 Stretch 1: 💪💪💪💪💪 
Create a function called `getCountryWins` that takes the parameters `data` and `team initials` and returns the number of world cup wins that country has had. 

Hint: Investigate your data to find "team initials"!
Hint: use `.reduce` */

function getCountryWins(data, teamInitials) {
  const homeGamesWon = data
    .filter((cur) => cur["Home Team Initials"] === teamInitials)
    .filter((cur) => cur["Home Team Goals"] > cur["Away Team Goals"]);
  const awayGamesWon = data
    .filter((cur) => cur["Away Team Initials"] === teamInitials)
    .filter((cur) => cur["Away Team Goals"] > cur["Home Team Goals"]);
  return homeGamesWon.length + awayGamesWon.length;
}

/* 💪💪💪💪💪 Stretch 2: 💪💪💪💪💪 
Write a function called getGoals() that accepts a parameter `data` and returns the team with the most goals score per appearance (average goals for) in the World Cup finals */

// I know this is not the prettiest code. However, it does seem to work. I started by defining two outside functions, which later become callback functions.

const homeGames = function (data, teamInitials) {
  return data.filter((cur) => cur["Home Team Initials"] === teamInitials);
};
const awayGames = function (data, teamInitials) {
  return data.filter((cur) => cur["Away Team Initials"] === teamInitials);
};

function getGoals(data) {
  const initials = new Set(
    data.flatMap((cur) => [
      cur["Home Team Initials"],
      cur["Away Team Initials"],
    ])
  );
  const teamAvgPoints = [];
  const avgPointsArr = [];
  initials.forEach(function (cur) {
    const homePoints = homeGames(data, cur).reduce(
      (acc, cur) => acc + cur["Home Team Goals"],
      0
    );
    const awayPoints = awayGames(data, cur).reduce(
      (acc, cur) => acc + cur["Away Team Goals"],
      0
    );
    const totalPoints = homePoints + awayPoints;
    const totalAppearances =
      homeGames(data, cur).length + awayGames(data, cur).length;
    const avgPoints = Number((totalPoints / totalAppearances).toFixed(2));
    teamAvgPoints.push(cur, avgPoints);
    avgPointsArr.push(avgPoints);
  });
  const max = Math.max(...avgPointsArr);
  const maxTeamIndex = teamAvgPoints.indexOf(max) - 1;
  const maxTeamInitials = teamAvgPoints[maxTeamIndex];
  const teamName =
    data[data.findIndex((cur) => cur["Home Team Initials"] == maxTeamInitials)][
      "Home Team Name"
    ];
  return teamName;
}

/* 💪💪💪💪💪 Stretch 3: 💪💪💪💪💪
Write a function called badDefense() that accepts a parameter `data` and calculates the team with the most goals scored against them per appearance (average goals against) in the World Cup finals */

function badDefense(data) {
  const teams = new Set(
    data.flatMap((cur) => [cur["Home Team Name"], cur["Away Team Name"]])
  );
  const avgScoredAgainstArr = [];
  teams.forEach(function (curTeam) {
    const homeGames = data.filter(
      (curGame) => curGame["Home Team Name"] == curTeam
    );
    const scoredAgainst_home = homeGames.reduce(
      (acc, curGame) => acc + curGame["Away Team Goals"],
      0
    );
    const awayGames = data.filter(
      (curGame) => curGame["Away Team Name"] == curTeam
    );
    const scoredAgainst_away = awayGames.reduce(
      (acc, curGame) => acc + curGame["Home Team Goals"],
      0
    );
    const totalScoredAgainst = scoredAgainst_home + scoredAgainst_away;
    const avgScoredAgainst = Number(
      (totalScoredAgainst / (homeGames.length + awayGames.length)).toFixed(2)
    );
    avgScoredAgainstArr.push(avgScoredAgainst);
  });
  const max = Math.max(...avgScoredAgainstArr);
  const index = avgScoredAgainstArr.findIndex((cur) => cur === max);
  const teamsArr = Array.from(teams);
  return teamsArr[index];
}

/* If you still have time, use the space below to work on any stretch goals of your chosing as listed in the README file. */

/* 🛑🛑🛑🛑🛑 Please do not modify anything below this line 🛑🛑🛑🛑🛑 */
function foo() {
  console.log("its working");
  return "bar";
}
export default {
  foo,
  getFinals,
  getYears,
  getWinners,
  getWinnersByYear,
  getAverageGoals,
};

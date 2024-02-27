const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();
app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;

app.post("/interactions", async (req, res) => {
  const interaction = req.body;

  // Check if the interaction is a command and the command name is "ohhi"
  if (
    interaction.type === 1 &&
    interaction.data &&
    interaction.data.name === "ohhi"
  ) {
    // Extract the user ID from the interaction
    const userId = interaction.member.user.id;

    // Send a message mentioning the user who invoked the command
    const response = {
      type: 4,
      data: {
        content: `oh hello there, <@${userId}>`,
      },
    };

    res.json(response);
  } else {
    // For other interactions or commands, return an empty response
    res.status(200).end();
  }
});

// Custom headers including User-Agent and Authorization
const botUrl = "visit https://iusedtodev.web.app/";
const versionNumber = "0.01a";

const headers = {
  Authorization: `Bot ${process.env.BOTTOKEN}`,
  "User-Agent": `DiscordBot (${botUrl}, ${versionNumber})`,
};

// Example Slash Command payload
const json = {
  name: "ohhi",
  type: 1,
  description: "say hi",
};

const url =
  "https://discord.com/api/v10/applications/1212175548009418772/commands";

// Register slash command
axios
  .post(url, json, { headers })
  .then((response) => {
    console.log("Command registered successfully:", response.data);
  })
  .catch((error) => {
    console.error("Error registering command:", error.response.data);
  });

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

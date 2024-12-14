const { REST, Routes } = require("discord.js");
const dotenv = require("dotenv");
dotenv.config();

const rest = new REST({ version: "10" }).setToken(process.env.TOKEN);
try {
  rest.put(Routes.applicationCommands(process.env.CLIENT_ID), {
    body: [
      {
        name: "lyrics",
        description: "曲の歌詞を検索します",
        options: [
          {
            name: "song",
            description: "検索する曲名",
            type: 3,
            required: true,
          },
          {
            name: "ephemeral",
            description: "メッセージを自分だけに表示",
            type: 5,
            required: true,
          },
        ],
      },
    ],
  });
  console.log("コマンドを登録しました");
} catch (error) {
  console.error("コマンドの登録に失敗しました" + error);
}

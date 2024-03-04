module.exports = {
    apps: [
      {
        name: "boraami",
        script: "server.js",
        node_args: "-r dotenv/config", // Add this line if you use dotenv for environment variables
        watch: false,
        env: {
          NODE_ENV: "production",
        },
      },
    ],
  };
  
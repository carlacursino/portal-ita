module.exports = {
  apps : [{
    name: "portal",
    script: "server.js",
    env_ita: {
      NODE_ENV: "ita",
    },
    env_lbe: {
      NODE_ENV: "lbe",
    },
    env_pgfis: {
      NODE_ENV: "pgfis",
    },
    env_inovalab: {
      NODE_ENV: "inovalab",
    },
    env_ceds: {
      NODE_ENV: "ceds",
    },
    env_drone: {
      NODE_ENV: "drone",
    },
    env_pgcomp: {
      NODE_ENV: "pgcomp",
    },
    env_paic: {
      NODE_ENV: "paic",
    },
  },],
}

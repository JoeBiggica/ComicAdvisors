module.exports = {
  servers: {
    one: {
      host: '54.205.249.111',
      username: 'ubuntu',
      password: "ca123",
      pem: "../../ssh/ca-keyfile.pem"
    }
  },

  meteor: {
    name: 'comicadvisors',
    path: '../ComicAdvisors',
    servers: {
      one: {}
    },
    buildOptions: {
      serverOnly: true,
    },
    env: {
      ROOT_URL: 'http://comicadvisors.com',
      MONGO_URL: 'mongodb://joebiggica:ImBatman13!@ds153677.mlab.com:53677/comicadvisorsdb'
    },

    //dockerImage: 'kadirahq/meteord'
    deployCheckWaitTime: 60
  },

  mongo: {
    oplog: true,
    port: 27017,
    servers: {
      one: {},
    },
  },
};
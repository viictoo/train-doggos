// const allowedOrigins = require('./allowedOrigins');

// export const corsOptions = {
//   origin: function (origin, callback) {
//     if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
//       console.log("allowed cors for:", origin)
//       callback(null, true)
//     } else {
//       callback(new Error(`Not allowed by CORS ${origin}`))
//     }
//   },
//   allowedHeaders: 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept, Observe',
//   methods: "GET,PUT,POST,DELETE,UPDATE,OPTIONS",
//   credentials: true,
// }

const whitelist = require('./allowedOrigins');
export const corsOptions = {
  origin: function (origin, callback) {
    // Corrected wildcard usage
    const isOriginAllowed = whitelist.some((allowedOrigin) => {
      if (allowedOrigin === '*') {
        return true;
      }
      const regex = new RegExp(`^${allowedOrigin}$`);
      return regex.test(origin);
    });

    if (isOriginAllowed) {
      console.log("allowed cors for:", origin);
      callback(null, true);
    } else {
      console.log("blocked cors for:", origin);
      callback(new Error(`Not allowed by CORS ${origin}`));
    }
  },
  allowedHeaders: 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept, Observe',
  methods: "GET,PUT,POST,DELETE,UPDATE,OPTIONS",
  credentials: true,
};
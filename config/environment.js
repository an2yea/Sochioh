const development = {
  name: "development",
  asset_path: "./assets",
  session_cookie_key: "vnaibrbgr",
  db: "account",
  google_client_id : "248928157103-q2n6r3969gu3mi2esodl5dvb9jbr4rc6.apps.googleusercontent.com",
  google_client_secret: "ivPfysFZH9m_neY4seFY4Ob6",
  google_callbackURL: "https://sochioh.herokuapp.com//users/auth/google/callback",
  jwt_secret: "Sochioh",
};

// const production = {
//   name: process.env.Sochioh_environment,
//   asset_path: process.env.Sochioh_asset_path,
//   session_cookie_key: process.env.Sochioh_session_cookie_key,
//   db: process.env.Sochioh_Db,
//   google_client_id :process.env.Sochioh_google_client_id ,
//   google_client_secret: process.env.Sochioh_google_client_secret,
//   google_callbackURL:process.env.Sochioh_google_callback_url ,
//   jwt_secret: process.env.Sochioh_jwt_secret,
// };

//module.exports= eval(process.env.Sochioh_environment) == 'undefined' ? development : eval(process.env.Sochioh_environments)
module.exports = development;
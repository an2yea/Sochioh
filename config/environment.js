const development = {
  name: "development",
  asset_path: "./assets",
  session_cookie_key: "vnaibrbgr",
  db: "account",
  google_client_id : "248928157103-q2n6r3969gu3mi2esodl5dvb9jbr4rc6.apps.googleusercontent.com",
  google_client_secret: "ivPfysFZH9m_neY4seFY4Ob6",
  google_callbackURL: "http://localhost:8000/users/auth/google/callback",
  jwt_secret: "Sochioh",
};

const production = {
  name: "production",
};

module.exports= development;

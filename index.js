/**
 * DannTeam APIs
 * Instagram: @dannstfu, @educoding_id
 * Thanks-To: Ardian Purnama (APDev), etc.
 * Libraries: Restfull-APIs
 */

(process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"),
	(express = require("express")),
	(session = require("express-session")),
	(secure = require("ssl-express-www")),
	(bodyParser = require("body-parser")),
	(mongoose = require("mongoose")),
	(cors = require("cors")),
	(path = require("path")),
	(fs = require("fs")),
	(chalk = require("chalk")),
	(fetch = (...args) =>
		import("node-fetch").then(({ default: fetch }) => fetch(...args))),
	(app = express()),
	(authRouter = require("./lib/router/auth")),
	(apiRouter = require("./lib/router/api"));

// Settings
global.settings = {
	number: "6283137550315",
	url: "https://wa.me/+6283137550315",
	author: "DannTeam",
	wm: "2024 © DannTeam",
	sosmed: {
		instagram: "https://instagram.com/dannstfu",
		youtube: "https://youtube.com/@dannofficials",
	},
	thumbnail: {
		url: "",
		buffer: fs.readFileSync(
			path.join(__dirname + "/lib/thumbnail/thumbnail.jpg"),
		),
	},
	auth: {
		port: "8080",
		limit: "100",
		secret: "DannTeam",
	},
};

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "lib", "views"));
app.use(express.static(path.join(__dirname, "lib", "public")));
app.use(
	bodyParser.urlencoded({
		extended: true,
	}),
);
app.use(bodyParser.json());
app.use(
	session({
		secret: global.settings.auth.secret,
		resave: false,
		saveUninitialized: true,
		cookie: {
			maxAge: 24 * 60 * 60 * 1000,
		},
	}),
);
app.use(cors());
app.use(secure);
app.use(express.static(path.join(__dirname, "lib")));

// Router
app.use("/", require("./lib/router/main"));
app.use("/auth", authRouter);
app.use("/api", apiRouter);

// Starting
app.listen(global.settings.auth.port, () => {
	console.log(
		chalk.red(
			"[STATUS] >> " +
				chalk.green(`Server berjalan di port ${global.settings.auth.port}`),
		),
	);
});

// MongoDB
mongoose
	.connect(
		"mongodb+srv://DanzFav:Danz4477@database.geqksdm.mongodb.net/?retryWrites=true&w=majority&appName=database",
		{
			useNewUrlParser: true,
			useUnifiedTopology: true,
		},
	)
	.then(() =>
		console.log(
			chalk.red(
				"[STATUS] >> " + chalk.green("Terkoneksi dengan database MongoDB!"),
			),
		),
	)
	.catch(err => console.error(err));

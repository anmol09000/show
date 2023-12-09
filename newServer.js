var express = require("express");
var app = express();
app.use(express.json());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization",
  );
    res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE, HEAD"
  );
  next();
});
const port = 2410;
app.listen(port, () => console.log(`Node app listening on port ${port}!`));


let passport = require("passport");
let jwt = require("jsonwebtoken");
let JwtStrategy = require("passport-jwt").Strategy;
let ExtractJwt = require("passport-jwt").ExtractJwt;

app.use(passport.initialize());

const movies = [
    {
      id: 0,
      title: "Animal",
      genre: ["Action","Crime","Drama"],
      director: "Sandeep Reddy Vanga",
      img:"https://stat5.bollywoodhungama.in/wp-content/uploads/2023/01/Animal.jpg",
      rating:"323.7K",
      imbd:"8.5/10",
      description: "This is the story of a son whose love for his father knows no bounds. As their bond begins to fracture, a chain of extraordinary events unfold causing the son to undergo a remarkable transformation consumed by a thirst for vengeance.",
      dates:["08 Dec,2023","09 Dec,2023","10 Dec,2023"],
      theaters: [
        {
          city: "NCR",
          name: "Cinepolis: DLF Place, Saket",
          timings: [
            { date: "08 Dec,2023", time: ["10:00AM","12:00PM","01:15PM","03:45PM","07:45PM"], price: [150,250,420] },
            { date: "09 Dec,2023", time: ["10:00AM","01:15PM","03:15PM","07:45PM","10:45PM"], price: [150,220,380] },
          ],
          seats: {
            "10:00AM": ["A1", "A2", "B1", "B2"],
            "01:15PM": ["C1", "C2", "D1", "D2"],
          },
        },
        {
          city: "Mumbai",
          name: "PVR: Phoenix Marketcity, Kurla",
          timings: [
            { date: "09 Dec,2023", time: ["10:00AM","12:00PM","01:15PM","03:45PM","07:45PM"], price:[150,250,420] },
            { date: "10 Dec,2023", time: ["10:00AM","01:15PM","03:15PM","07:45PM","10:45PM"] , price:[100,250,350] },
          ],
          seats: {
            "12:00PM": ["E1", "E2", "F1", "F2"],
            "01:15PM": ["G1", "G2", "H1", "H2"],
          },
        },
      ],
      language: ["Hindi","English","Tamil","Telugu"],
      format: ["2D","4DX"]
    },
    {
      id: 1,
      title: "Sam Bahadur",
      genre: ["Biography","Drama"],
      director: "Meghna Gulzar",
      img:"https://filmycollection.com/wp-content/uploads/2023/11/Snapinsta.app_399711731_1034384124478703_27308481587437781_n_1080-1.jpg",
      rating:"46.7K",
      imbd:"9/10",
      description:
        "Sam Bahadur is a tribute to Field Marshal Sam HFJ Manekshaw, MC, India`s first Field Marshal and a legendary Army General. His career witnessed the shaping of India`s geopolitical borders, and his life was marked by significant milestones, from fighting in World War II to being the Chief of Army Staff during the 1971 Indo-Pakistan war, that led to the creation of Bangladesh.",
        dates:["08 Dec,2023","09 Dec,2023","10 Dec,2023"],
      theaters: [
        {
          city: "Delhi",
          name: "AMC Empire 25",
          timings: [
            { date: "08 Dec,2023", time: ["08:45AM","09:15AM","12:00PM","07:45PM","10:45PM"], price:[150,220,320]},
            { date: "09 Dec,2023", time: ["10:00AM","01:15PM","03:15PM","07:45PM","10:45PM"], price:[100,220,320]},
          ],
          seats: {
            "08:45AM": ["A1", "A2", "B1", "B2"],
            "09:15PM": ["C1", "C2", "D1", "D2"],
          },
        },
        {
          city: "Chennai",
          name: "Cinemark 18",
          timings: [
            { date: "09 Dec,2023", time:["11:00AM","01:15PM","03:15PM","06:15PM","11:45PM"], price:[100,220,420]},
            { date: "10 Dec,2023", time:["01:15PM","04:15PM","07:45PM","09:15PM","10:45PM"], price:[150,220,320]},
          ],
          seats: {
            "06:15PM": ["E1", "E2", "F1", "F2"],
            "04:15PM": ["G1", "G2", "H1", "H2"],
          },
        },
      ],
      language: ["Hindi","English"],
      format: ["2D","3D"],
    },
    {
      id: 2,
      title: "12th Fail",
      genre: ["Drama"],
      director: "Vidhu Vinod Chopra",
      img:"https://img.etimg.com/thumb/msid-105086975,width-650,height-488,imgsize-83368,,resizemode-75/12th-fail.jpg",
      rating:"94.2K",
      imbd:"9.5/10",
      description:
        'Based on Anurag Pathak`s bestselling novel of the same name, 12th Fail depicts the true story of an IPS officer Manoj Kumar Sharma hailing from a small town in Chambal, who fearlessly embraced the idea of restarting his academic journey and reclaiming his destiny at a place where millions of students attempt for the world`s toughest competitive exam, UPSC.',
        dates:["08 Dec,2023","09 Dec,2023","10 Dec,2023"],
      theaters: [
        {
          city: "Delhi",
          name: "PVR: Select Citywalk, Saket",
          timings: [
            { date: "08 Dec,2023", time:["01:00PM","03:15PM"], price:[120,210,320]},
            { date: "09 Dec,2023", time:["10:00AM","01:15PM","07:45PM","10:45PM"], price:[100,200,300]},
          ],
          seats: {
            "10:45PM": ["A1", "A2", "B1", "B2"],
            "01:00PM": ["C1", "C2", "D1", "D2"],
          },
        },
        {
          city: "Chandigarh",
          name: "Wave Cinemas: Elante Mall",
          timings: [
            { date: "09 Dec,2023", time: ["07:45PM","08:15PM"], price:[100,200,300] },
            { date: "10 Dec,2023", time: ["10:15PM"], price:[220,250,350] },
          ],
          seats: {
            "07:45PM": ["E1", "E2", "F1", "F2"],
            "10:15PM": ["G1", "G2", "H1", "H2"],
          },
        },
      ],
      language: ["Hindi"],
      format: ["2D"],
    },
    {
      id: 3,
      title: "Tiger 3",
      genre: ["Action","Thriller"],
      director: "Maneesh Sharma",
      img:"https://englishtribuneimages.blob.core.windows.net/gallary-content/2023/9/2023_9$largeimg_1390342764.jpeg",
      rating:"208.9K",
      imbd:"7.3/10",
      description: "Tiger and Zoya are back - to save the country and their family. This time it`s personal!",
      dates:["11 Dec,2023","12 Dec,2023"],
      theaters: [
        {
          city: "Ahmedabad",
          name: "Sathyam Cinemas",
          timings: [
            { date: "11 Dec,2023", time: ["09:45PM"], price:[210,310,410]},
            { date: "11 Dec,2023", time:[,"1:15PM","03:15PM","10:45PM"], price:[100,200,310]},
          ],
          seats: {
            "01:15PM": ["A1", "A2", "B1", "B2"],
            "09:45PM": ["C1", "C2", "D1", "D2"],
          },
        },
        {
          city: "Bangalore",
          name: "Inox: Garuda Mall",
          timings: [
            { date: "12 Dec,2023", time: ["09:45AM","11:00AM","03:15PM","07:45PM"], price:[120,150,220]},
            { date: "12 Dec,2023", time: ["11:45AM","03:00PM"], price:[120,150,220]},
          ],
          seats: {
            "07:45PM": ["E1", "E2", "F1", "F2"],
            "11:45AM": ["G1", "G2", "H1", "H2"],
          },
        },
      ],
      language:["Hindi","Tamil"],
      format: ["3D"],
    },
  ];
  let users = [
    { email: "test@test.com",password:"testpassword", fname: "ashish", lname: "rawat", married: "No" },
    { email: "admin@admin.com",password:"adminpassword", fname: "ankit", lname: "lodhi", married: "No" },
  ];
  

let expiryTime=30000;
let seats=[];

let params ={
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey : "jwtsecret45123",
}
let strategyAll = new JwtStrategy(params, function(token,done){
    let user = users.find((a)=>a.email === token.user.email );
    if(!user){
        return done(null,false,{message:"check email or password"});
    }else {
        return done(null,user);
    }
});

passport.use("local",strategyAll);

app.post("/login",function(req,res){
    let {email,password} = req.body;
    let user = users.find((a)=>a.email === email && a.password === password);
    if(user){
        let token = jwt.sign({user},params.secretOrKey,{
            algorithm:"HS256",
            expiresIn:expiryTime,
        })
        res.send(token);
    }else{
        res.status(401).send("Check email or password");
    }
});

app.get("/movies",function(req,res){
    let {genre,lang,format,q} = req.query;
    let data = movies;
    if(genre){
        data = filterParam(data,genre,"genre");
    }
    if(lang){
        data = filterParam(data,lang,"language");
    }
    if(format){
        data = filterParam(data,format,"format");
    }
    if(q){
        data = filterParam(data,q,"title");
    }
    res.send(data);
})
app.get("/movies/:city", function(req, res) {
    let { city } = req.params;
    let {genre,lang,format,q} = req.query;
    let data = movies;
    if(genre){
        data = filterParam(data,genre,"genre");
    }
    if(lang){
        data = filterParam(data,lang,"language");
    }
    if(format){
        data = filterParam(data,format,"format");
    }
    if(q){
        data = filterParam(data,q,"title");
    }
    let moviesInCity = data.filter((movie) =>
        movie.theaters.find((theater) => theater.city === city)
    );
    if(moviesInCity){
        res.send(moviesInCity);
    }else{
        res.sendStatus(404)
    }
});
let filterParam = (arr, value, name) => {
  if (!arr) return arr;
  else {
    let valueArr = value.split(",");
    let arr1 = arr.filter((a) =>
      valueArr.find((b) =>a[name].includes(b))
    );
    return arr1;
  }
};

app.get("/movies/:city/:id", function(req, res) {
    let { city,id } = req.params;
    let moviesInCity = movies.find((movie) => movie.id === +id && 
        movie.theaters.find((theater) => theater.city === city)
    );
    if(moviesInCity){
        res.send(moviesInCity);
    }else{
        res.sendStatus(404)
    }
});
app.post("/seat",passport.authenticate("local",{session:false}),function(req,res){
    let body = req.body;
    let seat ={...body,email:req.user.email};
    seats.push(seat);
    res.send(seat);
});
app.get("/user",passport.authenticate("local",{session:false}),function(req,res){
    let user = users.find((a)=>a.email === req.user.email);
    res.send(user);
})
app.get("/orders",passport.authenticate("local",{session:false}),function(req,res){
  let order = seats.filter((a)=>a.email===req.user.email);
  if(order){
    res.send(order);
  }else{
    res.sendStatus(404);
  }
  
})



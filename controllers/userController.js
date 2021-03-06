const Users = require("../models/userAuth");
const Tutorial = require("../models/tutorialModel");
const RegisterCourese = require("../models/registerCourseModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const sendMail = require("./sendMail");
const Courses = require("../models/coursesModel");
const Categories = require("../models/catergories");
const TrainerModel = require("../models/tranierAuth");
const RegisterModel = require("../models/registerCourseModel");
const Discovery = require("../models/discovery");
const NewPostDiscovery = require("../models/newPostDiscovery");
const bmiModel = require("../models/bmiModel");
const Conversation = require("../models/conversation");
const Message = require("../models/message");

const { google } = require("googleapis");
const { OAuth2 } = google.auth;
const fetch = require("node-fetch");

const client = new OAuth2(process.env.MAILING_SERVICE_CLIENT_ID);

const { CLIENT_URL } = process.env;

const userController = {
    register: async(req, res) => {
        try {
            const { name, email, password } = req.body;

            if (!name || !email || !password) {
                return res.status(400).json({ msg: "Please enter full fill!!" });
            }
            if (!validateEmail(email)) {
                return res.status(400).json({ msg: "Invalid email!!!" });
            }
            const userEmail = await Users.findOne({ email });
            if (userEmail)
                return res.status(400).json({ msg: "Email already does not exist!" });

            if (password.length < 6) {
                return res
                    .status(400)
                    .json({ msg: "Password must be at lest 6 characters!" });
            }

            const passwordHash = await bcrypt.hash(password, 12);

            const newUser = {
                name,
                email,
                password: passwordHash,
            };

            const activation_token = createActivationToken(newUser);
            const url = `${CLIENT_URL}/user/activate/${activation_token}`;

            sendMail(email, url, "Verify your email address");
            res.json({
                msg: "Register success! Please activate your email to start",
            });
        } catch (error) {
            return res.status(500).json({ msg: error.message });
        }
    },
    activateEmail: async(req, res) => {
        try {
            const { activation_token } = req.body;
            const user = jwt.verify(
                activation_token,
                process.env.ACTIVATION_TOKEN_SECRET
            );
            const { name, email, password } = user;
            const check = await Users.findOne({ email });
            if (check)
                return res.status(400).json({ msg: "This email is alread exits." });

            const newUser = new Users({
                name,
                email,
                password,
            });
            await newUser.save();
            res.json({ msg: "Account has been activated!" });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    login: async(req, res) => {
        try {
            const { email, password } = req.body;
            const user = await Users.findOne({ email });
            if (!user)
                return res.status(400).json({ msg: "This email does not exist." });

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch)
                return res.status(400).json({ msg: "Password is incorrect." });

            const refresh_token = createRefreshToken({ id: user._id });
            res.cookie("refreshtoken", refresh_token, {
                httpOnly: true,
                path: "/user/refresh_token",
                maxAge: 7 * 24 * 60 * 60 * 100, //7day
            });
            res.json({ msg: "Login success" });
        } catch (error) {
            return res.status(500).json({ msg: err.message });
        }
    },
    getAccessToken: (req, res) => {
        try {
            const rf_token = req.cookies.refreshtoken;
            if (!rf_token) return res.status(500).json({ msg: "Please login now" });

            jwt.verify(rf_token, process.env.REFERSH_TOKEN_SECRET, (err, user) => {
                if (err) return res.status(500).json({ msg: "Please login now" });

                const access_token = createAccessToken({ id: user.id });
                res.json({ access_token });
            });
        } catch (error) {
            return res.status(500).json({ msg: error.message });
        }
    },
    forgotPassword: async(req, res) => {
        try {
            const { email } = req.body;
            const user = await Users.findOne({ email });
            if (!user)
                return res.status(400).json({ msg: "This email dose not exits." });

            const access_token = createAccessToken({ id: user.id });
            const url = `${CLIENT_URL}/user/reset/${access_token}`;

            sendMail(email, url, "Reset your password");
            res.json({ msg: "Re-send the password, please check your email." });
        } catch {
            return res.status(500).json({ msg: err.message });
        }
    },
    resetPassword: async(req, res) => {
        try {
            const { password } = req.body;
            const passwordHash = await bcrypt.hash(password, 12);

            await Users.findOneAndUpdate({ _id: req.user.id }, {
                password: passwordHash,
            });
            res.json({ msg: "Password successfully changed!" });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    getUserInfor: async(req, res) => {
        try {
            const user = await Users.findById(req.user.id).select("-password");
            res.json(user);
        } catch (error) {
            return res.status(500).json({ msg: error.message });
        }
    },
    logout: async(req, res) => {
        try {
            res.clearCookie("refreshtoken", { path: "/user/refresh_token" });
            return res.json({ msg: "Logout!" });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    updateInfor: async(req, res) => {
        try {
            const { name, avatar } = req.body;
            const userParams = await Users.findById(req.user.id).select("-password");
            await Users.findByIdAndUpdate({ _id: req.user.id }, {
                name: name || userParams.name,
                avatar: avatar || userParams.avatar,
            });
            res.json({ msg: "Update successfully" });
        } catch (error) {
            return res.status(500).json({ msg: error.message });
        }
    },
    registerCourses: async(req, res) => {
        try {
            const tutorialParams = await Tutorial.findOne({
                linkName: req.params.name,
            });

            const userObj = await Users.findById(req.user.id);
            const trainerObj = await TrainerModel.findById(tutorialParams.trainer_id);

            const newRigister = new RegisterCourese({
                users: req.user.id,
                courses: tutorialParams._id,
            });
            const oldRisger = await RegisterCourese.findOne({
                users: req.user.id,
                courses: tutorialParams._id,
            });

            if (!oldRisger) {
                newRigister.save();
                const flowTrainer = userObj.followings.findIndex(
                    (flow) => flow.toString() === tutorialParams.trainer_id.toString()
                );
                const flowUser = trainerObj.followings.findIndex(
                    (flow) => flow.toString() === req.user.id.toString()
                );

                if (flowTrainer === -1) {
                    userObj.followings.push(tutorialParams.trainer_id);
                    userObj.save();
                }
                if (flowUser === -1) {
                    trainerObj.followings.push(req.user.id);
                    trainerObj.save();
                }
                const newConversation = new Conversation({
                    members: [userObj._id.toString(), trainerObj._id.toString()],
                });
                console.log(userObj._id.toString());
                console.log(trainerObj._id.toString());
                console.log("alo");
                await newConversation.save();
            } else {
                return res.status(200).json({ msg: "Tiep tuc hoc" });
            }
            res.status(200).json({ msg: "Register courses successfully" });
        } catch (error) {
            res.status(500).json({ msg: error.message });
        }
    },
    checkRegister: async(req, res) => {
        try {
            const checkRegister = await RegisterModel.find();
            res.status(200).json(checkRegister);
        } catch (error) {
            return res.status(500).json({ msg: error.message });
        }
    },
    viewCourses: async(req, res) => {
        try {
            const tutorialParams = await Tutorial.findOne({
                linkName: req.user.name,
            });
            const courses = await Courses.findOne({ tutorials: tutorialParams._id });
            const ids = req.query.id;

            res.status(200).json(courses);
        } catch (error) {
            res.status(500).json({ msg: error.message });
        }
    },
    checkCoursesDone: async(req, res) => {
        try {
            const tutorialParams = await Tutorial.findOne({
                linkName: req.user.name,
            });
            const courses = await Courses.findOne({ tutorials: tutorialParams._id });
            await Courses.findByIdAndUpdate({ _id: courses._id }, {
                status: true,
            });
            res.status(200).json("check done");
        } catch (error) {
            res.status(500).json({ msg: error.message });
        }
    },
    getAllCate: async(req, res) => {
        try {
            const data = await Categories.find();
            res.status(200).json(data);
        } catch (error) {
            return res.status(500).json({ msg: error.message });
        }
    },
    getObjCate: async(req, res) => {
        try {
            let tutorialAll = await Tutorial.find();

            const tutorialObj = tutorialAll.filter((tutorial) => {
                return tutorial.category.toString() === req.params.id.toString();
            });
            res.status(200).json(tutorialObj);
        } catch (error) {
            return res.status(500).json({ msg: error.message });
        }
    },
    getAllTutorial: async(req, res) => {
        try {
            const data = await Tutorial.find();
            let dataAll = [];
            dataAll = await Promise.all(
                data.map(async(current) => {
                    const cate = await Categories.findById(current.category);
                    const trainer = await TrainerModel.findById(current.trainer_id);
                    return {...current._doc, category: cate.name, trainer_id: trainer };
                })
            );
            res.status(200).json(dataAll);
        } catch (error) {
            return res.status(500).json({ msg: error.message });
        }
    },
    getAllTutorialUserLogin: async(req, res) => {
        try {
            const tutorials = await Tutorial.find();
            const userLike = await Users.findById(req.user.id);
            const allData = tutorials.map((tutori) => {
                const userLikes = userLike.heart.includes(tutori._id);
                return {...tutori._doc, userLikes: userLikes };
            });
            res.status(200).json(allData);
        } catch (error) {
            return res.status(500).json({ msg: error.message });
        }
    },
    getllCourses: async(req, res) => {
        try {
            const courses = await Courses.find();
            let arrayCouses = [];
            for (let item of courses) {
                if (item.tutorials.toString() === req.params.id) {
                    arrayCouses.push(item);
                }
            }
            let arrayCousesTutorial = [];
            arrayCousesTutorial = await Promise.all(
                arrayCouses.map(async(current) => {
                    const tutorial = await Tutorial.findById(current.tutorials);
                    return {...current._doc, tutorials: tutorial.name };
                })
            );
            res.json(arrayCousesTutorial);
        } catch (error) {
            return res.status(500).json({ msg: error.message });
        }
    },
    doneCourses: async(req, res) => {
        try {
            const couses = await Courses.findById(req.params.id);
            couses.userLearn.push({ users: req.user.id });
            await couses.save();
            res.json(couses);
        } catch (error) {
            return res.status(500).json({ msg: error.message });
        }
    },
    addComment: async(req, res) => {
        try {
            const user = await Users.findById(req.user.id).select("-password");
            const postComment = await Tutorial.findOne({ linkName: req.params.name });
            const userAuthor = await TrainerModel.findById(postComment.trainer_id);
            const newComment = {
                text: req.body.text,
                name: user.name,
                avatar: user.avatar,
                users: user.id,
            };

            postComment.commnets.unshift(newComment);
            await postComment.save();
            res.status(200).json(postComment);
        } catch (error) {
            return res.status(500).json({ msg: error.message });
        }
    },
    addListLike: async(req, res) => {
        try {
            const params = await Tutorial.findById(req.params.id);
            const user = await Users.findById(req.user.id);
            let likesAble = user.heart.findIndex(
                (like) => like.toString() === params._id.toString()
            );
            if (likesAble !== -1) {
                user.heart.splice(likesAble, 1);
                user.save();
                return res.json({ msg: "Remove like successfully" });
            }

            user.heart.push(req.params.id);
            await user.save();
            return res.status(200).json({ msg: "Like successfully" });
        } catch (error) {
            return res.status(500).json({ msg: error.message });
        }
    },
    listLikeTutorial: async(req, res) => {
        try {
            const user = await Users.findById(req.user.id);
            const userListLike = await Promise.all(
                user.heart.map(async(e) => {
                    const course = await Tutorial.findById(e);
                    return {
                        ...e._doc,
                        courseAvatar: course.avatar_couses,
                        courseName: course.name,
                        courseDes: course.description,
                        courseLinkName: course.linkName,
                        courseId: course._id,
                    };
                })
            );
            res.status(200).json(userListLike);
        } catch (error) {
            return res.status(500).json({ msg: error.message });
        }
    },
    listRegistedTutorial: async(req, res) => {
        try {
            const tutorial = await RegisterModel.find({ users: req.user.id });
            const userLearn = await Promise.all(
                tutorial.map(async(course) => {
                    const courses = await Tutorial.findById(course.courses);
                    const courseObj = await Courses.find({ tutorials: course.courses });
                    return {
                        ...course._doc,
                        nameCourse: courses.name,
                        avatarCourse: courses.avatar_couses,
                        desCourse: courses.description,
                        courseLinkName: courses.linkName,
                        courseObj,
                    };
                })
            );
            res.status(200).json(userLearn);
        } catch (error) {
            return res.status(500).json({ msg: error.message });
        }
    },
    addLikeDiscovery: async(req, res) => {
        try {
            const params = await Categories.findById(req.params.id);
            const user = await Users.findById(req.user.id);
            const likesAble = params.likes_user.findIndex(
                (like) => like.toString() === user._id.toString()
            );
            if (likesAble !== -1) {
                params.likes_user.splice(likesAble, 1);
                params.save();
                return res.json({ msg: "Remove discovery successfully" });
            }

            params.likes_user.push(user._id);
            await params.save();
            return res.json({ msg: "add discovery successfully" });
        } catch (error) {
            return res.status(500).json({ msg: error.message });
        }
    },
    listDiscovery: async(req, res) => {
        try {
            const discovery = await Categories.find();
            const allData = await Promise.all(
                discovery.map(async(e) => {
                    const userDis = e.likes_user.includes(req.user.id);
                    // const tutorials = await Tutorial.find({ category: e._id });
                    let tutorials = [];
                    if (userDis) {
                        tutorials = await Tutorial.find({ category: e._id });
                    }
                    return {...e._doc, userDis: userDis, tutorials: tutorials };
                })
            );
            return res.json(allData);
        } catch (error) {
            return res.status(500).json({ msg: error.message });
        }
    },
    listTopicDiscovery: async(req, res) => {
        try {
            const discovery = await Discovery.find({ likes_user: req.user.id });
            const allTopic = await NewPostDiscovery.find({
                discovery: discovery.map((e) => e._id),
            });
            res.json(allTopic);
        } catch (error) {
            res.status(500).json({ msg: error.message });
        }
    },
    checkBody: async(req, res) => {
        try {
            const { weight, height } = req.body;
            const bmi = await bmiModel.find();
            let message = "";
            let result = "";
            let chiSoBMI = weight / (height * height);
            if (chiSoBMI < 18) {
                message = "B???n l?? ng?????i g???y!";
                result = bmi.filter((e) => e.typeBMI === 0);
            } else if (chiSoBMI <= 24.9) {
                message = "B???n l?? ng?????i b??nh th?????ng";
                result = bmi.filter((e) => e.typeBMI === 4);
            } else if (chiSoBMI <= 29.9) {
                message = "B???n b??? b??o ph?? ????? I";
                result = bmi.filter((e) => e.typeBMI === 1);
            } else if (chiSoBMI <= 34.9) {
                message = "B???n b??? b??o ph?? ????? II";
                result = bmi.filter((e) => e.typeBMI === 2);
            } else {
                message = "B???n b??? b??o ph?? ????? III";
                result = bmi.filter((e) => e.typeBMI === 3);
            }
            const resultData = {
                message,
                result,
            };
            res.status(200).json(resultData);
        } catch (error) {
            res.status(500).json({ msg: error.message });
        }
    },
    deleteChat: async(req, res) => {
        try {
            await Conversation.findByIdAndDelete(req.params.id);
            const message = await Message.find();
            for (let item of message) {
                if (item.conversationId.toString() === req.params.id) {
                    await Message.findByIdAndDelete(item._id);
                }
            }
            res.json({ msg: "Delete chat successfully" });
        } catch (error) {
            res.status(500).json({ msg: error.message });
        }
    },
    googleLogin: async(req, res) => {
        try {
            const { tokenId } = req.body;

            const verify = await client.verifyIdToken({
                idToken: tokenId,
                audience: process.env.MAILING_SERVICE_CLIENT_ID,
            });

            const { email_verified, email, name, picture } = verify.payload;

            const password = email + process.env.GOOGLE_SECRET;

            const passwordHash = await bcrypt.hash(password, 12);

            if (!email_verified)
                return res.status(400).json({ msg: "Email verify failed!!!" });

            const user = await Users.findOne({ email });

            if (user) {
                const isMatch = await bcrypt.compare(password, user.password);
                if (!isMatch)
                    return res.status(400).json({ msg: "Password is incorrect!!!" });

                const refresh_token = createRefreshToken({ id: user._id });
                res.cookie("refreshtoken", refresh_token, {
                    httpOnly: true,
                    path: "/user/refresh_token",
                    maxAge: 7 * 24 * 60 * 60 * 100, //7day
                });
                res.json({ msg: "Login success" });
            } else {
                const newUser = new Users({
                    name,
                    email,
                    password: passwordHash,
                    avatar: picture,
                });
                await newUser.save();
                const refresh_token = createRefreshToken({ id: newUser._id });
                res.cookie("refreshtoken", refresh_token, {
                    httpOnly: true,
                    path: "/user/refresh_token",
                    maxAge: 7 * 24 * 60 * 60 * 100, //7day
                });
                res.json({ msg: "Login success" });
            }
        } catch (error) {
            res.status(500).json({ msg: error.message });
        }
    },
    facebookLogin: async(req, res) => {
        try {
            const { accessToken, userID } = req.body;

            const URL = `https://graph.facebook.com/v4.0/${userID}/?fields=id,name,email,picture&access_token=${accessToken}`;

            const data = await fetch(URL)
                .then((res) => res.json())
                .then((res) => {
                    return res;
                });

            const { email, name, picture } = data;

            const password = email + process.env.FACEBOOK_SECRET;

            const passwordHash = await bcrypt.hash(password, 12);

            const user = await Users.findOne({ email });

            if (user) {
                const isMatch = await bcrypt.compare(password, user.password);
                if (!isMatch)
                    return res.status(400).json({ msg: "Password is incorrect!!!" });

                const refresh_token = createRefreshToken({ id: user._id });
                res.cookie("refreshtoken", refresh_token, {
                    httpOnly: true,
                    path: "/user/refresh_token",
                    maxAge: 7 * 24 * 60 * 60 * 100, //7day
                });
                res.json({ msg: "Login success" });
            } else {
                const newUser = new Users({
                    name,
                    email,
                    password: passwordHash,
                    avatar: picture.data.url,
                });
                await newUser.save();
                const refresh_token = createRefreshToken({ id: newUser._id });
                res.cookie("refreshtoken", refresh_token, {
                    httpOnly: true,
                    path: "/user/refresh_token",
                    maxAge: 7 * 24 * 60 * 60 * 100, //7day
                });
                res.json({ msg: "Login success" });
            }
        } catch (error) {
            res.status(500).json({ msg: error.message });
        }
    },
};

const validateEmail = (email) => {
    return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
};
const createActivationToken = (payload) => {
    return jwt.sign(payload, process.env.ACTIVATION_TOKEN_SECRET, {
        expiresIn: "5m",
    });
};
const createAccessToken = (payload) => {
    return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "15m",
    });
};
const createRefreshToken = (payload) => {
    return jwt.sign(payload, process.env.REFERSH_TOKEN_SECRET, {
        expiresIn: "7d",
    });
};
module.exports = userController;
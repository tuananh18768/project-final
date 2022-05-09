const Trainers = require("../models/tranierAuth");
const Courses = require("../models/coursesModel");
const Tutorial = require("../models/tutorialModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const sendMail = require("./sendMail");
const sendMailAccept = require("./sendMailAccept");
const Category = require("../models/catergories");
const RegisterTutorial = require("../models/registerCourseModel");
const User = require("../models/userAuth");

const { CLIENT_URL } = process.env;

const trainerController = {
    register: async(req, res) => {
        try {
            const { name, email, password, experience, skills, graduate } = req.body;

            if (!name || !email || !password || !experience || !skills) {
                return res.status(400).json({ msg: "Please enter full fill!!" });
            }
            if (!validateEmail(email)) {
                return res.status(400).json({ msg: "Invalid email!!!" });
            }
            const userEmail = await Trainers.findOne({ email });
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
                experience,
                skills,
                graduate,
            };

            const activation_token = createActivationToken(newUser);
            const url = `${CLIENT_URL}/admin/activate/${activation_token}`;

            // sendMail(email, url, "Verify your email address")
            sendMailAccept(
                url,
                "Accept Trainer Join System",
                email,
                experience,
                skills,
                graduate
            );
            res.json({ msg: "Register success! Please wait admin accept for you" });
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
            const { name, email, password, experience, skills, graduate } = user;
            const check = await Trainers.findOne({ email });
            if (check)
                return res.status(400).json({ msg: "This email is alread exits." });

            const newUser = new Trainers({
                name,
                email,
                password,
                experience,
                skills,
                graduate,
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
            const user = await Trainers.findOne({ email });
            if (!user)
                return res.status(400).json({ msg: "This email does not exist." });

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch)
                return res.status(400).json({ msg: "Password is incorrect." });

            const refresh_token = createRefreshToken({ id: user._id });
            res.cookie("refreshtoken", refresh_token, {
                httpOnly: true,
                path: "/trainer/refresh_token",
                maxAge: 7 * 24 * 60 * 60 * 100, //7day
            });
            res.json({ msg: "Login success" });
        } catch (error) {
            return res.status(500).json({ msg: error.message });
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
            const user = await Trainers.findOne({ email });
            if (!user)
                return res.status(400).json({ msg: "This email dose not exits." });

            const access_token = createAccessToken({ id: user.id });
            const url = `${CLIENT_URL}/trainer/reset/${access_token}`;

            sendMail(email, url, "Reset your password");
            res.json({ msg: "Re-send the password, please check your email." });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    resetPassword: async(req, res) => {
        try {
            const { password } = req.body;
            const passwordHash = await bcrypt.hash(password, 12);

            await Trainers.findOneAndUpdate({ _id: req.user.id }, {
                password: passwordHash,
            });
            res.json({ msg: "Password successfully changed!" });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    getUserInfor: async(req, res) => {
        try {
            const user = await Trainers.findById(req.user.id).select("-password");
            res.json(user);
        } catch (error) {
            return res.status(500).json({ msg: error.message });
        }
    },
    logout: async(req, res) => {
        try {
            res.clearCookie("refreshtoken", { path: "/trainer/refresh_token" });
            return res.json({ msg: "Logout!" });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    updateInfor: async(req, res) => {
        try {
            const { name, avatar, experience, skills, graduate } = req.body;
            const user = await Trainers.findById(req.user.id).select("-password");
            await Trainers.findByIdAndUpdate({ _id: req.user.id }, {
                name: name || user.name,
                avatar: avatar || user.avatar,
                experience: experience || user.experience,
                skills: skills || user.skills,
                graduate: graduate || user.graduate,
            });
            res.json({ msg: "Update successfully" });
        } catch (error) {
            return res.status(500).json({ msg: error.message });
        }
    },
    addTutorial: async(req, res) => {
        try {
            const { name, description, avatar_couses, category, result } = req.body;
            const nameCourses = await Tutorial.findOne({ name: name });
            if (nameCourses)
                return res.status(400).json({ msg: "This tutorial dose already." });

            const newTutorial = new Tutorial({
                name,
                description,
                linkName: formartLinkName(name),
                avatar_couses,
                category,
                trainer_id: req.user.id,
                result,
            });
            newTutorial.save();
            res.status(200).json({ msg: "Add Tutorial successfully" });
        } catch (error) {
            return res.status(500).json({ msg: error.message });
        }
    },
    updateTutorial: async(req, res) => {
        try {
            const { name, description, avatar_couses, category, result } = req.body;
            const tutorialParams = await Tutorial.findById(req.params.id);
            await Tutorial.findByIdAndUpdate(req.params.id, {
                name: name || tutorialParams.name,
                description: description || tutorialParams.description,
                linkName: formartLinkName(name) || formartLinkName(tutorialParams.name),
                avatar_couses: avatar_couses || tutorialParams.avatar_couses,
                category: category || tutorialParams.category,
                result: result || tutorialParams.result,
            });
            res.json({ msg: "Update tutorial successfully" });
        } catch (error) {
            return res.status(500).json({ msg: error.message });
        }
    },
    getAllTutorial: async(req, res) => {
        try {
            const tutorial = await Tutorial.find({ trainer_id: req.user.id });
            let arrayTutorial = [];
            arrayTutorial = await Promise.all(
                tutorial.map(async(current) => {
                    const cate = await Category.findById(current.category);
                    return {...current._doc, category: cate.name };
                })
            );
            res.status(200).json(arrayTutorial);
        } catch (error) {
            return res.status(500).json({ msg: error.message });
        }
    },
    deleteTutorial: async(req, res) => {
        try {
            await Tutorial.findByIdAndRemove(req.params.id);
            const courses = await Courses.find();
            for (let item of courses) {
                if (item.tutorials === req.params.id) {
                    await Courses.findByIdAndDelete(item._id);
                }
            }
            res.status(200).json({ msg: "Deleted tutorial successfully" });
        } catch (error) {
            return res.status(500).json({ msg: error.message });
        }
    },
    addCourses: async(req, res) => {
        try {
            const { name, description, videoUrl } = req.body;
            const nameCourses = await Courses.findOne({ name: name });

            if (nameCourses)
                return res.status(400).json({ msg: "This courses dose already." });

            const newCourses = new Courses({
                name,
                description,
                tutorials: req.params.id,
                videoUrl,
                trainer_id: req.user.id,
            });
            newCourses.save();
            res.status(200).json({ msg: "Add Courses successfully" });
        } catch (error) {
            return res.status(500).json({ msg: error.message });
        }
    },
    updateCourses: async(req, res) => {
        try {
            const { name, description, videoUrl } = req.body;
            const coureseParams = await Courses.findById(req.params.id);

            await Courses.findByIdAndUpdate(req.params.id, {
                name: name || coureseParams.name,
                description: description || coureseParams.description,
                videoUrl: videoUrl || coureseParams.coureseParams,
            });
            res.json({ msg: "Update courses successfully" });
        } catch (error) {
            return res.status(500).json({ msg: error.message });
        }
    },
    deleteCourses: async(req, res) => {
        try {
            await Courses.findByIdAndRemove(req.params.id);
            res.status(200).json({ msg: "Delete courses successfully" });
        } catch (error) {
            return res.status(500).json({ msg: error.message });
        }
    },
    getAllCourses: async(req, res) => {
        try {
            const courses = await Courses.find();
            let arrayCourses = [];
            arrayCourses = await Promise.all(
                courses.map(async(current) => {
                    const tutorial = await Tutorial.findById(current.tutorials);
                    return {...current._doc, tutorials: tutorial.name };
                })
            );
            res.status(200).json(arrayCourses);
        } catch (error) {
            return res.status(500).json({ msg: error.message });
        }
    },
    getAllCoursesTutorial: async(req, res) => {
        try {
            // const tutorial = await Tutorial.findById(req.params.id)
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
    dashboard: async(req, res) => {
        try {
            const tutorials = await Tutorial.find({ trainer_id: req.user.id });
            const cates = await Category.find();
            const users = await User.find();
            let allRegister = [];
            let tutorialCate = [];
            let cateNumber = [];

            cateNumber = await Promise.all(
                cates.map(async(current) => {
                    const tutorial = await Tutorial.find({
                        category: current._id,
                        trainer_id: req.user.id,
                    });
                    return {...current._doc, tutorial };
                })
            );

            tutorialCate = await Promise.all(
                tutorials.map(async(current) => {
                    const cate = await Category.findById(current.category);
                    const courseObj = await Courses.find({ tutorials: current._id });
                    allRegister = await RegisterTutorial.find({ courses: current._id });
                    const userLike = users.map((e) => {
                        let likeTutorial = {
                            likes: "",
                        };
                        e.heart.find((user) => {
                            if (user.toString() === current._id.toString()) {
                                likeTutorial.likes = e._id;
                            }
                        });
                        return likeTutorial;
                    });
                    const results = userLike.filter((element) => {
                        if (Object.keys(element.likes).length !== 0) {
                            return true;
                        }

                        return false;
                    });
                    const register = await RegisterTutorial.find({
                        courses: current._id,
                    });

                    return {
                        ...current._doc,
                        category: cate.name,
                        courseObj,
                        register,
                        results,
                    };
                })
            );

            const uniqueIds = [];

            const dataRegister = allRegister.filter((element) => {
                const isDuplicate = uniqueIds.includes(element.users.toString());

                if (!isDuplicate) {
                    uniqueIds.push(element.users.toString());

                    return true;
                }

                return false;
            });

            const allData = {
                cateNumber,
                dataRegister,
                tutorialCate,
            };
            res.status(200).json(allData);
        } catch (error) {
            return res.status(500).json({ msg: error.message });
        }
    },
};

const formartLinkName = (name) => {
    name = name.trim();
    const arrayName = [];
    let index;
    for (let i = 0; i < name.length; i++) {
        if (index && name[index + 1] == " ") {
            index = i;
            continue;
        }
        if (name[i] != " ") {
            let vnToEng = name[i];
            vnToEng = vnToEng.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
            vnToEng = vnToEng.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
            vnToEng = vnToEng.replace(/ì|í|ị|ỉ|ĩ/g, "i");
            vnToEng = vnToEng.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
            vnToEng = vnToEng.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
            vnToEng = vnToEng.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
            vnToEng = vnToEng.replace(/đ/g, "d");
            vnToEng = vnToEng.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
            vnToEng = vnToEng.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
            vnToEng = vnToEng.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
            vnToEng = vnToEng.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
            vnToEng = vnToEng.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
            vnToEng = vnToEng.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
            vnToEng = vnToEng.replace(/Đ/g, "D");
            arrayName.push(vnToEng);
        } else {
            arrayName.push("-");
            index = i;
        }
    }
    return arrayName.join("");
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
module.exports = trainerController;
const event = require("events");

const userModel = require("./user.model");
const { genHash, compareHash } = require("../../utils/hash");
const { generateToken } = require("../../utils/token");
const { generateOtp } = require("../../utils/token");

const { sendMail } = require("../../services/mailer");

const eventEmitter = new event.EventEmitter();
eventEmitter.addListener("signup", (email) =>
	sendMail({
		email,
		subject: "MovieMate Signup",
		htmlMsg: "<b> Thank you for joining MovieMate </b>",
	})
);

eventEmitter.addListener("emailVerification", (email, otp) =>
	sendMail({
		email,
		subject: "MovieMate Email Verification",
		htmlMsg: `<b>${otp}</b> is your otp token`,
	})
);

const create = async (payload) => {
	const { email, password } = payload;
	const duplicateEmail = await userModel.findOne({ email });
	if (duplicateEmail) throw new Error("Email already in use");
	payload.password = genHash(password);
	const result = await userModel.create(payload);
	//call the nodemailer
	eventEmitter.emit("signup", email);
	return result;
};

const login = async (payload) => {
	const { email, password } = payload;
	// check for email
	const user = await userModel
		.findOne({ email, isActive: true })
		.select("+password");
	if (!user) throw new Error("User not found");
	const isVerified = user?.isEmailVerified;
	if (!isVerified) throw new Error("Email Verification required");
	const isValidPw = compareHash(user?.password, password);
	if (!isValidPw) throw new Error("Email or password invalid");
	const tokenPayload = {
		name: user?.name,
		email: user?.email,
	};
	const token = generateToken(tokenPayload);
	if (!token) throw new Error("Something went wrong");
	return token;
};

const generateEmailToken = async (payload) => {
	const { email } = payload;
	const user = await userModel.findOne({ email, isActive: true });
	if (!user) throw new Error("User not found");
	const isVerified = user?.isEmailVerified;
	if (!isVerified) {
		const otp = generateOtp();
		const updatedUser = await userModel.updateOne({ _id: user?._id }, { otp });
		if (!updatedUser) throw new Error("Something went wrong");
		console.log({ otp });

		eventEmitter.emit("emailVerification", email, otp);
	}
	return true;
};

const verifyEmailToken = async (payload) => {
	const { email, token } = payload;
	const user = await userModel.findOne({ email, isActive: true });
	if (!user) throw new Error("User not found");
	const isTokenValid = user?.otp === token;
	if (!isTokenValid) throw new Error("Token mismatch");
	const result = await userModel.updateOne(
		{ _id: user?._id },
		{ isEmailVerified: true, otp: "" }
	);
	if (!result) throw new Error("Something went wrong");
	return isTokenValid;
};

const blockUser = async( payload ) =>{
  
}


const getProfile = (id) => {
	return userModel.findOne({ _id: id });
};

const changePassword = async(id, payload) => {

  const { oldPassword, newPassword } = payload;
// Get old password from the user
const user =await userModel.findOne({_id: id, isActive: true, isEmailVerified: true}).select("+password");
if(!user) throw new Error("user not found");
// compare that password to user database pass
const isValidPw = compareHash(user?.password, oldPassword);
if(!isValidPw) throw new Error("password mismatch");
// convert newPassword to hashPassword
const data = {
  password : genHash(newPassword)
}
// store that hash password
return userModel.updateOne({ _id: id}, data);

};

const resetPassword = async(id, newPassword) =>{
  // check user exist?
  const user = await userModel.findOne({_id : id});
  if(!user) throw new Error("User not found");
  // newPassword hash
  const hashPw = genHash(newPassword);
  //user update
  return userModel.updateOne({_id: id}, {password: hashPw});
}

const forgetPassword = () => {

}

const forgetPasswordTokenGen = async(payload) =>{
  const { email } = payload;
  // Find the user
  const user = await userModel.findOne({email,
    isActive: true,
    isEmailVerified: true,
  });
  if(!user) throw new Error("User not found");
  // Generate the token
  const otp = generateOtp();
  // Save the token in the database
  const updatedUser = await userModel.updateOne({email}, {otp});
  if(!updatedUser) throw new Error("something went wrong");
  // sent the token in the email
  eventEmitter.emit("emailVerification", email,otp);
  return true;
};

const forgetPasswordPassChange = async (payload) => {
  const { email, otp, newPassword } = payload;
  // Find the user
  const user = await userModel.findOne({
    email,
    isActive: true,
    isEmailVerified: true,
  });
  if (!user) throw new Error("User not found");
  if (otp !== user?.otp) throw new Error("OTP mismatch");
  const hashPw = genHash(newPassword);
  const updatedUser = await userModel.updateOne(
    { email },
    { password: hashPw, otp: "" }
  );
  if (!updatedUser) throw new Error("Something went wrong");
  return true;
};y

const list = () => {
	return userModel.find();
};

const updateById = (id, payload) => {
	return userModel.findOneAndUpdate({ _id: id }, payload);
};

const removeById = (id) => {
	return userModel.deleteOne({ _id: id });
};

module.exports = {
	login,
	create,
	generateEmailToken,
	verifyEmailToken,
	getProfile,
	list,
	updateById,
  changePassword,
  resetPassword,
  forgetPasswordTokenGen,
  forgetPasswordPassChange,
	removeById,
};

const slugify = require("slugify");

const slugMake = (slug) => {
	const options = {
		replacement: "-", // replace spaces with replacement character
		remove: undefined, // do not remove any characters
		lower: true, // do not convert to lower case
		strict: false, // do not strip special characters
		trim: true, // trim leading and trailing replacement chars
	};

	return slugify(slug, options);
};


module.exports = { slugMake };

const User = require('../models/userModel');
module.exports.addToLiked = async (req, res) => {
    try {
        const { email, data } = req.body;
        const user = await User.findOne({ email });
        if (user) {
            const { likedMovies } = user;
            const movieAlreadyLiked = likedMovies.find(({ id }) => id === data.id);
            if (!movieAlreadyLiked) {
                await User.findByIdAndUpdate(user._id,
                    {
                        likedMovies: [...user.likedMovies, data],
                    },
                    { new: true });
                return res.json({ msg: "Movie added successfully" });
            } else {
                return res.json({ msg: "Movie already added to liked list." });
            }
        } else {
            await User.create({ email, likedMovies: [data] });
            return res.json({ msg: "Movie added successfully" });
        }
    } catch (error) {
        console.error("Error Adding Movie:", error);
        return res.status(500).json({ msg: "Error Adding Movie" });
    }

};

module.exports.getLikedMovies = async (req, res) => {
    try {
        const { email } = req.params;
        const user = await User.findOne({ email });
        if (user) {
            return res.json({ msg: 'Success', movies: user.likedMovies })
        }
        else return res.json({ msg: 'User with given email not found' });

    }
    catch (err) {
        return res.json({ msg: 'Error fetching movies' })
    }
}


module.exports.removeFromLikeMovies = async (req, res) => {
    try {
        const { email, movieId } = req.body;
        const user = await User.findOne({ email });

        if (user) {
            const { likedMovies } = user;
            const movieIndex = likedMovies.findIndex(({ id }) => id === movieId);

            if (movieIndex !== -1) {
                likedMovies.splice(movieIndex, 1);

                await User.findByIdAndUpdate(user._id, { likedMovies }, { new: true });

                return res.json({ msg: 'Movie Deleted', movies: likedMovies });
            } else {
                return res.status(400).send({ msg: 'Movie Not found' });
            }
        } else {
            return res.status(400).send({ msg: 'User Not found' });
        }
    } catch (err) {
        console.log(err);
        return res.status(500).json({ msg: 'Error deleting movie' });
    }
};
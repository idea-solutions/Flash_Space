const Room = require("../models/Room");
const WorkAssignment = require("../models/WorkAssignment");
const Image = require("../models/Image");

const RoomController = {
  getAllRoom: async (req, res) => {
    try {
      const room = await Room.find()
        .populate("idward")
        .populate("idcareer")
        .populate("idaccount");
      res.status(200).json(room);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  deleteRoom: async (req, res) => {
    try {
      const room = await Room.findByIdAndDelete(req.params.id);
      res.status(200).json("Delete successfully");
    } catch (error) {
      res.status(500).json(error);
    }
  },

  getRoomById: async (req, res) => {
    try {
      const room = await Room.findById(req.params.id);
      res.status(200).json(room);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  addRoom: async (req, res) => {
    try {
      const workAssignment = await WorkAssignment.aggregate([
        {
          $group: {
            _id: "$idaccount",
            count: { $sum: 1 },
          },
        },
        {
          $project: {
            _id: 0,
            idaccount: "$_id",
            amount: "$count",
          },
        },
      ]);
      const sortarr = workAssignment.sort((a, b) => a.amount - b.amount);

      // req.files.forEach(async (item) => {
      //   let filename = (await item.filename.split(".", 1)) + ".jpeg";

      //   let compressedImageFileSavePath = path.join(
      //     __dirname,
      //     "images",
      //     filename
      //   );

      //   sharp(item.path)
      //     // .resize(640, 480)
      //     .jpeg({
      //       quality: 80,
      //       chromaSubsampling: "4:4:4",
      //     })
      //     .toFile(compressedImageFileSavePath);
      // });

      // const newRoom = await new Room({
      //   idward: req.body.idward,
      //   idcareer: req.body.idcareer,
      //   idaccount: req.body.idaccount,
      //   length: req.body.length,
      //   width: req.body.width,
      //   price: req.body.price,
      //   longitude: req.body.longitude,
      //   latitude: req.body.latitude,
      //   static: 0,
      //   subject: req.body.subject,
      //   describe: req.body.describe,
      //   housenumberstreetname: req.body.housenumberstreetname,
      // });
      // await newRoom.save();

      // const date = new Date();
      // const minute = 1000 * 60;
      // const hour = minute * 60;
      // const day = hour * 24;
      // const implementationDate = date.getTime() + day * 2;

      // const newWorkAssignment = new WorkAssignment({
      //   idroom: newRoom.id,
      //   idaccount: "642dc784cf8ef2472f6b1f9a",
      //   work: "Duyệt tin",
      //   implementationdate: implementationDate,
      //   static: 1,
      // });
      // await newWorkAssignment.save();
      // res.status(200).json("Add successfully");
      res.status(200).json(sortarr[sortarr.length - 1]);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  updateRoom: async (req, res) => {
    try {
      const updateRoom = req.body;
      const room = await Room.findByIdAndUpdate(req.params.id, updateRoom, {
        new: true,
      });
      if (!room) {
        return res.status(404).json("Wrong updateRoom!");
      }
      res.status(200).json(room);
    } catch (error) {
      console.log(error);
      res.status(500).json("Error!!!");
    }
  },
};

module.exports = RoomController;

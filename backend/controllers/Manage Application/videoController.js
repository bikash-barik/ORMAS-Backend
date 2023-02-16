// Videos
import asyncHandler from "express-async-handler";
import Video from "../../models/Manage Application/videoModel.js";
import Permission from "../../models/permissionModel.js";

// @desc    Create Video
// @route   POST /api/video
// @access  Private (requires author rights)
const createVideo = asyncHandler(async (req, res) => {
  const user = req.user;
  if(!user.name && user.privilege !== "superAdmin"){
    const permission = await Permission.find({
      subUser: user._id,
      category: 'application',
      feature: 'video'
    });

    if(permission.length === 0){
      res.status(400);
      throw new Error("You are not authorized to do this");
    }
    if(!(permission[0].authorRights === true)){
      res.status(400);
      throw new Error("You are not authorized to do this");
    }
  }
  const {
    sl_no,
    headline,
    link_type,
    thumb_image,
    video,
    description,
    publish_status,
  } = req.body;

  const newVideo = new Video({
    sl_no,
    headline,
    link_type,
    thumb_image,
    video,
    description,
    publish_status,
  });

  await newVideo.save();

  res.status(200).json({
    video: newVideo
  });
});

// @desc    Get all Videos
// @route   GET /api/video
// @access  Private (requires manager rights)
const getVideos = asyncHandler(async (req, res) => {
  // const user = req.user;
  // if(!user.name && user.privilege !== "superAdmin"){
  //   const permission = await Permission.find({
  //     subUser: user._id,
  //     category: 'application',
  //     feature: 'video'
  //   });

  //   if(permission.length === 0){
  //     res.status(400);
  //     throw new Error("You are not authorized to do this");
  //   }
  //   if(!(permission[0].managerRights === true)){
  //     res.status(400);
  //     throw new Error("You are not authorized to do this");
  //   }
  // }
  const status = req.query.status;
  let query = {};
  if(status==="set"){
    query = {publish_status: "set"};
  }
  const videos = await Video.find(query);

  res.status(200).json({
    videos,
  });
});

// @desc    Get a single Video by id
// @route   POST /api/video/:id
// @access  Public
const getVideo = asyncHandler(async (req, res) => {
  const video = await Video.findById(req.params.id);

  if (!video) {
    res.status(404);
    throw new Error("Video Not Found");
  }

  res.status(200).json({
    video
  });
});

// @desc    Update Video
// @route   PUT /api/video/:id
// @access  Private (requires editor rights)
const updateVideo = asyncHandler(async (req, res) => {
  const user = req.user;
  if(!user.name && user.privilege !== "superAdmin"){
    const permission = await Permission.find({
      subUser: user._id,
      category: 'application',
      feature: 'video'
    });

    if(permission.length === 0){
      res.status(400);
      throw new Error("You are not authorized to do this");
    }
    if(!(permission[0].editorRights === true)){
      res.status(400);
      throw new Error("You are not authorized to do this");
    }
  }
  const video = await Video.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  if (!video) {
    res.status(404);
    throw new Error("Video Not Found");
  }

  res.status(200).json({
    video
  });
});

// @desc    Delete Video
// @route   DELETE /api/video/:id
// @access  Private (requires manager rights)
const deleteVideo = asyncHandler(async (req, res) => {
    const user = req.user;
    if (!user.name && user.privilege !== "superAdmin") {
        const permission = await Permission.find({
            subUser: user._id,
            category: 'application',
            feature: 'video'
        });

        if (permission.length === 0) {
            res.status(400);
            throw new Error("You are not authorized to do this");
        }
        if (!(permission[0].managerRights === true)) {
            res.status(400);
            throw new Error("You are not authorized to do this");
        }

    }
    const videoId = req.params.id;

    const videoToDelete = await Video.findById(videoId);

    if (!videoToDelete) {
        res.status(404);
        throw new Error("Video Not Found");
    }

    await videoToDelete.remove();

    res.status(200).json({
        video: videoToDelete
    });
});

// @desc    Toggle publish status of Video
// @route   PUT /api/video/status/:id
// @access  Private (requires publisher rights)
const togglePublishStatus = asyncHandler(async (req, res) => {
    const user = req.user;
    if (!user.name && user.privilege !== "superAdmin") {
        const permission = await Permission.find({
            subUser: user._id,
            category: 'application',
            feature: 'video'
        });

        if (permission.length === 0) {
            res.status(400);
            throw new Error("You are not authorized to do this");
        }
        if (!(permission[0].publisherRights === true)) {
            res.status(400);
            throw new Error("You are not authorized to do this");
        }

    }
    const videoId = req.params.id;

    const video = await Video.findById(videoId);

    if (video) {
        if (video.publish_status === "set") {
            video.publish_status = "unset";
        } else {
            video.publish_status = "set";
        }
        const updatedVideo = await video.save();
        res.status(200).json({
            video: updatedVideo
        });
    } else {
        res.status(400);
        throw new Error("Video not found");
    }
});

export { getVideo, getVideos, createVideo, updateVideo, deleteVideo, togglePublishStatus };
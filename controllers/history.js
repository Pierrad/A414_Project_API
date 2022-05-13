const History = require("../models/History");

exports.get = async (req, res) => {
  try {
    const history = await History.find({});

    return res.status(200).json({
      success: true,
      data: {
        message: "History retrieved successfully",
        history: history,
      },
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      success: false,
      data: {
        message: "Internal error",
      },
    })
  }
}

exports.add = async (req, res) => {
  try {
    if (!req.body.question) {
      return res.status(400).json({
        success: false,
        data: {
          message: "Missing history question",
        },
      })
    }

    if (!req.body.answer) {
      return res.status(400).json({
        success: false,
        data: {
          message: "Missing history answer",
        },
      })
    }

    if (!req.body.possibleAnswers) {
      return res.status(400).json({
        success: false,
        data: {
          message: "Missing history possible answers",
        },
      })
    }

    const history = new History({
      question: req.body.question,
      answer: req.body.answer,
      possibleAnswers: req.body.possibleAnswers,
    })

    await history.save()


    return res.status(200).json({
      success: true,
      data: {
        message: "History added successfully",
        history: history,
      },
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      success: false,
      data: {
        message: "Internal error",
      },
    })
  }
}

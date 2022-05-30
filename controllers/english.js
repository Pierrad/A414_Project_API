const English = require("../models/English");

exports.get = async (req, res) => {
  try {
    const english = await English.find({});

    return res.status(200).json({
      success: true,
      data: {
        message: "English categories retrieved successfully",
        english: english,
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

exports.getWords = async (req, res) => {
  try {
    let myAggregate = [
      {
        "$match": {
          "category": "word"
        }
      }
    ]
    let words = await English.aggregate(myAggregate);

    return res.status(200).json({
      success: true,
      data: {
        message: "English words retrieved successfully",
        english: words,
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

exports.getColors = async (req, res) => {
  try {
    let myAggregate = [
      {
        "$match": {
          "category": "color"
        }
      }, {
        "$project" : {
          "possibleAnswers": 0
        }
      }
    ]
    let colors = await English.aggregate(myAggregate);

    return res.status(200).json({
      success: true,
      data: {
        message: "English colors retrieved successfully",
        english: colors,
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

exports.getFigures = async (req, res) => {
  try {
    let myAggregate = [
      {
        "$match": {
          "category": "figure"
        }
      }, {
        "$project" : {
          "possibleAnswers": 0
        }
      }
    ]
    let figures = await English.aggregate(myAggregate);

    return res.status(200).json({
      success: true,
      data: {
        message: "English figures retrieved successfully",
        english: figures,
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

exports.getVerbs = async (req, res) => {
  try {
    let myAggregate = [
      {
        "$match": {
          "category": "verb"
        }
      }, {
        "$project" : {
          "possibleAnswers": 0
        }
      }
    ]
    let verbs = await English.aggregate(myAggregate);

    return res.status(200).json({
      success: true,
      data: {
        message: "English verb retrieved successfully",
        english: verbs,
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
    if (!req.body.category || !req.body.question || !req.body.answer) {
      return res.status(400).json({
        success: false,
        data: {
          message: "Missing english arguments",
        },
      })
    }
    const category = req.body.category;
    const question = req.body.question;
    const answer = req.body.answer;
    let possibleAnswers;

    
    if (req.body.category !== "word") {
      possibleAnswers = null;
    } else if (!req.body.possibleAnswers) {
        return res.status(400).json({
          success: false,
          data: {
            message: "Missing english possible answers",
          },
        })
    } else {
        possibleAnswers = req.body.possibleAnswers;
    }

    const english = new English({
      category: category,
      question: question,
      answer: answer,
      possibleAnswers: possibleAnswers,
    })

    await english.save()

    return res.status(200).json({
      success: true,
      data: {
        message: "English added successfully",
        english: english,
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
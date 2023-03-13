import Article from "../models/article.model.js";
import fs from "fs";

export const createController = (req, res, next) => {
  const { title, description } = req.body;

  const image = req.file ? req.file.path : "";
  const article = new Article({
    image,
    title,
    description,
  });

  article.save((err, article) => {
    if (err) {
      return res.status(401).json({
        error: err,
      });
    } else {
      return res.status(200).json({
        message: "Article saved",
        article,
      });
    }
  });
};

export const getAllController = (req, res) => {
  Article.find()
    .then((results) => {
      console.log(results);
      return res.status(200).json({
        message: results,
      });
    })
    .catch((error) => console.error(error));
};

export const getOneController = async (req, res) => {
  const { id } = req.params;
  try {
    const article = await Article.findById(id);
    return res.status(200).send(article);
  } catch (error) {
    console.log(error);
  }
};

export const updateController = (req, res) => {
  const { id } = req.params;
  const { image, title, description } = req.body;

  let newimage;
  if (req.file) {
    if (image) {
      console.log(image);
      fs.unlink(image, (err) => {
        if (err) {
          console.log(err);
          return res.status(400).json({
            error: err,
          });
        }
      });
    }
    //delete old image
    newimage = req.file.path;
  } else {
    newimage = image;
  }
  Article.findByIdAndUpdate(
    id,
    { image: newimage, title, description },
    (err, result) => {
      if (err) {
        console.log(err);
        return res.status(400).json({
          error: "Error Updating your Article",
        });
      }
      return res.json({
        message: "Article updated successfully",
      });
    }
  );
};

export const deleteController = (req, res) => {
  const { id } = req.params;
  Article.findByIdAndDelete(id, (err, result) => {
    if (err) {
      return res.status(400).json({
        message: "Article couldnot be deleted",
      });
    } else {
      return res.json({
        message: "Article Deleted Successfully",
      });
    }
  });
};

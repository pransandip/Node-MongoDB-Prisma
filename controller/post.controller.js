import { prisma } from "../prisma/prisma.client.js";

/*----- CreatePost -----*/
export const createPost = async (req, res, next) => {
  console.log(req.body);
  try {
    const { slug, title, body, authorId } = req.body;

    if (!slug || !title || !body || !authorId) {
      throw new Error("please provide all field");
    }

    const result = await prisma.post.create({
      data: { slug, title, body, author: { connect: { id: authorId } } },
    });

    res.status(201).json({
      status: true,
      msg: "successfully created post",
      result,
    });
  } catch (err) {
    console.log(err.message);
    throw new Error(err.message);
  }
};

/*----- UpdatePost -----*/
export const updatePost = async (req, res, next) => {
  const { id } = req.params;
  const { title, body } = req.body;

  if (!id || !title || !body) {
    throw new Error("please provide all field");
  }

  try {
    const result = await prisma.post.update({
      where: { id: id },
      data: { title, body },
    });

    res.status(200).json(result);
  } catch (err) {
    console.log(err.message);
    res.json({ err: `post with ${id} does not exists` });
  }
};

/*----- DeletePost -----*/
export const deletePost = async (req, res, next) => {
  const { id } = req.params;

  if (!id) {
    return res.json({ msg: "plz provide id first" });
  }

  try {
    const result = await prisma.post.delete({
      where: { id: id },
    });

    res.json(result);
  } catch (err) {
    console.log(err.message);
    res.json({ err: `post with ${id} does not exists` });
  }
};

/*----- GetPosts -----*/
export const getPosts = async (req, res, next) => {
  try {
    const result = await prisma.post.findMany();
    res.status(200).json(result);
  } catch (err) {
    console.log(err.message);
    res.json({ err: `No post found!` });
  }
};

import Product from "../models/ProductModel.js";
import io from "../index.js";

export const getProduct = async (req, res) => {
  try {
    const response = await Product.findAll();
    if (!response)
      return res.status(404).json({ msg: "Item tidak ditemukan!" });
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

export const getProductById = async (req, res) => {
  try {
    const response = await Product.findOne({ where: { id: req.params.id } });
    if (!response)
      return res.status(404).json({ msg: "Item tidak ditemukan!" });

    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

export const createProduct = async (req, res) => {
  const { name, desc, price } = req.body;
  if (!name || !desc || !price)
    return res.status(400).json({ msg: "Field ada yang kosong!" });
  try {
    const response = await Product.create({ name, desc, price });
    io.emit("product-create", response);
    res.status(201).json(response);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

export const updateProduct = async (req, res) => {
  const response = await Product.findOne({ where: { id: req.params.id } });
  if (!response) return res.status(404).json({ msg: "Item tidak ditemukan" });
  const { name, desc, price } = req.body;
  if (!name || !desc || !price)
    return res.status(400).json({ msg: "Field ada yang kosong!" });
  try {
    await Product.update(
      { name, desc, price },
      { where: { id: req.params.id } }
    );
    const updated = await Product.findByPk(req.params.id);
    io.emit("product-update", updated);
    res.status(200).json({ msg: "Berhasil mengupdate item." });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await Product.findOne({ where: { id } });
    if (!response) return res.status(404).json({ msg: "Item tidak ditemukan" });
    await Product.destroy({ where: { id } });
    io.emit("product-delete", id);
    res.status(200).json({ msg: "Berhasil menghapus item." });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

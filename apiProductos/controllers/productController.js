const Product = require('../models/productModel');
const Category = require('../models/categoryModel');
const Tag = require('../models/tagModel');

// Obtener todos los productos
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los productos', error });
  }
};

// Obtener un producto por ID
const getProductById = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: 'Producto no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el producto', error });
  }
};

// Crear un nuevo producto
const createProduct = async (req, res) => {
  try {
    const { name, description, price, category_id, stock, image_url } = req.body;

    // Validar los campos requeridos
    if (!name || !price) {
      return res.status(400).json({ message: 'Nombre y precio son requeridos' });
    }

    const newProduct = await Product.create({
      name,
      description,
      price,
      category_id,
      stock,
      image_url
    });

    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear el producto', error });
  }
};

// Actualizar un producto por ID
const updateProduct = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (product) {
      const { name, description, price, category_id, stock, image_url } = req.body;

      // Actualizar campos
      await product.update({
        name,
        description,
        price,
        category_id,
        stock,
        image_url
      });

      res.json(product);
    } else {
      res.status(404).json({ message: 'Producto no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar el producto', error });
  }
};

// Eliminar un producto por ID
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (product) {
      await product.destroy();
      res.status(204).end();
    } else {
      res.status(404).json({ message: 'Producto no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el producto', error });
  }
}

// Obtener todas las categorías
const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.findAll();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener las categorías', error });
  }
};

// Crear una nueva categoría
const createCategory = async (req, res) => {
  try {
    const { name, description } = req.body;
    const newCategory = await Category.create({ name, description });
    res.status(201).json(newCategory);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear la categoría', error });
  }
};

// Actualizar una categoría
const updateCategory = async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id);
    if (category) {
      const { name, description } = req.body;
      await category.update({ name, description });
      res.json(category);
    } else {
      res.status(404).json({ message: 'Categoría no encontrada' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar la categoría', error });
  }
};

// Eliminar una categoría
const deleteCategory = async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id);
    if (category) {
      await category.destroy();
      res.status(204).end();
    } else {
      res.status(404).json({ message: 'Categoría no encontrada' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar la categoría', error });
  }
};

// Obtener todas las etiquetas
const getAllTags = async (req, res) => {
  try {
    const tags = await Tag.findAll();
    res.json(tags);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener las etiquetas', error });
  }
};

// Crear una nueva etiqueta
const createTag = async (req, res) => {
  try {
    const { name } = req.body;
    const newTag = await Tag.create({ name });
    res.status(201).json(newTag);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear la etiqueta', error });
  }
};

// Eliminar una etiqueta
const deleteTag = async (req, res) => {
  try {
    const tag = await Tag.findByPk(req.params.id);
    if (tag) {
      await tag.destroy();
      res.status(204).end();
    } else {
      res.status(404).json({ message: 'Etiqueta no encontrada' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar la etiqueta', error });
  }
}
module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getAllCategories,
  createCategory,
  updateCategory,
  deleteCategory,
  getAllTags,
  createTag,
  deleteTag
};

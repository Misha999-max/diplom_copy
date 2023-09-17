const Couresel = require("../models/Couresel");
const Category = require("../models/Category");
const User = require("../models/User");
const Product = require("../models/Product");
const ProductParam = require("../models/ProductParam");
const categoryMock = require("../mock/category.json");
const productMock = require("../mock/productc.json");
// const userMock = require("../mock/users.json");
const productParamMock = require("../mock/productParam.json");
const coureselMock = require("../mock/couresel.json");

module.exports = async () => {
  const categores = await Category.find();
  if (categores.length !== categoryMock.length) {
    await createInitialEntity(Category, categoryMock);
  }

  const couresel = await User.find();
  if (couresel.length !== coureselMock.length) {
    await createInitialEntity(Couresel, coureselMock);
  }
  // const user = await Couresel.find();
  // if (user.length !== userMock.length) {
  //   await createInitialEntity(User, userMock);
  // }
  const product = await Product.find();
  if (product.length !== productMock.length) {
    await createInitialEntity(Product, productMock);
  }
  const productParam = await ProductParam.find();
  if (productParam.length !== productParamMock.length) {
    await createInitialEntity(ProductParam, productParamMock);
  }
};

async function createInitialEntity(Model, data) {
  await Model.collection.drop();
  return Promise.all(
    data.map(async (item) => {
      try {
        delete item._id;
        const newItem = new Model(item);
        await newItem.save();
        return newItem;
      } catch (error) {
        return error;
      }
    })
  );
}

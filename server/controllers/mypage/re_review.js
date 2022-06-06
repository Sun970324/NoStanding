const { sequelize } = require('../../models');
const initModels = require('../../models/init-models');
const Models = initModels(sequelize);

module.exports = {
  get: async (req, res) => {
    try {
      const userAuth = await userAuth(req, res);
      if (!userAuth) {
        return res.status(400).json({ message: '유저정보 없음' });
      }
      delete userAuth.dataValues.password;
      delete userAuth.dataValues.user_salt;

      const { user_name } = req.params;
      //유저 정보 불러오기
      const userInfo = await Models.User.findOne({
        include: [
          {
            model: Models.Review,
            as: 'Reviews',
            attributes: [
              'id',
              'shop_id',
              'image_src',
              'score',
              'contents',
              'created_at',
              'updated_at',
            ],
          },
          {
            model: Models.Shop,
            as: 'Shops',
            attributes: ['id'],
          },
        ],
        where: { user_name: user_name },
        attributes: ['is_master', 'nickname'],
      });

      const is_master = userInfo.dataValues.is_master;

      if (is_master === 0) {
        // 유저일 때
        let shopArr = [];
        for (let n = 0; n < userInfo.dataValues.Reviews.length; n++) {
          const shopinfo = await Models.Shop.findOne({
            include: [
              {
                model: Models.User,
                as: 'user',
                attributes: ['shop_name'],
              },
            ],
            where: { id: userInfo.dataValues.Reviews[n].shop_id },
            attributes: ['id', 'image_src'],
          });
          shopArr.push(shopinfo);
        }
        return res
          .status(200)
          .send({ data: userInfo, shopArr, message: '정보 전달 완료' });
      }
      if (is_master === 1) {
        // 점주일 때
        const shopReview = await Models.Shop.findOne({
          include: [
            {
              model: Models.User,
              as: 'user',
              where: { user_name: user_name },
              attributes: ['nickname', 'shop_name'],
            },
            {
              model: Models.Review,
              as: 'Reviews',
              attributes: [
                'id',
                'image_src',
                'score',
                'contents',
                'created_at',
                'updated_at',
              ],
              include: [
                {
                  model: Models.ReReview,
                  as: 'ReReviews',
                  attributes: ['id', 'contents', 'created_at', 'updated_at'],
                },
              ],
            },
          ],
          attributes: [],
        });
        return res
          .status(200)
          .send({ data: [shopReview], message: '정보 전달 완료' });
      }
    } catch (err) {
      res.status(500).send({ message: 'Server Error' });
    }
  },
  post: async (req, res) => {
    try {
      const userInfo = await userAuth(req, res);
      if (!userInfo) {
        return res.status(400).json({ message: '유저정보 없음' });
      }
      delete userInfo.dataValues.password;
      delete userInfo.dataValues.user_salt;

      const { review_id, user_name } = req.params;

      const shopInfo = await Models.Shop.findOne({
        include: [
          {
            model: Models.User,
            as: 'user',
            where: { user_name: user_name },
            attributes: ['id'],
          },
        ],
        attributes: ['id'],
      });

      const { contents } = req.body;

      if (!contents) {
        return res.status(400).send({ message: '리뷰 작성은 필수입니다.' });
      }
      await Models.ReReview.create({
        review_id: review_id,
        shop_id: shopInfo.dataValues.id,
        contents: contents,
      });

      res.status(200).send({ message: '리뷰 작성 완료' });
    } catch (err) {
      res.status(500).send({ message: 'Server Error' });
    }
  },
};

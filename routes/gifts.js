/**
 * Copyright 2017-present, Facebook, Inc. All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */

// ===== MODULES ===============================================================
import express from 'express';

// ===== STORES ================================================================
// import GiftStore from '../stores/gift-store';

const router = express.Router();

// Get Gift page
// router.get('/:giftId', ({params: {giftId}}, res) => {
router.get('/', (req, res) => {

    var imageUrl = 'http://biteminds.com';
    const sendImageMessage = async (recipientId, imageUrl) => {
        var messageData = {
          recipient: {
            id: recipientId
          },
          message: {
            attachment: {
              type: "image",
              payload: {
                url: imageUrl
              }
            }
          }
        };
          await callSendAPI(messageData);
      }


  res.render(
    './index',
    {
      demo: process.env.DEMO,
      gift: giftJSON,
      title: gift.name,
    }
  );
});

export default router;
